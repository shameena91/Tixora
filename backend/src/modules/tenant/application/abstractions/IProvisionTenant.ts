export interface IProvisionTenant {
  execute(companyId: string): Promise<string>;
}