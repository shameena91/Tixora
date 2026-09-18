import { CompanyRequestStatus } from "../entities/CompanyRequest";

export interface MyCompanyRequestStatus {
  companyRequestId:string;
  status: CompanyRequestStatus;
  reviewRemarks: string | null;
}