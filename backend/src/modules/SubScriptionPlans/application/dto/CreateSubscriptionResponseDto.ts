import { SubscriptionStatus } from "../../domain/entities/Subscription";

export interface CreateSubscriptionResponseDto {
  subscriptionId: string | null;
  orderId: string | null;
  amount: number;
  currency: string;
  status: SubscriptionStatus;
}
