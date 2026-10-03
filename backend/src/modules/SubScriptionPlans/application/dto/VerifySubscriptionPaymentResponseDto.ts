import { BillingCycle, SubscriptionStatus } from "../../domain/entities/Subscription";

export interface VerifySubscriptionPaymentResponseDto {
  subscriptionId: string;
  orderId: string;
  billingCycle: BillingCycle;
  status: SubscriptionStatus;
  startDate: Date;
  endDate: Date | null;
}