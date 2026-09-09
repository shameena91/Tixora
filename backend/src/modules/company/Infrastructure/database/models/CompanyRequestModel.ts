
import mongoose, { Model } from "mongoose";
import { CompanyRequestDocument } from "../../../application/mappers/CompanyRequestMappers";
import { companyRequestSchema } from "../Schemas/CompanyRequestSchema";

export const CompanyRequestModel: Model<CompanyRequestDocument> =
  mongoose.model<CompanyRequestDocument>(
    "CompanyRequest",
    companyRequestSchema
  );
