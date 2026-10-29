import {
  CompanyDocumentChange,
  CompanyDocumentChangeStatus,
} from "../../domain/entities/CompanyDocumentChange";

import { CompanyDocumentType } from "../../domain/value-objects/CompanyDocuments";

export interface DocumentChangeData {
  documentType: CompanyDocumentType;
  oldDocumentKey: string | null;
  newDocumentKey: string;
  reason: string | null;
}

export interface CompanyDocumentChangeMapperData {
  _id: string;
  requestId: string;
  companyId: string;
  accountId: string;
  changeType: "DOCUMENT";
  documentChange: DocumentChangeData;
  status: CompanyDocumentChangeStatus;
  submittedAt: Date;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  reviewRemarks: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export type CompanyDocumentChangeCreateData = Omit<
  CompanyDocumentChangeMapperData,
  "_id" | "createdAt" | "updatedAt"
>;

export class CompanyDocumentChangeMapper {
  static toDomain(
    doc: CompanyDocumentChangeMapperData,
  ): CompanyDocumentChange {
    return new CompanyDocumentChange(
      doc._id.toString(),
      doc.requestId,
      doc.companyId,
      doc.accountId,

      doc.documentChange.documentType,
      doc.documentChange.oldDocumentKey,
      doc.documentChange.newDocumentKey,
      doc.documentChange.reason ?? null,

      doc.status,
      doc.submittedAt,
      doc.reviewedBy,
      doc.reviewedAt,
      doc.reviewRemarks,

      doc.createdAt,
      doc.updatedAt,
    );
  }

  static toPersistence(
    entity: CompanyDocumentChange,
  ): CompanyDocumentChangeCreateData {
    return {
      requestId: entity.requestId,
      companyId: entity.companyId,
      accountId: entity.accountId,

      changeType: "DOCUMENT",

      documentChange: {
        documentType: entity.documentType,
        oldDocumentKey: entity.oldDocumentKey,
        newDocumentKey: entity.newDocumentKey,
        reason: entity.reason,
      },

      status: entity.status,
      submittedAt: entity.submittedAt,
      reviewedBy: entity.reviewedBy,
      reviewedAt: entity.reviewedAt,
      reviewRemarks: entity.reviewRemarks,
    };
  }
}