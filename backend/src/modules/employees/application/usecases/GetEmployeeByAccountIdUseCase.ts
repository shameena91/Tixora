import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";
import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { IGetEmployeeByAccountIdUseCase } from "../abstarction/IGetEmployeeByAccountIdUseCase";
import { EmployeeLoginDetails } from "../dtos/EmployeeLoginDetails";


export class GetEmployeeByAccountIdUseCase
  implements IGetEmployeeByAccountIdUseCase {

  constructor(
    private readonly _employeeRepository: IEmployeeRepository,
    private readonly _roleRepository:IRoleRepository
  ) {}

 async execute(
  accountId: string
): Promise<EmployeeLoginDetails | null> {

  const employee =
    await this._employeeRepository.findByAccountId(accountId);

  if (!employee) {
    return null;
  }
console.log("EMployeeeeeeeee",employee)

  const role=await this._roleRepository.findById(employee.roleId.toString())

if (!role) {
  return null;
}



  
  return {
    status: employee.status,
      employeeRole: role.name?? null,
      permissions:role.permissions
  };
}




}