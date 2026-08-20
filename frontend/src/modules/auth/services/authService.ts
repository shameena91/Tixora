import type { CreatePasswordRequest, CreatePasswordResponse,
   SendOtpRequest, VerifyOtpRequest, VerifyOtpResponse ,AdminRegistrationResponse,} from "../types/auth.types";
   import type { AdminRegistrationData } from "../schemas/adminRegistrationSchema";
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
    `${API_URL}/auth/varify-otp`,
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
    throw new Error(result.message || "OTP verification failed");
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