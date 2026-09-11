import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCompanyRequests, getCompanyRequestById } from "../../modules/superadmin/services/superadminServices";

interface CompanyRequest {
  id: string;
  companyName: string;
  adminName: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "MORE_INFO_REQUIRED";
  createdAt: string;
}
interface CompanyRequestDetails {
  id: string;

  company: {
    companyName: string;
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
  }[];

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
    });
},
    

});

export default companyRequestSlice.reducer;