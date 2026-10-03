import { Schema, model } from "mongoose";
import { PaymentStatus } from "../../../domain/types/PaymentStatus";


const paymentSchema = new Schema(
  {
    paymentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    companyId: {
      type: String,
      required: true,
      index: true,
    },

    subscriptionId: {
      type: String,
      required: true,
      index: true,
    },

    planId: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    billingCycle: {
      type: String,
      enum: ["MONTHLY", "YEARLY"],
      required: true,
    },

    razorpayOrderId: {
      type: String,
      required: true,
    },

    razorpayPaymentId: {
      type: String,
      default: null,
    },

    status: {
      type: String,
      enum: Object.values(PaymentStatus),
      required: true,
    },

    paymentDate: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

export const PaymentModel = model(
  "Payment",
  paymentSchema,
);