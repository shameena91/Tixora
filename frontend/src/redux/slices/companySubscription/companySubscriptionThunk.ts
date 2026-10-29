import { createAsyncThunk } from "@reduxjs/toolkit";
import type {   GetCompanyInvoicesResponseDto, GetCompanySubscriptionDataDto, GetCompanySubscriptionResponseDto, SelectSubscriptionPlanData, SelectSubscriptionPlanResponseDto, VerifyPaymentResponse } from "./companySubscriptionTypes";
import type { VerifyPaymentData } from "../../../modules/superadmin/types/PaymentType";
import axios from "axios";
import {  getMySubscriptionStatus,  selectSubscriptionPlan, verifyPayment } from "../../../modules/superadmin/services/subscriptionPlanServices";
import { getCompanySubscription } from "../../../modules/superadmin/services/superadminServices";
import type { SubscriptionPlanDetails } from "../subscriptionPlan/subscriptionPlanTypes";
import { getCompanyInvoices, getMySubscriptionPlan } from "../../../modules/company-admin/services/subscription/SubscriptionService";







interface GetCompanySubscriptionParams {
  companyId: string;
  page: number;
  limit: number;
}

export const getCompanySubscriptionThunk = createAsyncThunk<
  GetCompanySubscriptionResponseDto,
  GetCompanySubscriptionParams,
  { rejectValue: string }
>(
  "companySubscription/getCompanySubscription",
  async ({ companyId, page, limit }, { rejectWithValue }) => {
    try {
      const response = await getCompanySubscription(
        companyId,
        page,
        limit,
      );

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch company subscription",
        );
      }

      return rejectWithValue(
        "Failed to fetch company subscription",
      );
    }
  },
);





export const selectSubscriptionPlanThunk =
  createAsyncThunk<
    SelectSubscriptionPlanResponseDto,
    SelectSubscriptionPlanData,
    { rejectValue: string }
  >(
    "subscriptionPlan/selectSubscriptionPlan",
    async (data, { rejectWithValue }) => {
      try {
        const response =await selectSubscriptionPlan(data);
        return response

      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to select subscription plan"
          );
        }

        return rejectWithValue(
          "Failed to select subscription plan"
        );
      }
    }
  );


  
export const getMySubscriptionPlanThunk =
  createAsyncThunk<
    SubscriptionPlanDetails,
    void,
    { rejectValue: string }
  >(
    "companySubscription/fetchMyPlan",
    async (_, { rejectWithValue }) => {
      try {
        const response = await getMySubscriptionPlan();
console.log("getMySubscriptionPlanThunk",response.data)
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch your subscription plan",
          );
        }

        return rejectWithValue(
          "Failed to fetch your subscription plan",
        );
      }
    },
  );



export const getMySubscriptionStatusThunk =
  createAsyncThunk<
    GetCompanySubscriptionDataDto | null,
    { page?: number; limit?: number } | undefined,
    { rejectValue: string }
  >(
    "subscriptionPlan/getMySubscriptionStatus",
    async (
      { page = 1, limit = 10 } = {},
      { rejectWithValue },
    ) => {
      try {
        const response = await getMySubscriptionStatus(
          page,
          limit,
        );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to get subscription status",
          );
        }

        return rejectWithValue(
          "Failed to get subscription status",
        );
      }
    },
  );

export const verifyPaymentThunk =
  createAsyncThunk<
    VerifyPaymentResponse,
    VerifyPaymentData,
    { rejectValue: string }
  >(
    "subscriptionPlan/verifyPayment",
    async (data, { rejectWithValue }) => {
      try {
        const response = await verifyPayment(data);

        return response;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Payment verification failed",
          );
        }

        return rejectWithValue(
          "Payment verification failed",
        );
      }
    },
  );

  
export const getCompanyInvoicesThunk = createAsyncThunk<
  GetCompanyInvoicesResponseDto,
  { page: number; limit: number },
  { rejectValue: string }
>(
  "companySubscription/getCompanyInvoices",
  async ({ page, limit }, { rejectWithValue }) => {
    try {
      const response = await getCompanyInvoices(page, limit);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch invoices",
        );
      }

      return rejectWithValue("Failed to fetch invoices");
    }
  },
);


