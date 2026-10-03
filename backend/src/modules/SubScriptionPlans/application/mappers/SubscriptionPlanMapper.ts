import { Types } from "mongoose";

import {
  SubscriptionPlan,
  SubscriptionPlanName,
  SubscriptionPlanStatus,
} from "../../domain/entities/SubscriptionPlan";

export interface SubscriptionPlanDocument {
  _id: Types.ObjectId;

  name: SubscriptionPlanName;
  description: string;

  monthlyPrice: number;
  yearlyPrice: number;



  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  automaticTicketAssignment: boolean;
  slaManagement: boolean;

  subscriptionPlanStatus: SubscriptionPlanStatus;

  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionPlanCreateData = Omit<
  SubscriptionPlanDocument,
  "_id" | "createdAt" | "updatedAt"
>;

export class SubscriptionPlanMapper {
  static toDomain(
    doc: SubscriptionPlanDocument,
  ): SubscriptionPlan {
    return new SubscriptionPlan(
      doc._id.toString(),

      doc.name,
      doc.description,

      doc.monthlyPrice,
      doc.yearlyPrice,

    

      doc.memberLimit,
      doc.companyAdminLimit,
      doc.departmentLimit,
      doc.ticketLimit,

      doc.automaticTicketAssignment,
      doc.slaManagement,

      doc.subscriptionPlanStatus,

      doc.createdAt,
      doc.updatedAt,
    );
  }

  static toPersistence(
    subscriptionPlan: SubscriptionPlan,
  ): SubscriptionPlanCreateData {
    return {
      name: subscriptionPlan.name,
      description: subscriptionPlan.description,

      monthlyPrice: subscriptionPlan.monthlyPrice,
      yearlyPrice: subscriptionPlan.yearlyPrice,

   

      memberLimit: subscriptionPlan.memberLimit,
      companyAdminLimit:
        subscriptionPlan.companyAdminLimit,
      departmentLimit:
        subscriptionPlan.departmentLimit,
      ticketLimit:
        subscriptionPlan.ticketLimit,

      automaticTicketAssignment:
        subscriptionPlan.automaticTicketAssignment,

      slaManagement:
        subscriptionPlan.slaManagement,

      subscriptionPlanStatus:
        subscriptionPlan.subscriptionPlanStatus,
    };
  }
}