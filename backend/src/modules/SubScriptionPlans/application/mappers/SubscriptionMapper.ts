import { Types } from "mongoose";

import {
  BillingCycle,
  Subscription,
  SubscriptionStatus,
} from "../../domain/entities/Subscription";

export interface SubscriptionDocument {
  _id: Types.ObjectId;

  companyId: string;
  planId: string;

  razorpayOrderId: string | null;

  billingCycle: BillingCycle;

  status: SubscriptionStatus;

  startDate: Date;
  endDate: Date | null;

  createdAt: Date;
  updatedAt: Date;
}

export type SubscriptionCreateData = Omit<
  SubscriptionDocument,
  "_id" | "createdAt" | "updatedAt"
>;

export class SubscriptionMapper {
  static toDomain(document: SubscriptionDocument): Subscription {
    return new Subscription(
      document._id.toString(),

      document.companyId,

      document.planId,

      document.razorpayOrderId,

      document.billingCycle,

      document.status,

      document.startDate,

      document.endDate,

      document.createdAt,

      document.updatedAt,
    );
  }

  static toPersistence(subscription: Subscription): SubscriptionCreateData {
    return {
      companyId: subscription.companyId,

      planId: subscription.planId,

      razorpayOrderId: subscription.razorpayOrderId,
      billingCycle: subscription.billingCycle,

      status: subscription.status,

      startDate: subscription.startDate,

      endDate: subscription.endDate,
    };
  }
}
