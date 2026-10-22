
import { createSlice } from "@reduxjs/toolkit";

import {
  getCompanyInvoicesThunk,
  getCompanySubscriptionThunk,
  getMySubscriptionPlanThunk,
  getMySubscriptionStatusThunk,
  selectSubscriptionPlanThunk,
  verifyPaymentThunk,
} from "./companySubscriptionThunk";

import type {
  GetCompanySubscriptionDataDto,
  GetCompanySubscriptionResponseDto,
  Invoice,
  SelectSubscriptionPlanResponseDto,
  VerifyPaymentResponse,
} from "./companySubscriptionTypes";

import type { SubscriptionPlanDetails } from "../subscriptionPlan/subscriptionPlanTypes";

interface CompanySubscriptionState {
  mySubscription: GetCompanySubscriptionDataDto  | null;
  myPlan: SubscriptionPlanDetails | null;

  companySubscription: GetCompanySubscriptionResponseDto | null;

  selectSubscriptionResponse: SelectSubscriptionPlanResponseDto | null;

  verifyPaymentResponse: VerifyPaymentResponse | null;

  loading: boolean;
  error: string | null;

  invoices: Invoice[];
  invoiceLoading: boolean;
  invoiceError: string | null;
}

const initialState: CompanySubscriptionState = {
  mySubscription: null,
  myPlan: null,

  companySubscription: null,

  selectSubscriptionResponse: null,
  verifyPaymentResponse: null,

  loading: false,
  error: null,

  invoices: [],
  invoiceLoading: false,
  invoiceError: null,
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
    // SELECT SUBSCRIPTION PLAN
    builder
      .addCase(selectSubscriptionPlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(selectSubscriptionPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.selectSubscriptionResponse = action.payload;
      })
      .addCase(selectSubscriptionPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to select subscription plan";
      });

    // GET MY SUBSCRIPTION STATUS AND HISTORY
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

    // GET COMPANY SUBSCRIPTION
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
            action.payload || "Failed to get company subscription";
        },
      );

    // VERIFY PAYMENT
    builder
      .addCase(verifyPaymentThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyPaymentThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.verifyPaymentResponse = action.payload;
      })
      .addCase(verifyPaymentThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Payment verification failed";
      });

    // GET MY SUBSCRIPTION PLAN
    builder
      .addCase(getMySubscriptionPlanThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMySubscriptionPlanThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.myPlan = action.payload;
      })
      .addCase(getMySubscriptionPlanThunk.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || "Failed to get your subscription plan";
      });

    // GET COMPANY INVOICES
    builder
      .addCase(getCompanyInvoicesThunk.pending, (state) => {
        state.invoiceLoading = true;
        state.invoiceError = null;
      })
      .addCase(getCompanyInvoicesThunk.fulfilled, (state, action) => {
        state.invoiceLoading = false;
        state.invoices = action.payload.invoices;
      })
      .addCase(getCompanyInvoicesThunk.rejected, (state, action) => {
        state.invoiceLoading = false;
        state.invoiceError =
          action.payload || "Failed to fetch billing history";
      });
  },
});

export const {
  clearCompanySubscriptionError,
  clearVerifyPaymentResponse,
  clearSelectSubscriptionResponse,
  clearCompanySubscription,
} = companySubscriptionSlice.actions;

export default companySubscriptionSlice.reducer;
