
import { createSlice } from "@reduxjs/toolkit";

import {
  approveCompanyRequestThunk,
  fetchCompanyChangeRequestByIdThunk,
  fetchCompanyChangeRequestsThunk,
  fetchCompanyRequestById,
  fetchCompanyRequests,
  fetchMyCompanyChangeRequestsThunk,
  moreInfoCompanyRequestThunk,
  rejectCompanyRequestThunk,
  reviewCompanyDocumentChangeRequestThunk,
  reviewCompanyProfileChangeRequestThunk,
} from "./companyRequestThunk";

import type {
  CompanyRequestState,
} from "./companyRequestTypes";



const initialState: CompanyRequestState = {
  companyRequests: [],
  companyRequest: null,

  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,

  loading: false,
  error: null,


companyChangeRequests: [],
companyChangeRequest: null,

companyChangeRequestsTotal: 0,
companyChangeRequestsPage: 1,
companyChangeRequestsLimit: 10,
companyChangeRequestsTotalPages: 0,

companyChangeRequestsLoading: false,
companyChangeRequestsError: null,

reviewCompanyChangeLoading: false,
reviewCompanyChangeError: null,

myCompanyChangeRequests: [],
myCompanyChangeRequestsLoading: false,
myCompanyChangeRequestsError: null,
};

// Slice

const companyRequestSlice = createSlice({
  name: "companyRequest",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder

     

      .addCase(fetchCompanyRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchCompanyRequests.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          state.companyRequests = action.payload.data;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
        },
      )

      .addCase(
        fetchCompanyRequests.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to fetch company requests";
        },
      )

      // Fetch Company Request By ID

      .addCase(fetchCompanyRequestById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        fetchCompanyRequestById.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;
          state.companyRequest = action.payload;
        },
      )

      .addCase(
        fetchCompanyRequestById.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to fetch company request";
        },
      )

      // Approve Company Request

      .addCase(approveCompanyRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(approveCompanyRequestThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        if (state.companyRequest) {
          state.companyRequest.status = "APPROVED";
        }
      })

      .addCase(
        approveCompanyRequestThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to approve company request";
        },
      )

      // Reject Company Request

      .addCase(rejectCompanyRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(rejectCompanyRequestThunk.fulfilled, (state) => {
        state.loading = false;
        state.error = null;

        if (state.companyRequest) {
          state.companyRequest.status = "REJECTED";
        }
      })

      .addCase(
        rejectCompanyRequestThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload || "Failed to reject company request";
        },
      )

      // More Info Company Request

      .addCase(moreInfoCompanyRequestThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(
        moreInfoCompanyRequestThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.error = null;

          if (state.companyRequest) {
            state.companyRequest.status = "MORE_INFO_REQUIRED";
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
      )
      // Fetch Update Requests

.addCase(
  fetchCompanyChangeRequestsThunk.pending,
  (state) => {
    state.companyChangeRequestsLoading = true;
    state.companyChangeRequestsError = null;
  },
)
.addCase(
  fetchCompanyChangeRequestsThunk.fulfilled,
  (state, action) => {
    state.companyChangeRequestsLoading = false;
    state.companyChangeRequests = action.payload.requests;
    state.companyChangeRequestsTotal = action.payload.total;
    state.companyChangeRequestsPage = action.payload.page;
    state.companyChangeRequestsLimit = action.payload.limit;
    state.companyChangeRequestsTotalPages =
      action.payload.totalPages;
  },
)
.addCase(
  fetchCompanyChangeRequestsThunk.rejected,
  (state, action) => {
    state.companyChangeRequestsLoading = false;
    state.companyChangeRequestsError =
      action.payload ?? "Failed to fetch update requests";
  },
)

// Fetch Update Request Details

.addCase(
  fetchCompanyChangeRequestByIdThunk.pending,
  (state) => {
    state.companyChangeRequestsLoading = true;
    state.companyChangeRequestsError = null;
  },
)
.addCase(
  fetchCompanyChangeRequestByIdThunk.fulfilled,
  (state, action) => {
    state.companyChangeRequestsLoading = false;
    state.companyChangeRequest = action.payload;
  },
)
.addCase(
  fetchCompanyChangeRequestByIdThunk.rejected,
  (state, action) => {
    state.companyChangeRequestsLoading = false;
    state.companyChangeRequestsError =
      action.payload ?? "Failed to fetch update request";
  },
)

// Review Profile Change

.addCase(
  reviewCompanyProfileChangeRequestThunk.pending,
  (state) => {
    state.reviewCompanyChangeLoading = true;
    state.reviewCompanyChangeError = null;
  },
)
.addCase(
  reviewCompanyProfileChangeRequestThunk.fulfilled,
  (state) => {
    state.reviewCompanyChangeLoading = false;
  },
)
.addCase(
  reviewCompanyProfileChangeRequestThunk.rejected,
  (state, action) => {
    state.reviewCompanyChangeLoading = false;
    state.reviewCompanyChangeError =
      action.payload ?? "Failed to review profile change";
  },
)

// Review Document Change

.addCase(
  reviewCompanyDocumentChangeRequestThunk.pending,
  (state) => {
    state.reviewCompanyChangeLoading = true;
    state.reviewCompanyChangeError = null;
  },
)
.addCase(
  reviewCompanyDocumentChangeRequestThunk.fulfilled,
  (state) => {
    state.reviewCompanyChangeLoading = false;
  },
)
.addCase(
  reviewCompanyDocumentChangeRequestThunk.rejected,
  (state, action) => {
    state.reviewCompanyChangeLoading = false;
    state.reviewCompanyChangeError =
      action.payload ?? "Failed to review document change";
  },
)// Fetch My Company Change Requests

.addCase(
  fetchMyCompanyChangeRequestsThunk.pending,
  (state) => {
    state.myCompanyChangeRequestsLoading = true;
    state.myCompanyChangeRequestsError = null;
  },
)
.addCase(
  fetchMyCompanyChangeRequestsThunk.fulfilled,
  (state, action) => {
    state.myCompanyChangeRequestsLoading = false;
    state.myCompanyChangeRequests = action.payload;
  },
)
.addCase(
  fetchMyCompanyChangeRequestsThunk.rejected,
  (state, action) => {
    state.myCompanyChangeRequestsLoading = false;
    state.myCompanyChangeRequestsError =
      action.payload ?? "Failed to fetch your update requests";
  },
)
  },
});

export default companyRequestSlice.reducer;
