export type RoleStatus = "ACTIVE" | "INACTIVE";

export interface RoleResponseDTO {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystemRole: boolean;
  status: RoleStatus;
  createdAt: string;
  updatedAt: string;
}


export interface RoleListItem extends RoleResponseDTO {
  assignedUsersCount?: number;
}

export interface CreateRoleDTO {
  name: string;
  description: string;
  permissions: string[];
}

export interface UpdateRoleDTO {
  name?: string;
  description?: string;
  permissions?: string[];
}

export interface UpdateRoleStatusDTO {
  roleStatus: RoleStatus;
}