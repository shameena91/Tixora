import {
  BillingCycle,
  SubscriptionStatus,
} from "../../domain/entities/Subscription";

export type SubscriptionAccessStatus =
  | "NO_SUBSCRIPTION"
  | "ACTIVE"
  | "EXPIRED"
  | "CANCELLED"
  | "PENDING";

export interface GetCompanySubscriptionItemDto {
  id: string;
  companyId: string;

  planId: string;
  planName: string;

  amount: number;

  billingCycle: BillingCycle;
  status: SubscriptionStatus;

  startDate: Date;
  endDate: Date | null;
  createdAt: Date;
  updatedAt: Date;
}
export interface SubscriptionPaginationDto {
  page: number;
  limit: number;
  totalCount: number;
  totalPages: number;
}
export interface GetCompanySubscriptionResponseDto {
  subscriptionAccessStatus?: SubscriptionAccessStatus;

  currentSubscription: GetCompanySubscriptionItemDto |null;

  subscriptionHistory: GetCompanySubscriptionItemDto[];
  pagination: SubscriptionPaginationDto;
}