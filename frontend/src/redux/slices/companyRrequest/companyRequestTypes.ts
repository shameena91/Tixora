// ------------------------------------
// Company Request
// ------------------------------------

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

export interface CompanyRequestState {
  companyRequests: CompanyRequest[];

  companyRequest:
    | CompanyRequestDetails
    | null;

  loading: boolean;
  error: string | null;
}