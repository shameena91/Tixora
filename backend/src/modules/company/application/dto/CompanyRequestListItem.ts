// import { CompanyRequestStatus } from "../../domain/entities/CompanyRequest";

import { CompanyRequestStatus, RegistrationType } from "../../domain/entities/CompanyRequest";

export interface CompanyRequestListItem {
  id: string;

  requestId: string;
  requestType: RegistrationType;

  companyName: string;

  adminName: string;

  status: CompanyRequestStatus;

  submittedAt: Date;

  createdAt: Date;
}