import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  createSubscriptionPlan,
  deletePlan,
fetchAllSubscriptionPlans,
  fetchSubscriptionPlan,
  
  getPlanNames,
  planStatusUpdate,
 
  updateSubscriptionPlan,
  

} from "../../modules/superadmin/services/subscriptionPlanServices";
import { selectSubscriptionPlanThunk } from "./companySubscription/companySubscriptionThunk";




export interface UpdatePlanStatusPayload {

  status: "ACTIVE" | "INACTIVE";
  
}
export interface UpdateSubscriptionPlanPayload {
  id: string;
  data: {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;

    memberLimit: number | null;
    companyAdminLimit: number | null;
    departmentLimit: number | null;
    ticketLimit: number | null;

    automaticTicketAssignment: boolean;
    slaManagement: boolean;
  };
}
export interface SubscriptionPlanDetails {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
   status: "ACTIVE" | "INACTIVE";
  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;
  automaticTicketAssignment: boolean;
  slaManagement: boolean;
  createdAt: string;
  updatedAt: string;
}
export interface CreateSubscriptionPlanPayload {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;

  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  automaticTicketAssignment: boolean;
  slaManagement: boolean;
}
export interface SubScriptionListItems {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;

  memberLimit: number | null;
  companyAdminLimit: number | null;
  departmentLimit: number | null;
  ticketLimit: number | null;

  automaticTicketAssignment: boolean;
  slaManagement: boolean;
}
// Fetch plan names
export const fetchPlanNamesThunk = createAsyncThunk<
  string[],
  void,
  { rejectValue: string }
>("subscriptionPlan/fetchPlanNames", async (_, { rejectWithValue }) => {
  try {
    const response = await getPlanNames();

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch plan names",
      );
    }

    return rejectWithValue("Failed to fetch plan names");
  }
});

// Create subscription plan
export const createSubscriptionPlanThunk = createAsyncThunk<
  unknown,
  CreateSubscriptionPlanPayload,
  { rejectValue: string }
>(
  "subscriptionPlan/createSubscriptionPlan",
  async (data, { rejectWithValue }) => {
    try {
      const response = await createSubscriptionPlan(data);

      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to create subscription plan"
        );
      }

      return rejectWithValue(
        "Failed to create subscription plan"
      );
    }
  }
);
export const getAllSubscriptionPlanThunk = createAsyncThunk<
   SubScriptionListItems[],
  void,
  { rejectValue: string }
>("subscriptionPlan/getAllplans", async (_, { rejectWithValue }) => {
  try {
    const response = await fetchAllSubscriptionPlans();
console.log("Get aklll",response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create subscription plan",
      );
    }

    return rejectWithValue("Failed to create subscription plan");
  }
});
export const getSubscriptionPlanThunk = createAsyncThunk<
   SubscriptionPlanDetails,
  string,
  { rejectValue: string }
>("subscriptionPlan/fetchById", async (id, { rejectWithValue }) => {
  try {
    const response = await fetchSubscriptionPlan(id);
console.log("Get plan",response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch subscription plan",
      );
    }

    return rejectWithValue("Failed to fetch subscription plan");
  }
});
export const updateSubscriptionPlanThunk = createAsyncThunk<
  SubscriptionPlanDetails,
  UpdateSubscriptionPlanPayload ,
  { rejectValue: string }
>(
  "subscriptionPlan/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await updateSubscriptionPlan(
        id,
        data
      );

      console.log("Updated plan:", response);

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to update subscription plan"
        );
      }

      return rejectWithValue(
        "Failed to update subscription plan"
      );
    }
  }
);

export const planStatusUpdateThunk = createAsyncThunk<
  void,
   {
    id: string;
    data: UpdatePlanStatusPayload;
  },
  { rejectValue: string }
>(
  "subscriptionPlan/update-status",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await planStatusUpdate(id, data);

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to update subscription plan"
        );
      }

      return rejectWithValue(
        "Failed to update subscription plan"
      );
    }
  }
);
export const planDeleteThunk = createAsyncThunk<
  void,
string,

  { rejectValue: string }
>(
  "subscriptionPlan/delete",
  async ( id , { rejectWithValue }) => {
    try {
      const response = await deletePlan(id);

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to update subscription plan"
        );
      }

      return rejectWithValue(
        "Failed to update subscription plan"
      );
    }
  }
);


