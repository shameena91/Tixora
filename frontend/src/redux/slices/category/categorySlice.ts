import { createSlice } from "@reduxjs/toolkit";


import {
  createCategoryThunk,
  getCategoriesByDepartmentThunk,
  getCategoryDetailsThunk,
} from "./categoryThunk";
import type { Category } from "../../../modules/company-admin/types/categoryTypes";

interface CategoryState {
  categories: Category[];
  isFetching: boolean;
  isCreating: boolean;
  fetchError: string | null;
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  
categoryDetails: Category | null;
isFetchingDetails: boolean;
detailsError: string | null;

}

const initialState: CategoryState = {
  categories: [],
  isFetching: false,
  isCreating: false,
  fetchError: null,
  total: 0,
  page: 1,
  limit: 10,
  totalPages: 0,
  
categoryDetails: null,
isFetchingDetails: false,
detailsError: null,

};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesByDepartmentThunk.pending, (state) => {
        state.isFetching = true;
        state.fetchError = null;
      })
      .addCase(
        getCategoriesByDepartmentThunk.fulfilled,
        (state, action) => {
          state.isFetching = false;
          state.categories = action.payload.data;
          state.total = action.payload.total;
          state.page = action.payload.page;
          state.limit = action.payload.limit;
          state.totalPages = action.payload.totalPages;
        },
      )
      .addCase(
        getCategoriesByDepartmentThunk.rejected,
        (state, action) => {
          state.isFetching = false;
          state.fetchError =
            action.payload ?? "Failed to fetch categories";
        },
      )
      .addCase(createCategoryThunk.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createCategoryThunk.fulfilled, (state) => {
        state.isCreating = false;
      })
      .addCase(createCategoryThunk.rejected, (state) => {
        state.isCreating = false;
      })
      
.addCase(getCategoryDetailsThunk.pending, (state) => {
  state.isFetchingDetails = true;
  state.detailsError = null;
  state.categoryDetails = null;
})
.addCase(
  getCategoryDetailsThunk.fulfilled,
  (state, action) => {
    state.isFetchingDetails = false;
    state.categoryDetails = action.payload;
  },
)
.addCase(
  getCategoryDetailsThunk.rejected,
  (state, action) => {
    state.isFetchingDetails = false;
    state.detailsError =
      action.payload ?? "Failed to fetch category details";
  },
);

  },
});

export default categorySlice.reducer;