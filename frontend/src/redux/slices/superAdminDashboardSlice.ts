import { createSlice } from "@reduxjs/toolkit";

 interface SuperAdminDashboardState{
    totalRequests:number;
     pendingRequests: number;
  approvedRequests: number;
  rejectedRequests: number;

}
 const initialState: SuperAdminDashboardState = {
  totalRequests: 0,
  pendingRequests: 0,
  approvedRequests: 0,
  rejectedRequests: 0,
};

 const superAdminDashboardSlice = createSlice({
  name: "superAdminDashboard",
  initialState,
  reducers: {},
});
export default superAdminDashboardSlice.reducer;