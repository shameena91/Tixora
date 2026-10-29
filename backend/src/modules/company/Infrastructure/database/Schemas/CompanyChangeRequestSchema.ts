import { Schema, Types } from "mongoose";

import type { DocumentChangeData } from "../../../application/mappers/CompanyDocumentChnageMapper";
import type { ProfileFieldChangeDocument } from "../../../application/mappers/CompanyProfileChangeMapper";

import {
  CompanyProfileChangeStatus,
  CompanyProfileFieldChangeStatus,
} from "../../../domain/entities/CompanyProfileChange";

import { CompanyDocumentChangeStatus } from "../../../domain/entities/CompanyDocumentChange";

export interface CompanyChangeRequestBaseDocument {
  _id: Types.ObjectId;
  requestId: string;
  companyId: string;
  accountId: string;

  submittedAt: Date;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  reviewRemarks: string | null;

  createdAt: Date;
  updatedAt: Date;
}

export interface CompanyProfileChangeDatabaseDocument
  extends CompanyChangeRequestBaseDocument {
  changeType: "PROFILE";
  profileChanges: ProfileFieldChangeDocument[];
  documentChange?: never;

  status: CompanyProfileChangeStatus;
}

export interface CompanyDocumentChangeDatabaseDocument
  extends CompanyChangeRequestBaseDocument {
  changeType: "DOCUMENT";
  profileChanges?: never;
  documentChange: DocumentChangeData;
reason:string|null
  status: CompanyDocumentChangeStatus;
}

export type CompanyChangeRequestDocument =
  | CompanyProfileChangeDatabaseDocument
  | CompanyDocumentChangeDatabaseDocument;

export const ProfileFieldChangeSchema = new Schema(
  {
    field: {
      type: String,
      required: true,
    },
    oldValue: {
      type: String,
      default: null,
    },
    newValue: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(CompanyProfileFieldChangeStatus),
      default: CompanyProfileFieldChangeStatus.PENDING,
    },
    reviewRemarks: {
      type: String,
      default: null,
    },
  },
  { _id: false },
);

export const DocumentChangeSchema = new Schema(
  {
    documentType: {
      type: String,
      required: true,
    },
    oldDocumentKey: {
      type: String,
      default: null,
    },
    newDocumentKey: {
      type: String,
      required: true,
    },
    reason: {
  type: String,
  default: null,
},
  },
  { _id: false },
);

export const CompanyChangeRequestSchema =
  new Schema<CompanyChangeRequestDocument>(
    {
      requestId: {
        type: String,
        required: true,
        unique: true,
      },
      companyId: {
        type: String,
        required: true,
        index: true,
      },
      accountId: {
        type: String,
        required: true,
      },
      changeType: {
        type: String,
        enum: ["PROFILE", "DOCUMENT"],
        required: true,
      },
      profileChanges: {
        type: [ProfileFieldChangeSchema],
        default: undefined,
      },
      documentChange: {
        type: DocumentChangeSchema,
        default: undefined,
      },
      status: {
        type: String,
        enum: Object.values(CompanyProfileChangeStatus),
        required: true,
      },
      submittedAt: {
        type: Date,
        required: true,
      },
      reviewedBy: {
        type: String,
        default: null,
      },
      reviewedAt: {
        type: Date,
        default: null,
      },
      reviewRemarks: {
        type: String,
        default: null,
      },
    },
    {
      timestamps: true,
      collection: "companyChangeRequests",
    },
  );