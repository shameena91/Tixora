import { PermissionCode } from "../../../../shared/constants/permissionCatalog";

export interface UpdateRoleDTO {
  name?: string;
  description?: string;
  permissions?: PermissionCode[];
}