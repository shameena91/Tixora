import { PermissionCode } from "../../../../shared/constants/permissionCatalog";
import { Role, RoleStatus } from "../entities/Role";


export interface CreateRoleData {
  name: string;
  description: string;
  permissions: PermissionCode[];
  status:RoleStatus
}

export interface UpdateRoleData {
  name?: string;
  description?: string;
  permissions?: PermissionCode[];

}

export interface IRoleRepository {
  create(data: CreateRoleData): Promise<Role>;

  findById(id: string): Promise<Role | null>;

  findByName(name: string): Promise<Role | null>;

  findAll(): Promise<Role[]>;

  update(
    id: string,
    data: UpdateRoleData,
  ): Promise<Role | null>;

  delete(id: string): Promise<boolean>;

  updateStatus(
  id: string,
  roleStatus: RoleStatus,
): Promise<Role | null>;
}