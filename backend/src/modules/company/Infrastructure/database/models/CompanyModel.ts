import mongoose, { Schema, Types } from "mongoose";
import { CompanyType, EmployeeCountRange } from "../../../domain/entities/CompanyRequest";
import { CompanyLocation } from "../../../domain/value-objects/CompanyLocation";
import { CompanyStatus } from "../../../domain/entities/Company";



export interface CompanyDocument {
  _id: Types.ObjectId;

  accountId: string;

  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;

  yearEstablished: number | null;

  companyType: CompanyType;
  numberOfEmployees: EmployeeCountRange;

  website: string | null;
  logo: string | null;
  description: string | null;

  location: CompanyLocation | null;

  status: CompanyStatus;

  createdAt: Date;
  updatedAt: Date;
}

const companySchema =
  new Schema<CompanyDocument>(
    {
      accountId: {
        type: String,
        required: true,
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
        enum: Object.values(CompanyType),
        required: true,
      },

      numberOfEmployees: {
        type: String,
        enum: Object.values(EmployeeCountRange),
        required: true,
      },

      website: {
        type: String,
        default: null,
      },

      logo: {
        type: String,
        default: null,
      },

      description: {
        type: String,
        default: null,
      },

      location: {
        type: Schema.Types.Mixed,
        default: null,
      },

      status: {
        type: String,
        enum: Object.values(CompanyStatus),
        required: true,
        default: CompanyStatus.ACTIVE,
      },
    },
    {
      timestamps: true,
    },
  );

export const CompanyModel =
  mongoose.model<CompanyDocument>(
    "Company",
    companySchema,
  );