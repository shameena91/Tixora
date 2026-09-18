import axiosInstance from "../../auth/api/axiosInstance";
import type { UpdateCompanyRequestData } from "../types/companyTypes";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Company Registration
// 1.register comPany info

export const createCompanyRequest = async (data: {
  accountId: string;
  companyName: string;
  registrationNumber: string;
  companyEmail: string;
  phone: string;
  yearEstablished: number | null;
  companyType: string;
  numberOfEmployees: string;
  website: string | null;
  logo: string | null;
  description: string | null;
}) => {
  const response = await fetch(`${API_URL}/company-requests`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to create company request");
  }

  return result;
};
// 2.Update Location
export const updateCompanyLocation = async (
  id: string,
  data: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  },
) => {
  const res = await fetch(`${API_URL}/company-requests/${id}/location`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to update location");
  }

  return result;
};

// export const updateCompanyRequest = async (id: string, data: object) => {
//   const res = await fetch(
//     `${API_URL}/company-requests/${id}`,

//     {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     },
//   );
//   const result = await res.json();
//   if (!res.ok) {
//     throw new Error(result.message || "Failed to update Location Data");
//   }
//   return result;
// };



export const updateCompanyRequest = async (
  id: string,
  data: UpdateCompanyRequestData 
) => {
  const response = await axiosInstance.patch(
    `/company-requests/${id}`,
    data
  );

  return response.data;
};



export const uploadCompanyDocument = async (
  id: string,
  file: File,
  documentType: string,
) => {
  const formData = new FormData();

  formData.append("document", file);
  formData.append("documentType", documentType);

  const res = await fetch(`${API_URL}/company-requests/${id}/documents`, {
    method: "PATCH",
    body: formData,
  });

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to upload document");
  }

  return result;
};


export const uploadCompanyLogo = async (
  file: File,
) => {
  const formData = new FormData();
 console.log("🔥 uploadCompanyLogo CALLED");
  console.log("📁 File received:", file);
  formData.append("logo", file);
console.log("🔥 LOGO REQUEST URL:");
console.log(`${API_URL}/company-requests/logo`);
  const res = await fetch(
    `${API_URL}/company-requests/logo`,
    {
      method: "PATCH",
      body: formData,
    },
  );
console.log("🔥 AFTER FETCH");
console.log("STATUS:", res.status);
  const result = await res.json();
console.log("🔥 LOGO BACKEND RESPONSE:", result);
  if (!res.ok) {
    throw new Error(
      result.message || "Failed to upload company logo",
    );
  }

  return result;
};
export const getCompanyRequest = async (id: string) => {
  const res = await fetch(`${API_URL}/company-requests/registration/${id}`);
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch company request");
  }
  return result;
};
export const getMyCompanyRequestForEdit = async (id: string) => {
  const response = await axiosInstance.get(
    `/company-requests/registration/${id}`
  );

  return response.data;
};

export const getCompanyTypes = async () => {
  const response = await fetch(`${API_URL}/company-requests/company-types`);

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch company types");
  }

  return result;
};

export const getEmployRange = async () => {
  const response = await fetch(`${API_URL}/company-requests/employee-range`);

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.message || "Failed to fetch emplyee ranges");
  }
  return result;
};

export const submitCompanyDocuments = async (companyRequestId: string) => {
  const res = await fetch(
    `${API_URL}/company-requests/${companyRequestId}/documents/submit`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to submit company documents");
  }

  return result;
};

export const submitCompanyRegistration = async (accountId: string, companyRequestId: string) => {
  const response = await fetch(`${API_URL}/company-requests/${companyRequestId}/submit`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accountId,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "Failed to submit company registration");
  }

  return result;
};


export const getMyCompanyRequest = async () => {
  const response = await axiosInstance.get(
    "/company-requests/my-request"
  );

  return response.data;
};

export const resubmitCompanyRequest  = async (  companyRequestId: string) => {
  const response = await axiosInstance.patch(
     `/company-requests/${companyRequestId}/resubmit`
  );

  return response.data;
};