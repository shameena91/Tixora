
import { ICompanyRepository } from "../../../../company/domain/repositories/ICompanyRepository";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";

import { IGetMySubscriptionStatus } from "../../abstraction/company-subscription/IGetMySubscriptionStatus";

import {
  GetCompanySubscriptionItemDto,
  GetCompanySubscriptionResponseDto,
} from "../../dto/GetCompanySubscriptionDto";

import {
  Subscription,
  SubscriptionStatus,
} from "../../../domain/entities/Subscription";

export class GetMySubscriptionStatus
  implements IGetMySubscriptionStatus
{
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    accountId: string,
    page: number,
    limit: number,
  ): Promise<GetCompanySubscriptionResponseDto | null> {
    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      return null;
    }

    const currentDate = new Date();

    // Fetch all records for subscription status transitions.
    let subscriptions =
      await this._subscriptionRepository.findAllByCompanyId(
        company.id,
      );

    // Expire active and scheduled subscriptions when their periods end.
    for (const subscription of subscriptions) {
      const hasExpired =
        (subscription.status === SubscriptionStatus.ACTIVE ||
          subscription.status === SubscriptionStatus.SCHEDULED) &&
        subscription.endDate !== null &&
        subscription.endDate.getTime() <= currentDate.getTime();

      if (hasExpired) {
        await this._subscriptionRepository.updateSubscription(
          subscription.id,
          { status: SubscriptionStatus.EXPIRED },
        );
      }
    }

    // Refresh records after expiry transitions.
    subscriptions =
      await this._subscriptionRepository.findAllByCompanyId(
        company.id,
      );

    const hasValidActiveSubscription = subscriptions.some(
      (subscription) =>
        subscription.status === SubscriptionStatus.ACTIVE &&
        subscription.startDate.getTime() <= currentDate.getTime() &&
        (subscription.endDate === null ||
          subscription.endDate.getTime() > currentDate.getTime()),
    );

    // Activate the next eligible scheduled subscription when needed.
    if (!hasValidActiveSubscription) {
      const scheduledSubscription = subscriptions
        .filter(
          (subscription) =>
            subscription.status === SubscriptionStatus.SCHEDULED &&
            subscription.startDate.getTime() <= currentDate.getTime() &&
            (subscription.endDate === null ||
              subscription.endDate.getTime() > currentDate.getTime()),
        )
        .sort(
          (a, b) =>
            a.startDate.getTime() - b.startDate.getTime(),
        )[0];

      if (scheduledSubscription) {
        await this._subscriptionRepository.updateSubscription(
          scheduledSubscription.id,
          { status: SubscriptionStatus.ACTIVE },
        );
      }
    }

    // Refresh all records for current subscription and access status.
    subscriptions =
      await this._subscriptionRepository.findAllByCompanyId(
        company.id,
      );

    const currentSubscriptionEntity =
      subscriptions
        .filter(
          (subscription) =>
            subscription.status === SubscriptionStatus.ACTIVE &&
            subscription.startDate.getTime() <= currentDate.getTime() &&
            (subscription.endDate === null ||
              subscription.endDate.getTime() > currentDate.getTime()),
        )
        .sort(
          (a, b) =>
            b.createdAt.getTime() - a.createdAt.getTime(),
        )[0] ?? null;

    // Fetch only the requested history page from the repository.
    const [historyPage, totalCount] = await Promise.all([
      this._subscriptionRepository.findAllByCompanyId(
        company.id,
        page,
        limit,
      ),
      this._subscriptionRepository.countByCompanyId(company.id),
    ]);

    const mapSubscription = async (
      subscription: Subscription,
    ): Promise<GetCompanySubscriptionItemDto> => {
      const plan =
        await this._subscriptionPlanRepository.findById(
          subscription.planId,
        );

      const amount =
        subscription.billingCycle === "MONTHLY"
          ? plan?.monthlyPrice
          : plan?.yearlyPrice;

      return {
        id: subscription.id,
        companyId: subscription.companyId,
        planId: subscription.planId,
        planName: plan?.name ?? "-",
        amount: amount ?? 0,
        billingCycle: subscription.billingCycle,
        status: subscription.status,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        createdAt: subscription.createdAt,
        updatedAt: subscription.updatedAt,
      };
    };

    const [subscriptionHistory, currentSubscription] =
      await Promise.all([
        Promise.all(historyPage.map(mapSubscription)),
        currentSubscriptionEntity
          ? mapSubscription(currentSubscriptionEntity)
          : Promise.resolve(null),
      ]);

    const latestRelevantSubscription = [...subscriptions]
      .filter(
        (subscription) =>
          subscription.status !== SubscriptionStatus.UPGRADED &&
          subscription.status !== SubscriptionStatus.SCHEDULED,
      )
      .sort(
        (a, b) =>
          b.createdAt.getTime() - a.createdAt.getTime(),
      )[0] ?? null;

    let subscriptionAccessStatus:
      GetCompanySubscriptionResponseDto["subscriptionAccessStatus"];

    if (currentSubscription) {
      subscriptionAccessStatus = "ACTIVE";
    } else if (
      latestRelevantSubscription?.status === SubscriptionStatus.EXPIRED
    ) {
      subscriptionAccessStatus = "EXPIRED";
    } else if (
      latestRelevantSubscription?.status === SubscriptionStatus.CANCELLED
    ) {
      subscriptionAccessStatus = "CANCELLED";
    } else if (
      latestRelevantSubscription?.status === SubscriptionStatus.PENDING
    ) {
      subscriptionAccessStatus = "PENDING";
    } else if (subscriptions.length === 0) {
      subscriptionAccessStatus = "NO_SUBSCRIPTION";
    } else {
      subscriptionAccessStatus = "PENDING";
    }

    return {
      subscriptionAccessStatus,
      currentSubscription,
      subscriptionHistory,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }
}
