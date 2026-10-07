import { IProvisionTenant } from "../abstractions/IProvisionTenant.js";
import { ITenantProvisioningService } from "../ports/ITenantProvisioningService.js";

export class ProvisionTenant implements IProvisionTenant{
  constructor(
    private readonly tenantProvisioningService: ITenantProvisioningService,
  ) {}

  async execute(companyId: string): Promise<string> {
    return await this.tenantProvisioningService.provision(
      companyId,
    );
  }
}