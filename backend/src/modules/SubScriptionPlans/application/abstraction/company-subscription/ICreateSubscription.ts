import { BillingCycle } from "../../../domain/entities/Subscription";
import { CreateSubscriptionResponseDto } from "../../dto/CreateSubscriptionResponseDto";

export interface ICreateSubscription {
  execute(
    accountId: string,
    planId: string,
    billingCycle: BillingCycle
  ): Promise<CreateSubscriptionResponseDto>;
}