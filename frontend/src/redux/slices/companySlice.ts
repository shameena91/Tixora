import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {  getAllCompaniesList, getBillingHistory, getCompany, getCompanyAdmins, updateCompanyStatus } from "../../modules/superadmin/services/superadminServices";
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
export interface CompanyAdminList{
  id:string
  firstName:string
  lastName:string
  status:"ACTIVE"|"INACTIVE"
  phone:string
  designation:string
  email:string

}

export interface BillingHistory{
id:string

 razorpayPaymentId: string | null;
  paymentDate: Date | null;
  amount: number;
  status: "PENDING"|"SUCCESS"|"FAILED";
 paymentId: string;
}

export interface UpdateCompanyStatusResponse {
  id: string;
  companyName: string;
  status: "ACTIVE" | "INACTIVE";
}


export const updateCompanyStatusThunk =
  createAsyncThunk<
    UpdateCompanyStatusResponse,
    {
      companyId: string;
      status: "ACTIVE" | "INACTIVE";
    },
    { rejectValue: string }
  >(
    "companies/updateCompanyStatus",
    async (
      { companyId, status },
      { rejectWithValue },
    ) => {
      try {
        const response =
          await updateCompanyStatus(
            companyId,
            status,
          );
  console.log(
        "update company status response",
        response.data,
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


export const fetchCompanyAdminThunk=createAsyncThunk<

CompanyAdminList,
  string ,
   { rejectValue: string }

>("companies/getCompanyAdmins",async(companyId,{rejectWithValue})=>{
  try {
    const response=await getCompanyAdmins(companyId)

    return response.data
  } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch admins ",
        );
      }

      return rejectWithValue(
        "Failed to fetch admins",
      );
    }
})



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


export const fetchBillingHistory=createAsyncThunk<
BillingHistory[],
string,
{rejectValue:string}
>("companies/getBillingHistory",async(companyId,{rejectWithValue})=>{

  try {
    const response=await getBillingHistory(companyId)
  return response.data
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
  

})



interface CompanyState {
  companyList: CompanyList[];
  companyDetails: CompanyDetails | null;
  companyAdminList: CompanyAdminList|null;
  billingHistory:BillingHistory[]

  companyListLoading: boolean;
  companyListError: string | null;

  companyDetailsLoading: boolean;
  companyDetailsError: string | null;

  companyAdminLoading: boolean;
  companyAdminError: string | null;

  billingHistoryLoading:boolean
  billingHistoryError:string|null,

  companyStatusLoading: boolean;
companyStatusError: string | null;
}

const initialState: CompanyState = {
  companyList: [],
  companyDetails: null,
  companyAdminList: null,
  billingHistory:[],

  companyListLoading: false,
  companyListError: null,

  companyDetailsLoading: false,
  companyDetailsError: null,

  companyAdminLoading: false,
  companyAdminError: null,

  billingHistoryLoading:false,
  billingHistoryError:null,

  companyStatusLoading: false,
companyStatusError: null,
};

  const companySlice=createSlice(
    {
        name:"Company",
        initialState,
        reducers:{},

        extraReducers:(builder)=>{
            builder
            .addCase(fetchCompanyListsThunk.pending,(state)=>{
                state.companyListLoading=true
                state.companyListError=null
            })
              .addCase(
        fetchCompanyListsThunk.fulfilled,
        (state, action) => {
          state.companyListLoading = false;
          state.companyList = action.payload;
        },
      )
      .addCase(
        fetchCompanyListsThunk.rejected,
        (state, action) => {
          state.companyListLoading = false;
          state.companyListError =
            action.payload ||
            "Failed to fetch company lists";
        },
      )
       .addCase(fetchCompanyThunk.pending,(state)=>{
                state.companyDetailsLoading=true
                state.companyDetailsError=null
            })
              .addCase(
        fetchCompanyThunk.fulfilled,
        (state, action) => {
          state.companyDetailsLoading = false;
          state.companyDetails = action.payload;
        },
      )
      .addCase(
        fetchCompanyThunk.rejected,
        (state, action) => {
          state.companyDetailsLoading = false;
          state.companyDetailsError =
            action.payload ||
            "Failed to fetch company lists";
        },
      ).addCase(fetchCompanyAdminThunk.pending,(state)=>{
state.companyAdminLoading=true
state.companyAdminError=null
      }).addCase(fetchCompanyAdminThunk.fulfilled,  (state, action) => {
          state.companyAdminLoading = false;
          state.companyAdminList = action.payload;
        },)
        . addCase(
        fetchCompanyAdminThunk.rejected,
        (state, action) => {
          state.companyAdminLoading = false;
          state.companyAdminError =
            action.payload ||
            "Failed to fetch adminList";
        },
      ).addCase(fetchBillingHistory.pending,(state)=>{
        state.billingHistoryLoading=true
        state.billingHistoryError=null
      })
      .addCase(
  fetchBillingHistory.fulfilled,
  (state, action) => {
    state.billingHistoryLoading = false;
    state.billingHistoryError = null;
    state.billingHistory = action.payload;
  },
)
      
      .addCase(
        fetchBillingHistory.rejected,
        (state, action) => {
          state.billingHistoryLoading = false;
          state.billingHistoryError =
            action.payload ||
            "Failed to fetch billing history"
        },
      ).addCase(
  updateCompanyStatusThunk.pending,
  (state) => {
    state.companyStatusLoading = true;
    state.companyStatusError = null;
  },
)

.addCase(
  updateCompanyStatusThunk.fulfilled,
  (state, action) => {
    state.companyStatusLoading = false;

    if (state.companyDetails) {
      state.companyDetails.status =
        action.payload.status;
    }
  },
)

.addCase(
  updateCompanyStatusThunk.rejected,
  (state, action) => {
    state.companyStatusLoading = false;
    state.companyStatusError =
      action.payload ||
      "Failed to update company status";
  },
)


      
        }
    }
  )
export default companySlice.reducer