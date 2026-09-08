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

import { createContext} from "react";
import type { AuthContextType } from "../types/auth.types";

export const AuthContext=createContext<AuthContextType| null>(null)




export interface ProtectedRouteProps{
  children:React.ReactNode
}

export interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}