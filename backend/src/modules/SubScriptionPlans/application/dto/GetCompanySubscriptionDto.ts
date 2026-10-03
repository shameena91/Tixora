export interface GetCompanySubscriptionItemDto {
  id: string;
  companyId: string;

  planId: string;
  planName: string;

  amount: number;

  billingCycle: "MONTHLY" | "YEARLY";

  status:
    | "PENDING"
    | "ACTIVE"
    | "CANCELLED"
    | "EXPIRED";

  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetCompanySubscriptionResponseDto {
  currentSubscription: GetCompanySubscriptionItemDto | null;

  subscriptionHistory: GetCompanySubscriptionItemDto[];
}