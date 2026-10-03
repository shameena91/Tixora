import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  getAllCompaniesList, getCompany } from "../../modules/superadmin/services/superadminServices";
import axios from "axios";

export interface CompanyLocation {
  address: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

export interface CompanyDetails {
  id: string;
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
  location: CompanyLocation;
  status: "ACTIVE" | "INACTIVE";
  subscriptionName: string | null;
  admin:{
    name:string|null,
    email:string|null
  },
  subscription:{
    subscriptionName:string|null,
    billingCycle: "MONTHLY" | "YEARLY";
  status:
    | "PENDING"
    | "ACTIVE"
    | "CANCELLED"
    | "EXPIRED";
  }
}

export interface CompanyList{
      id: string;
  logo: string | null;
  companyName: string;
  companyEmail: string;
 status: "ACTIVE" | "INACTIVE";
  createdAt:Date
}

export const fetchCompanyListsThunk = createAsyncThunk<
  CompanyList[],
  string | undefined,
  { rejectValue: string }
>(
  "companies/getAllCompanies",
  async (search, { rejectWithValue }) => {
    try {

      const response =
        await getAllCompaniesList(search);

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

export const fetchCompanyThunk = createAsyncThunk<
  CompanyDetails,
  string,
  { rejectValue: string }
>(
  "companies/getCompany",
  async (companyId, { rejectWithValue }) => {
    try {
       console.log("fromThunk",companyId);
      const response = await getCompany(companyId);

      console.log("fromThunk", response.data);

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

interface CompanyState {
  companyList: CompanyList[];
  companyDetails: CompanyDetails | null;
  companylistLoading: boolean;
  error: string | null;
  loading: boolean;

 
}

const initialState: CompanyState = {
  companyList: [],
  companyDetails: null,
  companylistLoading: false,
  error: null,
  loading: false,

 
};
  const companySlice=createSlice(
    {
        name:"Company",
        initialState,
        reducers:{},

        extraReducers:(builder)=>{
            builder
            .addCase(fetchCompanyListsThunk.pending,(state)=>{
                state.companylistLoading=true
                state.error=null
            })
              .addCase(
        fetchCompanyListsThunk.fulfilled,
        (state, action) => {
          state.companylistLoading = false;
          state.companyList = action.payload;
        },
      )
      .addCase(
        fetchCompanyListsThunk.rejected,
        (state, action) => {
          state.companylistLoading = false;
          state.error =
            action.payload ||
            "Failed to fetch company lists";
        },
      )
       .addCase(fetchCompanyThunk.pending,(state)=>{
                state.loading=true
                state.error=null
            })
              .addCase(
        fetchCompanyThunk.fulfilled,
        (state, action) => {
          state.loading = false;
          state.companyDetails = action.payload;
        },
      )
      .addCase(
        fetchCompanyThunk.rejected,
        (state, action) => {
          state.loading = false;
          state.error =
            action.payload ||
            "Failed to fetch company lists";
        },
      )


      
        }
    }
  )
export default companySlice.reducer