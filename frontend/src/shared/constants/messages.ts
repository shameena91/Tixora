export const COMPANY_REQUEST_MESSAGES = {
  CREATE_FAILED: "Failed to create company request",
  LOCATION_UPDATE_FAILED: "Failed to update company location",
  UPDATE_FAILED: "Failed to update company request",
  DOCUMENT_UPLOAD_FAILED: "Failed to upload company document",
  LOGO_UPLOAD_FAILED: "Failed to upload company logo",
  FETCH_FAILED: "Failed to fetch company request",
  COMPANY_TYPES_FETCH_FAILED: "Failed to fetch company types",
  EMPLOYEE_RANGE_FETCH_FAILED: "Failed to fetch employee ranges",
  DOCUMENT_SUBMIT_FAILED: "Failed to submit company documents",
  REGISTRATION_SUBMIT_FAILED: "Failed to submit company registration",
  RESUBMIT_FAILED: "Failed to resubmit company request",
} as const;

export const AUTH_MESSAGES = {
  SEND_OTP_FAILED: "Failed to send OTP",
  OTP_VERIFICATION_FAILED: "OTP verification failed",
  CREATE_PASSWORD_FAILED: "Failed to create password",
  SEND_RESET_OTP_FAILED: "Failed to send reset OTP",
  ADMIN_REGISTER_FAILED: "Failed to register admin",
  LOGIN_FAILED: "Login failed",
  LOGOUT_FAILED: "Logout failed",
  REFRESH_TOKEN_FAILED: "Failed to refresh access token",
  RESET_PASSWORD_FAILED: "Failed to reset password",
} as const;