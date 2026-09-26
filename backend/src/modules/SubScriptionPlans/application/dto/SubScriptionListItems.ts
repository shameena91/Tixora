import { SubscriptionPlanStatus } from "../../domain/entities/SubscriptionPlan";

export interface SubScriptionListItems {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;

  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  automaticTicketAssignment: boolean;
  slaManagement: boolean;
}
export interface ViewSubScriptionPlanDetails {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;

  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  automaticTicketAssignment: boolean;
  slaManagement: boolean;
  status:SubscriptionPlanStatus,
 createdAt: Date,
   updatedAt: Date,
}