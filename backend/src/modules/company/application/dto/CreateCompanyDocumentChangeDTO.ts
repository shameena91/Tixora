import type {
  CompanyDocumentType,
} from "../../domain/value-objects/CompanyDocuments";

import type {
  CompanyDocumentChangeStatus,
} from "../../domain/entities/CompanyDocumentChange";

export interface CreateCompanyDocumentChangeRequestDTO {
  documentType: CompanyDocumentType;
  reason?: string;
}

export interface DocumentUploadFile {
  buffer: Buffer;
  originalname: string;
  mimetype: string;
  size: number;
}

export interface CreateCompanyDocumentChangeRequestResponseDTO {
  requestId: string;
  companyId: string;
  accountId: string;
  changeType: "DOCUMENT";
  documentType: CompanyDocumentType;
  status: CompanyDocumentChangeStatus;
  submittedAt: Date;
}