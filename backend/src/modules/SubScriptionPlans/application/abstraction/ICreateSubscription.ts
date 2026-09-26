import { Subscription } from "../../domain/entities/Subscription";
import { BillingCycle } from "../../domain/entities/Subscription";

export interface ICreateSubscription {
  execute(
    accountId: string,
    planId: string,
    billingCycle: BillingCycle
  ): Promise<Subscription>;
}