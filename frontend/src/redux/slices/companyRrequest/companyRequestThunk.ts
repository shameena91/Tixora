import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



import type {
  CompanyRequest,
  CompanyRequestDetails,
} from "./companyRequestTypes";
import { approveCompanyRequest, getAllCompanyRequests, getCompanyRequestById, moreInfoCompanyRequest, rejectCompanyRequest } from "../../../modules/superadmin/services/superadminServices";

// ------------------------------------
// Fetch All Company Requests
// ------------------------------------

export const fetchCompanyRequests =
  createAsyncThunk<
    CompanyRequest[],
    void,
    { rejectValue: string }
  >(
    "companyRequest/fetchCompanyRequests",
    async (_, { rejectWithValue }) => {
      try {
        const response =
          await getAllCompanyRequests();

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch company requests",
          );
        }

        return rejectWithValue(
          "Failed to fetch company requests",
        );
      }
    },
  );

// ------------------------------------
// Fetch Company Request By ID
// ------------------------------------

export const fetchCompanyRequestById =
  createAsyncThunk<
    CompanyRequestDetails,
    string,
    { rejectValue: string }
  >(
    "companyRequest/fetchCompanyRequestById",
    async (
      companyRequestId,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await getCompanyRequestById(
            companyRequestId,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch company request",
          );
        }

        return rejectWithValue(
          "Failed to fetch company request",
        );
      }
    },
  );

// ------------------------------------
// Approve Company Request
// ------------------------------------

export const approveCompanyRequestThunk =
  createAsyncThunk<
    unknown,
    string,
    { rejectValue: string }
  >(
    "companyRequest/approveCompanyRequest",
    async (
      companyRequestId,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await approveCompanyRequest(
            companyRequestId,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to approve company request",
          );
        }

        return rejectWithValue(
          "Failed to approve company request",
        );
      }
    },
  );

// ------------------------------------
// Reject Company Request
// ------------------------------------

export const rejectCompanyRequestThunk =
  createAsyncThunk<
    unknown,
    string,
    { rejectValue: string }
  >(
    "companyRequest/rejectCompanyRequest",
    async (
      companyRequestId,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await rejectCompanyRequest(
            companyRequestId,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to reject company request",
          );
        }

        return rejectWithValue(
          "Failed to reject company request",
        );
      }
    },
  );

// ------------------------------------
// More Info Company Request
// ------------------------------------

export const moreInfoCompanyRequestThunk =
  createAsyncThunk<
    {
      data: unknown;
      remarks: string;
    },
    {
      companyRequestId: string;
      remarks: string;
    },
    { rejectValue: string }
  >(
    "companyRequest/moreInfoCompanyRequest",
    async (
      {
        companyRequestId,
        remarks,
      },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await moreInfoCompanyRequest(
            companyRequestId,
            remarks,
          );

        return {
          data: response.data,
          remarks,
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to request more information",
          );
        }

        return rejectWithValue(
          "Failed to request more information",
        );
      }
    },
  );