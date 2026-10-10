import { DepartmentStatus } from "../../domain/entities/department";


export interface CreateDepartmentRequestDto {
  code: string;
  name: string;
  description?: string | null;
}

export interface CreateDepartmentResponseDto {
  id: string;
  code: string;
  name: string;
  description: string | null;
  managerId: string | null;
  status: DepartmentStatus;
  createdAt: Date;
  updatedAt: Date;
}