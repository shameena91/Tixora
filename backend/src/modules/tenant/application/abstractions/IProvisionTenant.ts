export interface IProvisionTenant {
  execute(companyId: string,companyName:string): Promise<string>;
}