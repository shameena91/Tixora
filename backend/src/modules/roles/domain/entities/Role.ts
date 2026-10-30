import { PermissionCode } from "../../../../shared/constants/permissionCatalog";
export enum RoleStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export class Role {
  constructor(
    public readonly id: string,
    public name: string,
    public description: string,
    public permissions: PermissionCode[],
    public readonly isSystemRole: boolean,
    public status: RoleStatus,
    public readonly createdAt: Date,
    public updatedAt: Date,
  ) {}

  public updateDetails(
    name: string,
    description: string,
    permissions: PermissionCode[],
  ): void {
    this.name = name.trim();
    this.description = description.trim();
    this.permissions = [...new Set(permissions)];
    this.updatedAt = new Date();
  }
  public activate(): void {
  this.status = RoleStatus.ACTIVE;
  this.updatedAt = new Date();
}

public deactivate(): void {
  this.status = RoleStatus.INACTIVE;
  this.updatedAt = new Date();
}
}