import { EmployeeResponseDTO } from "../dtos/EmployeesDtos";

import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { IGetEmployeeById } from "../abstarction/IGetEmployeeById";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { EmployeeDTOMapper } from "../mappers/EmployeeDTOMapper";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { MESSAGES } from "../../../../shared/constants/messages";
import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";
import { IDepartmentRepository } from "../../../departments/domain/repositories/IDepartmentRepository";
import { ICategoryRepository } from "../../../category/domain/repositories/ICategoryRepository";

export class GetEmployeeById implements IGetEmployeeById {
  constructor(
    private readonly _employeeRepository: IEmployeeRepository,
    private readonly _accountRepository:IAccountRepository,
    private readonly _departmentRepository:IDepartmentRepository,
    private readonly _roleRepository:IRoleRepository,
    private readonly _categoryRepository:ICategoryRepository,
  ) {}

  async execute(employeeId: string): Promise<EmployeeResponseDTO> {
    if (!employeeId?.trim()) {
      throw new AppErrors(
        "Employee ID is required",
        ErrorCode.EMPLOYEEID_NEEDED,
      );
    }

    const employee = await this._employeeRepository.findByAccountId(employeeId);

    if (!employee) {
      throw new AppErrors(
        "Employee not found",
        ErrorCode.NOT_FOUND,
      );
    }

console.log('employeeeeeeeeeeeeee',employee)
   
  const [account,department, role, categories] = await Promise.all([
     this._accountRepository.findById(employee.accountId.toString()),
    this._departmentRepository.findById(employee.departmentId.toString()),
    this._roleRepository.findById(employee.roleId.toString()),
    this._categoryRepository.findByIds(
  employee.categoryIds.map((id) => id.toString()),
),

  ]);


  console.log("Fetched categories:", categories);

  if (!department) {
  throw new AppErrors(
    "Department not found",
    ErrorCode.NOT_FOUND,
  );
}
if (!account) {
  throw new AppErrors(
    MESSAGES.ACCOUNT_NOT_FOUND,
    ErrorCode.ACCOUNT_NOT_FOUND,
  );
}
if (!role) {
  throw new AppErrors(
    "Role not found",
    ErrorCode.NOT_FOUND,
  );
}
    return EmployeeDTOMapper.toResponse(
    employee,
  account,
    department.name,
  role.name,
 
  categories,);
  }
}