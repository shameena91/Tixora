export enum SubscriptionPlanName {
  FREE = "FREE",
  PROFESSIONAL = "PROFESSIONAL",
  ENTERPRISE = "ENTERPRISE",
}

export enum SubscriptionPlanStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class SubscriptionPlan {
  constructor(
    public readonly id: string,
    public name: SubscriptionPlanName,
    public description: string,

    public monthlyPrice: number,
    public yearlyPrice: number,

    public memberLimit: number | null,
    public companyAdminLimit: number | null,
    public departmentLimit: number | null,
    public ticketLimit: number | null,

    public automaticTicketAssignment: boolean,
    public slaManagement: boolean,
    public subscriptionPlanStatus: SubscriptionPlanStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

}
