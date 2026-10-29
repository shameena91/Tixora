import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
import { Subscription } from "../../../domain/entities/Subscription";
import { IgetCompanySubscription } from "../../abstraction/company-subscription/IgetCompanySubscription";
import {
  GetCompanySubscriptionItemDto,
  GetCompanySubscriptionResponseDto,
} from "../../dto/GetCompanySubscriptionDto";

export class GetCompanySubscription implements IgetCompanySubscription {
  constructor(
    private readonly _subscriptionRepository: ISubscriptionRepository,
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(
    companyId: string,
    page: number,
    limit: number,
  ): Promise<GetCompanySubscriptionResponseDto> {
    const [subscriptions, totalCount, activeSubscription] =
      await Promise.all([
        this._subscriptionRepository.findAllByCompanyId(
          companyId,
          page,
          limit,
        ),
        this._subscriptionRepository.countByCompanyId(companyId),
        this._subscriptionRepository.findActiveByCompanyId(companyId),
      ]);

    const subscriptionItems = await Promise.all(
      subscriptions.map((subscription) =>
        this.mapSubscription(subscription),
      ),
    );

    const currentSubscription = activeSubscription
      ? await this.mapSubscription(activeSubscription)
      : null;

    return {
      currentSubscription,
      subscriptionHistory: subscriptionItems,
      pagination: {
        page,
        limit,
        totalCount,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }

  private async mapSubscription(
    subscription: Subscription,
  ): Promise<GetCompanySubscriptionItemDto> {
    const plan = await this._subscriptionPlanRepository.findById(
      subscription.planId,
    );

    return {
      id: subscription.id,
      companyId: subscription.companyId,
      planId: subscription.planId,
      planName: plan?.name ?? "-",
      amount:
        subscription.billingCycle === "MONTHLY"
          ? plan?.monthlyPrice ?? 0
          : plan?.yearlyPrice ?? 0,
      billingCycle: subscription.billingCycle,
      status: subscription.status,
      startDate: subscription.startDate,
      endDate: subscription.endDate,
      createdAt: subscription.createdAt,
      updatedAt: subscription.updatedAt,
    };
  }
}