import axiosInstance from "../../auth/api/axiosInstance";


export const getAllCompanyRequests = async () => {
  const res = await axiosInstance.get("/company-requests");

  console.log("alllll", res);

  return res.data;
};
export const getCompanyRequestById = async (companyRequestId: string) => {
  const response = await axiosInstance.get(
    `/company-requests/super-admin/${companyRequestId}`,
  );
  
  return response.data;
};


export const approveCompanyRequest = async (companyRequestId: string) => {
  const response = await axiosInstance.patch(
    `/company-requests/${companyRequestId}/approve`,
  );
  console.log("aprove",response)
  return response.data;
};


export const rejectCompanyRequest=async(companyRequestId:string)=>{
  const response=await axiosInstance.patch(`/company-requests/${companyRequestId}/reject`)
  return response.data;
}
export const moreInfoCompanyRequest = async (
  companyRequestId: string,
  remarks: string
) => {
  const response = await axiosInstance.patch(
    `/company-requests/${companyRequestId}/more-info`,
    {
      remarks,
    }
  );

  return response.data;
};


export const getCompanyDocumentViewUrl = async (
  companyRequestId: string,
  documentType: string,
) => {
  const response = await axiosInstance.get(
    `/company-requests/${companyRequestId}/documents/${documentType}/view`,
  );

  return response.data;
};
export const getCompanyDocumentDownloadUrl =async (
  companyRequestId: string,
  documentType: string,
) => {
  const response=await axiosInstance.get(
    `/company-requests/${companyRequestId}/documents/${documentType}/download`,
  );
  return response.data
};
export const verifyCompanyDocument = async(
  companyRequestId: string,
  documentType: string,
) => {
  const response=await axiosInstance.patch(
    `/company-requests/${companyRequestId}/documents/${documentType}/verify`,
 
 
  );
  return response.data
};

export const rejectCompanyDocument =async (
  companyRequestId: string,
  documentType: string,
) => {
 const response=await axiosInstance.patch(
    `/company-requests/${companyRequestId}/documents/${documentType}/reject`,
  );
  
  return response.data
};