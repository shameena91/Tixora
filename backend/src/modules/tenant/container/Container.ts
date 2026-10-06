import { TenantDatabaseManager } from "../infrastructure/database/TenantDatabaseManager";
import { TenantDatabaseProvisioner } from "../infrastructure/database/TenantDatabaseProvisioner";
import { TenantProvisioningService } from "../infrastructure/services/TenantProvisioningService";

const tenantDatabaseManager = new TenantDatabaseManager();

const tenantDatabaseProvisioner =
  new TenantDatabaseProvisioner();

export const tenantProvisioningService =
  new TenantProvisioningService(
    tenantDatabaseManager,
    tenantDatabaseProvisioner,
  );