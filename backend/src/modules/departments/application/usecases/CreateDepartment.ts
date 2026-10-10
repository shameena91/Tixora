
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import {
  Department,
  DepartmentStatus,
} from "../../domain/entities/department";
import type { IDepartmentRepository } from "../../domain/repositories/IDepartmentRepository";
import { createDepartmentSchema } from "../../presentation/validator/createDepartmentValidator";
import type { ICreateDepartment } from "../abstarction/ICreateDepartment";
import type {
  CreateDepartmentRequestDto,
  CreateDepartmentResponseDto,
} from "../dtos/CreateDepartmentDto";
import { DepartmentMapper } from "../mappers/DepartmentMapper";

export class CreateDepartment implements ICreateDepartment {
  constructor(
    private readonly _departmentRepository: IDepartmentRepository,
  ) {}

  async execute(
    data: CreateDepartmentRequestDto,
  ): Promise<CreateDepartmentResponseDto> {

    const validatedData = createDepartmentSchema.parse(data);


    const code = validatedData.code.trim().toUpperCase();
    const name = validatedData.name.trim();


    const existingByCode =
      await this._departmentRepository.findByCode(code);

    if (existingByCode) {
      throw new AppErrors(
        MESSAGES.DEPARTMENT_CODE_ALREADY_EXISTS,
        ErrorCode.DEPARTMENT_CODE_ALREADY_EXISTS,
      );
    }


    const existingByName =
      await this._departmentRepository.findByName(name.toLowerCase());

    if (existingByName) {
      throw new AppErrors(
        MESSAGES.DEPARTMENT_NAME_ALREADY_EXISTS,
        ErrorCode.DEPARTMENT_ALREADY_EXISTS,
      );
    }

   
    const now = new Date();

    const department = new Department(
      "",
      
      name,
      validatedData.description?.trim() ?? null,
      code,
      null,
      DepartmentStatus.ACTIVE,
      now,
      now,
    );

  
    const createdDepartment =
      await this._departmentRepository.create(
        department,
      );

  
    return {
      id: createdDepartment.id,
      code: createdDepartment.code,
      name: createdDepartment.name,
      description: createdDepartment.description,
      managerId: createdDepartment.managerId,
      status: createdDepartment.status,
      createdAt: createdDepartment.createdAt,
      updatedAt: createdDepartment.updatedAt,
    };
  }
}

