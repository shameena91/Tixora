import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type {
  CategoriesPaginationResponse,
  Category,
  CategoryFormData,
} from "../../../modules/company-admin/types/categoryTypes";

import {
  createCategory,
  getCategoriesByDepartment,
  getCategoryDetails,
} from "../../../modules/company-admin/services/category/CategoryServices";

// Fetch all categories or filter by department
export const getCategoriesByDepartmentThunk =
  createAsyncThunk<
    CategoriesPaginationResponse,
    {
      departmentId?: string;
      page: number;
      limit: number;
    },
    { rejectValue: string }
  >(
    "category/getAll",
    async (params, { rejectWithValue }) => {
      try {
        return await getCategoriesByDepartment(
          params.departmentId,
          params.page,
          params.limit,
        );
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          const message = error.response?.data?.message;

          return rejectWithValue(
            typeof message === "string"
              ? message
              : "Failed to fetch categories",
          );
        }

        return rejectWithValue("Failed to fetch categories");
      }
    },
  );

// Create category — departmentId remains required
export const createCategoryThunk = createAsyncThunk<
  Category,
  {
    departmentId: string;
    data: CategoryFormData;
  },
  { rejectValue: string }
>(
  "category/create",
  async ({ departmentId, data }, { rejectWithValue }) => {
    try {
      return await createCategory(departmentId, data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        return rejectWithValue(
          typeof message === "string"
            ? message
            : "Failed to create category",
        );
      }

      return rejectWithValue("Failed to create category");
    }
  },
);


export const getCategoryDetailsThunk = createAsyncThunk<
  Category,
  string,
  { rejectValue: string }
>(
  "category/getDetails",
  async (categoryId, { rejectWithValue }) => {
    try {
      return await getCategoryDetails(categoryId);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message;

        return rejectWithValue(
          typeof message === "string"
            ? message
            : "Failed to fetch category details",
        );
      }

      return rejectWithValue(
        "Failed to fetch category details",
      );
    }
  },
);
