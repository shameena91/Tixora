
import mongoose, { Model } from "mongoose";
import { CompanyRequestDocument } from "../../mappers/CompanyRequestMappers";
import { companyRequestSchema } from "../Schemas/CompanyRequestSchema";

export const CompanyRequestModel: Model<CompanyRequestDocument> =
  mongoose.model<CompanyRequestDocument>(
    "CompanyRequest",
    companyRequestSchema
  );
