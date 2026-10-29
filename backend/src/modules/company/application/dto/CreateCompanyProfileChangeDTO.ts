import { CompanyProfileChangeStatus, CompanyProfileField } from "../../domain/entities/CompanyProfileChange";

export interface CreateCompanyProfileChangeRequestDTO {
  profileChanges: {
    field: CompanyProfileField;
    newValue: string;
    reason: string;
  }[];
}

export interface CreateCompanyProfileChangeRequestResponseDTO {
  requestId: string;
  companyId: string;
  accountId: string;
  changeType: "PROFILE";
  status: CompanyProfileChangeStatus;
  submittedAt: Date;
}