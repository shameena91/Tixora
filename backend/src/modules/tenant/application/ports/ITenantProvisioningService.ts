export interface ITenantProvisioningService {
  provision(companyId: string): Promise<string>;
}