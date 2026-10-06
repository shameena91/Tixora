
import { IBaseRepository } from "../../../../../shared/repository/IBaseRepository";
import { TenantCreateData } from "../../../application/mappers/TenantMapper";
import { Tenant } from "../Tenant";


export interface ITenantRepository
  extends IBaseRepository<Tenant,TenantCreateData>
{
  findByCompanyId(
    companyId: string,
  ): Promise<Tenant| null>;
}