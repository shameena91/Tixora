
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { createDepartmentThunk, getAllDepartmentsThunk, getDepartmentByIdThunk } from "./departmentThunk";
import type { Department } from "../../../modules/department/types/departmentTypes";

interface DepartmentState {
  departments: Department[];
  isLoading: boolean;
  error: string | null;

  isFetching: boolean;
  fetchError: string | null;
   page: number;
  limit: number;
  total: number;
  totalPages: number;
  selectedDepartment: Department | null;
isDetailsLoading: boolean;
detailsError: string | null;

}

const initialState: DepartmentState = {
  departments: [],
  isLoading: false,
  error: null,

  isFetching: false,
  fetchError: null,

  selectedDepartment: null,
isDetailsLoading: false,
detailsError: null,
   page: 1,
  limit: 10,
  total: 0,
  totalPages: 0,
};

;

const departmentSlice = createSlice({
  name: "departments",
  initialState,
  reducers: {
    clearDepartmentError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createDepartmentThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        createDepartmentThunk.fulfilled,
        (state, action: PayloadAction<Department>) => {
          state.isLoading = false;
          state.departments.unshift(action.payload);
        },
      )
      .addCase(createDepartmentThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "Failed to create department";
      })
      .addCase(getAllDepartmentsThunk.pending, (state) => {
        state.isFetching = true;
        state.fetchError = null;
      })

      
      .addCase(getAllDepartmentsThunk.fulfilled, (state, action) => {
        state.isFetching = false;

        state.departments = action.payload.data;
        state.page = action.payload.page;
        state.limit = action.payload.limit;
        state.total = action.payload.total;
        state.totalPages = action.payload.totalPages;
      })

      
      .addCase(getAllDepartmentsThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.fetchError =
          typeof action.payload === "string"
            ? action.payload
            : action.error.message ?? "Failed to fetch departments";
      })
      
.addCase(getDepartmentByIdThunk.pending, (state) => {
  state.isDetailsLoading = true;
  state.detailsError = null;
  state.selectedDepartment = null;
})


.addCase(getDepartmentByIdThunk.fulfilled, (state, action) => {
  state.isDetailsLoading = false;
  state.selectedDepartment = action.payload;
})


.addCase(getDepartmentByIdThunk.rejected, (state, action) => {
  state.isDetailsLoading = false;
  state.detailsError =
    typeof action.payload === "string"
      ? action.payload
      : action.error.message ?? "Failed to fetch department details";
});
  },
});

export const { clearDepartmentError } = departmentSlice.actions;

export default departmentSlice.reducer;

