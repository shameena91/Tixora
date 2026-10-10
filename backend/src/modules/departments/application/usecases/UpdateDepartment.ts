import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository";
import type { IUpdateDepartment } from "../abstarction/IUpdateDepartment";

import type { DepartmentDetailsResponseDto } from "../dtos/GetDepartmentDto";
import { MESSAGES } from "../../../../shared/constants/messages";
import { UpdateDepartmentRequestDto } from "../dtos/EditDepartmentDto";

export class UpdateDepartment implements IUpdateDepartment {
  constructor(
    private readonly _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(
    departmentId: string,
    data: UpdateDepartmentRequestDto,
  ): Promise<DepartmentDetailsResponseDto> {

    
    if (!departmentId?.trim()) {
      throw new AppErrors(
        "Department not found",
        ErrorCode.DEPARTMENT_NOT_FOUND,
      );
    }



    const name = data.name?.trim();
    const code = data.code?.trim();
    const description = data.description?.trim() ?? "";

    console.log("name",name)
    console.log("code",code)

    console.log("description",description)



    if (!name || !code) {
      throw new AppErrors(
        MESSAGES.DEPARTMENT_NAME_AND_CODE_EXIST,
        ErrorCode.INVALID_INPUT,
      );
    }

    const existingDepartment =
      await this._departmentRepository.findById(departmentId);
console.log("existingDepartment",existingDepartment)

    if (!existingDepartment) {
      throw new AppErrors(
        MESSAGES.DEPARTMENT_NOT_FOUND,
        ErrorCode.DEPARTMENT_NOT_FOUND,
      );
    }

 
const existingDepartmentWithName =
  await this._departmentRepository.findByName(name);
console.log("existingDepartmentWithName", existingDepartmentWithName)

if (
  existingDepartmentWithName &&
  String(existingDepartmentWithName.id) !== String(departmentId)
) {
  throw new AppErrors(
    MESSAGES.DEPARTMENT_NAME_ALREADY_EXISTS,
    ErrorCode.DEPARTMENT_ALREADY_EXISTS,
  );
}


const existingDepartmentWithCode =
  await this._departmentRepository.findByCode(code);
console.log("existingDepartmentWithCode",existingDepartmentWithCode)
if (
  existingDepartmentWithCode &&
  String(existingDepartmentWithCode.id) !== String(departmentId)
) {
  throw new AppErrors(
  MESSAGES.DEPARTMENT_CODE_ALREADY_EXISTS,
    ErrorCode.DEPARTMENT_ALREADY_EXISTS,
  );
}

    const department = await this._departmentRepository.update(
      {id:departmentId},data
      
    );
console.log("department",department)
    if (!department) {
      throw new AppErrors(
        MESSAGES.DEPARTMENT_NOT_FOUND,
        ErrorCode.DEPARTMENT_NOT_FOUND,
      );
    }

    return {
      id: department.id,
      name: department.name,
      code: department.code,
      description: department.description ?? null,
      managerId: department.managerId ?? null,
      status: department.status,
      createdAt: department.createdAt.toISOString(),
      updatedAt: department.updatedAt.toISOString(),
    };
  }
}