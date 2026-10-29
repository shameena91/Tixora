import { INVOICE_ROUTES, SUBSCRIPTION_PLAN_ROUTES } from "../../../../shared/constants/apiRoutes";
import axiosInstance from "../../../auth/api/axiosInstance";


export const getMySubscriptionStatus = async () => {
  const response = await axiosInstance.get(
    SUBSCRIPTION_PLAN_ROUTES.SUBSCRIPTION_STATUS
  );

  return response.data;
};


export const getMySubscriptionPlan = async () => {
  const response = await axiosInstance.get(
    SUBSCRIPTION_PLAN_ROUTES.GET_MY_SUBSCRIPTION,
  );
console.log("getMySubscriptionPlan",response.data)
  return response.data;
};
export const getCompanyInvoices = async (
  page = 1,
  limit = 10,
) => {
  const response = await axiosInstance.get(
    INVOICE_ROUTES.GET_ALL,
    {
      params: { page, limit },
    },
  );

  return response.data;
};
export const getInvoiceById = async (invoiceId: string) => {
  const response = await axiosInstance.get(
    INVOICE_ROUTES.GET_BY_ID(invoiceId)
  );

  return response.data;
};

export const getInvoicePdfUrl = async (invoiceId: string) => {
  const response = await axiosInstance.get(
    INVOICE_ROUTES.GET_PDF(invoiceId)
  );

  return response.data;
};


export const getInvoiceDownloadUrl = async (invoiceId: string) => {
  const response = await axiosInstance.get(
    INVOICE_ROUTES.GET_DOWNLOAD(invoiceId),
  );

  return response.data;
};
