import type { AxiosRequestConfig } from "axios";

export type SendOtpRequest = {
  email: string;
  purpose?: string;
};

export type VerifyOtpRequest = {
  email: string;
  otp: string;
  purpose?: string;
};

export type UserRole = "SUPER_ADMIN" | "COMPANY_ADMIN";
export interface VerifyOtpResponse {
  success: boolean;
  message: string;
}


export interface CreatePasswordRequest{
    email: string;
  password:string,
 confirmPassword: string;
}
export interface CreatePasswordResponse {
  success: boolean;
  message: string;
}
export interface AdminRegistrationResponse {
  success: boolean;
  message: string;
   data: {
    accountId: string;
  };
}

export interface AuthContextType {
  accessToken: string | null;
  userName: string | null;
  isInitializing: boolean;
  role: UserRole | null;
  setRole: (role: UserRole | null) => void;
  setAccessToken: (token: string | null) => void;
  setUserName: (name: string | null) => void;
}


export interface ProtectedRouteProps{
  children:React.ReactNode
}

export interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

