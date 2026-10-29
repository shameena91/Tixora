import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { AxiosResponse } from "axios";

import type {
  CompanyChangeRequestDetails,
  CompanyChangeRequestFilters,
  CompanyChangeRequestListItem,
  CompanyChangeRequestReviewResult,
  CompanyChangeRequestStatus,
  PaginatedCompanyChangeRequests,
  ReviewDocumentChangePayload,
  ReviewProfileChangePayload,
} from "./companyRequestTypes";

import {
  getCompanyChangeRequests,
  getCompanyChangeRequestById,
  reviewCompanyProfileChangeRequest,
  reviewCompanyDocumentChangeRequest,
} from "../../../modules/superadmin/services/superadminServices";

import type {
  
  CompanyRequestDetails,
  FetchCompanyRequestsParams,
  PaginatedCompanyRequestResponse,
} from "./companyRequestTypes";
import { approveCompanyRequest, getAllCompanyRequests, getCompanyRequestById, moreInfoCompanyRequest, rejectCompanyRequest } from "../../../modules/superadmin/services/superadminServices";

// ------------------------------------
// Fetch All Company Requests
// ------------------------------------


export const fetchCompanyRequests =
  createAsyncThunk<
    PaginatedCompanyRequestResponse,
    FetchCompanyRequestsParams,
    { rejectValue: string }
  >(
    "companyRequest/fetchCompanyRequests",
    async (params, { rejectWithValue }) => {
      try {
        const response =
          await getAllCompanyRequests(params);

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
    {
      companyRequestId: string;
      rejectionReason: string;
    },
    { rejectValue: string }
  >(
    "companyRequest/rejectCompanyRequest",
    async (
      { companyRequestId, rejectionReason },
      { rejectWithValue },
    ) => {
      try {
        const response = await rejectCompanyRequest(
          companyRequestId,
          rejectionReason,
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


  // Extract data from the API response.

function getResponseData(response: AxiosResponse) {
  return response.data?.data ?? response.data;
}

// Fetch paginated Update Requests.

export const fetchCompanyChangeRequestsThunk =
  createAsyncThunk<
    PaginatedCompanyChangeRequests,
    CompanyChangeRequestFilters,
    { rejectValue: string }
  >(
    "companyRequest/fetchCompanyChangeRequests",
    async (params, { rejectWithValue }) => {
      try {
        const response = await getCompanyChangeRequests(params);

        const result = getResponseData(response) as {
          requests?: Record<string, unknown>[];
          data?: Record<string, unknown>[];
          total?: number;
        };

        const rows = result.requests ?? result.data ?? [];
        const total = Number(result.total ?? rows.length);

        const requests: CompanyChangeRequestListItem[] = rows.map(
          (row) => {
            const companyId = String(row.companyId ?? "");
            const accountId = String(row.accountId ?? "");
            const requestId = String(row.requestId ?? "");

            return {
              id: String(row.id ?? row._id ?? requestId),
              requestId,
              companyId,
              accountId,
              companyName: String(row.companyName ?? companyId),
              adminName: String(row.adminName ?? accountId),
              updateType:
                row.updateType === "PROFILE" ||
                Array.isArray(row.changes)
                  ? "PROFILE"
                  : "DOCUMENT",
              status: String(
                row.status,
              ) as CompanyChangeRequestStatus,
              submittedAt: String(
                row.submittedAt ?? row.createdAt ?? "",
              ),
              createdAt: String(
                row.createdAt ?? row.submittedAt ?? "",
              ),
            };
          },
        );

        return {
          requests,
          total,
          page: params.page,
          limit: params.limit,
          totalPages: Math.ceil(total / params.limit),
        };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ??
              "Failed to fetch company update requests",
          );
        }

        return rejectWithValue(
          "Failed to fetch company update requests",
        );
      }
    },
  );

// Fetch one Update Request.

export const fetchCompanyChangeRequestByIdThunk =
  createAsyncThunk<
    CompanyChangeRequestDetails,
    string,
    { rejectValue: string }
  >(
    "companyRequest/fetchCompanyChangeRequestById",
    async (requestId, { rejectWithValue }) => {
      try {
        const response =
          await getCompanyChangeRequestById(requestId);

        const result = getResponseData(response) as Record<
          string,
          unknown
        >;

        const details = {
          ...result,
          id: (result.id ?? result._id ?? null) as string | null,
          updateType: Array.isArray(result.changes)
            ? "PROFILE"
            : "DOCUMENT",
        };

        return details as unknown as CompanyChangeRequestDetails;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ??
              "Failed to fetch company update request",
          );
        }

        return rejectWithValue(
          "Failed to fetch company update request",
        );
      }
    },
  );

// Review one Profile field.

export const reviewCompanyProfileChangeRequestThunk =
  createAsyncThunk<
    CompanyChangeRequestReviewResult,
    ReviewProfileChangePayload,
    { rejectValue: string }
  >(
    "companyRequest/reviewProfileChange",
    async (payload, { rejectWithValue }) => {
      try {
        const response =
          await reviewCompanyProfileChangeRequest(payload);

        return getResponseData(
          response,
        ) as CompanyChangeRequestReviewResult;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ??
              "Failed to review profile change",
          );
        }

        return rejectWithValue(
          "Failed to review profile change",
        );
      }
    },
  );

// Review the entire Document Change request.

export const reviewCompanyDocumentChangeRequestThunk =
  createAsyncThunk<
    CompanyChangeRequestReviewResult,
    ReviewDocumentChangePayload,
    { rejectValue: string }
  >(
    "companyRequest/reviewDocumentChange",
    async (payload, { rejectWithValue }) => {
      try {
        const response =
          await reviewCompanyDocumentChangeRequest(payload);

        return getResponseData(
          response,
        ) as CompanyChangeRequestReviewResult;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          return rejectWithValue(
            error.response?.data?.message ??
              "Failed to review document change",
          );
        }

        return rejectWithValue(
          "Failed to review document change",
        );
      }
    },
  );