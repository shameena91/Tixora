import { Employee, EmployeeStatus } from "../../domain/entities/employee";


export interface EmployeeCreateData {
  accountId: string;
  employeeId: string;
  departmentId: string;
  roleId: string;
  categoryIds: string[];
  profilePhoto: string | null;
  joiningDate: Date;
  workload: number;
  status: EmployeeStatus;
}

export interface EmployeeDocumentData {
  _id: {
    toString(): string;
  };
  accountId: {
    toString(): string;
  };
  employeeId: string;
  departmentId: {
    toString(): string;
  };
  roleId: {
    toString(): string;
  };
  categoryIds: {
    toString(): string;
  }[];
  profilePhoto: string | null;
  joiningDate: Date;
  workload: number;
  status: EmployeeStatus;
  createdAt: Date;
  updatedAt: Date;
}

export class EmployeeMapper {
  static toDomain(document: EmployeeDocumentData): Employee {
    return new Employee(
      document._id.toString(),
      document.accountId.toString(),
      document.employeeId,
      document.departmentId.toString(),
      document.roleId.toString(),
      document.categoryIds.map((id) => id.toString()),
      document.profilePhoto,
      document.joiningDate,
      document.workload,
      document.status,
      document.createdAt,
      document.updatedAt,
    );
  }

  static toPersistence(employee: Employee): EmployeeCreateData {
    return {
      accountId: employee.accountId,
      employeeId: employee.employeeId,
      departmentId: employee.departmentId,
      roleId: employee.roleId,
      categoryIds: employee.categoryIds,
      profilePhoto: employee.profilePhoto,
      joiningDate: employee.joiningDate,
      workload: employee.workload,
      status: employee.status,
    };
  }
}