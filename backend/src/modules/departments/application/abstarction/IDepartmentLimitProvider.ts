export interface IDepartmentLimitProvider {
  getDepartmentLimit(companyId: string): Promise<number|null>;
}