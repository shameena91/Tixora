import type { RoleResponseDTO } from "../../../modules/company-admin/types/roles/RoleUI";

export interface RoleState {
  roles: RoleResponseDTO[];

  isLoading: boolean;
  error: string | null;

  isFetching: boolean;
  fetchError: string | null;

  selectedRole: RoleResponseDTO | null;
  isDetailsLoading: boolean;
  detailsError: string | null;

  isUpdating: boolean;
  updateError: string | null;

  isStatusUpdating: boolean;
  statusError: string | null;
}

export const initialState: RoleState = {
  roles: [],

  isLoading: false,
  error: null,

  isFetching: false,
  fetchError: null,

  selectedRole: null,
  isDetailsLoading: false,
  detailsError: null,

  isUpdating: false,
  updateError: null,

  isStatusUpdating: false,
  statusError: null,
};