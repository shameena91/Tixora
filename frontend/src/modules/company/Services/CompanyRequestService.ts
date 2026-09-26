import axiosInstance from "../../auth/api/axiosInstance";
import { COMPANY_REQUEST_MESSAGES } from "../../../shared/constants/messages";
import { COMPANY_REQUEST_ROUTES } from "../../../shared/constants/apiRoutes";
import type { UpdateCompanyRequestData } from "../types/companyTypes";

const API_URL = import.meta.env.VITE_API_BASE_URL;

// Company Registration

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
  const response = await fetch(`${API_URL}${COMPANY_REQUEST_ROUTES.BASE}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || COMPANY_REQUEST_MESSAGES.CREATE_FAILED);
  }

  return result;
};

// Company Location

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
  const response = await fetch(
    `${API_URL}${COMPANY_REQUEST_ROUTES.LOCATION(id)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || COMPANY_REQUEST_MESSAGES.LOCATION_UPDATE_FAILED,
    );
  }

  return result;
};

// Update Company Request

export const updateCompanyRequest = async (
  id: string,
  data: UpdateCompanyRequestData,
) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.BY_ID(id),
    data,
  );

  return response.data;
};

// Company Documents

export const uploadCompanyDocument = async (
  id: string,
  file: File,
  documentType: string,
) => {
  const formData = new FormData();

  formData.append("document", file);
  formData.append("documentType", documentType);

  const response = await fetch(
    `${API_URL}${COMPANY_REQUEST_ROUTES.DOCUMENTS(id)}`,
    {
      method: "PATCH",
      body: formData,
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || COMPANY_REQUEST_MESSAGES.DOCUMENT_UPLOAD_FAILED,
    );
  }

  return result;
};

// Company Logo

export const uploadCompanyLogo = async (file: File) => {
  const formData = new FormData();

  formData.append("logo", file);

  const response = await fetch(`${API_URL}${COMPANY_REQUEST_ROUTES.LOGO}`, {
    method: "PATCH",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || COMPANY_REQUEST_MESSAGES.LOGO_UPLOAD_FAILED,
    );
  }

  return result;
};

// Get Company Request

export const getCompanyRequest = async (id: string) => {
  const response = await fetch(
    `${API_URL}${COMPANY_REQUEST_ROUTES.REGISTRATION_BY_ID(id)}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || COMPANY_REQUEST_MESSAGES.FETCH_FAILED);
  }

  return result;
};

// Get Company Request For Edit

export const getMyCompanyRequestForEdit = async (id: string) => {
  const response = await axiosInstance.get(
    COMPANY_REQUEST_ROUTES.REGISTRATION_BY_ID(id),
  );

  return response.data;
};

// Get Company Types

export const getCompanyTypes = async () => {
  const response = await fetch(
    `${API_URL}${COMPANY_REQUEST_ROUTES.COMPANY_TYPES}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || COMPANY_REQUEST_MESSAGES.COMPANY_TYPES_FETCH_FAILED,
    );
  }

  return result;
};

// Get Employee Range

export const getEmployRange = async () => {
  const response = await fetch(
    `${API_URL}${COMPANY_REQUEST_ROUTES.EMPLOYEE_RANGE}`,
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || COMPANY_REQUEST_MESSAGES.EMPLOYEE_RANGE_FETCH_FAILED,
    );
  }

  return result;
};

// Submit Company Documents

export const submitCompanyDocuments = async (companyRequestId: string) => {
  const response = await fetch(
    `${API_URL}${COMPANY_REQUEST_ROUTES.SUBMIT_DOCUMENTS(companyRequestId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || COMPANY_REQUEST_MESSAGES.DOCUMENT_SUBMIT_FAILED,
    );
  }

  return result;
};

// Submit Company Registration

export const submitCompanyRegistration = async (
  accountId: string,
  companyRequestId: string,
) => {
  const response = await fetch(
    `${API_URL}${COMPANY_REQUEST_ROUTES.SUBMIT(companyRequestId)}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        accountId,
      }),
    },
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(
      result.message || COMPANY_REQUEST_MESSAGES.REGISTRATION_SUBMIT_FAILED,
    );
  }

  return result;
};

// Get My Company Request

export const getMyCompanyRequest = async () => {
  const response = await axiosInstance.get(COMPANY_REQUEST_ROUTES.MY_REQUEST);
console.log("hhhhhhhh",response.data)
  return response.data;
};

// Resubmit Company Request

export const resubmitCompanyRequest = async (companyRequestId: string) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.RESUBMIT(companyRequestId),
  );

  return response.data;
};
