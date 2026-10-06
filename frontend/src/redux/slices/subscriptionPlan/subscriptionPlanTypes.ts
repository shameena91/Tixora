// ------------------------------------
// Update Plan Status Payload
// ------------------------------------

export interface UpdatePlanStatusPayload {
  status: "ACTIVE" | "INACTIVE";
}

// ------------------------------------
// Update Subscription Plan Payload
// ------------------------------------

export interface UpdateSubscriptionPlanPayload {
  id: string;

  data: {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;

    memberLimit: number | null;
    companyAdminLimit: number | null;
    departmentLimit: number | null;
    ticketLimit: number | null;

    automaticTicketAssignment: boolean;
    slaManagement: boolean;
  };
}

// ------------------------------------
// Subscription Plan Details
// ------------------------------------

export interface SubscriptionPlanDetails {
  id: string;
  name: string;
  description: string;

  monthlyPrice: number;
  yearlyPrice: number;

  status: "ACTIVE" | "INACTIVE";

  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  automaticTicketAssignment: boolean;
  slaManagement: boolean;

  createdAt: string;
  updatedAt: string;
}

// ------------------------------------
// Create Subscription Plan Payload
// ------------------------------------

export interface CreateSubscriptionPlanPayload {
  name: string;
  description: string;

  monthlyPrice: number;
  yearlyPrice: number;

  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  automaticTicketAssignment: boolean;
  slaManagement: boolean;
}

// ------------------------------------
// Subscription Plan List Item
// ------------------------------------

export interface SubScriptionListItems {
  id: string;
  name: string;
  description: string;

  monthlyPrice: number;
  yearlyPrice: number;

  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  planStatus: "ACTIVE" | "INACTIVE";

  automaticTicketAssignment: boolean;
  slaManagement: boolean;
}

// ------------------------------------
// Subscription Plans Pagination Response
// ------------------------------------

export interface SubscriptionPlansPaginatedResponse {
  data: SubScriptionListItems[];

  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ------------------------------------
// Subscription Plan State
// ------------------------------------

export interface SubscriptionPlanState {
  planNames: string[];

  subscriptionPlans: SubScriptionListItems[];

  activeSubscriptionPlans: SubScriptionListItems[];

  subscriptionPlanTotal: number;
  subscriptionPlanPage: number;
  subscriptionPlanLimit: number;
  subscriptionPlanTotalPages: number;

  viewSubscriptionPlan:
    | SubscriptionPlanDetails
    | null;

  planNamesLoading: boolean;
  getAllLoading: boolean;
  createLoading: boolean;
  viewLoading: boolean;
  statusLoading: boolean;
  deleteLoading: boolean;

  activeSubscriptionPlansLoading: boolean;

  error: string | null;
  activeSubscriptionPlansError: string | null;
  success: boolean;
}