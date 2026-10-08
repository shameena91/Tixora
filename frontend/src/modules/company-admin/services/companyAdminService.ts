
import {COMPANY_ROUTE } from "../../../shared/constants/apiRoutes";
import axiosInstance from "../../auth/api/axiosInstance";

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