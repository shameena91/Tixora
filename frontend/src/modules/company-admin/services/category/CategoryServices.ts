import axiosInstance from "../../../auth/api/axiosInstance";
import type { CategoriesPaginationResponse, Category, CategoryFormData, CategoryStatus } from "../../types/categoryTypes";


export const createCategory = async (
  departmentId: string,
  data: CategoryFormData,
): Promise<Category> => {
  const response = await axiosInstance.post(
    `/categories/${departmentId}`,
    data,
  );

  return response.data.data;
};

export const getCategoriesByDepartment = async (
  departmentId: string|undefined,
  page: number,
  limit: number,
): Promise<CategoriesPaginationResponse> => {

  console.log("department ssservice",departmentId)
  const response = await axiosInstance.get(
    `/categories`,
    {
      params: { page, limit ,
         ...(departmentId ? { departmentId } : {}),
      },
    },
  );

  return response.data.data;
};

export const updateCategory = async (
  categoryId: string,
  data: CategoryFormData,
): Promise<Category> => {
  const response = await axiosInstance.patch(
    `/categories/${categoryId}`,
    data,
  );

  return response.data.data;
};

export const updateCategoryStatus = async (
  categoryId: string,
  status: CategoryStatus,
): Promise<Category> => {
  const response = await axiosInstance.patch(
    `/categories/${categoryId}/status`,
    { status },
  );

  return response.data.data;
};


export const getCategoryDetails = async (
  categoryId: string,
): Promise<Category> => {

  console.log("from category services," ,categoryId)
  const response = await axiosInstance.get(
    `/categories/${categoryId}`,
  );

  return response.data.data;
};
