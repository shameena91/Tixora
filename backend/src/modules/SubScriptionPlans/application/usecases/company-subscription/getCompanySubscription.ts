import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { ISubscriptionRepository } from "../../../domain/repositories/ISubscriptionRepository";
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
  ): Promise<GetCompanySubscriptionResponseDto> {
    const subscriptions =
      await this._subscriptionRepository.findAllByCompanyId(companyId);

    const subscriptionItems: GetCompanySubscriptionItemDto[] =
      await Promise.all(
        subscriptions.map(async (subscription) => {
          const subscriptionPlan =
            await this._subscriptionPlanRepository.findById(
              subscription.planId,
            );

          const amount =
            subscription.billingCycle === "MONTHLY"
              ? subscriptionPlan?.monthlyPrice
              : subscriptionPlan?.yearlyPrice;

          return {
            id: subscription.id,
            companyId: subscription.companyId,
            planId: subscription.planId,
            planName: subscriptionPlan?.name ?? "-",
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

    const currentSubscription =
      subscriptionItems.find(
        (subscription) => subscription.status === "ACTIVE",
      ) ?? null;

    return {
      currentSubscription,
      subscriptionHistory: subscriptionItems,
    };
  }
}