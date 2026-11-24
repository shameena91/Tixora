import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";


import { UnassignedEmployeeDTO } from "../dtos/UnassignedEmployeeDTO";

import { AppErrors } from "../../../../shared/errors/AppErrors";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { ICategoryRepository } from "../../../category/domain/repositories/ICategoryRepository";
import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";


export class GetUnassignedEmployeesForCategory {
  constructor(
    private readonly employeeRepository: IEmployeeRepository,
    private readonly categoryRepository: ICategoryRepository,
    private readonly roleRepository: IRoleRepository,
      private readonly accountRepository: IAccountRepository
  ) {}

  async execute(categoryId: string): Promise<UnassignedEmployeeDTO[]> {

    const category = await this.categoryRepository.findById(categoryId);

    if (!category) {
      throw new AppErrors(
        "Category not found",
        HttpStatusCode.NOT_FOUND
      );
    }

    const supportAgentRole =
      await this.roleRepository.findByName("SUPPORT AGENT");

    if (!supportAgentRole) {
      throw new AppErrors(
        "Support Agent role not found",
        HttpStatusCode.NOT_FOUND
      );
    }

    const employees =
      await this.employeeRepository.findUnassignedEmployeesForCategory(
        category.departmentId,
        supportAgentRole.id,
        categoryId
      );
const accountIds = employees.map(
  (employee) => employee.accountId
);

const accounts =
  await this.accountRepository.findByIds(accountIds);


  return employees.map((employee) => {
  const account = accounts.find(
    (account) =>
      account.id.toString() === employee.accountId.toString()
  );

    return {
    id: employee.id,
    accountId: employee.accountId,
    name: `${account?.firstName ?? ""} ${account?.lastName ?? ""}`.trim(),
    email: account?.email ?? "",
    departmentId: employee.departmentId
  };
});
  }
}