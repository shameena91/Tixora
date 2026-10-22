import type { IDepartmentUseCaseFactory } from "../application/abstarction/IDepartmentUseCaseFactory";

import { CreateDepartment } from "../application/usecases/CreateDepartment";
import { GetAllDepartment } from "../application/usecases/GetAllDepartment";

import { DepartmentRepositoryFactory } from "../infrastructure/database/repositories/DepartmentRepositoryFactory";

import { comapnyRepository } from "../../company/container/container";
import { tenantDatabaseManager } from "../../tenant/container/Container";
import { GetDepartmentDetails } from "../application/usecases/GetDepartmentDetails";
import { UpdateDepartmentStatus } from "../application/usecases/UpdateDepartmentStatus";
import { UpdateDepartment } from "../application/usecases/UpdateDepartment";
import { DepartmentLimitProvider } from "../application/usecases/DepartmentLimitProvider";
import { subscriptionPlanRepository, subscriptionRepository } from "../../SubScriptionPlans/container/Container";

export class DepartmentUseCaseFactory
  implements IDepartmentUseCaseFactory
{
  private readonly _departmentRepositoryFactory =
    new DepartmentRepositoryFactory();

  async createForAccount(accountId: string) {
    const company =
      await comapnyRepository.findByAccountId(accountId);

    if (!company) {
      return null;
    }

    const databaseName = `tixora_tenant_${company.id}`;

    const tenantConnection =
      await tenantDatabaseManager.connect(databaseName);

    const departmentRepository =
      this._departmentRepositoryFactory.create(
        tenantConnection,
      );
const departmentLimitProvider = new DepartmentLimitProvider(
  subscriptionRepository,
  subscriptionPlanRepository,
);
    return {
      createDepartment: new CreateDepartment(
        departmentRepository,
        departmentLimitProvider,
        company.id
      ),
      getAllDepartment: new GetAllDepartment(
        departmentRepository,
      ),

      getDepartment:new GetDepartmentDetails(departmentRepository),

      updateDepartmentStatus:new UpdateDepartmentStatus(departmentRepository),
      updateDepartment: new UpdateDepartment(departmentRepository),
      
    };
  }
}