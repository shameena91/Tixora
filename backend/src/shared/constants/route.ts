export const AUTH_ROUTES = {
  LOGIN: "/login",
  REGISTER: "/register",
  VERIFY_OTP: "/verify-otp",
  SEND_OTP: "/send-otp",
  CREATE_PASSWORD: "/create-password",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  ADMIN_REGISTER: "/admin-register",
  REFRESH: "/refresh",
  LOGOUT: "/logout",

};

export const COMPANY_REQUEST_ROUTES = {
  CREATE: "/",
  SUBMIT: "/:companyRequestId/submit",

  COMPANY_TYPES: "/company-types",
  EMPLOYEE_RANGE: "/employee-range",
UPDATE_LOGO: "/logo",

  UPDATE_LOCATION: "/:id/location",
  UPDATE_DOCUMENT: "/:companyRequestId/documents",
  SUBMIT_DOCUMENTS: "/:companyRequestId/documents/submit",

  UPDATE: "/:id",
 GET_REGISTRATION_BY_ID: "/registration/:id",
GET_SUPER_ADMIN_BY_ID: "/super-admin/:id",
 VIEW_COMPANY_dOCUMENTS:"/:companyRequestId/documents/:documentType/view",
 DOWNLOAD_COMPANY_dOCUMENTS:"/:companyRequestId/documents/:documentType/download",
  GET_ALL:"/",
GET_MY_REQUEST:"/my-request",
  DOCUMENT_VARIFIED:"/:companyRequestId/documents/:documentType/verify",
DOCUMENT_REJECTED:"/:companyRequestId/documents/:documentType/reject",
  APPROVE: "/:id/approve",
  REJECT: "/:id/reject",
  MORE_INFO: "/:id/more-info",
  RESUBMIT: "/:id/resubmit",
};

export const COMAPANY_ROUTES={
 GET_ALL:"/",
 GET_BY_ID:"/:id",
 GET_SUBSCRIPTION:"/:id/subscription",
 GET_COMPANY_ADMIN:"/:companyId/admin",
 GET_PAYMENT_HISTORY:"/:companyId/billingHistory",
 UPDATE_STATUS: "/:companyId/status",
 GET_MY_COMPANY:"/my-company",
 GET_MY_COMPANY_DOCUMENTS:
  "/my-company/documents",

}
export const SUBSCRIPTION_ROUTE_CONSTANTS={
  CREATE:"/",
  GET_SUBSCRIPTION_PLAN_NAME:"/get-plan-names",
  GET_ALL_PLANS:"/",
  GET_PLAN_BY_ID:"/:id",
  UPDTE_PLAN:"/:id",
  UPDATE_STATUS:"/:id/status",
  DELET_PLAN:"/:id",
  SELECT_SUBSCRIPTION:"/select-plan",
 MY_SUBSCRIPTION_STATUS: "/my-subscription-status",
 VERIFY_PAYMENT:"/verify-payment",
 GET_ACTIVE_PLANS: "/active",


}


export const DEPARTMENT_ROUTE_CONSTATNTS={
  CREATE:"/",
  GET_ALL:"/",
  GET_DEPARTMENT:"/:departmentId",
  UPDATE_STATUS:"/:departmentId/status",
  UPDATE:"/:departmentId"
  
}
