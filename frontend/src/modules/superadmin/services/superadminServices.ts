
import axiosInstance from "../../auth/api/axiosInstance";
import { COMPANY_REQUEST_ROUTES } from "../../../shared/constants/apiRoutes";

export const getAllCompanyRequests = async () => {
  const response = await axiosInstance.get(
    COMPANY_REQUEST_ROUTES.BASE
  );

  return response.data;
};

export const getCompanyRequestById = async (
  companyRequestId: string
) => {
  const response = await axiosInstance.get(
    COMPANY_REQUEST_ROUTES.SUPER_ADMIN_BY_ID(companyRequestId)
  );

  return response.data;
};

export const approveCompanyRequest = async (
  companyRequestId: string
) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.APPROVE(companyRequestId)
  );

  return response.data;
};

export const rejectCompanyRequest = async (
  companyRequestId: string
) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.REJECT(companyRequestId)
  );

  return response.data;
};

export const moreInfoCompanyRequest = async (
  companyRequestId: string,
  remarks: string
) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.MORE_INFO(companyRequestId),
    {
      remarks,
    }
  );

  return response.data;
};

export const getCompanyDocumentViewUrl = async (
  companyRequestId: string,
  documentType: string
) => {
  const response = await axiosInstance.get(
    COMPANY_REQUEST_ROUTES.DOCUMENT_VIEW(
      companyRequestId,
      documentType
    )
  );

  return response.data;
};

export const getCompanyDocumentDownloadUrl = async (
  companyRequestId: string,
  documentType: string
) => {
  const response = await axiosInstance.get(
    COMPANY_REQUEST_ROUTES.DOCUMENT_DOWNLOAD(
      companyRequestId,
      documentType
    )
  );

  return response.data;
};

export const verifyCompanyDocument = async (
  companyRequestId: string,
  documentType: string
) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.DOCUMENT_VERIFY(
      companyRequestId,
      documentType
    )
  );

  return response.data;
};

export const rejectCompanyDocument = async (
  companyRequestId: string,
  documentType: string
) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.DOCUMENT_REJECT(
      companyRequestId,
      documentType
    )
  );

  return response.data;
};



export const getCompanyRequestTimeline = async (
  companyRequestId: string
) => {
  const response = await axiosInstance.get(
    `/company-requests/${companyRequestId}/timeline`
  );

  return response.data;
};