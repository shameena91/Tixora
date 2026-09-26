import { configureStore } from "@reduxjs/toolkit";
import superAdminDashboardReducer from "../slices/superAdminDashboardSlice";
import companyRequestReducer from "../slices/companyrequestSlice";
import subscriptionPlanReducer from "../slices/subscriptionPlanSlice";export const store=configureStore({
    reducer:{
          superAdminDashboard: superAdminDashboardReducer,
           companyRequest: companyRequestReducer,
           subscriptionPlan: subscriptionPlanReducer,
    }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;