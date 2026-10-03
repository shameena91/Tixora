export enum TenantStatus {
  PROVISIONING = "PROVISIONING",
  ACTIVE = "ACTIVE",
  FAILED = "FAILED",
  SUSPENDED = "SUSPENDED",
}

export class Tenant {
  constructor(
    public id: string,
    public companyId: string,
    public databaseName: string,
    public status: TenantStatus,
    public createdAt: Date,
    public updatedAt: Date,
  ) {}
}