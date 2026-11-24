import { ICategoryRepository } from "../../../category/domain/repositories/ICategoryRepository";
import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { IRemoveEmployee } from "../abstarction/IRemoveEmployee";

export class RemoveEmployee
  implements IRemoveEmployee
{
  constructor(
    private readonly _categoryRepository: ICategoryRepository,
    private readonly _employeeRepository: IEmployeeRepository,
  ) {}

  async execute(
    categoryId: string,
    employeeId: string,
  ): Promise<void> {
    const category =
      await this._categoryRepository.findById(categoryId);

    if (!category) {
      throw new Error("Category not found");
    }

    const employee =
      await this._employeeRepository.findById(employeeId);


console.log("Employee from repository:", employee);
console.log("Category ID:", categoryId);
console.log("Employee categoryIds:", employee?.categoryIds);

    if (!employee) {
      throw new Error("Employee not found");
    }

   const isAssigned = employee.categoryIds.some(
  (id) => id.toString() === categoryId,
);

if (!isAssigned) {
  throw new Error(
    "Employee is not assigned to this category",
  );
}

    await this._employeeRepository.removeEmployeeFromCategory(
      categoryId,
      employeeId,
    );
  }
}