import { createSlice } from "@reduxjs/toolkit";


import {
  createRoleThunk,
  getAllRolesThunk,
  getRoleByIdThunk,
  updateRoleThunk,
  updateRoleStatusThunk,
} from "./roleThunk";
import { initialState } from "./roleTypes";



const roleSlice = createSlice({
  name: "roles",

  initialState,

  reducers: {
    clearRoleError(state) {
      state.error = null;
      state.fetchError = null;
      state.detailsError = null;
      state.updateError = null;
      state.statusError = null;
    },

    clearSelectedRole(state) {
      state.selectedRole = null;
      state.detailsError = null;
    },
  },

  extraReducers: (builder) => {
    builder

      // Create Role
      .addCase(createRoleThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      .addCase(createRoleThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.roles.unshift(action.payload);
      })

      .addCase(createRoleThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.payload ?? action.error.message ?? "Failed to create role";
      })

      // Get All Roles
      .addCase(getAllRolesThunk.pending, (state) => {
        state.isFetching = true;
        state.fetchError = null;
      })

      .addCase(getAllRolesThunk.fulfilled, (state, action) => {
        state.isFetching = false;
        state.roles = action.payload;
      })

      .addCase(getAllRolesThunk.rejected, (state, action) => {
        state.isFetching = false;
        state.fetchError =
          action.payload ?? action.error.message ?? "Failed to fetch roles";
      })

      // Get Role By ID
      .addCase(getRoleByIdThunk.pending, (state) => {
        state.isDetailsLoading = true;
        state.detailsError = null;
        state.selectedRole = null;
      })

      .addCase(getRoleByIdThunk.fulfilled, (state, action) => {
        state.isDetailsLoading = false;
        state.selectedRole = action.payload;
      })

      .addCase(getRoleByIdThunk.rejected, (state, action) => {
        state.isDetailsLoading = false;
        state.detailsError =
          action.payload ?? action.error.message ?? "Failed to fetch role details";
      })

      // Update Role
      .addCase(updateRoleThunk.pending, (state) => {
        state.isUpdating = true;
        state.updateError = null;
      })

      .addCase(updateRoleThunk.fulfilled, (state, action) => {
        state.isUpdating = false;

        state.roles = state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role,
        );

        if (state.selectedRole?.id === action.payload.id) {
          state.selectedRole = action.payload;
        }
      })

      .addCase(updateRoleThunk.rejected, (state, action) => {
        state.isUpdating = false;
        state.updateError =
          action.payload ?? action.error.message ?? "Failed to update role";
      })

      // Update Role Status
      .addCase(updateRoleStatusThunk.pending, (state) => {
        state.isStatusUpdating = true;
        state.statusError = null;
      })

      .addCase(updateRoleStatusThunk.fulfilled, (state, action) => {
        state.isStatusUpdating = false;

        state.roles = state.roles.map((role) =>
          role.id === action.payload.id ? action.payload : role,
        );

        if (state.selectedRole?.id === action.payload.id) {
          state.selectedRole = action.payload;
        }
      })

      .addCase(updateRoleStatusThunk.rejected, (state, action) => {
        state.isStatusUpdating = false;
        state.statusError =
          action.payload ?? action.error.message ?? "Failed to update role status";
      });
  },
});

export const {
  clearRoleError,
  clearSelectedRole,
} = roleSlice.actions;

export default roleSlice.reducer;