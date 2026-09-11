
const API_URL = import.meta.env.VITE_API_BASE_URL;
export const getAllCompanyRequests = async () => {
  const res = await fetch(`${API_URL}/company-requests`);

  const result = await res.json();

  if (!res.ok) {
    throw new Error(result.message || "Failed to fetch company requests");
  }

  return result;
};
export const getCompanyRequestById = async (
  companyRequestId: string
) => {
  const res = await fetch(
    `${API_URL}/company-requests/${companyRequestId}`
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.message || "Failed to fetch company request"
    );
  }

  return result;
};