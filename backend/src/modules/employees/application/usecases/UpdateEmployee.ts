// import { EmployeeResponseDTO, UpdateEmployeeDTO } from "../dtos/EmployeesDtos";
// import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
// import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
// import { EmployeeDTOMapper } from "../mappers/EmployeeDTOMapper";
// import { AppErrors } from "../../../../shared/errors/AppErrors";
// import { ErrorCode } from "../../../../shared/errors/ErrorCode";
// import { MESSAGES } from "../../../../shared/constants/messages";
// import { IDepartmentRepository } from "../../../departments/domain/repositories/IDepartmentRepository";
// import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";
// import { ICategoryRepository } from "../../../category/domain/repositories/ICategoryRepository";
// import { IUpdateEmployee } from "../abstarction/IUpdateEmployee";


// export class UpdateEmployee implements IUpdateEmployee {
//   constructor(
//     private readonly _employeeRepository: IEmployeeRepository,
//     private readonly _accountRepository: IAccountRepository,
//       private readonly _departmentRepository:IDepartmentRepository,
//         private readonly _roleRepository:IRoleRepository,
//         private readonly _categoryRepository:ICategoryRepository,
//   ) {}

//   async execute(
//     employeeId: string,
//     dto: UpdateEmployeeDTO,
//   ): Promise<EmployeeResponseDTO> {
//     if (!employeeId?.trim()) {
//       throw new AppErrors(
//         "Employee ID is required",
//         ErrorCode.EMPLOYEEID_NEEDED,
//       );
//     }

//     const employee =
//       await this._employeeRepository.findByAccountId(employeeId);

//     if (!employee) {
//       throw new AppErrors(
//         "Employee not found",
//         ErrorCode.NOT_FOUND,
//       );
//     }

//     const accountData =
//       EmployeeDTOMapper.toAccountUpdateData(dto);

//     const employeeData =
//       EmployeeDTOMapper.toEmployeeUpdateData(dto);
// console.log("accounidddd",employee.accountId)
//     const updatedAccount = await this._accountRepository.update(
//       { id: employee.accountId },
//       accountData,
//     );
// console.log("updatedAccountttt",updatedAccount)
//     if (!updatedAccount) {
//       throw new AppErrors(
//         MESSAGES.ACCOUNT_NOT_FOUND,
//         ErrorCode.ACCOUNT_NOT_FOUND,
//       );
//     }

//     const updatedEmployee = await this._employeeRepository.updateDetails(
//         employee.id ,
//       employeeData,
//     );

//     if (!updatedEmployee) {
//       throw new AppErrors(
//         "Employee update failed",
//         ErrorCode.NOT_FOUND,
//       );
//     }
// const [department, role, categories] = await Promise.all([
//   this._departmentRepository.findById(
//     updatedEmployee.departmentId.toString(),
//   ),
//   this._roleRepository.findById(
//     updatedEmployee.roleId.toString(),
//   ),
//   this._categoryRepository.findByIds(
//     updatedEmployee.categoryIds.map((id) => id.toString()),
//   ),
// ]);


//   if (!department) {
//   throw new AppErrors(
//     "Department not found",
//     ErrorCode.NOT_FOUND,
//   );
// }
// if (!role) {
//   throw new AppErrors(
//     "Role not found",
//     ErrorCode.NOT_FOUND,
//   );
// }
//   return EmployeeDTOMapper.toResponse(
//   updatedEmployee,
//   updatedAccount,
//   department.name,
//   role.name,
//   categories,
// );
// }
// }
































import {
  EmployeeResponseDTO,
  UpdateEmployeeDTO,
} from "../dtos/EmployeesDtos";

import { IEmployeeRepository } from "../../domain/repositories/IEmployeeRepository";
import { IAccountRepository } from "../../../auth/domain/repositories/IAccountRepository";
import { EmployeeDTOMapper } from "../mappers/EmployeeDTOMapper";

import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import { IDepartmentRepository } from "../../../departments/domain/repositories/IDepartmentRepository";
import { IRoleRepository } from "../../../roles/domain/repositories/IRoleRepository";
import { ICategoryRepository } from "../../../category/domain/repositories/ICategoryRepository";

import { IUpdateEmployee } from "../abstarction/IUpdateEmployee";

export class UpdateEmployee implements IUpdateEmployee {
  constructor(
    private readonly _employeeRepository: IEmployeeRepository,
    private readonly _accountRepository: IAccountRepository,
    private readonly _departmentRepository: IDepartmentRepository,
    private readonly _roleRepository: IRoleRepository,
    private readonly _categoryRepository: ICategoryRepository,
  ) {}

