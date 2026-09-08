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

export const updateCompanyRequest = async (id: string, data: object) => {
  const res = await fetch(
    `${API_URL}/company-requests/${id}`,

    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    },
  );
  const result = await res.json();
  if (!res.ok) {
    throw new Error(result.message || "Failed to update Location Data");
  }
  return result;
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

export const getCompanyRequest = async (id: string) => {
  const res = await fetch(`${API_URL}/company-requests/${id}`);
  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch company request");
  }
  return result;
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

export const submitCompanyRegistration = async (accountId: string) => {
  const response = await fetch(`${API_URL}/company-requests/submit`, {
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
