import { EMPLOYEE_ROUTES } from "../../../../shared/constants/apiRoutes";

import axiosInstance from "../../../auth/api/axiosInstance";

import type {
  CreateEmployeePayload,
  UpdateEmployeePayload,
} from "../../types/EmployeeUI";

// Create Employee
export const createEmployee = async (
  data: CreateEmployeePayload,
) => {
  const response = await axiosInstance.post(
    EMPLOYEE_ROUTES.BASE,
    data,
  );

  return response.data.data;
};

// Get All Employees
export const getAllEmployees = async (
  page: number,
  limit: number,
  search: string,
  departmentId?:string,
  categoryId?:string,
   excludeCategoryId?: string
) => {
  console.log("search",search)
  const response = await axiosInstance.get(
    EMPLOYEE_ROUTES.BASE,
    {
      params: {
        page,
        limit,
        search,
        departmentId,
        categoryId,
          excludeCategoryId,
      },
    },
  );

  return response.data.data;
};

// Get Employee By ID
export const getEmployeeById = async (
  employeeId: string,
) => {
  console.log("getEmployeeById",employeeId)
  const response = await axiosInstance.get(
    EMPLOYEE_ROUTES.BY_ID(employeeId),
  );
console.log("Employby idbbbbb", response.data.data)
  return response.data.data;
};

// Update Employee
export const updateEmployee = async (
  employeeId: string,
  data: UpdateEmployeePayload,
) => {
  const response = await axiosInstance.put(
    EMPLOYEE_ROUTES.BY_ID(employeeId),
    data,
  );

  return response.data.data;
};

// Activate / Deactivate Employee
export const updateEmployeeStatus = async (
  employeeId: string,
  status: "ACTIVE" | "INACTIVE",
) => {

  console.log("employeeIddddddd",employeeId)
  
  const response = await axiosInstance.patch(
    EMPLOYEE_ROUTES.UPDATE_STATUS(employeeId),
    { status },
  );

  return response.data.data;
};

export const resendEmployeeInvitation = async (
  accountId: string,
) => {
  const response = await axiosInstance.post(
    EMPLOYEE_ROUTES.RESEND_INVITATION,
    { accountId },
  );

  return response.data.data;
};