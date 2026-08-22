import  { Schema } from "mongoose";
import { CompanyRequestStatus, CompanyType, EmployeeCountRange } from "../../../domain/entities/CompanyRequest";
import {companyLocationSchema} from "../Schemas/CompanyLocationSchema"
import{companyDocumentSchema} from "../Schemas/CompanyDocumentSchemal"
export const companyRequestSchema = new Schema(
  {
    accountId: {
      type: String,
      required: true,
      index: true,
    },

    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      trim: true,
    },

    companyEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    yearEstablished: {
      type: Number,
      default: null,
    },

    companyType: {
      type: String,
      enum:Object.values(CompanyType),
      required: true,
    },

    numberOfEmployees: {
      type: String,
      enum:Object.values(EmployeeCountRange),
      required: true,
    },

    status: {
      type: String,
      enum:Object.values(CompanyRequestStatus),
      required: true,
    },

    website: {
      type: String,
      default: null,
      trim: true,
    },

    logo: {
      type: String,
      default: null,
    },

    description: {
      type: String,
      default: null,
      trim: true,
    },

    location: {
      type: companyLocationSchema,
        default: null,
    },

    documents: {
      type: [companyDocumentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);