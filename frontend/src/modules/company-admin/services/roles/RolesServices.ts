import { ROLE_ROUTES } from "../../../../shared/constants/apiRoutes";

import axiosInstance from "../../../auth/api/axiosInstance";
import type { CreateRoleDTO, UpdateRoleDTO, UpdateRoleStatusDTO } from "../../types/roles/RoleUI";


// Create Role
export const createRole = async (
  data: CreateRoleDTO,
) => {
  const response = await axiosInstance.post(
    ROLE_ROUTES.BASE,
    data,
  );

  return response.data.data;
};

// Get All Roles
export const getAllRoles = async () => {
  const response = await axiosInstance.get(
    ROLE_ROUTES.BASE,
  );

  return response.data.data;
};

// Get Role By ID
export const getRoleById = async (
  roleId: string,
) => {
  const response = await axiosInstance.get(
    ROLE_ROUTES.BY_ID(roleId),
  );

  return response.data.data;
};

// Update Role
export const updateRole = async (
  roleId: string,
  data: UpdateRoleDTO,
) => {
  const response = await axiosInstance.patch(
    ROLE_ROUTES.BY_ID(roleId),
    data,
  );

  return response.data.data;
};

// Activate / Deactivate Role
export const updateRoleStatus = async (
  roleId: string,
  data: UpdateRoleStatusDTO,
) => {
  const response = await axiosInstance.patch(
    ROLE_ROUTES.UPDATE_STATUS(roleId),
    data,
  );

  return response.data.data;
};