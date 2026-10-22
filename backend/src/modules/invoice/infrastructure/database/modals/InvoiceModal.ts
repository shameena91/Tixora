import mongoose, { Schema, Types } from "mongoose";

export interface InvoiceDocument {
  _id: Types.ObjectId;

  invoiceNumber: string;

  companyId: string;
  paymentId: string;
  subscriptionId: string | null;

  companyName: string;
  companyEmail: string;
  companyPhone: string;
  companyRegistrationNumber: string;
  companyAddress: string;

  planName: string;
  billingCycle: "MONTHLY" | "YEARLY";

  amount: number;
  currency: "INR";
pdfKey: string | null;
  paymentDate: Date;
  paymentMethod: string | null;
  paymentStatus: "SUCCESS";

  createdAt: Date;
  updatedAt: Date;
}

const invoiceSchema = new Schema<InvoiceDocument>(
  {
    invoiceNumber: {
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

    paymentId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    subscriptionId: {
      type: String,
      default: null,
    },

    companyName: {
      type: String,
      required: true,
    },

    companyEmail: {
      type: String,
      required: true,
    },

    companyPhone: {
      type: String,
      required: true,
    },

    companyRegistrationNumber: {
      type: String,
      required: true,
    },

    companyAddress: {
      type: String,
      default: "Not provided",
    },

    planName: {
      type: String,
      required: true,
    },

    billingCycle: {
      type: String,
      enum: ["MONTHLY", "YEARLY"],
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    currency: {
      type: String,
      default: "INR",
      required: true,
    },
    pdfKey: {
  type: String,
  default: null,
},

    paymentDate: {
      type: Date,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: ["SUCCESS"],
      required: true,
      default: "SUCCESS",
    },
  },
  {
    timestamps: true,
  },
);

export const InvoiceModel = mongoose.model<InvoiceDocument>(
  "Invoice",
  invoiceSchema,
);