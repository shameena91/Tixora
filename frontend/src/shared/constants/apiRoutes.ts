export const COMPANY_REQUEST_ROUTES = {
  BASE: "/company-requests",

  REGISTRATION: "/company-requests/registration",

  MY_REQUEST: "/company-requests/my-request",

  COMPANY_TYPES: "/company-requests/company-types",

  EMPLOYEE_RANGE: "/company-requests/employee-range",

  LOGO: "/company-requests/logo",

  BY_ID: (id: string) => `/company-requests/${id}`,

  LOCATION: (id: string) => `/company-requests/${id}/location`,

  DOCUMENTS: (id: string) => `/company-requests/${id}/documents`,

  SUBMIT_DOCUMENTS: (id: string) => `/company-requests/${id}/documents/submit`,

  SUBMIT: (id: string) => `/company-requests/${id}/submit`,

  RESUBMIT: (id: string) => `/company-requests/${id}/resubmit`,

  REGISTRATION_BY_ID: (id: string) => `/company-requests/registration/${id}`,

  // Super Admin
  SUPER_ADMIN_BY_ID: (id: string) => `/company-requests/super-admin/${id}`,

  APPROVE: (id: string) => `/company-requests/${id}/approve`,

  REJECT: (id: string) => `/company-requests/${id}/reject`,

  MORE_INFO: (id: string) => `/company-requests/${id}/more-info`,

  DOCUMENT_VIEW: (id: string, documentType: string) =>
    `/company-requests/${id}/documents/${documentType}/view`,

  DOCUMENT_DOWNLOAD: (id: string, documentType: string) =>
    `/company-requests/${id}/documents/${documentType}/download`,

  DOCUMENT_VERIFY: (id: string, documentType: string) =>
    `/company-requests/${id}/documents/${documentType}/verify`,

  DOCUMENT_REJECT: (id: string, documentType: string) =>
    `/company-requests/${id}/documents/${documentType}/reject`,
} as const;

export const AUTH_ROUTES = {
  SEND_OTP: "/auth/send-otp",
  VERIFY_OTP: "/auth/verify-otp",
  CREATE_PASSWORD: "/auth/create-password",
  FORGOT_PASSWORD: "/auth/forgot-password",
  ADMIN_REGISTER: "/auth/admin-register",
  LOGIN: "/auth/login",
  LOGOUT: "/auth/logout",
  REFRESH: "/auth/refresh",
  RESET_PASSWORD: "/auth/reset-password",
} as const;

export const SUBSCRIPTION_PLAN_ROUTES = {
  BASE: "/subscription-plans",

  PLAN_NAMES: "/subscription-plans/get-plan-names",

  BY_ID: (id: string) => `/subscription-plans/${id}`,

  STATUS: (id: string) => `/subscription-plans/${id}/status`,

  SELECT_PLAN: "/subscriptions/select-plan",

  SUBSCRIPTION_STATUS: "/subscriptions/my-subscription-status",
  VERIFY_PAYMENT: "/subscriptions/verify-payment",
  GET_ACTIVE_PLANS: "/subscription-plans/active",
} as const;

export const COMPANY_ROUTE = {
  GET_COMPANY_SUBSCRIPTION: (id: string) => `/companies/${id}/subscription`,

  GET_COMPANY_ADMINS: (companyId: string) => `/companies/${companyId}/admin`,
  GET_BILLING_HISTORY: (companyId: string) =>
    `/companies/${companyId}/billingHistory`,
  UPDATE_COMPANY_STATUS: (companyId: string) =>
    `/companies/${companyId}/status`,
  MY_COMPANY: "/companies/my-company",
  MY_COMPANY_DOCUMENTS: "/companies/my-company/documents",
} as const;

export const DEPARTMENT_ROUTES = {
  BASE: "/departments",
  BY_ID: (id: string) => `/departments/${id}`,
  UPDATE_STATUS: (id: string) => `/departments/${id}/status`,
} as const;
