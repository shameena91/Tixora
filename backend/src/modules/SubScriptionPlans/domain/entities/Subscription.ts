export enum SubscriptionStatus {
  PENDING = "PENDING",
  ACTIVE = "ACTIVE",
  CANCELLED = "CANCELLED",
  EXPIRED = "EXPIRED",
}

export enum BillingCycle {
  MONTHLY = "MONTHLY",
  YEARLY = "YEARLY",
}

export class Subscription {
  constructor(
    public readonly id: string,

    public readonly companyId: string,
    public readonly planId: string,

    public readonly razorpayOrderId: string | null,
        public billingCycle: BillingCycle,

    public status: SubscriptionStatus,

    public startDate: Date,
    public endDate: Date | null,

    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}
}