import { createSlice } from "@reduxjs/toolkit";



import {
  createEmployeeThunk,
  getAllEmployeesThunk,
  getEmployeeByIdThunk,
  updateEmployeeThunk,
  updateEmployeeStatusThunk,
  resendEmployeeInvitationThunk,
} from "./employeeThunks";
import { initialState } from "./employeeTypes";


const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    clearEmployeeError: (state) => {
      state.error = null;
    },

    clearSelectedEmployee: (state) => {
      state.selectedEmployee = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Create Employee
      .addCase(createEmployeeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createEmployeeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.employees.unshift(action.payload);
      })
      .addCase(createEmployeeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to create employee";
      })

      // Get All Employees
    // Get All Employees
.addCase(getAllEmployeesThunk.pending, (state, action) => {
  state.error = null;

  if (action.meta.arg.excludeCategoryId) {
    state.isAvailableEmployeesLoading = true;
  } else {
    state.isLoading = true;
  }
})
.addCase(getAllEmployeesThunk.fulfilled, (state, action) => {
  if (action.meta.arg.excludeCategoryId) {
    state.isAvailableEmployeesLoading = false;
    state.availableEmployees = action.payload.data;
  } else {
    state.isLoading = false;
    state.employees = action.payload.data;

    state.pagination = {
      total: action.payload.total,
      page: action.payload.page,
      limit: action.payload.limit,
      totalPages: action.payload.totalPages,
    };
  }
})
    .addCase(getAllEmployeesThunk.rejected, (state, action) => {
  if (action.meta.arg.excludeCategoryId) {
    state.isAvailableEmployeesLoading = false;
  } else {
    state.isLoading = false;
    state.error = action.payload ?? "Failed to fetch employees";
  }
})

      // Get Employee By ID
      .addCase(getEmployeeByIdThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getEmployeeByIdThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedEmployee = action.payload;
      })
      .addCase(getEmployeeByIdThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to fetch employee";
      })

      // Update Employee
      .addCase(updateEmployeeThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(updateEmployeeThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedEmployee = action.payload;

        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id,
        );

        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(updateEmployeeThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? "Failed to update employee";
      })

      // Update Employee Status
.addCase(updateEmployeeStatusThunk.pending, (state) => {
  state.isStatusUpdating = true;
  state.error = null;
})

.addCase(updateEmployeeStatusThunk.fulfilled, (state, action) => {
  state.isStatusUpdating = false;

  const { employeeId, status } = action.meta.arg;

  // Update employee in employee list
  const employee = state.employees.find(
    (item) =>
      item &&
      (item.id === employeeId || item.accountId === employeeId)
  );

  if (employee) {
    employee.status = status;
  }

  // Update selected employee
  if (
    state.selectedEmployee &&
    (
      state.selectedEmployee.id === employeeId ||
      state.selectedEmployee.accountId === employeeId
    )
  ) {
    state.selectedEmployee.status = status;
  }
})

.addCase(updateEmployeeStatusThunk.rejected, (state, action) => {
  state.isStatusUpdating = false;
  state.error =
    action.payload ?? "Failed to update employee status";
})
            // Resend Employee Invitation
      .addCase(resendEmployeeInvitationThunk.pending, (state) => {
        state.isResendingInvitation = true;
        state.resendInvitationError = null;
      })
      .addCase(resendEmployeeInvitationThunk.fulfilled, (state) => {
        state.isResendingInvitation = false;
      })
      .addCase(resendEmployeeInvitationThunk.rejected, (state, action) => {
        state.isResendingInvitation = false;
        state.resendInvitationError =
          action.payload ?? "Failed to resend invitation";
      });
  },
});

export const {
  clearEmployeeError,
  clearSelectedEmployee,
} = employeeSlice.actions;

export default employeeSlice.reducer;
