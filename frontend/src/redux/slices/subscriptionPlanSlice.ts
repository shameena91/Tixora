import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export interface CreateSubscriptionPlanPayload {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  memberLimit: number;
  companyAdminLimit: number;
  departmentLimit: number;
  ticketLimit: number;
  automaticTicketAssignment: boolean;
  slaManagement: boolean;
}


export const createSubscriptionPlanThunk = createAsyncThunk(
  "subscriptionPlan/createSubscriptionPlan",
  async (data: CreateSubscriptionPlanPayload) => {
    const response = await createSubscriptionPlan(data);
    return response.data;
  }
);
interface SubscriptionPlanState {
  loading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: SubscriptionPlanState = {
  loading: false,
  error: null,
  success: false,
};

const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlan",
  initialState,
  reducers: {
    resetSubscriptionPlanState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createSubscriptionPlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createSubscriptionPlanThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })

      .addCase(createSubscriptionPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to create subscription plan";
      });
  },
});

export const { resetSubscriptionPlanState } =
  subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;