
import type { SubmitCompanyChangeRequestPayload } from "../../../../redux/slices/company/companyTypes";
import { COMPANY_CHANGE_REQUEST_ROUTES, COMPANY_ROUTE } from "../../../../shared/constants/apiRoutes";
import axiosInstance from "../../../auth/api/axiosInstance";

export const getMyCompany = async () => {

    console.log("getmy company")
  const response = await axiosInstance.get(COMPANY_ROUTE.MY_COMPANY);

   console.log("GET MY COMPANY RESPONSE:", response.data);
  return response.data;
};

export const getMyCompanyDocuments = async () => {
  const response = await axiosInstance.get(
    COMPANY_ROUTE.MY_COMPANY_DOCUMENTS,
  );

  return response.data;
};


export const submitCompanyChangeRequest = async (
  payload:SubmitCompanyChangeRequestPayload,
) => {
  const response = await axiosInstance.post(
   COMPANY_ROUTE.COMPANY_PROFILE_CHANGE_REQUEST,
    payload,
  );

  return response.data;
};



export const submitCompanyDocumentChangeRequest = async (
  formData: FormData,
) => {

  console.log("FormData",formData.get("reason"))
  const response = await axiosInstance.post(
   COMPANY_ROUTE.COMPANY_DOCUMENT_CHANGE_REQUEST,
    formData,
  );

  return response.data;
};


export const getMyCompanyChangeRequests = async () => {
 const response= axiosInstance.get(
    COMPANY_CHANGE_REQUEST_ROUTES.MY_REQUESTS,
  );

  console.log("Fromsecice changeeeeee",response)
  return response
};

