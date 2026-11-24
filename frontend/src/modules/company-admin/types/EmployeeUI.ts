export type EmployeeStatus = "PENDING" | "ACTIVE" | "INACTIVE";

export interface CreateEmployeePayload {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  designation: string;
  departmentId: string;
  roleId: string;
  categoryIds: string[];
  profilePhoto?: string | null;
  joiningDate: string;
}

// export interface UpdateEmployeePayload {
//   firstName?: string;
//   lastName?: string;
//   phone?: string;
//   designation?: string;
//   departmentId?: string;
//   roleId?: string;
//   categoryIds?: string[];
//   profilePhoto?: string | null;
//   joiningDate?: string;
// }


export interface UpdateEmployeePayload {
  firstName?: string;
  lastName?: string;
  phone?: string;
  designation?: string;
  departmentId?: string;
  roleId?: string;
  categoryIds?: string[];
  profilePhoto?: string | null;
  joiningDate?: string;

  replaceManager?: {
    newRoleId: string;
    categoryIds: string[];
  };
}

export interface Employee {
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
  joiningDate: string;
  workload: number;
  status: EmployeeStatus;
  createdAt: string;
  updatedAt: string;
}

