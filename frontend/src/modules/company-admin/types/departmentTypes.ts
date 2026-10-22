export type DepartmentStatus = "ACTIVE" | "INACTIVE";

export interface Department {
id: string;
name: string;
code: string;
description: string | null;
managerId: string | null;
status: DepartmentStatus;
createdAt: string;
updatedAt: string;
}

export interface CreateDepartmentRequest {
name: string;
code: string;
description?: string;
}

export interface UpdateDepartmentRequest {
name?: string;
code?: string;
description?: string | null;
status?: DepartmentStatus;
}

export interface DepartmentListResponse {
data: Department[];
total: number;
page: number;
limit: number;
totalPages: number;

}
export interface ViewDepartmentResponse {

id: string;
name: string;
code: string;
description: string | null;
managerId: string | null;
status: DepartmentStatus;
createdAt: string;
updatedAt: string;

}

export interface ViewDepartmentResponse {


name: string;
code: string;
description: string|null;
}

