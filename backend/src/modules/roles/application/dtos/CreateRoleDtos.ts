import { PermissionCode } from "../../../../shared/constants/permissionCatalog";
import { RoleStatus } from "../../domain/entities/Role";



export interface CreateRoleDTO {
  name: string;
  description: string;
  permissions: PermissionCode[];
 
}

export interface RoleResponseDTO {
  id: string;
  name: string;
  description: string;
  permissions: PermissionCode[];
  isSystemRole: boolean;
  status: RoleStatus;
  createdAt: Date;
  updatedAt: Date;
}