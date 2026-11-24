import { HttpStatusCode } from "../../../shared/constants/httpStattusCode";
import { AppErrors } from "../../../shared/errors/AppErrors";
import { accountRepository } from "../../auth/container/dependencies";
import { CategoryRepositoryFactory } from "../../category/infrastructure/database/repositories/CategoryRepositoryFactory";
import { comapnyRepository } from "../../company/container/container";
import { DepartmentRepositoryFactory } from "../../departments/infrastructure/database/repositories/DepartmentRepositoryFactory";
import { RoleRepositoryFactory } from "../../roles/infrastructure/database/repositories/RoleRepositoryFactory";
import { tenantDatabaseManager } from "../../tenant/container/Container";
import { ICreateEmployeeInvitation } from "../application/abstarction/ICreateEmployeeInvitation";
import { IEmployeeUseCaseFactory } from "../application/abstarction/IEmployeeUseCaseFactory";
import { CreateEmployeeUseCase } from "../application/usecases/CreateEmployeeUseCase";
import { GetAllEmployeesUseCase } from "../application/usecases/GetAllEmployeesUseCase";
import { GetEmployeeByAccountIdUseCase } from "../application/usecases/GetEmployeeByAccountIdUseCase";
import { GetEmployeeById } from "../application/usecases/GetEmployeeById";
import { GetUnassignedEmployeesForCategory } from "../application/usecases/GetUnassignedEmployeesForCategory";
import { UpdateEmployee } from "../application/usecases/UpdateEmployee";
import { UpdateEmployeeStatus } from "../application/usecases/UpdateEmployeeStatus";
import { EmployeeStatus } from "../domain/entities/employee";
import { EmployeeRepositoryFactory } from "../infrastructure/database/repositotres/EmployeeRepositoryFactory";
// import { createEmployeeInvitation } from "./Container";

export class EmployeeUseCaseFactory implements IEmployeeUseCaseFactory {
  constructor(private readonly createInvitationUseCase: ICreateEmployeeInvitation){}
  private readonly _employeeRepositoryFactory =
    new EmployeeRepositoryFactory();

  private readonly _departmentRepositoryFactory =
    new DepartmentRepositoryFactory();

  private readonly _roleRepositoryFactory =
    new RoleRepositoryFactory();

  private readonly _categoryRepositoryFactory =
    new CategoryRepositoryFactory();

  async createForAccount(accountId: string) {
    const account = await accountRepository.findById(accountId);
      let companyId = account?.companyId?.toString();
     if (!companyId) {
    const company =
      await comapnyRepository.findByAccountId(accountId);

    companyId = company?.id;
  }
    if (!companyId) {
      return null;
    }

    const databaseName = `tixora_tenant_${companyId}`;

    const tenantConnection =
      await tenantDatabaseManager.connect(databaseName);

    const employeeRepository =
      this._employeeRepositoryFactory.create(tenantConnection);

    const departmentRepository =
      this._departmentRepositoryFactory.create(tenantConnection);

    const roleRepository =
      this._roleRepositoryFactory.createRepository(tenantConnection);

    const categoryRepository =
      this._categoryRepositoryFactory.create(tenantConnection);

    return {
      createEmployee: new CreateEmployeeUseCase(
        accountRepository,
        employeeRepository,
        departmentRepository,
        roleRepository,
        categoryRepository,
        this.createInvitationUseCase
       
      ),
        getAllEmployees: new GetAllEmployeesUseCase(
    employeeRepository,
    accountRepository,
      departmentRepository,
  roleRepository,
),
updateEmployee: new UpdateEmployee(
  employeeRepository,
  accountRepository,
  departmentRepository,
  roleRepository,
  categoryRepository,
),
  getEmployeeById: new GetEmployeeById(
  employeeRepository,
  accountRepository,
  departmentRepository,
  roleRepository,
  categoryRepository,
),
updateEmployeeStatus:new UpdateEmployeeStatus(
  employeeRepository,
  accountRepository,
  departmentRepository,
  roleRepository
 
),
getUnassignedEmployeesForCategory:
  new GetUnassignedEmployeesForCategory(
    employeeRepository,
    categoryRepository,
    roleRepository,
    accountRepository
  ),
    activateInvitedEmployee: (
    accountId: string,
    status: EmployeeStatus
  ) => employeeRepository.updateStatus(accountId, status),

    getEmployeeByAccountId:new GetEmployeeByAccountIdUseCase(
     employeeRepository ,
     roleRepository
    ) ,
assignDepartmentManager: async (accountId: string) => {
  const employee = await employeeRepository.findByAccountId(accountId);

  if (!employee) {
    throw new AppErrors(
      "Employee not found",
      HttpStatusCode.NOT_FOUND,
    );
  }

  const role = await roleRepository.findById(
    employee.roleId.toString(),
  );

  if (!role) {
    throw new AppErrors(
      "Employee role not found",
      HttpStatusCode.NOT_FOUND,
    );
  }

  if (role.name !== "DEPARTMENT ADMIN") {
    return;
  }

  const isAssigned = await departmentRepository.assignManager(
    employee.departmentId,
    employee.id,
  );

  if (!isAssigned) {
    throw new AppErrors(
      "Failed to assign department manager",
      HttpStatusCode.INTERNAL_SERVER_ERROR,
    );
  }
},

    };

  
    
  }
}