import { createAsyncThunk } from "@reduxjs/toolkit";

import {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  resendEmployeeInvitation,
  updateEmployee,
  updateEmployeeStatus,
} from "../../../modules/company-admin/services/employee/employeeService";
import type { CreateEmployeePayload, Employee, UpdateEmployeePayload } from "../../../modules/company-admin/types/EmployeeUI";
import type { GetAllEmployeesResponse } from "./employeeTypes";



// Create Employee
export const createEmployeeThunk = createAsyncThunk<
  Employee,
  CreateEmployeePayload,
  { rejectValue: string }
>(
  "employee/createEmployee",
  async (data, { rejectWithValue }) => {
    try {
      return await createEmployee(data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create employee",
      );
    }
  },
);

// Get All Employees
export const getAllEmployeesThunk = createAsyncThunk<
  GetAllEmployeesResponse,
  {
    page: number;
    limit: number;
    search: string;
    departmentId?: string;
    categoryId?:string;
    excludeCategoryId?: string;
  },
  { rejectValue: string }
>(
  "employee/getAllEmployees",
  async (params, { rejectWithValue }) => {
    try {
      return await getAllEmployees(
        params.page,
        params.limit,
        params.search,
        params.departmentId,
        params.categoryId,
        params.excludeCategoryId
      );
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to fetch employees",
      );
    }
  },
);

// Get Employee By ID
export const getEmployeeByIdThunk = createAsyncThunk<
  Employee,
  string,
  { rejectValue: string }
>(
  "employee/getEmployeeById",
  async (employeeId, { rejectWithValue }) => {
    try {
      return await getEmployeeById(employeeId);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch employee",
      );
    }
  },
);

// Update Employee
export const updateEmployeeThunk = createAsyncThunk<
  Employee,
  { employeeId: string; data: UpdateEmployeePayload },
  { rejectValue: string }
>(
  "employee/updateEmployee",
  async ({ employeeId, data }, { rejectWithValue }) => {
    try {
      return await updateEmployee(employeeId, data);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update employee",
      );
    }
  },
);


export const updateEmployeeStatusThunk = createAsyncThunk<
  void,
  { employeeId: string; status: "ACTIVE" | "INACTIVE" },
  { rejectValue: string }
>(
  "employee/updateEmployeeStatus",
  async ({ employeeId, status }, { rejectWithValue }) => {
    try {
      await updateEmployeeStatus(employeeId, status);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Failed to update employee status"
      );
    }
  }
);
export const resendEmployeeInvitationThunk = createAsyncThunk<
  void,
  string,
  { rejectValue: string }
>(
  "employee/resendInvitation",
  async (accountId, { rejectWithValue }) => {
    try {
      await resendEmployeeInvitation(accountId);
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to resend invitation",
      );
    }
  },
);
