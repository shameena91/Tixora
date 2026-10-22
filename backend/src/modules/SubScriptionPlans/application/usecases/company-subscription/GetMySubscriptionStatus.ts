
import { ICompanyRepository } from "../../../../company/domain/repositories/ICompanyRepository";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";

import { IGetMySubscriptionStatus } from "../../abstraction/company-subscription/IGetMySubscriptionStatus";

import {
  GetCompanySubscriptionItemDto,
  GetCompanySubscriptionResponseDto,
} from "../../dto/GetCompanySubscriptionDto";

import { SubscriptionStatus } from "../../../domain/entities/Subscription";

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
  ): Promise<GetCompanySubscriptionResponseDto | null> {
    // 1. Find company
    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      return null;
    }

    const currentDate = new Date();

    // 2. Fetch all subscription records
    let subscriptions =
      await this._subscriptionRepository.findAllByCompanyId(
        company.id,
      );

    // 3. Expire active subscriptions whose end date has passed
    for (const subscription of subscriptions) {
      const hasExpired =
        subscription.status === SubscriptionStatus.ACTIVE &&
        subscription.endDate !== null &&
        subscription.endDate.getTime() <= currentDate.getTime();

      if (hasExpired) {
        await this._subscriptionRepository.updateSubscription(
          subscription.id,
          {
            status: SubscriptionStatus.EXPIRED,
          },
        );
      }
    }

    // 4. Expire scheduled subscriptions whose periods have already ended
    for (const subscription of subscriptions) {
      const scheduledPeriodHasExpired =
        subscription.status === SubscriptionStatus.SCHEDULED &&
        subscription.startDate.getTime() <= currentDate.getTime() &&
        subscription.endDate !== null &&
        subscription.endDate.getTime() <= currentDate.getTime();

      if (scheduledPeriodHasExpired) {
        await this._subscriptionRepository.updateSubscription(
          subscription.id,
          {
            status: SubscriptionStatus.EXPIRED,
          },
        );
      }
    }

    // 5. Check whether a valid active subscription exists
    const hasValidActiveSubscription = subscriptions.some(
      (subscription) =>
        subscription.status === SubscriptionStatus.ACTIVE &&
        subscription.startDate.getTime() <= currentDate.getTime() &&
        (
          subscription.endDate === null ||
          subscription.endDate.getTime() > currentDate.getTime()
        ),
    );

    // 6. If no active subscription exists, activate the next
    // scheduled subscription whose start date has arrived
    if (!hasValidActiveSubscription) {
      const scheduledSubscription = subscriptions
        .filter(
          (subscription) =>
            subscription.status === SubscriptionStatus.SCHEDULED &&
            subscription.startDate.getTime() <= currentDate.getTime() &&
            (
              subscription.endDate === null ||
              subscription.endDate.getTime() > currentDate.getTime()
            ),
        )
        .sort(
          (a, b) =>
            a.startDate.getTime() - b.startDate.getTime(),
        )[0];

      if (scheduledSubscription) {
        await this._subscriptionRepository.updateSubscription(
          scheduledSubscription.id,
          {
            status: SubscriptionStatus.ACTIVE,
          },
        );
      }
    }

    // 7. Fetch updated records once, after status transitions
    subscriptions =
      await this._subscriptionRepository.findAllByCompanyId(
        company.id,
      );

    // 8. Prepare subscription history items
    const subscriptionItems: GetCompanySubscriptionItemDto[] =
      await Promise.all(
        subscriptions.map(async (subscription) => {
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
        }),
      );

    // 9. Sort history newest first
    const sortedSubscriptions = [...subscriptionItems].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime(),
    );

    // 10. Find the currently valid active subscription
    const currentSubscription =
      sortedSubscriptions.find(
        (subscription) =>
          subscription.status === SubscriptionStatus.ACTIVE &&
          new Date(subscription.startDate).getTime() <=
            currentDate.getTime() &&
          (
            subscription.endDate === null ||
            new Date(subscription.endDate).getTime() >
              currentDate.getTime()
          ),
      ) ?? null;

    // 11. Determine company access status
    const latestRelevantSubscription =
      sortedSubscriptions.find(
        (subscription) =>
          subscription.status !== SubscriptionStatus.UPGRADED &&
          subscription.status !== SubscriptionStatus.SCHEDULED,
      ) ?? null;

    let subscriptionAccessStatus:
      GetCompanySubscriptionResponseDto["subscriptionAccessStatus"];

    if (currentSubscription) {
      subscriptionAccessStatus = "ACTIVE";
    } else if (
      latestRelevantSubscription?.status ===
      SubscriptionStatus.EXPIRED
    ) {
      subscriptionAccessStatus = "EXPIRED";
    } else if (
      latestRelevantSubscription?.status ===
      SubscriptionStatus.CANCELLED
    ) {
      subscriptionAccessStatus = "CANCELLED";
    } else if (
      latestRelevantSubscription?.status ===
      SubscriptionStatus.PENDING
    ) {
      subscriptionAccessStatus = "PENDING";
    } else if (sortedSubscriptions.length === 0) {
      subscriptionAccessStatus = "NO_SUBSCRIPTION";
    } else {
      subscriptionAccessStatus = "PENDING";
    }

    // 12. Return current subscription and complete history
    return {
      subscriptionAccessStatus,
      currentSubscription,
      subscriptionHistory: sortedSubscriptions,
    };
  }
}
