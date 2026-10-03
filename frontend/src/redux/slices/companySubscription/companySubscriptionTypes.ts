export interface VerifyPaymentResponse {
  success: boolean;
  message: string;
  data: {
    subscriptionId: string;
    orderId: string;
    billingCycle: "MONTHLY" | "YEARLY";
    status: "ACTIVE";
    startDate: string;
    endDate: string | null;
  };
}
export interface GetCompanySubscriptionItemDto {
  id: string;
  companyId: string;
  planId: string;
  planName:string
  amount:number
  billingCycle: "MONTHLY" | "YEARLY";
  status:
    | "PENDING"
    | "ACTIVE"
    | "CANCELLED"
    | "EXPIRED";
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetCompanySubscriptionDataDto {
  currentSubscription: GetCompanySubscriptionItemDto | null;
  subscriptionHistory: GetCompanySubscriptionItemDto[];
}
export interface GetCompanySubscriptionResponseDto {
  success: boolean;
  message: string;
  data: GetCompanySubscriptionDataDto;
}

export type MySubscription = {
  id: string;
  companyId: string;
  planId: string;
  billingCycle: "MONTHLY" | "YEARLY";
  status:
    | "PENDING"
    | "ACTIVE"
    | "CANCELLED"
    | "EXPIRED";
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
};
export type SelectSubscriptionPlanData = {
  planId: string;
  billingCycle: "MONTHLY" | "YEARLY";
};

export interface SelectSubscriptionPlanResponseDto {
  success: boolean;
  message: string;
  data: {
    subscriptionId: string;
    orderId: string | null;
    amount: number;
    currency: string;
    status: "PENDING" | "ACTIVE";
  };
}
