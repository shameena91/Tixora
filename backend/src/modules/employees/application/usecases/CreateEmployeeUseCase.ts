import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";

import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";

import {
  CreateEmployeeDTO,
  EmployeeResponseDTO,
} from "../dtos/EmployeesDtos";

import { EmployeeDTOMapper } from "../mappers/EmployeeDTOMapper";
import { EmployeeMapper } from "../mappers/EmployeeMapper";

import { CategoryStatus } from "../../../category/domain/entities/Category";
import { IDepartmentRepository } from "../../../departments/domain/repositories/IDepartmentRepository";
import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";
import { ICategoryRepository } from "../../../category/domain/repositories/ICategoryRepository";
import { DepartmentStatus } from "../../../departments/domain/entities/department";
import { RoleStatus } from "../../../roles/domain/entities/Role";
import { generateEmployeeId } from "../../../../shared/utills/generateEmployeeId";
import { ICreateEmployeeUseCase } from "../abstarction/ICreateEmployeeUseCase";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { ICreateEmployeeInvitation } from "../abstarction/ICreateEmployeeInvitation";

export class CreateEmployeeUseCase implements ICreateEmployeeUseCase {
  constructor(
    private readonly accountRepository: IAccountRepository,
    private readonly employeeRepository: IEmployeeRepository,
    private readonly departmentRepository: IDepartmentRepository,
    private readonly roleRepository: IRoleRepository,
    private readonly categoryRepository: ICategoryRepository,
      private readonly createInvitationUseCase: ICreateEmployeeInvitation,
  ) {}

  async execute(
    dto: CreateEmployeeDTO,
    invitedByAccountId: string,
   
  ): Promise<EmployeeResponseDTO> {
 
    const existingAccount =
      await this.accountRepository.findByEmail(dto.email);

    if (existingAccount) {
      throw new AppErrors("An account with this email already exists",
        ErrorCode.ACCOUNT_NOT_FOUND
      );
    }

    const department =
      await this.departmentRepository.findById(dto.departmentId);

    if (!department) {
      throw new Error("Department not found");
    }

    if (department.status !== DepartmentStatus.ACTIVE) {
      throw new Error("Department is inactive");
    }

  
    const role =
      await this.roleRepository.findById(dto.roleId);

    if (!role) {
      throw new Error("Role not found");
    }

    if (role.status !== RoleStatus.ACTIVE) {
      throw new Error("Role is inactive");
    }

 
    const uniqueCategoryIds = [...new Set(dto.categoryIds)];

    const categories = await Promise.all(
      uniqueCategoryIds.map((categoryId) =>
        this.categoryRepository.findById(categoryId),
      ),
    );

    if (categories.some((category) => !category)) {
      throw new AppErrors(MESSAGES.CATEGORY_NOT_FOUND,
        ErrorCode.CATEGORY_NOT_FOUND
      );
    }

    if (
      categories.some(
        (category) => category?.status !== CategoryStatus.ACTIVE,
      )
    ) {
      
      throw new Error("One or more categories are inactive");
    }

    if (
      categories.some(
        (category) =>
          category?.departmentId !== dto.departmentId,
      )
    ) {
      throw new Error(
        "Selected categories do not belong to this department",
      );
    }

    const accountData = EmployeeDTOMapper.toAccount(dto);

    const account =
      await this.accountRepository.create(accountData);
const employeId = await generateEmployeeId();
 
    const employeeData =
      EmployeeDTOMapper.toEmployeeCreateData(
        dto,
        account.id,
        employeId,
      );

    const employeeDocument =
      await this.employeeRepository.create(employeeData);




await this.createInvitationUseCase.execute(account.id,invitedByAccountId);
    const employee =
      EmployeeMapper.toDomain(employeeDocument);

   
    return EmployeeDTOMapper.toResponse(employee, account, department.name,
  role.name,);
  }
}