  async execute(
    employeeId: string,
    dto: UpdateEmployeeDTO,
  ): Promise<EmployeeResponseDTO> {
    if (!employeeId?.trim()) {
      throw new AppErrors(
        "Employee ID is required",
        ErrorCode.EMPLOYEEID_NEEDED,
      );
    }

    const employee =
      await this._employeeRepository.findByAccountId(employeeId);

    if (!employee) {
      throw new AppErrors("Employee not found", ErrorCode.NOT_FOUND);
    }

    const accountData =
      EmployeeDTOMapper.toAccountUpdateData(dto);

    const employeeData =
      EmployeeDTOMapper.toEmployeeUpdateData(dto);

    const departmentId = (
      dto.departmentId ?? employee.departmentId
    ).toString();

    const newRoleId = (
      dto.roleId ?? employee.roleId
    ).toString();

    const [department, newRole] = await Promise.all([
      this._departmentRepository.findById(departmentId),
      this._roleRepository.findById(newRoleId),
    ]);

    if (!department) {
      throw new AppErrors("Department not found", ErrorCode.NOT_FOUND);
    }

    if (!newRole) {
      throw new AppErrors("Role not found", ErrorCode.NOT_FOUND);
    }

    const isNewDepartmentAdmin =
      newRole.name.trim().toUpperCase().replace(/[\s-]+/g, "_") ===
      "DEPARTMENT_ADMIN";

    if (isNewDepartmentAdmin && department.managerId &&
        department.managerId.toString() !== employee.id.toString()) {

      if (!dto.replaceManager) {
        throw new AppErrors(
          "This department already has a Department Admin. Please replace the existing manager.",
          ErrorCode.NOT_FOUND,
        );
      }

      const { newRoleId: oldAdminNewRoleId, categoryIds } =
        dto.replaceManager;


const oldAdmin =
  await this._employeeRepository.findById(
    department.managerId.toString(),
  );
      if (!oldAdmin) {
        throw new AppErrors(
          "Existing Department Admin not found",
          ErrorCode.NOT_FOUND,
        );
      }

      const oldAdminNewRole =
        await this._roleRepository.findById(oldAdminNewRoleId);

      if (!oldAdminNewRole) {
        throw new AppErrors("Replacement role not found", ErrorCode.NOT_FOUND);
      }

      const oldAdminRoleName = oldAdminNewRole.name
        .trim()
        .toUpperCase()
        .replace(/[\s-]+/g, "_");

      if (
        oldAdminRoleName !== "SUPPORT_AGENT" &&
        oldAdminRoleName !== "NORMAL_EMPLOYEE"
      ) {
        throw new AppErrors(
          "Old Department Admin can only become Support Agent or Normal Employee",
          ErrorCode.NOT_FOUND,
        );
      }

      let validatedCategoryIds: string[] = [];

      if (oldAdminRoleName === "SUPPORT_AGENT") {
        if (!categoryIds?.length) {
          throw new AppErrors(
            "Select at least one category for the Support Agent",
            ErrorCode.NOT_FOUND,
          );
        }

const isOldManagerUpdated =
  await this._employeeRepository.updateDetails(oldAdmin._id.toString(), {
    roleId: oldAdminNewRoleId,
    categoryIds: validatedCategoryIds,
  });

if (!isOldManagerUpdated) {
  throw new AppErrors(
    "Existing Department Admin update failed",
    ErrorCode.NOT_FOUND,
  );
}


const isManagerCleared =
  await this._departmentRepository.assignManager(
    departmentId,
    "",
  );

if (!isManagerCleared) {
  throw new AppErrors(
    "Department manager removal failed",
    ErrorCode.NOT_FOUND,
  );
}

        const validCategories =
          await this._categoryRepository.findByIds(categoryIds);

        if (validCategories.length !== categoryIds.length) {
          throw new AppErrors(
            "Invalid category selected",
            ErrorCode.NOT_FOUND,
          );
        }

        validatedCategoryIds = categoryIds;
      }

  
    const updatedOldAdmin =
  await this._employeeRepository.updateDetails(
    oldAdmin._id.toString(),
    {
      roleId: oldAdminNewRoleId,
      categoryIds: validatedCategoryIds,
    },
  );
      if (!updatedOldAdmin) {
        throw new AppErrors(
          "Existing Department Admin update failed",
          ErrorCode.NOT_FOUND,
        );
      }
    }

   
    const updatedAccount = await this._accountRepository.update(
      { id: employee.accountId },
      accountData,
    );

    if (!updatedAccount) {
      throw new AppErrors(
        MESSAGES.ACCOUNT_NOT_FOUND,
        ErrorCode.ACCOUNT_NOT_FOUND,
      );
    }

    const updatedEmployee =
      await this._employeeRepository.updateDetails(employee.id, employeeData);

    if (!updatedEmployee) {
      throw new AppErrors(
        "Employee update failed",
        ErrorCode.NOT_FOUND,
      );
    }

  
   if (isNewDepartmentAdmin) {
  const isManagerAssigned =
    await this._departmentRepository.assignManager(
      departmentId,
      employee.id.toString(),
  
    );


    

  if (!isManagerAssigned) {
    throw new AppErrors(
      "Department manager update failed",
      ErrorCode.NOT_FOUND,
    );
  }
}

    const [updatedDepartment, role, categories] = await Promise.all([
      this._departmentRepository.findById(
        updatedEmployee.departmentId.toString(),
      ),
      this._roleRepository.findById(
        updatedEmployee.roleId.toString(),
      ),
      this._categoryRepository.findByIds(
        updatedEmployee.categoryIds.map((id) => id.toString()),
      ),
    ]);

    if (!updatedDepartment || !role) {
      throw new AppErrors("Updated employee details not found", ErrorCode.NOT_FOUND);
    }

    return EmployeeDTOMapper.toResponse(
      updatedEmployee,
      updatedAccount,
      updatedDepartment.name,
      role.name,
      categories,
    );
  }
}