import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


import type {
  CreateSubscriptionPlanPayload,
  SubScriptionListItems,
  SubscriptionPlanDetails,
  SubscriptionPlansPaginatedResponse,
  UpdatePlanStatusPayload,
  UpdateSubscriptionPlanPayload,
} from "./subscriptionPlanTypes";
import { createSubscriptionPlan, deletePlan, fetchAllSubscriptionPlans, fetchSubscriptionPlan, getPlanNames, planStatusUpdate, updateSubscriptionPlan } from "../../../modules/superadmin/services/subscriptionPlanServices";
import { fetchActiveSubscriptionPlans } from "../../../modules/company/Services/subscriptionPlanServices";

// ------------------------------------
// Fetch Plan Names
// ------------------------------------

export const fetchPlanNamesThunk =
  createAsyncThunk<
    string[],
    void,
    { rejectValue: string }
  >(
    "subscriptionPlan/fetchPlanNames",
    async (_, { rejectWithValue }) => {
      try {
        const response =
          await getPlanNames();

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch plan names",
          );
        }

        return rejectWithValue(
          "Failed to fetch plan names",
        );
      }
    },
  );

// ------------------------------------
// Create Subscription Plan
// ------------------------------------

export const createSubscriptionPlanThunk =
  createAsyncThunk<
    unknown,
    CreateSubscriptionPlanPayload,
    { rejectValue: string }
  >(
    "subscriptionPlan/createSubscriptionPlan",
    async (
      data,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await createSubscriptionPlan(
            data,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to create subscription plan",
          );
        }

        return rejectWithValue(
          "Failed to create subscription plan",
        );
      }
    },
  );

// ------------------------------------
// Get All Subscription Plans
// ------------------------------------

export const getAllSubscriptionPlanThunk =
  createAsyncThunk<
    SubscriptionPlansPaginatedResponse,
    {
      page: number;
      limit: number;
    },
    { rejectValue: string }
  >(
    "subscriptionPlan/getAllplans",
    async (
      {
        page,
        limit,
      },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await fetchAllSubscriptionPlans(
            page,
            limit,
          );

        console.log(
          "Get all subscription plans:",
          response.data,
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch subscription plans",
          );
        }

        return rejectWithValue(
          "Failed to fetch subscription plans",
        );
      }
    },
  );

// ------------------------------------
// Get Subscription Plan By ID
// ------------------------------------

export const getSubscriptionPlanThunk =
  createAsyncThunk<
    SubscriptionPlanDetails,
    string,
    { rejectValue: string }
  >(
    "subscriptionPlan/fetchById",
    async (
      id,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await fetchSubscriptionPlan(
            id,
          );

        console.log(
          "Get plan:",
          response.data,
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch subscription plan",
          );
        }

        return rejectWithValue(
          "Failed to fetch subscription plan",
        );
      }
    },
  );

// ------------------------------------
// Update Subscription Plan
// ------------------------------------

export const updateSubscriptionPlanThunk =
  createAsyncThunk<
    SubscriptionPlanDetails,
    UpdateSubscriptionPlanPayload,
    { rejectValue: string }
  >(
    "subscriptionPlan/update",
    async (
      {
        id,
        data,
      },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await updateSubscriptionPlan(
            id,
            data,
          );

        console.log(
          "Updated plan:",
          response,
        );

        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to update subscription plan",
          );
        }

        return rejectWithValue(
          "Failed to update subscription plan",
        );
      }
    },
  );

// ------------------------------------
// Update Plan Status
// ------------------------------------

export const planStatusUpdateThunk =
  createAsyncThunk<
    void,
    {
      id: string;
      data: UpdatePlanStatusPayload;
    },
    { rejectValue: string }
  >(
    "subscriptionPlan/update-status",
    async (
      {
        id,
        data,
      },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await planStatusUpdate(
            id,
            data,
          );

        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to update subscription plan",
          );
        }

        return rejectWithValue(
          "Failed to update subscription plan",
        );
      }
    },
  );

// ------------------------------------
// Delete Subscription Plan
// ------------------------------------

export const planDeleteThunk =
  createAsyncThunk<
    void,
    string,
    { rejectValue: string }
  >(
    "subscriptionPlan/delete",
    async (
      id,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await deletePlan(id);

        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to delete subscription plan",
          );
        }

        return rejectWithValue(
          "Failed to delete subscription plan",
        );
      }
    },
  );

// ------------------------------------
// Fetch Active Subscription Plans
// ------------------------------------

export const fetchActiveSubscriptionPlansThunk =
  createAsyncThunk<
    SubScriptionListItems[],
    void,
    { rejectValue: string }
  >(
    "subscriptionPlan/fetchActiveSubscriptionPlans",
    async (
      _,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await fetchActiveSubscriptionPlans();

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch active subscription plans",
          );
        }

        return rejectWithValue(
          "Failed to fetch active subscription plans",
        );
      }
    },
  );