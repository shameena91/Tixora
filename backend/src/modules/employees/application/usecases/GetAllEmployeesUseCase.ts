import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { IGetAllEmployeesUseCase } from "../abstarction/IGetAllEmployeesUseCase";

import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";

import { EmployeeResponseDTO } from "../dtos/EmployeesDtos";
import { EmployeeMapper } from "../mappers/EmployeeMapper";
import { EmployeeDTOMapper } from "../mappers/EmployeeDTOMapper";
import { IDepartmentRepository } from "../../../departments/domain/repositories/IDepartmentRepository";
import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";

export class GetAllEmployeesUseCase
  implements IGetAllEmployeesUseCase
{
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly accountRepository: IAccountRepository,
      private readonly departmentRepository: IDepartmentRepository,
  private readonly roleRepository: IRoleRepository,
  ) {}

  async execute(
    page: number = 1,
    limit: number = 10,
    search?: string,
    departmentId?:string,
    categoryId?: string,
      excludeCategoryId?: string,
  ): Promise<{
    data: EmployeeResponseDTO[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
 
    let accountIds: string[] = [];

    if (search?.trim()) {
     const accounts = await this.accountRepository.searchAccounts(search);

      accountIds = accounts.map((account) => account.id);
    }
    const employeeResult =
      await this.employeeRepository.findAllEmployees(
        page,
        limit,
         accountIds,
        search,
         departmentId,
         categoryId,
         
    excludeCategoryId,
       
      );

    const employeeAccountIds = [
      ...new Set(
        employeeResult.data.map((employee) =>
          employee.accountId.toString(),
        ),
      ),
    ];

    const employeeAccounts =
      await this.accountRepository.findByIds(employeeAccountIds);

    const accountMap = new Map(
      employeeAccounts.map((account) => [
        account.id,
        account,
      ]),
    );
const departmentIds = [
  ...new Set(
    employeeResult.data.map((employee) =>
      employee.departmentId.toString(),
    ),
  ),
];

const roleIds = [
  ...new Set(
    employeeResult.data.map((employee) =>
      employee.roleId.toString(),
    ),
  ),
];

const [departments, roles] = await Promise.all([
  this.departmentRepository.findByIds(departmentIds),
  this.roleRepository.findByIds(roleIds),
]);

const departmentMap = new Map(
  departments.map((department) => [department.id, department.name]),
);

const roleMap = new Map(
  roles.map((role) => [role.id, role.name]),
);
    const employees: EmployeeResponseDTO[] =
      employeeResult.data.map((employeeDocument) => {
        const employee = EmployeeMapper.toDomain(employeeDocument);

        const account = accountMap.get(employee.accountId);

        if (!account) {
          throw new Error(
            `Account not found for employee: ${employee.employeeId}`,
          );
        }

        return EmployeeDTOMapper.toResponse(
  employee,
  account,
  departmentMap.get(employee.departmentId) ?? "",
  roleMap.get(employee.roleId) ?? "",
);
      });

    return {
      ...employeeResult,
      data: employees,
    };
  }
}