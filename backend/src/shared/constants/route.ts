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

  UPDATE_LOCATION: "/:id/location",
  UPDATE_DOCUMENT: "/:companyRequestId/documents",
  SUBMIT_DOCUMENTS: "/:companyRequestId/documents/submit",

  UPDATE: "/:id",
  GET_BY_ID: "/:id",

  GET_ALL:"/",


  APPROVE: "/:id/approve",
  REJECT: "/:id/reject",
  MORE_INFO: "/:id/more-info",
  RESUBMIT: "/:id/resubmit",
};
