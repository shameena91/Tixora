import { model } from "mongoose";
import { CompanyChangeRequestSchema } from "../Schemas/CompanyChangeRequestSchema";
import type { CompanyChangeRequestDocument } from "../Schemas/CompanyChangeRequestSchema";

export const CompanyChangeRequestModel =
  model<CompanyChangeRequestDocument>(
    "CompanyChangeRequest",
    CompanyChangeRequestSchema,
    "companyChangeRequests",
  );