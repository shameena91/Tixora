import {
  createSlice,
} from "@reduxjs/toolkit";

import {
  createSubscriptionPlanThunk,
  fetchActiveSubscriptionPlansThunk,
  fetchPlanNamesThunk,
  getAllSubscriptionPlanThunk,
  getSubscriptionPlanThunk,
  planDeleteThunk,
  planStatusUpdateThunk,
  updateSubscriptionPlanThunk,
} from "./subscriptionPlanThunk";

import type {
  SubscriptionPlanState,
} from "./subscriptionPlanTypes";

// ------------------------------------
// Initial State
// ------------------------------------

const initialState: SubscriptionPlanState = {
  planNames: [],

  subscriptionPlans: [],

  activeSubscriptionPlans: [],

  subscriptionPlanTotal: 0,
  subscriptionPlanPage: 1,
  subscriptionPlanLimit: 3,
  subscriptionPlanTotalPages: 0,

  viewSubscriptionPlan: null,

  planNamesLoading: false,
  getAllLoading: false,
  createLoading: false,
  viewLoading: false,
  statusLoading: false,
  deleteLoading: false,

  activeSubscriptionPlansLoading: false,

  error: null,
  activeSubscriptionPlansError: null,
  success: false,
};

// ------------------------------------
// Slice
// ------------------------------------

const subscriptionPlanSlice =
  createSlice({
    name: "subscriptionPlan",

    initialState,

    reducers: {
      resetSubscriptionPlanState: (
        state,
      ) => {
        state.error = null;
        state.success = false;
      },
    },

    extraReducers: (
      builder,
    ) => {
      builder

        // ------------------------------------
        // Fetch Plan Names
        // ------------------------------------

        .addCase(
          fetchPlanNamesThunk.pending,
          (state) => {
            state.planNamesLoading = true;
            state.error = null;
          },
        )

        .addCase(
          fetchPlanNamesThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.planNamesLoading = false;
            state.error = null;

            state.planNames =
              action.payload;
          },
        )

        .addCase(
          fetchPlanNamesThunk.rejected,
          (
            state,
            action,
          ) => {
            state.planNamesLoading = false;

            state.error =
              action.payload ||
              "Failed to fetch plan names";
          },
        )

        // ------------------------------------
        // Create Subscription Plan
        // ------------------------------------

        .addCase(
          createSubscriptionPlanThunk.pending,
          (state) => {
            state.createLoading = true;
            state.error = null;
            state.success = false;
          },
        )

        .addCase(
          createSubscriptionPlanThunk.fulfilled,
          (state) => {
            state.createLoading = false;
            state.error = null;
            state.success = true;
          },
        )

        .addCase(
          createSubscriptionPlanThunk.rejected,
          (
            state,
            action,
          ) => {
            state.createLoading = false;

            state.error =
              action.payload ||
              "Failed to create subscription plan";
          },
        )

        // ------------------------------------
        // Get All Subscription Plans
        // ------------------------------------

        .addCase(
          getAllSubscriptionPlanThunk.pending,
          (state) => {
            state.getAllLoading = true;
            state.error = null;
          },
        )

        .addCase(
          getAllSubscriptionPlanThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.getAllLoading = false;
            state.error = null;

            state.subscriptionPlans =
              action.payload.data;

            state.subscriptionPlanTotal =
              action.payload.total;

            state.subscriptionPlanPage =
              action.payload.page;

            state.subscriptionPlanLimit =
              action.payload.limit;

            state.subscriptionPlanTotalPages =
              action.payload.totalPages;
          },
        )

        .addCase(
          getAllSubscriptionPlanThunk.rejected,
          (
            state,
            action,
          ) => {
            state.getAllLoading = false;

            state.error =
              action.payload ||
              "Failed to fetch subscription plans";
          },
        )

        // ------------------------------------
        // Get Subscription Plan By ID
        // ------------------------------------

        .addCase(
          getSubscriptionPlanThunk.pending,
          (state) => {
            state.viewLoading = true;
            state.error = null;
          },
        )

        .addCase(
          getSubscriptionPlanThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.viewLoading = false;
            state.error = null;

            state.viewSubscriptionPlan =
              action.payload;
          },
        )

        .addCase(
          getSubscriptionPlanThunk.rejected,
          (
            state,
            action,
          ) => {
            state.viewLoading = false;

            state.error =
              action.payload ||
              "Failed to fetch subscription plan";
          },
        )

        // ------------------------------------
        // Update Subscription Plan
        // ------------------------------------

        .addCase(
          updateSubscriptionPlanThunk.pending,
          (state) => {
            state.error = null;
            state.success = false;
            state.createLoading = true;
          },
        )

        .addCase(
          updateSubscriptionPlanThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.createLoading = false;
            state.error = null;
            state.success = true;

            state.viewSubscriptionPlan =
              action.payload;
          },
        )

        .addCase(
          updateSubscriptionPlanThunk.rejected,
          (
            state,
            action,
          ) => {
            state.createLoading = false;

            state.error =
              action.payload ||
              "Failed to update subscription plan";
          },
        )

        // ------------------------------------
        // Update Plan Status
        // ------------------------------------

        .addCase(
          planStatusUpdateThunk.pending,
          (state) => {
            state.statusLoading = true;
            state.error = null;
          },
        )

        .addCase(
          planStatusUpdateThunk.fulfilled,
          (state) => {
            state.statusLoading = false;
            state.error = null;
            state.success = true;
          },
        )

        .addCase(
          planStatusUpdateThunk.rejected,
          (
            state,
            action,
          ) => {
            state.statusLoading = false;

            state.error =
              action.payload ||
              "Failed to update subscription plan";
          },
        )

        // ------------------------------------
        // Delete Subscription Plan
        // ------------------------------------

        .addCase(
          planDeleteThunk.pending,
          (state) => {
            state.deleteLoading = true;
            state.error = null;
          },
        )

        .addCase(
          planDeleteThunk.fulfilled,
          (state) => {
            state.deleteLoading = false;
            state.error = null;
            state.success = true;
          },
        )

        .addCase(
          planDeleteThunk.rejected,
          (
            state,
            action,
          ) => {
            state.deleteLoading = false;

            state.error =
              action.payload ||
              "Failed to delete subscription plan";
          },
        )

        // ------------------------------------
        // Fetch Active Subscription Plans
        // ------------------------------------

        .addCase(
          fetchActiveSubscriptionPlansThunk.pending,
          (state) => {
            state.activeSubscriptionPlansLoading =
              true;

            state.activeSubscriptionPlansError =
              null;
          },
        )

        .addCase(
          fetchActiveSubscriptionPlansThunk.fulfilled,
          (
            state,
            action,
          ) => {
            state.activeSubscriptionPlansLoading =
              false;

            state.activeSubscriptionPlansError =
              null;

            state.activeSubscriptionPlans =
              action.payload;
          },
        )

        .addCase(
          fetchActiveSubscriptionPlansThunk.rejected,
          (
            state,
            action,
          ) => {
            state.activeSubscriptionPlansLoading =
              false;

            state.activeSubscriptionPlansError =
              action.payload ||
              "Failed to fetch active subscription plans";
          },
        );
    },
  });

// ------------------------------------
// Actions
// ------------------------------------

export const {
  resetSubscriptionPlanState,
} =
  subscriptionPlanSlice.actions;

// ------------------------------------
// Reducer
// ------------------------------------

export default subscriptionPlanSlice.reducer;