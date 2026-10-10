import { ITenantProvisioningService } from "../../application/ports/ITenantProvisioningService.js";
import { TenantDatabaseManager } from "../../infrastructure/database/TenantDatabaseManager.js";
import { TenantDatabaseProvisioner } from "../../infrastructure/database/TenantDatabaseProvisioner.js";

export class TenantProvisioningService implements ITenantProvisioningService {
  constructor(
    private readonly tenantDatabaseManager: TenantDatabaseManager,
    private readonly tenantDatabaseProvisioner: TenantDatabaseProvisioner,
  ) {}

 async provision(companyId: string): Promise<string> {
  const databaseName = `tixora_tenant_${companyId}`;

  console.log("Database name:", databaseName);

  const connection =
    await this.tenantDatabaseManager.connect(databaseName);

  console.log("Tenant database connected");

  try {
    await this.tenantDatabaseProvisioner.provision(connection);
  } finally {
    await this.tenantDatabaseManager.close(databaseName);
  }

  return databaseName;
}
}