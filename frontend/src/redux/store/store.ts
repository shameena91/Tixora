import { configureStore } from "@reduxjs/toolkit";
import superAdminDashboardReducer from "../slices/superAdminDashboardSlice";
import companyRequestReducer from "../slices/companyRrequest/companyRequestSlice";
import subscriptionPlanReducer from "../slices/subscriptionPlan/subscriptionPlanSlice";
import companylistReducer from "../slices/company/companySlice"
import companySubscriptionReducer from "../slices/companySubscription/companySubscriptionSlice";
import categoryReducer from "../slices/category/categorySlice"
import departmentReducer from "../slices/department/departmentSlice";
export const store=configureStore({
    reducer:{
          superAdminDashboard: superAdminDashboardReducer,
           companyRequest: companyRequestReducer,
           subscriptionPlan: subscriptionPlanReducer,
    company:companylistReducer,
    companySubscription: companySubscriptionReducer,
    department: departmentReducer,
    category:categoryReducer
  
        }
})


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;