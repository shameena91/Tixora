import mongoose, { Schema } from "mongoose";

import {
  SubscriptionPlanStatus,
} from "../../../domain/entities/SubscriptionPlan";

import { SubscriptionPlanDocument } from "../../../application/mappers/SubscriptionPlanMapper";

const subscriptionPlanSchema =
  new Schema<SubscriptionPlanDocument>(
    {
      name: {
        type: String,
        required: true,
        trim: true,
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
        required: true,
        validate: {
          validator: (value: number) => value === -1 || value >= 1,
          message: "Member limit must be -1 or greater than 0",
        },
      },

      companyAdminLimit: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value === -1 || value >= 1,
          message: "Company admin limit must be -1 or greater than 0",
        },
      },

      departmentLimit: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value === -1 || value >= 1,
          message: "Department limit must be -1 or greater than 0",
        },
      },

      ticketLimit: {
        type: Number,
        required: true,
        validate: {
          validator: (value: number) => value === -1 || value >= 1,
          message: "Ticket limit must be -1 or greater than 0",
        },
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