import { createSlice } from "@reduxjs/toolkit";

import {
  getCompanySubscriptionThunk,
  getMySubscriptionStatusThunk,
  selectSubscriptionPlanThunk,
  verifyPaymentThunk,
} from "./companySubscriptionThunk";

import type {
   
  GetCompanySubscriptionResponseDto,
  MySubscription,
  SelectSubscriptionPlanResponseDto,
  VerifyPaymentResponse,
} from "./companySubscriptionTypes";

interface CompanySubscriptionState {
  mySubscription: MySubscription | null;

  companySubscription: GetCompanySubscriptionResponseDto  | null;

  selectSubscriptionResponse:
    | SelectSubscriptionPlanResponseDto
    | null;

  verifyPaymentResponse: VerifyPaymentResponse | null;

  loading: boolean;
  error: string | null;
}

const initialState: CompanySubscriptionState = {
  mySubscription: null,

  companySubscription: null,

  selectSubscriptionResponse: null,

  verifyPaymentResponse: null,

  loading: false,
  error: null,
};

const companySubscriptionSlice = createSlice({
  name: "companySubscription",

  initialState,

  reducers: {
    clearCompanySubscriptionError: (state) => {
      state.error = null;
    },

    clearVerifyPaymentResponse: (state) => {
      state.verifyPaymentResponse = null;
    },

    clearSelectSubscriptionResponse: (state) => {
      state.selectSubscriptionResponse = null;
    },

    clearCompanySubscription: (state) => {
      state.companySubscription = null;
    },
  },

  extraReducers: (builder) => {
    // ==============================
    // SELECT SUBSCRIPTION PLAN
    // ==============================

    builder
      .addCase(selectSubscriptionPlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        selectSubscriptionPlanThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.selectSubscriptionResponse = action.payload;
        },
      )

      .addCase(
        selectSubscriptionPlanThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to select subscription plan";
        },
      );

    // ==============================
    // GET MY SUBSCRIPTION STATUS
    // ==============================

    builder
      .addCase(getMySubscriptionStatusThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getMySubscriptionStatusThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.mySubscription = action.payload;
        },
      )

      .addCase(
        getMySubscriptionStatusThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to get subscription status";
        },
      );

    // ==============================
    // GET COMPANY SUBSCRIPTION
    // ==============================

    builder
      .addCase(getCompanySubscriptionThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        getCompanySubscriptionThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.companySubscription = action.payload;
        },
      )

      .addCase(
        getCompanySubscriptionThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to get company subscription";
        },
      );

    // ==============================
    // VERIFY PAYMENT
    // ==============================

    builder
      .addCase(verifyPaymentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        verifyPaymentThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.verifyPaymentResponse = action.payload;
        },
      )

      .addCase(
        verifyPaymentThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Payment verification failed";
        },
      );
  },
});

export const {
  clearCompanySubscriptionError,
  clearVerifyPaymentResponse,
  clearSelectSubscriptionResponse,
  clearCompanySubscription,
} = companySubscriptionSlice.actions;

export default companySubscriptionSlice.reducer;