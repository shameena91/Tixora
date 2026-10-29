import type {
  CompanyProfileChangeStatus,
  CompanyProfileField,
  CompanyProfileFieldChangeStatus,
} from "../../domain/entities/CompanyProfileChange";

import type {
  CompanyDocumentChangeStatus,
} from "../../domain/entities/CompanyDocumentChange";

import type {
  CompanyDocumentType,
} from "../../domain/value-objects/CompanyDocuments";



interface CompanyChangeRequestDetailsBaseDTO {
  id: string | null;
  requestId: string;
  companyId: string;
  accountId: string;

  companyName: string;
  adminName: string;

  submittedAt: Date;
  reviewedBy: string | null;
  reviewedAt: Date | null;
  reviewRemarks: string | null;

  createdAt: Date;
  updatedAt: Date;
}


export interface ProfileFieldChangeResponseDTO {
  field: CompanyProfileField;
  oldValue: string | null;
  newValue: string;
  reason: string;
  status: CompanyProfileFieldChangeStatus;
  reviewRemarks: string | null;
}



export interface ProfileChangeRequestDetailsDTO
  extends CompanyChangeRequestDetailsBaseDTO {
  updateType: "PROFILE";
  status: CompanyProfileChangeStatus;
  changes: ProfileFieldChangeResponseDTO[];
}



export interface DocumentChangeRequestDetailsDTO
  extends CompanyChangeRequestDetailsBaseDTO {
  updateType: "DOCUMENT";
  status: CompanyDocumentChangeStatus;

  documentType: CompanyDocumentType;

  oldDocumentKey: string | null;
  newDocumentKey: string;

  oldDocumentName: string | null;
  newDocumentName: string;

  oldDocumentUrl: string | null;
  newDocumentUrl: string;

  reason: string | null;
}



export type GetCompanyChangeRequestByIdResponseDTO =
  | ProfileChangeRequestDetailsDTO
  | DocumentChangeRequestDetailsDTO;