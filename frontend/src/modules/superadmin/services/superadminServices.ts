
import axiosInstance from "../../auth/api/axiosInstance";
import { COMPANY_REQUEST_ROUTES, COMPANY_ROUTE } from "../../../shared/constants/apiRoutes";

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

export const getAllCompaniesList = async (
  search?: string,
) => {

  const response = await axiosInstance.get(
    "/companies",
    {
      params: {
        search,
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

export const getCompanySubscription = async (id: string) => {
 

  const url = COMPANY_ROUTE.GET_COMPANY_SUBSCRIPTION(id);



  try {
    const response = await axiosInstance.get(url);

  

    return response.data;
  } catch (error) {
    console.log(" SERVICE ERROR:", error);
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
