import type { ReactNode } from "react";

export interface CompanyInfo {
  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  yearEstablished: string;
  companyType: string;
  numberOfEmployees: string;
  website: string;
  logo: string;
  description: string;
}

export interface DocumentData {
  documentType: string;
  fileName: string;
  fileUrl: string;
}

export interface CompanyLocationData {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}
export interface CompanyDocument {
  documentType: string;
  fileName: string;
  fileUrl: string;
}
export interface CompanyRequest {
  id: string;
  accountId: string;
  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  yearEstablished: number | null;
  companyType: string;
  numberOfEmployees: string;
  status: string;
  website: string | null;
  logo: string | null;
  description: string | null;
  location: CompanyLocationData;
  documents: CompanyDocument[];
  createdAt: string;
  updatedAt: string;
}
export interface GetCompanyRequestResponse {
  success: boolean;
  message: string;
  data: CompanyRequest;
}
export interface UpdateCompanyRequestData {
  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  yearEstablished: number | null;
  companyType: string;
  numberOfEmployees: string;
  website: string | null;
  logo: string | null;
  description: string | null;
}
export type DocumentErrors  = {
  registrationCertificate?: string;
  taxDocument?: string;
  businessLicense?: string;
};

export interface LocationData {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}


export interface CompanyRequestContextType {
  companyRequest: CompanyRequest | null;
  companyRequestId: string | null;
  loading: boolean;

  setCompanyRequest: (
    companyRequest: CompanyRequest
  ) => void;

  clearCompanyRequest: () => void;
}

export interface CompanyRequestProviderProps {
  children: ReactNode;
}

export type CompanyRequestStatus="PENDING"|
"MORE_INFO_REQUIRED"|
"APPROVED"|
"REJECTED"
export interface CompanyRequestStatusProps {
  companyRequestId:string;
  status: CompanyRequestStatus;
  reviewRemarks: string | null;
}

