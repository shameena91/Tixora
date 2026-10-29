
import axiosInstance from "../../auth/api/axiosInstance";
import { COMPANY_CHANGE_REQUEST_ROUTES, COMPANY_REQUEST_ROUTES, COMPANY_ROUTE } from "../../../shared/constants/apiRoutes";
import type { CompanyRequestStatus } from "../../company/types/companyTypes";
import type { CompanyChangeRequestFilters, ReviewDocumentChangePayload, ReviewProfileChangePayload } from "../../../redux/slices/companyRrequest/companyRequestTypes";

interface GetAllCompanyRequestsParams {
  page: number;
  limit: number;
  search?: string;
  status?: CompanyRequestStatus;
}

export const getAllCompanyRequests = async (
  params: GetAllCompanyRequestsParams,
) => {
  const response = await axiosInstance.get(
    COMPANY_REQUEST_ROUTES.BASE,
    {
      params,
    },
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
  companyRequestId: string,
  rejectionReason: string,
) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.REJECT(companyRequestId),
    { rejectionReason },
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
  documentType: string,
  rejectionReason: string,
) => {
  const response = await axiosInstance.patch(
    COMPANY_REQUEST_ROUTES.DOCUMENT_REJECT(
      companyRequestId,
      documentType,
    ),
    {
      rejectionReason,
    },
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

export const getAllCompaniesList = async (
  search?: string,
  page = 1,
  limit = 10,
) => {
  const response = await axiosInstance.get(
    "/companies",
    {
      params: {
        search,
        page,
        limit,
      },
    },
  );

  return response.data;
};
export const getCompany = async (
  companyId:string
) => {
console.log("service",companyId)
  const response = await axiosInstance.get(
`/companies/${companyId}`,
    
  );

  return response.data;
};

export const getCompanySubscription = async (
  id: string,
  page: number,
  limit: number,
) => {
  const url = COMPANY_ROUTE.GET_COMPANY_SUBSCRIPTION(id);

  try {
    const response = await axiosInstance.get(url, {
      params: { page, limit },
    });

    return response.data;
  } catch (error) {
    console.log("SERVICE ERROR:", error);
    throw error;
  }
};
export const getCompanyAdmins=async (companyId:string)=>{

  const url = COMPANY_ROUTE.GET_COMPANY_ADMINS(companyId);
  console.log(url)
    const response = await axiosInstance.get(url);

  return response.data
}
export const getBillingHistory=async(companyId:string)=>{
  const url=COMPANY_ROUTE.GET_BILLING_HISTORY(companyId)

  const response=await axiosInstance.get(url)

  console.log("getBillingHistory",response.data)
  return response.data
}
export const updateCompanyStatus=async (companyId:string,
   status: "ACTIVE" | "INACTIVE",)=>{

  const url = COMPANY_ROUTE.UPDATE_COMPANY_STATUS(companyId);
  console.log(url)
    const response = await axiosInstance.patch(url,{
      status
    });

  return response.data
}



export const getCompanyChangeRequests = (
  params: CompanyChangeRequestFilters,
) => {
  return axiosInstance.get(
    COMPANY_CHANGE_REQUEST_ROUTES.BASE,
    {
      params: {
        page: params.page,
        limit: params.limit,
        search: params.search,
        status: params.status,
        changeType: params.changeType,
      },
    },
  );
};

// Get update request details

export const getCompanyChangeRequestById = (
  requestId: string,
) => {
  return axiosInstance.get(
    COMPANY_CHANGE_REQUEST_ROUTES.BY_ID(requestId),
  );
};

// Review one profile field

export const reviewCompanyProfileChangeRequest = (
  payload: ReviewProfileChangePayload,
) => {
  const { requestId, ...data } = payload;

  return axiosInstance.patch(
    COMPANY_CHANGE_REQUEST_ROUTES.PROFILE_REVIEW(requestId),
    data,
  );
};



export const reviewCompanyDocumentChangeRequest = (
  payload: ReviewDocumentChangePayload,
) => {
  const { requestId, ...data } = payload;
console.log("payload",payload)
  return axiosInstance.patch(
    COMPANY_CHANGE_REQUEST_ROUTES.DOCUMENT_REVIEW(requestId),
    data,
  );
};


export const sendCompanyEmailChangeOtp = (email: string) => {
  return axiosInstance.post(COMPANY_CHANGE_REQUEST_ROUTES.SEND_OTP,
    { email },
  );
};


export const verifyCompanyEmailChangeOtp = (data: {
  email: string;
  otp: string;
}) => {
  return axiosInstance.post(
    COMPANY_CHANGE_REQUEST_ROUTES.VERIFY_OTP,
    data,
  );
};