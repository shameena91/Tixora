import type {
 
  UpdatePlanStatusPayload,
} from "../../../redux/slices/subscriptionPlanSlice";
import axiosInstance from "../../auth/api/axiosInstance";
// import type { CreateSubscriptionPlanFormData } from "../components/CreateSubscriptionPlanModal";
import {  SUBSCRIPTION_PLAN_ROUTES } from "../../../shared/constants/apiRoutes";
import type { VerifyPaymentData } from "../types/PaymentType";
import type { CreateSubscriptionPlanFormData } from "../components/subscription/CreateSubscriptionPlanModal";
import type { SelectSubscriptionPlanData } from "../../../redux/slices/companySubscription/companySubscriptionTypes";


export const getPlanNames = async () => {
  const response = await axiosInstance.get(
    SUBSCRIPTION_PLAN_ROUTES.PLAN_NAMES
  );

  return response.data;
};

export const createSubscriptionPlan = async (
  data: CreateSubscriptionPlanFormData
) => {
  const response = await axiosInstance.post(
    SUBSCRIPTION_PLAN_ROUTES.BASE,
    data
  );

  return response.data;
};

export const fetchAllSubscriptionPlans = async () => {
  const response = await axiosInstance.get(
    SUBSCRIPTION_PLAN_ROUTES.BASE
  );

  return response.data;
};

export const fetchSubscriptionPlan = async (id: string) => {
  const response = await axiosInstance.get(
    SUBSCRIPTION_PLAN_ROUTES.BY_ID(id)
  );

  return response.data;
};

export const updateSubscriptionPlan = async (
  id: string,
  data: CreateSubscriptionPlanFormData
) => {
  const response = await axiosInstance.patch(
    SUBSCRIPTION_PLAN_ROUTES.BY_ID(id),
    data
  );

  return response.data;
};

export const planStatusUpdate = async (
  id: string,
  data: UpdatePlanStatusPayload
) => {
  const response = await axiosInstance.patch(
    SUBSCRIPTION_PLAN_ROUTES.STATUS(id),
    data
  );

  return response.data;
};

export const deletePlan = async (id: string) => {
  const response = await axiosInstance.delete(
    SUBSCRIPTION_PLAN_ROUTES.BY_ID(id)
  );

  return response.data;
};

export const selectSubscriptionPlan = async (
  data: SelectSubscriptionPlanData
) => {
  const response = await axiosInstance.post(
    SUBSCRIPTION_PLAN_ROUTES.SELECT_PLAN,
    data
  );
console.log("Slsected sub:",response.data)
  return response.data;
};

export const getMySubscriptionStatus = async () => {
  const response = await axiosInstance.get(
    SUBSCRIPTION_PLAN_ROUTES.SUBSCRIPTION_STATUS
  );

  return response.data;
};

export const verifyPayment=async(data:VerifyPaymentData)=>{
  const response=await axiosInstance.post(
    SUBSCRIPTION_PLAN_ROUTES.VERIFY_PAYMENT,data)

  return response.data
}

