import type {
  AdminRegistrationResponse,
  CreatePasswordRequest,
  CreatePasswordResponse,
  SendOtpRequest,
  VerifyOtpRequest,
  VerifyOtpResponse,
} from "../types/auth.types";

import type { AdminRegistrationData } from "../validators/adminRegistrationSchema";

import { AUTH_ROUTES } from "../../../shared/constants/apiRoutes";

import { AUTH_MESSAGES } from "../../../shared/constants/messages";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Send Verification OTP

export const sendVerificationOtp = async (data: SendOtpRequest) => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.SEND_OTP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || AUTH_MESSAGES.SEND_OTP_FAILED);
  }

  return result;
};

// Verify OTP

export const verifyOtp = async (
  data: VerifyOtpRequest,
): Promise<VerifyOtpResponse> => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.VERIFY_OTP}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || AUTH_MESSAGES.OTP_VERIFICATION_FAILED);
  }

  return result;
};

// Create Password

export const createPassword = async (
  data: CreatePasswordRequest,
): Promise<CreatePasswordResponse> => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.CREATE_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || AUTH_MESSAGES.CREATE_PASSWORD_FAILED);
  }

  return result;
};

// Send Forgot Password OTP

export const sendForgotPasswordOtp = async (data: SendOtpRequest) => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.FORGOT_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || AUTH_MESSAGES.SEND_RESET_OTP_FAILED);
  }

  return result;
};

// Register Admin

export const registerAdmin = async (
  data: AdminRegistrationData & { email: string },
): Promise<AdminRegistrationResponse> => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.ADMIN_REGISTER}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || AUTH_MESSAGES.ADMIN_REGISTER_FAILED);
  }

  return result;
};

// Login

export const login = async (email: string, password: string) => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.LOGIN}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || AUTH_MESSAGES.LOGIN_FAILED);
  }

  return data;
};

// Logout

export const logout = async () => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.LOGOUT}`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || AUTH_MESSAGES.LOGOUT_FAILED);
  }

  return data;
};

// Refresh Access Token

export const refreshAccessToken = async () => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.REFRESH}`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || AUTH_MESSAGES.REFRESH_TOKEN_FAILED);
  }

  return data;
};

// Reset Password

export const resetPassword = async (
  data: CreatePasswordRequest,
): Promise<CreatePasswordResponse> => {
  const response = await fetch(`${API_URL}${AUTH_ROUTES.RESET_PASSWORD}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || AUTH_MESSAGES.RESET_PASSWORD_FAILED);
  }

  return result;
};
