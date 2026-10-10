
import axiosInstance from "../../auth/api/axiosInstance";
import { DEPARTMENT_ROUTES } from "../../../shared/constants/apiRoutes";
import type {
  CreateDepartmentRequest,
  UpdateDepartmentRequest,
} from "../types/departmentTypes";

export const createDepartment = async (
  data: CreateDepartmentRequest,
) => {
  const response = await axiosInstance.post(
    DEPARTMENT_ROUTES.BASE,
    data,
  );

  return response.data;
};

export const getAllDepartments = async (
 
  page = 1,
  limit = 10,
) => {
  const response = await axiosInstance.get(
    DEPARTMENT_ROUTES.BASE,
    {
      params: {
        
        page,
        limit,
      },
    },
  );

  return response.data.data;
};

export const getDepartmentById = async (
  departmentId: string,
) => {
  const response = await axiosInstance.get(
    DEPARTMENT_ROUTES.BY_ID(departmentId),
  );
console.log("response",response.data.data)
  return response.data.data;
};

export const updateDepartment = async (
  departmentId: string,
  data: UpdateDepartmentRequest,
) => {
  const response = await axiosInstance.patch(
    DEPARTMENT_ROUTES.BY_ID(departmentId),
    data,
  );

  return response.data.data;
};

export const updateDepartmentStatus = async (
  departmentId: string,
  status: "ACTIVE" | "INACTIVE",
) => {
  const response = await axiosInstance.patch(
    DEPARTMENT_ROUTES.UPDATE_STATUS(departmentId),{status}
  );

  return response.data.data;
};





