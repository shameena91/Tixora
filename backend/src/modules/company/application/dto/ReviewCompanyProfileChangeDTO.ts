import { CompanyProfileChangeStatus, CompanyProfileField, CompanyProfileFieldChangeStatus } from "../../domain/entities/CompanyProfileChange";


export interface ReviewCompanyProfileChangeRequestDTO {
  field: CompanyProfileField;
  decision:
    | CompanyProfileFieldChangeStatus.APPROVED
    | CompanyProfileFieldChangeStatus.REJECTED;
  remarks?: string;
}

export interface ReviewCompanyProfileChangeResponseDTO {
  requestId: string;
  companyId: string;
  accountId: string;
  status: CompanyProfileChangeStatus;
  changes: {
    field: CompanyProfileField;
    oldValue: string | null;
    newValue: string;
    reason: string;
    status: CompanyProfileFieldChangeStatus;
    reviewRemarks: string | null;
  }[];
  reviewedBy: string | null;
  reviewedAt: Date | null;
  reviewRemarks: string | null;
  submittedAt: Date;
}