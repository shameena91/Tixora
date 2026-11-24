
import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository";
import type { IGetAllDepartment } from "../abstarction/IGetAllDepartment";
import type {
  DepartmentResponseDto,
  GetAllDepartmentResponseDto,
} from "../dtos/getAllDepartmentDto";


import type { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { IEmployeeRepository } from "../../../employees/domain/repositories/IEmployeeRepository";

export class GetAllDepartment implements IGetAllDepartment {
  constructor(
    private readonly _departmentRepository: IDepartmentRepository,
    private readonly _employeeRepository: IEmployeeRepository,
    private readonly _accountRepository: IAccountRepository,
  ) {}

  async execute(
    page: number,
    limit: number,
  ): Promise<GetAllDepartmentResponseDto> {

    // 1. Get departments
    const result = await this._departmentRepository.findAllPaginated(
      page,
      limit,
    );

    // 2. Get manager employee IDs
    const managerIds = [
      ...new Set(
        result.data
          .map((department) => department.managerId)
          .filter((id): id is string => id !== null),
      ),
    ];

    // 3. Get manager employees from Tenant DB
    const managers = managerIds.length
      ? await this._employeeRepository.findByIds(managerIds)
      : [];

    // 4. Get Account IDs from manager employees
    const accountIds = managers.map(
      (manager) => manager.accountId.toString(),
    );

    // 5. Fetch Accounts from Platform DB
    const accounts = await Promise.all(
      accountIds.map((id) =>
        this._accountRepository.findById(id),
      ),
    );

    // 6. Create manager lookup
    const managerMap = new Map(
      managers.map((manager) => {
        const account = accounts.find(
          (item) => item?.id === manager.accountId.toString(),
        );

        return [
          manager.id,
          account
            ? {
                id: manager.id,
                name: `${account.firstName} ${account.lastName}`,
              }
            : null,
        ];
      }),
    );

    // 7. Map department response
    const data: DepartmentResponseDto[] = result.data.map(
      (department) => ({
        id: department.id,
        name: department.name,
        code: department.code,
        description: department.description,
        managerId: department.managerId,
        manager: department.managerId
          ? managerMap.get(department.managerId) ?? null
          : null,
        status: department.status,
        createdAt: department.createdAt.toISOString(),
        updatedAt: department.updatedAt.toISOString(),
      }),
    );

    return {
      data,
      total: result.total,
      page,
      limit,
      totalPages: Math.ceil(result.total / limit),
    };
  }
}
