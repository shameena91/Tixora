import mongoose, { Schema } from "mongoose";

import {
  BillingCycle,
  SubscriptionStatus,
} from "../../../domain/entities/Subscription";

import {
  SubscriptionDocument,
} from "../../../application/mappers/SubscriptionMapper";

const subscriptionSchema =
  new Schema<SubscriptionDocument>(
    {
      companyId: {
        type: String,
        required: true,
      },

      planId: {
        type: String,
        required: true,
      },

     razorpayOrderId: {
  type: String,
  default: null,
  trim: true,
},

      billingCycle: {
        type: String,
        enum: Object.values(BillingCycle),
        required: true,
      },

      status: {
        type: String,
        enum: Object.values(SubscriptionStatus),
        required: true,
      },

      startDate: {
        type: Date,
        required: true,
      },

      endDate: {
        type: Date,
        default: null,
      },
    },
    {
      timestamps: true,
    },
  );

subscriptionSchema.index({
  companyId: 1,
});

subscriptionSchema.index({
  razorpayOrderId: 1,
});

export const SubscriptionModel =
  mongoose.model<SubscriptionDocument>(
    "Subscription",
    subscriptionSchema,
  );