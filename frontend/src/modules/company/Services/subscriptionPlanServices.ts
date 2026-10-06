import { SUBSCRIPTION_PLAN_ROUTES } from "../../../shared/constants/apiRoutes";
import axiosInstance from "../../auth/api/axiosInstance";

export const fetchActiveSubscriptionPlans = async () => {
  const response = await axiosInstance.get(
    SUBSCRIPTION_PLAN_ROUTES.GET_ACTIVE_PLANS,
  );

  return response.data;
};