// ------------------------------------
// Company Request
// ------------------------------------

import type { CompanyRequestStatus } from "../../../modules/company/types/companyTypes";

export interface CompanyRequest {
  id: string;

  requestId: string;
  requestType: "REGISTRATION" | "UPDATE";

  companyName: string;
  adminName: string;

  status:
    | "PENDING"
    | "UNDER_REVIEW"
    | "MORE_INFO_REQUIRED"
    | "APPROVED"
    | "REJECTED";

  submittedAt: string;
  createdAt: string;
}

// ------------------------------------
// Company Request Details
// ------------------------------------

export interface CompanyRequestDetails {
  id: string;

  company: {
    companyName: string;
    requestId: string;
    registrationNumber: string;
    companyEmail: string;
    phone: string;
    yearEstablished: number | null;
    companyType: string;
    numberOfEmployees: string;
    website: string | null;
    logo: string | null;
    description: string | null;
  };

  admin: {
    name: string;
    email: string;
    phone: string;
    designation: string;
  };

  status:
    | "PENDING"
    | "UNDER_REVIEW"
    | "APPROVED"
    | "REJECTED"
    | "MORE_INFO_REQUIRED";

  reviewRemarks: string | null;

  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  documents: {
    documentType: string;
    fileName: string;
    fileUrl: string;
    uploadedAt: string;
    verificationStatus:
      | "PENDING"
      | "VERIFIED"
      | "REJECTED";
  }[];

  submittedAt: string;
  createdAt: string;
  updatedAt: string;
}

// ------------------------------------
// Company Request State
// ------------------------------------



export interface FetchCompanyRequestsParams {
  page: number;
  limit: number;
  search?: string;
  status?: CompanyRequestStatus;
}

export interface PaginatedCompanyRequestResponse {
  data: CompanyRequest[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}


export interface CompanyRequestState {
  companyRequests: CompanyRequest[];

  companyRequest: CompanyRequestDetails | null;

  total: number;
  page: number;
  limit: number;
  totalPages: number;

  loading: boolean;
  error: string | null;
  // Update Requests

companyChangeRequests: CompanyChangeRequestListItem[];
companyChangeRequest: CompanyChangeRequestDetails | null;

companyChangeRequestsTotal: number;
companyChangeRequestsPage: number;
companyChangeRequestsLimit: number;
companyChangeRequestsTotalPages: number;

companyChangeRequestsLoading: boolean;
companyChangeRequestsError: string | null;

reviewCompanyChangeLoading: boolean;
reviewCompanyChangeError: string | null;
}


export type CompanyUpdateType = "PROFILE" | "DOCUMENT";

export type CompanyChangeRequestStatus =
  | "PENDING"
  | "APPROVED"
  | "REJECTED"
  | "PARTIALLY_APPROVED";

export type CompanyProfileField =
  | "companyName"
  | "registrationNumber"
  | "companyType"
  | "employeeRange"
  | "address"
  | "city"
  | "state"
  | "country"
  | "postalCode";

export interface CompanyChangeRequestFilters {
  page: number;
  limit: number;
  search?: string;
  status?: CompanyChangeRequestStatus;
  changeType?: CompanyUpdateType;
}

export interface CompanyChangeRequestListItem {
  id: string;
  requestId: string;
  companyId: string;
  accountId: string;
  companyName: string;
  adminName: string;
  updateType: CompanyUpdateType;
  status: CompanyChangeRequestStatus;
  submittedAt: string;
  createdAt: string;
}

export interface PaginatedCompanyChangeRequests {
  requests: CompanyChangeRequestListItem[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ProfileFieldChangeDetails {
  field: CompanyProfileField;
  oldValue: string | null;
  newValue: string;
  reason: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  reviewRemarks: string | null;
}

export interface CompanyChangeRequestDetailsBase {
  id: string | null;
  requestId: string;
  companyId: string;
  accountId: string;

  companyName: string;
  adminName: string;

  status: CompanyChangeRequestStatus;
  submittedAt: string;
  createdAt: string;
  updatedAt: string;
  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewRemarks: string | null;
}

export interface ProfileChangeRequestDetails
  extends CompanyChangeRequestDetailsBase {
  updateType: "PROFILE";
  changes: ProfileFieldChangeDetails[];
}

export interface DocumentChangeRequestDetails
  extends CompanyChangeRequestDetailsBase {
  updateType: "DOCUMENT";
  documentType: string;
  oldDocumentUrl: string | null;
  newDocumentUrl: string;
oldDocumentName:string
newDocumentName:string

  reason: string | null;
}

export type CompanyChangeRequestDetails =
  | ProfileChangeRequestDetails
  | DocumentChangeRequestDetails;

export interface ReviewProfileChangePayload {
  requestId: string;
  field: CompanyProfileField;
  decision: "APPROVED" | "REJECTED";
  remarks?: string;
}

export interface ReviewDocumentChangePayload {
  requestId: string;
  decision: "APPROVE" | "REJECT";
  remarks?: string;
}


export interface CompanyChangeRequestReviewResult {
  requestId: string;
  companyId: string;
  accountId: string;
  status: CompanyChangeRequestStatus;
  changes?: ProfileFieldChangeDetails[];
  documentType?: string;
  reason?: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  reviewRemarks: string | null;
  submittedAt: string;
}