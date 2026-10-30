import { PermissionCode } from "../../../../shared/constants/permissionCatalog";
import { Role, RoleStatus } from "../../domain/entities/Role";


export interface RoleCreateData {
  name: string;
  description: string;
  permissions: PermissionCode[];
  isSystemRole: boolean;
  status:RoleStatus
}

export interface RoleDocumentData {
  _id: {
    toString(): string;
  };
  name: string;
  description: string;
  permissions: PermissionCode[];
  isSystemRole: boolean;
  roleStatus:RoleStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class RoleMapper {
  static toDomain(document: RoleDocumentData): Role {
    return new Role(
      document._id.toString(),
      document.name,
      document.description,
      document.permissions,
      
      document.isSystemRole,
      document.roleStatus,
      document.createdAt,
      document.updatedAt,
    );
  }

  static toPersistence(role: Role): RoleCreateData {
    return {
      name: role.name,
      description: role.description,
      permissions: role.permissions,
      isSystemRole: role.isSystemRole,
      status:role.status
    };
  }
}