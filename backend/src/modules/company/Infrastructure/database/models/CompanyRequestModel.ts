
import mongoose, { Model } from "mongoose";
import { companyRequestSchema } from "../Schemas/CompanyRequestSchema";
import { CompanyRequestDocument } from "../mappers/CompanyRequestMappers";

export const CompanyRequestModel: Model<CompanyRequestDocument> =
  mongoose.model<CompanyRequestDocument>(
    "CompanyRequest",
    companyRequestSchema
  );
