import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import type { CreateRoleDTO, RoleResponseDTO, RoleStatus, UpdateRoleDTO } from "../../../modules/company-admin/types/roles/RoleUI";
import { createRole, getAllRoles, getRoleById, updateRole, updateRoleStatus } from "../../../modules/company-admin/services/roles/RolesServices";


// Create Role
export const createRoleThunk = createAsyncThunk<
  RoleResponseDTO,
  CreateRoleDTO,
  { rejectValue: string }
>(
  "roles/createRole",
  async (data, { rejectWithValue }) => {
    try {
      return await createRole (data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to create role",
        );
      }

      return rejectWithValue("Failed to create role");
    }
  },
);

// Get All Roles
export const getAllRolesThunk = createAsyncThunk<
  RoleResponseDTO[],
  void,
  { rejectValue: string }
>(
  "roles/getAllRoles",
  async (_, { rejectWithValue }) => {
    try {
      return await getAllRoles();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch roles",
        );
      }

      return rejectWithValue("Failed to fetch roles");
    }
  },
);

// Get Role By ID
export const getRoleByIdThunk = createAsyncThunk<
  RoleResponseDTO,
  string,
  { rejectValue: string }
>(
  "roles/getRoleById",
  async (roleId, { rejectWithValue }) => {
    try {
      return await getRoleById (roleId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to fetch role details",
        );
      }

      return rejectWithValue("Failed to fetch role details");
    }
  },
);

// Update Role
export const updateRoleThunk = createAsyncThunk<
  RoleResponseDTO,
  { roleId: string; data: UpdateRoleDTO },
  { rejectValue: string }
>(
  "roles/updateRole",
  async ({ roleId, data }, { rejectWithValue }) => {
    try {
      return await updateRole (roleId, data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to update role",
        );
      }

      return rejectWithValue("Failed to update role");
    }
  },
);

// Activate / Deactivate Role
export const updateRoleStatusThunk = createAsyncThunk<
  RoleResponseDTO,
  { roleId: string; roleStatus: RoleStatus },
  { rejectValue: string }
>(
  "roles/updateRoleStatus",
  async ({ roleId, roleStatus }, { rejectWithValue }) => {
    try {
      return await updateRoleStatus (roleId, {roleStatus});
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(
          error.response?.data?.message || "Failed to update role status",
        );
      }

      return rejectWithValue("Failed to update role status");
    }
  },
);