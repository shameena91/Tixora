import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { approveCompanyRequest, getAllCompanyRequests, getCompanyRequestById, moreInfoCompanyRequest, rejectCompanyRequest } from "../../modules/superadmin/services/superadminServices";

interface CompanyRequest {
  id: string;

  requestId: string;
  requestType: "REGISTRATION" | "UPDATE";

  companyName: string;
  adminName: string;

  status:
    | "PENDING"
    | "UNDER_REVIEW"
    | "MORE_INFO_REQUIRED"
    | "APPROVED"
    | "REJECTED";

  submittedAt: string;
  createdAt: string;
}
interface CompanyRequestDetails {
  id: string;

  company: {
    companyName: string;
    requestId: string;
    registrationNumber: string;
    companyEmail: string;
    phone: string;
    yearEstablished: number | null;
    companyType: string;
    numberOfEmployees: string;
    website: string | null;
    logo: string | null;
    description: string | null;
  };

  admin: {
    name: string;
    email: string;
    phone: string;
    designation: string;
  };

  status: "PENDING" | "APPROVED" | "REJECTED" | "MORE_INFO_REQUIRED";
    reviewRemarks: string | null;

  location: {
    address: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
  };

  documents: {
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
  verificationStatus:
    | "PENDING"
    | "VERIFIED"
    | "REJECTED";
}[];
 submittedAt: string;
  createdAt: string;
  updatedAt: string;
}
interface CompanyRequestState {
  companyRequests: CompanyRequest[];
  companyRequest: CompanyRequestDetails | null;
  loading: boolean;
  error: string | null;
}

export const fetchCompanyRequests = createAsyncThunk(
  "companyRequest/fetchCompanyRequests",
  async () => {
    const response = await getAllCompanyRequests();

    return response.data;
  }
);

export const fetchCompanyRequestById = createAsyncThunk(
  "companyRequest/fetchCompanyRequestById",
  async (companyRequestId: string) => {
    const response =
      await getCompanyRequestById(companyRequestId);

    return response.data;
  }
);
export const approveCompanyRequestThunk = createAsyncThunk(
  "companyRequest/approveCompanyRequest",
  async (companyRequestId: string) => {
    const response =
      await approveCompanyRequest(companyRequestId);

    return response.data;
  }
);

export const rejectCompanyRequestThunk=createAsyncThunk(
  "companyRequest/rejectCompanyRequest",
  async (companyRequestId:string)=>{
    const response=await rejectCompanyRequest(companyRequestId)
    return response.data
  }
);

export const moreInfoCompanyRequestThunk = createAsyncThunk(
  "companyRequest/moreInfoCompanyRequest",
  async ({
    companyRequestId,
    remarks,
  }: {
    companyRequestId: string;
    remarks: string;
  }) => {
    const response = await moreInfoCompanyRequest(
      companyRequestId,
      remarks
    );

    return {
      data: response.data,
      remarks,
    };
  }
);

const initialState: CompanyRequestState = {
  companyRequests: [],

  companyRequest: null,
  loading: false,
  error: null,
};
const companyRequestSlice = createSlice({
  name: "companyRequest",
  initialState,
  reducers: {  },

  extraReducers: (builder) => {
  builder
    .addCase(fetchCompanyRequests.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCompanyRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.companyRequests = action.payload;
    })
    .addCase(fetchCompanyRequests.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Failed to fetch company requests";
    })
    .addCase(fetchCompanyRequestById.pending, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(fetchCompanyRequestById.fulfilled, (state, action) => {
      state.loading = false;
      state.companyRequest = action.payload;
    })
    .addCase(fetchCompanyRequestById.rejected, (state, action) => {
      state.loading = false;
      state.error =
        action.error.message || "Failed to fetch company request";
    })
.addCase(approveCompanyRequestThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
})
.addCase(approveCompanyRequestThunk.fulfilled, (state ) => {
  state.loading = false;
  //  state.companyRequest = action.payload;

  if (state.companyRequest) {
    state.companyRequest.status = "APPROVED";
  }
})
.addCase(approveCompanyRequestThunk.rejected, (state, action) => {
  state.loading = false;
  state.error =
    action.error.message || "Failed to approve company request";
})

.addCase(rejectCompanyRequestThunk.pending,(state)=>{
 
       state.loading = true;
  state.error = null;
    })
    .addCase(rejectCompanyRequestThunk.fulfilled,(state)=>{
      state.loading=false
        if (state.companyRequest) {
    state.companyRequest.status = "REJECTED";
  }
    })
    .addCase(rejectCompanyRequestThunk.rejected,(state,action)=>{
      state.loading=false;
      state.error=action.error.message|| "Failed to approve company request"
    })
.addCase(moreInfoCompanyRequestThunk.pending, (state) => {
  state.loading = true;
  state.error = null;
})

.addCase(moreInfoCompanyRequestThunk.fulfilled, (state, action) => {
  state.loading = false;

  if (state.companyRequest) {
    state.companyRequest.status = "MORE_INFO_REQUIRED";
    state.companyRequest.reviewRemarks = action.payload.remarks;
  }
})

.addCase(moreInfoCompanyRequestThunk.rejected, (state, action) => {
  state.loading = false;
  state.error =
    action.error.message ||
    "Failed to request more information";
})
},
});

export default companyRequestSlice.reducer;