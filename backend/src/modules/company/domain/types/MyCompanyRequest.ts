import { CompanyRequestStatus } from "../entities/CompanyRequest";
import { CompanyDocument } from "../value-objects/CompanyDocuments";

// export interface MyCompanyRequestStatus {
//   companyRequestId:string;
//   status: CompanyRequestStatus;
//   reviewRemarks: string | null;
// }


export interface MyCompanyRequestStatus {
  companyRequestId:string;
  status: CompanyRequestStatus;
  rejectionReason:string|null
  companyDocuments:CompanyDocument[]
  reviewRemarks: string | null;
}