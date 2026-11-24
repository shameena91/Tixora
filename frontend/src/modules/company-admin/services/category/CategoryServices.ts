import axiosInstance from "../../../auth/api/axiosInstance";
import type { CategoriesPaginationResponse, Category, CategoryFormData, CategoryStatus, UnassignedEmployee } from "../../types/categoryTypes";


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


export const assignEmployees = async (
  categoryId: string,
  employeeIds: string[],
): Promise<void> => {
  try {
    const response = await axiosInstance.patch(
      `/categories/${categoryId}/employees`,
      { employeeIds },
    );

    console.log("Assign API response:", response.data);
  } catch (error) {
    console.error("Assign API error inside service:", error);
    throw error;
  }
};
export const getUnassignedEmployeesForCategory = async (
  categoryId: string
): Promise<UnassignedEmployee[]> => {

  console.log("getUnassignedEmployeesForCategory",categoryId)
  const response = await axiosInstance.get(`/categories/${categoryId}/employees/unassigned-employees`
  );

  return response.data.data;
};
export const removeEmployee=async(
  categoryId:string,
  employeeId:string
):Promise<void>=>{
  const response=await axiosInstance.delete(
    `/categories/${categoryId}/employees/${employeeId}`
  )

  console.log("Assign API response",response.data)
}