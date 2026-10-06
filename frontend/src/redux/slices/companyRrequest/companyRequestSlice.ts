import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  approveCompanyRequestThunk,
  fetchCompanyRequestById,
  fetchCompanyRequests,
  moreInfoCompanyRequestThunk,
  rejectCompanyRequestThunk,
} from "./companyRequestThunk";

import type {
  CompanyRequestState,
} from "./companyRequestTypes";

// ------------------------------------
// Initial State
// ------------------------------------

const initialState: CompanyRequestState = {
  companyRequests: [],

  companyRequest: null,

  loading: false,
  error: null,
};

// ------------------------------------
// Slice
// ------------------------------------

const companyRequestSlice =
  createSlice({
    name: "companyRequest",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
      builder

        // ------------------------------------
        // Fetch Company Requests
        // ------------------------------------

        .addCase(
          fetchCompanyRequests.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          },
        )

        .addCase(
          fetchCompanyRequests.fulfilled,
          (state, action) => {
            state.loading = false;
            state.error = null;

            state.companyRequests =
              action.payload;
          },
        )

        .addCase(
          fetchCompanyRequests.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch company requests";
          },
        )

        // ------------------------------------
        // Fetch Company Request By ID
        // ------------------------------------

        .addCase(
          fetchCompanyRequestById.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          },
        )

        .addCase(
          fetchCompanyRequestById.fulfilled,
          (state, action) => {
            state.loading = false;
            state.error = null;

            state.companyRequest =
              action.payload;
          },
        )

        .addCase(
          fetchCompanyRequestById.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to fetch company request";
          },
        )

        // ------------------------------------
        // Approve Company Request
        // ------------------------------------

        .addCase(
          approveCompanyRequestThunk.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          },
        )

        .addCase(
          approveCompanyRequestThunk.fulfilled,
          (state) => {
            state.loading = false;
            state.error = null;

            if (state.companyRequest) {
              state.companyRequest.status =
                "APPROVED";
            }
          },
        )

        .addCase(
          approveCompanyRequestThunk.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to approve company request";
          },
        )

        // ------------------------------------
        // Reject Company Request
        // ------------------------------------

        .addCase(
          rejectCompanyRequestThunk.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          },
        )

        .addCase(
          rejectCompanyRequestThunk.fulfilled,
          (state) => {
            state.loading = false;
            state.error = null;

            if (state.companyRequest) {
              state.companyRequest.status =
                "REJECTED";
            }
          },
        )

        .addCase(
          rejectCompanyRequestThunk.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to reject company request";
          },
        )

        // ------------------------------------
        // More Info Company Request
        // ------------------------------------

        .addCase(
          moreInfoCompanyRequestThunk.pending,
          (state) => {
            state.loading = true;
            state.error = null;
          },
        )

        .addCase(
          moreInfoCompanyRequestThunk.fulfilled,
          (state, action) => {
            state.loading = false;
            state.error = null;

            if (state.companyRequest) {
              state.companyRequest.status =
                "MORE_INFO_REQUIRED";

              state.companyRequest.reviewRemarks =
                action.payload.remarks;
            }
          },
        )

        .addCase(
          moreInfoCompanyRequestThunk.rejected,
          (state, action) => {
            state.loading = false;

            state.error =
              action.payload ||
              "Failed to request more information";
          },
        );
    },
  });

export default companyRequestSlice.reducer;