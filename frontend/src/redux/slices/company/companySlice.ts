import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  fetchBillingHistory,
  fetchCompanyAdminThunk,
  fetchCompanyListsThunk,
  fetchCompanyThunk,
  updateCompanyStatusThunk,
} from "./companyThunk";

import type {
  CompanyState,
} from "./companyTypes";

// ------------------------------------
// Initial State
// ------------------------------------

const initialState: CompanyState = {
  // Company list
  companyList: [],

  companyListTotal: 0,
  companyListPage: 1,
  companyListLimit: 3,
  companyListTotalPages: 0,

  // Company details
  companyDetails: null,

  // Company Admin
  companyAdminList: null,

  // Billing History
  billingHistory: [],

  // Company list state
  companyListLoading: false,
  companyListError: null,

  // Company details state
  companyDetailsLoading: false,
  companyDetailsError: null,

  // Company admin state
  companyAdminLoading: false,
  companyAdminError: null,

  // Billing history state
  billingHistoryLoading: false,
  billingHistoryError: null,

  // Company status state
  companyStatusLoading: false,
  companyStatusError: null,
};

// ------------------------------------
// Slice
// ------------------------------------

const companySlice =
  createSlice({
    name: "company",

    initialState,

    reducers: {},

    extraReducers: (
      builder,
    ) => {
      builder

        // ------------------------------------
        // Fetch Company Lists
        // ------------------------------------

        .addCase(
          fetchCompanyListsThunk.pending,
          (state) => {
            state.companyListLoading =
              true;

            state.companyListError =
              null;
          },
        )

        .addCase(
          fetchCompanyListsThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.companyListLoading =
              false;

            state.companyListError =
              null;

            state.companyList =
              action.payload.data;

            state.companyListTotal =
              action.payload.total;

            state.companyListPage =
              action.payload.page;

            state.companyListLimit =
              action.payload.limit;

            state.companyListTotalPages =
              action.payload.totalPages;
          },
        )

        .addCase(
          fetchCompanyListsThunk.rejected,
          (
            state,
            action,
          ) => {
            state.companyListLoading =
              false;

            state.companyListError =
              action.payload ||
              "Failed to fetch company lists";
          },
        )

        // ------------------------------------
        // Fetch Company Details
        // ------------------------------------

        .addCase(
          fetchCompanyThunk.pending,
          (state) => {
            state.companyDetailsLoading =
              true;

            state.companyDetailsError =
              null;
          },
        )

        .addCase(
          fetchCompanyThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.companyDetailsLoading =
              false;

            state.companyDetailsError =
              null;

            state.companyDetails =
              action.payload;
          },
        )

        .addCase(
          fetchCompanyThunk.rejected,
          (
            state,
            action,
          ) => {
            state.companyDetailsLoading =
              false;

            state.companyDetailsError =
              action.payload ||
              "Failed to fetch company details";
          },
        )

        // ------------------------------------
        // Fetch Company Admin
        // ------------------------------------

        .addCase(
          fetchCompanyAdminThunk.pending,
          (state) => {
            state.companyAdminLoading =
              true;

            state.companyAdminError =
              null;
          },
        )

        .addCase(
          fetchCompanyAdminThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.companyAdminLoading =
              false;

            state.companyAdminError =
              null;

            state.companyAdminList =
              action.payload;
          },
        )

        .addCase(
          fetchCompanyAdminThunk.rejected,
          (
            state,
            action,
          ) => {
            state.companyAdminLoading =
              false;

            state.companyAdminError =
              action.payload ||
              "Failed to fetch admin list";
          },
        )

        // ------------------------------------
        // Fetch Billing History
        // ------------------------------------

        .addCase(
          fetchBillingHistory.pending,
          (state) => {
            state.billingHistoryLoading =
              true;

            state.billingHistoryError =
              null;
          },
        )

        .addCase(
          fetchBillingHistory.fulfilled,
          (
            state,
            action,
          ) => {
            state.billingHistoryLoading =
              false;

            state.billingHistoryError =
              null;

            state.billingHistory =
              action.payload;
          },
        )

        .addCase(
          fetchBillingHistory.rejected,
          (
            state,
            action,
          ) => {
            state.billingHistoryLoading =
              false;

            state.billingHistoryError =
              action.payload ||
              "Failed to fetch billing history";
          },
        )

        // ------------------------------------
        // Update Company Status
        // ------------------------------------

        .addCase(
          updateCompanyStatusThunk.pending,
          (state) => {
            state.companyStatusLoading =
              true;

            state.companyStatusError =
              null;
          },
        )

        .addCase(
          updateCompanyStatusThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.companyStatusLoading =
              false;

            state.companyStatusError =
              null;

            // Update Company Details
            if (
              state.companyDetails
            ) {
              state.companyDetails.status =
                action.payload.status;
            }

            // Update Company List
            const company =
              state.companyList.find(
                (company) =>
                  company.id ===
                  action.payload.id,
              );

            if (company) {
              company.status =
                action.payload.status;
            }
          },
        )

        .addCase(
          updateCompanyStatusThunk.rejected,
          (
            state,
            action,
          ) => {
            state.companyStatusLoading =
              false;

            state.companyStatusError =
              action.payload ||
              "Failed to update company status";
          },
        );
    },
  });

export default companySlice.reducer;