export interface SendOtpRequest {
  email: string;
}

export interface VerifyOtpRequest{
    email:string,
    otp:string
}
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

export interface AuthContextType{
  accessToken:string|null,
  setAccessToken: (token: string | null) => void
}