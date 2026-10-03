import mongoose, { Schema } from "mongoose";

import {
  SubscriptionPlanName,
  SubscriptionPlanStatus,
} from "../../../domain/entities/SubscriptionPlan";

import { SubscriptionPlanDocument } from "../../../application/mappers/SubscriptionPlanMapper";

const subscriptionPlanSchema =
  new Schema<SubscriptionPlanDocument>(
    {
      name: {
        type: String,
        enum: Object.values(SubscriptionPlanName),
        required: true,
      },

      description: {
        type: String,
        required: true,
        trim: true,
      },

      monthlyPrice: {
        type: Number,
        required: true,
        min: 0,
      },

      yearlyPrice: {
        type: Number,
        required: true,
        min: 0,
      },

    

    

      memberLimit: {
        type: Number,
        default: null,
        min: 1,
      },

      companyAdminLimit: {
        type: Number,
        default: null,
        min: 1,
      },

      departmentLimit: {
        type: Number,
        default: null,
        min: 1,
      },

      ticketLimit: {
        type: Number,
        default: null,
        min: 1,
      },

      automaticTicketAssignment: {
        type: Boolean,
        required: true,
      },

      slaManagement: {
        type: Boolean,
        required: true,
      },

      subscriptionPlanStatus: {
        type: String,
        enum: Object.values(SubscriptionPlanStatus),
        required: true,
        default: SubscriptionPlanStatus.ACTIVE,
      },
    },
    {
      timestamps: true,
    },
  );

export const SubscriptionPlanModel =
  mongoose.model<SubscriptionPlanDocument>(
    "SubscriptionPlan",
    subscriptionPlanSchema,
  );