import { IAssignEmployee } from "../abstraction/IAssignEmployee";
import { ICategoryRepository } from "../../domain/repositories/ICategoryRepository";
import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";
import { IEmployeeRepository } from "../../../employees/domain/repositories/IEmployeeRepository";


export class AssignEmployees
  implements IAssignEmployee
{
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _employeeRepository: IEmployeeRepository,
    private readonly _roleRepository: IRoleRepository,
  ) {}

  async execute(
    categoryId: string,
    employeeIds: string[],
  ): Promise<void> {
    if (!employeeIds.length) {
      throw new Error("Please select at least one employee");
    }

    const category =
      await this._categoryRepository.findById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    const supportAgentRole =
      await this._roleRepository.findByName("SUPPORT AGENT");

    if (!supportAgentRole || supportAgentRole.status !== "ACTIVE") {
      throw new Error("Support Agent role is not active");
    }

    const employees =
      await this._employeeRepository.findByIds(employeeIds);

    if (employees.length !== employeeIds.length) {
      throw new Error("One or more employees were not found");
    }

    for (const employee of employees) {
      if (employee.status !== "ACTIVE") {
        throw new Error(
          `Employee ${employee.id} is not active`,
        );
      }

      if (employee.roleId !== supportAgentRole.id) {
        throw new Error(
          `Employee ${employee.id} is not a Support Agent`,
        );
      }

      if (employee.departmentId !== category.departmentId) {
        throw new Error(
          `Employee ${employee.id} does not belong to this department`,
        );
      }

      if (employee.categoryIds.includes(categoryId)) {
        throw new Error(
          `Employee ${employee.id} is already assigned to this category`,
        );
      }
    }

    await this._employeeRepository.assignEmployeesToCategory(
      categoryId,
      employeeIds,
    );
  }
}