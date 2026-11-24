import type { Employee } from "../../../modules/company-admin/types/EmployeeUI";

export interface EmployeePagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface GetAllEmployeesResponse {
  data: Employee[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface EmployeeState {
  employees: Employee[];
  availableEmployees: Employee[];
  selectedEmployee: Employee | null;
  pagination: EmployeePagination;
  isLoading: boolean;
  error: string | null;
  isAvailableEmployeesLoading: boolean;
  isResendingInvitation: boolean;
  resendInvitationError: string | null;
  isStatusUpdating: boolean;
}

export const initialState: EmployeeState = {
  employees: [],
    availableEmployees: [],
  selectedEmployee: null,
  pagination: {
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
  },
  isLoading: false,
  isStatusUpdating: false,
  error: null,
  isAvailableEmployeesLoading: false,
  isResendingInvitation: false,
  resendInvitationError: null,
};