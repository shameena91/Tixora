export interface DepartmentResponseDto {
 id: string;
  name: string;
  code: string;
  description: string | null;
  managerId: string | null;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  updatedAt: string;
}

export interface GetAllDepartmentResponseDto {
  data: DepartmentResponseDto[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}