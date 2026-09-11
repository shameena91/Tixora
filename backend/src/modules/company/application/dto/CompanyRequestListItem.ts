// import { CompanyRequestStatus } from "../../domain/entities/CompanyRequest";

import { CompanyRequestStatus } from "../../domain/entities/CompanyRequest";

export interface CompanyRequestListItem {
  id: string;
  companyName: string;
  adminName: string;
  status: CompanyRequestStatus;
  createdAt: Date;
}