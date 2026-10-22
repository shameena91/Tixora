
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createDepartment, getAllDepartments, getDepartmentById } from "../../../modules/company-admin/services/department/DepartmentServices";
import type { CreateDepartmentRequest, Department, DepartmentListResponse } from "../../../modules/company-admin/types/departmentTypes";

export const createDepartmentThunk = createAsyncThunk<
  Awaited<ReturnType<typeof createDepartment>>,
  CreateDepartmentRequest,
  { rejectValue: string }
>(
  "departments/create",
  async (data, { rejectWithValue }) => {
    try {
      return await createDepartment(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to create department",
        );
      }

      return rejectWithValue(
        "Failed to create department",
      );
    }
  },
);


export const getAllDepartmentsThunk = createAsyncThunk<
  DepartmentListResponse,
  {
    page: number;
    limit: number;
  },
  { rejectValue: string }
>(
  "department/getAllDepartments",
  async (
    { page, limit },
    { rejectWithValue },
  ) => {
    try {
      const response = await getAllDepartments(
        page,
        limit,
      );

      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch departments",
        );
      }

      return rejectWithValue(
        "Failed to fetch departments",
      );
    }
  },
);



export const getDepartmentByIdThunk = createAsyncThunk<
  Department,
  string,
  { rejectValue: string }
>(
  "department/getDepartmentById",
  async (departmentId, { rejectWithValue }) => {
    try {
      return await getDepartmentById(departmentId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message ||
            "Failed to fetch department details",
        );
      }

      return rejectWithValue(
        "Failed to fetch department details",
      );
    }
  },
);