interface SubscriptionPlanState {
  planNames: string[];
  subscriptionPlans: SubScriptionListItems[];
  planNamesLoading: boolean;
    viewSubscriptionPlan: SubscriptionPlanDetails | null;
  getAllLoading: boolean;
  createLoading: boolean;
  error: string | null;
  success: boolean;
  viewLoading: boolean;
  statusLoading:boolean;
  deleteLoading:boolean;
  selectPlanLoading:boolean
}

const initialState: SubscriptionPlanState = {
  planNames: [],
  viewSubscriptionPlan: null,
  subscriptionPlans: [],
  planNamesLoading: false,
  getAllLoading: false,
  createLoading: false,
  error: null,
  success: false,
  viewLoading: false,
  statusLoading:false,
  deleteLoading:false,
  selectPlanLoading:false
};

const subscriptionPlanSlice = createSlice({
  name: "subscriptionPlan",
  initialState,

  reducers: {
    resetSubscriptionPlanState: (state) => {
      state.error = null;
      state.success = false;
    },
  },

  extraReducers: (builder) => {
    builder

      // Fetch plan names
      .addCase(fetchPlanNamesThunk.pending, (state) => {
        state.planNamesLoading = true;
        state.error = null;
      })

      .addCase(fetchPlanNamesThunk.fulfilled, (state, action) => {
        state.planNamesLoading = false;
        state.planNames = action.payload;
      })

      .addCase(fetchPlanNamesThunk.rejected, (state, action) => {
        state.planNamesLoading = false;
        state.error = action.payload || "Failed to fetch plan names";
      })
      
      // Create subscription plan
      .addCase(createSubscriptionPlanThunk.pending, (state) => {
        state.createLoading = true;
        state.error = null;
        state.success = false;
      })

      .addCase(createSubscriptionPlanThunk.fulfilled, (state) => {
        state.createLoading = false;
        state.success = true;
      })

      .addCase(createSubscriptionPlanThunk.rejected, (state, action) => {
        state.createLoading = false;
        state.error = action.payload || "Failed to create subscription plan";
      })
      .addCase(getAllSubscriptionPlanThunk.pending, (state) => {
        state.getAllLoading = true;
        state.error = null;
      })
      .addCase(getAllSubscriptionPlanThunk.fulfilled, (state, action) => {
        state.getAllLoading = false;
        state.subscriptionPlans = action.payload;
      })
      .addCase(getAllSubscriptionPlanThunk.rejected, (state, action) => {
        state.getAllLoading = false;
        state.error = action.payload || "Failed to fetch subscription plans";
      })
         // Fetch single subscription plan
      .addCase(getSubscriptionPlanThunk.pending, (state) => {
        state.viewLoading = true;
        state.error = null;
      })

      .addCase(getSubscriptionPlanThunk.fulfilled, (state, action) => {
        state.viewLoading = false;
        state.viewSubscriptionPlan = action.payload;
      })

      .addCase(getSubscriptionPlanThunk.rejected, (state, action) => {
        state.viewLoading = false;
        state.error =
          action.payload || "Failed to fetch subscription plan";
      })
      .addCase(
      planStatusUpdateThunk.pending,
      (state) => {
        state.statusLoading = true;
        state.error = null;
      }
    )

    // Status update success
    .addCase(
      planStatusUpdateThunk.fulfilled,
      (state) => {
        state.statusLoading = false;
        state.error = null;
      }
    )

    // Status update failed
    .addCase(
      planStatusUpdateThunk.rejected,
      (state, action) => {
        state.statusLoading = false;
        state.error =
          action.payload ??
          "Failed to update subscription plan";
      }
    )
    .addCase(
  planDeleteThunk.pending,
  (state) => {
    state.deleteLoading = true;
    state.error = null;
  }
)

.addCase(
  planDeleteThunk.fulfilled,
  (state) => {
    state.deleteLoading = false;
    state.error = null;
  }
)

.addCase(
  planDeleteThunk.rejected,
  (state, action) => {
    state.deleteLoading = false;
    state.error =
      action.payload ??
      "Failed to delete subscription plan";
  }
)

.addCase(selectSubscriptionPlanThunk.pending,(state)=>{
  state.selectPlanLoading=true;
  state.error=null
})
.addCase(selectSubscriptionPlanThunk.fulfilled,(state)=>{
  state.selectPlanLoading=false
  state.error = null;
})
.addCase(selectSubscriptionPlanThunk.rejected,(state,action)=>{
  state.selectPlanLoading=false
  state.error =
      action.payload ??
      "Failed to delete subscription plan";
})
  },
});

export const { resetSubscriptionPlanState } = subscriptionPlanSlice.actions;

export default subscriptionPlanSlice.reducer;
