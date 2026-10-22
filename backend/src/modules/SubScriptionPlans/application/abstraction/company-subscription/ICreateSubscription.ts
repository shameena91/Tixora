import {  Subscription } from "../../../domain/entities/Subscription";
import { CreateSubscriptionResponseDto } from "../../dto/CreateSubscriptionResponseDto";

export interface ICreateSubscription {
 execute(
  accountId: string,
  planId: string,
  billingCycle: Subscription["billingCycle"],
  isRenewal?: boolean,
   isUpgrade?: boolean,
): Promise<CreateSubscriptionResponseDto>;
}
