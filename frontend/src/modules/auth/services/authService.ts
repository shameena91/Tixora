import type {
  AdminRegistrationResponse,
  CreatePasswordRequest, CreatePasswordResponse,
  SendOtpRequest, VerifyOtpRequest, VerifyOtpResponse,
} from "../types/auth.types";
import type { AdminRegistrationData } from "../validators/adminRegistrationSchema";
const API_URL= import.meta.env.VITE_API_BASE_URL; 

export const sendVerificationOtp = async (
  data: SendOtpRequest
) => {
  const response=await fetch(`${API_URL}/auth/send-otp`,

  {
    method:"POST",
      headers: {
      "Content-Type": "application/json",
    },
body:JSON.stringify(data)

  })
  const result = await response.json();
  if(!response.ok)
  {
    throw new Error(result.message || "Failed to send OTP");
  }
     return result;
};





export const verifyOtp = async (
  data: VerifyOtpRequest
): Promise<VerifyOtpResponse> => {
  const response = await fetch(
    `${API_URL}/auth/verify-otp`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "OTP verification failed"
    );
  }

  return result;
};
export const createPassword=async(
  data:CreatePasswordRequest):Promise<CreatePasswordResponse>=>{
   const response=await fetch(`${API_URL}/auth/create-password`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json",
    },body:JSON.stringify(data)
   })
   const result=await response.json()

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to create password"
    );
  }
    return result;
}


export const sendForgotPasswordOtp = async (
  data: SendOtpRequest
) => {
  const response = await fetch(
    `${API_URL}/auth/forgot-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to send reset OTP"
    );
  }

  return result;
};



export const registerAdmin = async (
  data: AdminRegistrationData & { email: string }
): Promise<AdminRegistrationResponse> => {

  console.log("ADMIN REGISTER REQUEST:", data);
  console.log(
    "ADMIN REGISTER URL:",
    `${API_URL}/auth/admin-register`
  );

  const response = await fetch(
    `${API_URL}/auth/admin-register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  console.log("ADMIN REGISTER STATUS:", response.status);

  const result = await response.json();

  console.log(
    "ADMIN REGISTER BACKEND RESPONSE:",
    result
  );

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to register admin"
    );
  }

  return result;
};

export const login=async(email:string,password:string)=>{
  const response=await fetch(`${API_URL}/auth/login`,{
    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    credentials:"include",
    body:JSON.stringify({
      email,password
    })
  })

  const data=await response.json()

  if(!response.ok)
  {
 throw new Error(data.message || "Login failed");
  }
  return data;
}

export const logout=async()=>
{
  const response=await fetch(`${API_URL}/auth/logout`,{

   method:"POST",
    credentials:"include",
   
  })

  const data=await response.json()

  if (!response.ok) {
    throw new Error(data.message || "Logout failed");
  }

  return data;
}
export const refreshAccessToken = async () => {
  const response = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to refresh access token");
  }

  return data;
};

export const resetPassword = async (
  data: CreatePasswordRequest
): Promise<CreatePasswordResponse> => {
  const response = await fetch(
    `${API_URL}/auth/reset-password`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || "Failed to reset password"
    );
  }

  return result;
};