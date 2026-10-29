
export type SubscriptionAccessStatus =
   | "PENDING"
  | "ACTIVE"
  | "SCHEDULED"
  | "UPGRADED"
  | "CANCELLED"
  | "EXPIRED";
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
   SubscriptionAccessStatus
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface SubscriptionPaginationDto {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}
export interface GetCompanySubscriptionDataDto {
  subscriptionAccessStatus?: SubscriptionAccessStatus;
  currentSubscription: GetCompanySubscriptionItemDto | null;
  subscriptionHistory: GetCompanySubscriptionItemDto[];
  pagination: SubscriptionPaginationDto;
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
    SubscriptionAccessStatus
  startDate: string;
  endDate: string | null;
  createdAt: string;
  updatedAt: string;
};
export type SelectSubscriptionPlanData = {
  planId: string;
  billingCycle: "MONTHLY" | "YEARLY";
  isRenewal?: boolean;
  isUpgrade?:boolean
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



export interface Invoice {
  id: string;
  invoiceNumber: string;
  companyId: string;
 
  companyName: string;
  planName: string;
  billingCycle: "MONTHLY" | "YEARLY";
  amount: number;
  currency: string;
  paymentDate: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
}


export interface GetCompanyInvoicesResponseDto {
  invoices: Invoice[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}