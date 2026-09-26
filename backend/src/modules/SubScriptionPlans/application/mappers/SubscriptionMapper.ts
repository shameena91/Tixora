import { Types } from "mongoose";
import { BillingCycle, SubscriptionStatus } from "../../domain/entities/Subscription";

import { Subscription } from "../../domain/entities/Subscription";


export interface SubscriptionDocument {
  _id: Types.ObjectId;

  companyId: string;
  planId: string;

  billingCycle: BillingCycle;

  status: SubscriptionStatus;

  startDate: Date;
  endDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface SubscriptionCreateData {
  companyId: string;
  planId: string;

  billingCycle: Subscription["billingCycle"];

  status: Subscription["status"];

  startDate: Date;
  endDate: Date | null;
}

export class SubscriptionMapper {
  // ------------------------------------
  // Persistence → Domain
  // ------------------------------------
  static toDomain(
    document: SubscriptionDocument
  ): Subscription {
    return new Subscription(
      document._id.toString(),

      document.companyId,
      document.planId,

      document.billingCycle,

      document.status,

      document.startDate,
      document.endDate,

      document.createdAt,
      document.updatedAt,
    );
  }

  // ------------------------------------
  // Domain → Persistence
  // ------------------------------------
  static toPersistence(
    subscription: Subscription
  ): SubscriptionCreateData {
    return {
      companyId: subscription.companyId,
      planId: subscription.planId,

      billingCycle:
        subscription.billingCycle,

      status: subscription.status,

      startDate:
        subscription.startDate,

      endDate:
        subscription.endDate,
    };
  }
}