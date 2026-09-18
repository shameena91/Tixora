import { Schema } from "mongoose";
import { CompanyDocumentType, DocumentVerificationStatus } from "../../../domain/value-objects/CompanyDocuments";

export const companyDocumentSchema = new Schema(
  {
    documentType: {
      type: String,
      enum: Object.values(CompanyDocumentType),
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

    fileKey: {
      type: String,
      required: true,
    },
    uploadedAt: {
      type: Date,
      required: true,
    },

    verificationStatus: {
      type: String,
      enum: Object.values(DocumentVerificationStatus),
      required: true,
      default: DocumentVerificationStatus.PENDING,
    },
  },
  { _id: false }
);

