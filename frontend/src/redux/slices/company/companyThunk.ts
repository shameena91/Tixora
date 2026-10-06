import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import {
  getAllCompaniesList,
  getBillingHistory,
  getCompany,
  getCompanyAdmins,
  updateCompanyStatus,
} from "../../../modules/superadmin/services/superadminServices";

import type {
  BillingHistoryType,
  CompanyAdminList,
  CompanyDetails,
  CompanyListPaginatedResponse,
  UpdateCompanyStatusResponse,
} from "./companyTypes";

// ------------------------------------
// Update Company Status
// ------------------------------------

export const updateCompanyStatusThunk =
  createAsyncThunk<
    UpdateCompanyStatusResponse,
    {
      companyId: string;
      status: "ACTIVE" | "INACTIVE";
    },
    { rejectValue: string }
  >(
    "company/updateCompanyStatus",
    async (
      {
        companyId,
        status,
      },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await updateCompanyStatus(
            companyId,
            status,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to update company status",
          );
        }

        return rejectWithValue(
          "Failed to update company status",
        );
      }
    },
  );

// ------------------------------------
// Fetch Company Admin
// ------------------------------------

export const fetchCompanyAdminThunk =
  createAsyncThunk<
    CompanyAdminList,
    string,
    { rejectValue: string }
  >(
    "company/getCompanyAdmins",
    async (
      companyId,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await getCompanyAdmins(
            companyId,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch admins",
          );
        }

        return rejectWithValue(
          "Failed to fetch admins",
        );
      }
    },
  );

// ------------------------------------
// Fetch Company List - Paginated
// ------------------------------------

export const fetchCompanyListsThunk =
  createAsyncThunk<
    CompanyListPaginatedResponse,
    {
      search?: string;
      page: number;
      limit: number;
    },
    { rejectValue: string }
  >(
    "company/getAllCompanies",
    async (
      {
        search,
        page,
        limit,
      },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await getAllCompaniesList(
            search,
            page,
            limit,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch company lists",
          );
        }

        return rejectWithValue(
          "Failed to fetch company lists",
        );
      }
    },
  );

// ------------------------------------
// Fetch Company Details
// ------------------------------------

export const fetchCompanyThunk =
  createAsyncThunk<
    CompanyDetails,
    string,
    { rejectValue: string }
  >(
    "company/getCompany",
    async (
      companyId,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await getCompany(
            companyId,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch company details",
          );
        }

        return rejectWithValue(
          "Failed to fetch company details",
        );
      }
    },
  );

// ------------------------------------
// Fetch Billing History
// ------------------------------------

export const fetchBillingHistory =
  createAsyncThunk<
    BillingHistoryType[],
    string,
    { rejectValue: string }
  >(
    "company/getBillingHistory",
    async (
      companyId,
      { rejectWithValue },
    ) => {
      try {
        const response =
          await getBillingHistory(
            companyId,
          );

        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ||
              "Failed to fetch billing history",
          );
        }

        return rejectWithValue(
          "Failed to fetch billing history",
        );
      }
    },
  );