import { createAsyncThunk } from "@reduxjs/toolkit";
import type {  GetCompanySubscriptionResponseDto, MySubscription, SelectSubscriptionPlanData, SelectSubscriptionPlanResponseDto, VerifyPaymentResponse } from "./companySubscriptionTypes";
import type { VerifyPaymentData } from "../../../modules/superadmin/types/PaymentType";
import axios from "axios";
import {  getMySubscriptionStatus,  selectSubscriptionPlan, verifyPayment } from "../../../modules/superadmin/services/subscriptionPlanServices";
import { getCompanySubscription } from "../../../modules/superadmin/services/superadminServices";








export const getCompanySubscriptionThunk = 
createAsyncThunk<GetCompanySubscriptionResponseDto ,
string,{ rejectValue: string }>(
  "companySubscription/getCompanySubscription",
  async (companyId, { rejectWithValue }) => {
    try {

        console.log("thunk")
        const response =await getCompanySubscription(companyId);
        console.log("dataaaaaaaaaaaa",response.data)
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

export const getMySubscriptionStatusThunk =
  createAsyncThunk<
    MySubscription | null,
    void,
    { rejectValue: string }
  >(
    "subscriptionPlan/getMySubscriptionStatus",
    async (_, { rejectWithValue }) => {
      try {
        const response =
          await getMySubscriptionStatus();

        return response.data;

      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to get subscription status"
          );
        }

        return rejectWithValue(
          "Failed to get subscription status"
        );
      }
    }
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

  