import type {
  CompanyDocumentChangeStatus,
} from "../../domain/entities/CompanyDocumentChange";

import type {
  CompanyDocumentType,
} from "../../domain/value-objects/CompanyDocuments";

export interface ReviewCompanyDocumentChangeRequestDTO {
  decision: "APPROVE" | "REJECT";
  remarks?: string;
}

export interface ReviewCompanyDocumentChangeResponseDTO {
  requestId: string;
  companyId: string;
  accountId: string;
  documentType: CompanyDocumentType;
  status: CompanyDocumentChangeStatus;
  reason: string | null;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  reviewRemarks: string | null;
  submittedAt: Date;
}