import { Schema } from "mongoose";
import { CompanyDocumentType } from "../../../domain/Value-objects/CompanyDocuments";

export const companyDocumentSchema = new Schema(
  {
    documentType: {
      type: String,
      enum:Object.values(CompanyDocumentType),
      required: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    fileUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { _id: false }
);

