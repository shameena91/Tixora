export type CategoryStatus = "ACTIVE" | "INACTIVE";

export interface Category {
  id: string;
  departmentId: string;
  name: string;
  description: string | null;
  manager:{
    id:string,
    name:string
  }
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
}
export interface UnassignedEmployee {
  id: string;
  accountId: string;
  name: string;
  email: string;
  departmentId: string;
}
export interface CategoryFormData {
  name: string;
  description: string;
    departmentId: string;
}

export interface CategoriesPaginationResponse {
  data: Category[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}