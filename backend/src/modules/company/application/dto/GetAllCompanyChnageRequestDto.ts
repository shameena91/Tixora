import { CompanyDocumentChange, CompanyDocumentChangeStatus } from "../../domain/entities/CompanyDocumentChange";
import { CompanyProfileChange, CompanyProfileChangeStatus } from "../../domain/entities/CompanyProfileChange";
import { CompanyChangeRequestType } from "../../domain/types/CompanyChangeRequestType";

export interface CompanyChangeRequestListResult {
  requests: (CompanyProfileChange | CompanyDocumentChange)[];
  total: number;
}
export type CompanyChangeRequestStatus =
  | CompanyProfileChangeStatus
  | CompanyDocumentChangeStatus;

export type CompanyUpdateType = "PROFILE" | "DOCUMENT";





export interface GetCompanyChangeRequestsDTO {
  page: number;
  limit: number;
  search?: string;
  status?: CompanyProfileChangeStatus;
  changeType?: CompanyChangeRequestType;
}



export interface CompanyChangeRequestListItemDTO {
  id: string;
  requestId: string;
  companyId: string;
  accountId: string;
  companyName: string;
  adminName: string;
  updateType: "PROFILE" | "DOCUMENT";
  status: CompanyChangeRequestStatus;
  submittedAt: Date;
  createdAt: Date;
}



export interface GetCompanyChangeRequestsResponseDTO {
  requests: CompanyChangeRequestListItemDTO[];
  total: number;
}