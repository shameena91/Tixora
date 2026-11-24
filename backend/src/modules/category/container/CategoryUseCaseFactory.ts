import { comapnyRepository } from "../../company/container/container";
import { tenantDatabaseManager } from "../../tenant/container/Container";

import type { ICategoryUseCaseFactory } from "../application/abstraction/ICategoryUseCaseFactory";

import { DepartmentRepositoryFactory } from "../../departments/infrastructure/database/repositories/DepartmentRepositoryFactory";
import { CategoryRepositoryFactory } from "../infrastructure/database/repositories/CategoryRepositoryFactory";

import { CreateCategory } from "../application/usecases/CreateCategory";
import { GetAllCategories } from "../application/usecases/GetAllCategories";
import { UpdateCategory } from "../application/usecases/UpdateCategory";
import { UpdateCategoryStatus } from "../application/usecases/UpdateCategoryStatus";
import { GetCategoryDetails } from "../application/usecases/GetCategoryDetails";
import { AssignEmployees } from "../application/usecases/AssignEmployee";
import { RemoveEmployee } from "../../employees/application/usecases/RemoveEmployee";
import { EmployeeRepositoryFactory } from "../../employees/infrastructure/database/repositotres/EmployeeRepositoryFactory";
import { RoleRepositoryFactory } from "../../roles/infrastructure/database/repositories/RoleRepositoryFactory";

export class CategoryUseCaseFactory
  implements ICategoryUseCaseFactory
{
  constructor(
    private readonly _categoryRepositoryFactory =
      new CategoryRepositoryFactory(),

    private readonly _departmentRepositoryFactory =
      new DepartmentRepositoryFactory(),
        private readonly _employeeRepositoryFactory =
    new EmployeeRepositoryFactory(),

  private readonly _roleRepositoryFactory =
    new RoleRepositoryFactory(),
  ) {}

  async createForAccount(accountId: string) {
  
    const company =
      await comapnyRepository.findByAccountId(accountId);

    if (!company) {
      return null;
    }

  
    const databaseName = `tixora_tenant_${company.id}`;

    const tenantConnection =
      await tenantDatabaseManager.connect(databaseName);

  
    const categoryRepository =
      this._categoryRepositoryFactory.create(tenantConnection);

    const departmentRepository =
      this._departmentRepositoryFactory.create(tenantConnection);
      
const employeeRepository =
  this._employeeRepositoryFactory.create(tenantConnection);

const roleRepository =
  this._roleRepositoryFactory.createRepository(tenantConnection);
    return {
      createCategory: new CreateCategory(
        categoryRepository,
        departmentRepository,
      ),

 
      getAllCategories: new GetAllCategories(
        categoryRepository,
        departmentRepository
      ),

      updateCategory: new UpdateCategory(
        categoryRepository,
      ),

      updateCategoryStatus: new UpdateCategoryStatus(
        categoryRepository,
      ),

      getCategoryDetails:new GetCategoryDetails(
         categoryRepository,
      ),
assignEmployeesToCategory: new AssignEmployees(
  categoryRepository,
  employeeRepository,
  roleRepository,
),

removeEmployeeFromCategory: new RemoveEmployee(
  categoryRepository,
  employeeRepository,
),

    };
  }
}