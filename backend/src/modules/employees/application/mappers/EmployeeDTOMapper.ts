import { AccountCreateData } from "../../../auth/application/mappers/Accountmapper";
import { Account, AccountRole, AccountStatus, RegistrationStep } from "../../../auth/domain/entities/Account";
import { Employee, EmployeeStatus } from "../../domain/entities/employee";
import { CreateEmployeeDTO, EmployeeResponseDTO, UpdateEmployeeDTO } from "../dtos/EmployeesDtos";
import { EmployeeCreateData } from "./EmployeeMapper";


export class EmployeeDTOMapper {
static toAccount(dto: CreateEmployeeDTO): Account {
  const now = new Date();

  return new Account(
    "",
    dto.email,
    dto.firstName,
    dto.lastName,
    dto.phone,
   null,
    null,
    null,
    AccountRole.EMPLOYEE,
    AccountStatus.PENDING,
    false,
    RegistrationStep.COMPLETED,
    now,
    now,
  );
}

  static toEmployeeCreateData(
    dto: CreateEmployeeDTO,
    accountId: string,
    employeeId: string,
  ): EmployeeCreateData {
    return {
      accountId,
      employeeId,
      departmentId: dto.departmentId,
      roleId: dto.roleId,
      categoryIds: dto.categoryIds,
      profilePhoto: dto.profilePhoto ?? null,
      joiningDate: dto.joiningDate,
      workload: 0,
      status: EmployeeStatus.PENDING,
    };
  }

  static toAccountUpdateData(
    dto: UpdateEmployeeDTO,
  ): Partial<AccountCreateData> {
    return {
      ...(dto.firstName !== undefined && {
        firstName: dto.firstName,
      }),
      ...(dto.lastName !== undefined && {
        lastName: dto.lastName,
      }),
      ...(dto.phone !== undefined && {
        phone: dto.phone,
      }),
      
    };
  }

  static toEmployeeUpdateData(
    dto: UpdateEmployeeDTO,
  ): Partial<EmployeeCreateData> {
    return {
      ...(dto.departmentId !== undefined && {
        departmentId: dto.departmentId,
      }),
      ...(dto.roleId !== undefined && {
        roleId: dto.roleId,
      }),
      ...(dto.categoryIds !== undefined && {
        categoryIds: dto.categoryIds,
      }),
      ...(dto.profilePhoto !== undefined && {
        profilePhoto: dto.profilePhoto,
      }),
      ...(dto.joiningDate !== undefined && {
        joiningDate: dto.joiningDate,
      }),
    };
  }

 static toResponse(
  employee: Employee,
  account: Account,
  departmentName: string,
  roleName: string,
 
  categories: { id: string; name: string }[] = [],
): EmployeeResponseDTO {
  return {
    id: employee.id,
    accountId: employee.accountId,
    employeeId: employee.employeeId,
    firstName: account.firstName,
    lastName: account.lastName,
    email: account.email,
    phone: account.phone,

    departmentId: employee.departmentId,
    departmentName,

    roleId: employee.roleId,
    roleName,

    categoryIds: employee.categoryIds,

    categories: categories.map((category) => ({
      id: category.id,
      name: category.name,
    })),
    profilePhoto: employee.profilePhoto,
    joiningDate: employee.joiningDate,
    workload: employee.workload,
    status: employee.status,
    createdAt: employee.createdAt,
    updatedAt: employee.updatedAt,
  };
}
}