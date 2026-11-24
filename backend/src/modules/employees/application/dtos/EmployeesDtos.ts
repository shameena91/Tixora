import { EmployeeStatus } from "../../domain/entities/employee";

export interface CreateEmployeeDTO {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  departmentId: string;
  roleId: string;
  categoryIds: string[];
  profilePhoto?: string | null;
  joiningDate: Date;
}
export interface ReplaceDepartmentManagerDTO {
  newRoleId: string;
  categoryIds: string[];
}

export interface UpdateEmployeeDTO {
  firstName?: string;
  lastName?: string;
  phone?: string;
  designation?: string;
  departmentId?: string;
  roleId?: string;
  categoryIds?: string[];
  profilePhoto?: string | null;
  joiningDate?: Date;

  replaceManager?: ReplaceDepartmentManagerDTO;
}
export interface UpdateEmployeeStatusDTO {
  status: EmployeeStatus;
}


export interface EmployeeResponseDTO {
  id: string;
  accountId: string;
  employeeId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;

  departmentId: string;
  departmentName: string;

  roleId: string;
  roleName: string;

  categoryIds: string[];
    categories: {
    id: string;
    name: string;
  }[];

  profilePhoto: string | null;
  joiningDate: Date;
  workload: number;
  status: EmployeeStatus;
  createdAt: Date;
  updatedAt: Date;
}
