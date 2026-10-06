// ------------------------------------
// Company Location
// ------------------------------------

export interface CompanyLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

// ------------------------------------
// Company Details
// ------------------------------------

export interface CompanyDetails {
  id: string;

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

  location: CompanyLocation;

  status: "ACTIVE" | "INACTIVE";

  subscriptionName: string | null;

  admin: {
    name: string | null;
    email: string | null;
  };

  subscription: {
    subscriptionName: string | null;

    billingCycle:
      | "MONTHLY"
      | "YEARLY";

    status:
      | "PENDING"
      | "ACTIVE"
      | "CANCELLED"
      | "EXPIRED";
  };
}

// ------------------------------------
// Company List Item
// ------------------------------------

export interface CompanyList {
  id: string;

  logo: string | null;

  companyName: string;
  companyEmail: string;

  status:
    | "ACTIVE"
    | "INACTIVE";

  createdAt: string;
}

// ------------------------------------
// Company List Pagination Response
// ------------------------------------

export interface CompanyListPaginatedResponse {
  data: CompanyList[];

  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ------------------------------------
// Company Admin
// ------------------------------------

export interface CompanyAdminList {
  id: string;

  firstName: string;
  lastName: string;

  status:
    | "ACTIVE"
    | "INACTIVE";

  phone: string;
  designation: string;
  email: string;
}

// ------------------------------------
// Billing History
// ------------------------------------

export interface BillingHistoryType {
  id: string;

  razorpayPaymentId: string | null;

  paymentDate: string | null;

  amount: number;

  status:
    | "PENDING"
    | "SUCCESS"
    | "FAILED";

  paymentId: string;
}

// ------------------------------------
// Update Company Status Response
// ------------------------------------

export interface UpdateCompanyStatusResponse {
  id: string;

  companyName: string;

  status:
    | "ACTIVE"
    | "INACTIVE";
}

// ------------------------------------
// Company State
// ------------------------------------

export interface CompanyState {
  // Company list
  companyList: CompanyList[];

  companyListTotal: number;
  companyListPage: number;
  companyListLimit: number;
  companyListTotalPages: number;

  // Company details
  companyDetails:
    | CompanyDetails
    | null;

  // Company Admin
  companyAdminList:
    | CompanyAdminList
    | null;

  // Billing History
  billingHistory: BillingHistoryType[];

  // Company list state
  companyListLoading: boolean;
  companyListError: string | null;

  // Company details state
  companyDetailsLoading: boolean;
  companyDetailsError: string | null;

  // Company admin state
  companyAdminLoading: boolean;
  companyAdminError: string | null;

  // Billing history state
  billingHistoryLoading: boolean;
  billingHistoryError: string | null;

  // Company status state
  companyStatusLoading: boolean;
  companyStatusError: string | null;
}