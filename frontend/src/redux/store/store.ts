import { configureStore } from "@reduxjs/toolkit";
import superAdminDashboardReducer from "../slices/superAdminDashboardSlice";
import companyRequestReducer from "../slices/companyrequestSlice";
import subscriptionPlanReducer from "../slices/subscriptionPlanSlice";
import companylistReducer from "../slices/companySlice"
import companySubscriptionReducer from "../slices/companySubscription/companySubscriptionSlice";
export const store=configureStore({
    reducer:{
          superAdminDashboard: superAdminDashboardReducer,
           companyRequest: companyRequestReducer,
           subscriptionPlan: subscriptionPlanReducer,
    company:companylistReducer,
    companySubscription: companySubscriptionReducer,
        }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;