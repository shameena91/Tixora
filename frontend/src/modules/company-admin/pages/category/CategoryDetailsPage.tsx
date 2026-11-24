
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";

import type {
  Category,
  CategoryFormData,
  CategoryStatus,
} from "../../types/categoryTypes";

import { getCategoryDetailsThunk } from "../../../../redux/slices/category/categoryThunk";

import CreateCategoryModal from "../../componenets/category/CreateCategoryModal";
import CategoryEmployeesTab from "../../componenets/category/CategoryEmployeesTab";

import {
  updateCategory,
  updateCategoryStatus,
} from "../../services/category/CategoryServices";

const CategoryDetailsPage = () => {
  const { categoryId } = useParams<{ categoryId: string }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // Edit modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] =
    useState<Category | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);

  const {
    categoryDetails,
    isFetchingDetails,
    detailsError,
  } = useAppSelector((state) => state.category);

  const { departments } = useAppSelector(
    (state) => state.department,
  );

  // Fetch category details
  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryDetailsThunk(categoryId));
    }
  }, [dispatch, categoryId]);

  // Open edit modal
  const openEditModal = (category: Category) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  // Close edit modal
  const closeEditModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
  };

  // Update category
  const handleEditCategory = async (
    data: CategoryFormData,
  ) => {
    if (!selectedCategory) return;

    setIsSubmitting(true);

    try {
      await updateCategory(selectedCategory.id, data);

      toast.success("Category updated successfully");

      closeEditModal();

      await dispatch(
        getCategoryDetailsThunk(selectedCategory.id),
      ).unwrap();
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : error instanceof Error
          ? error.message
          : null;

      toast.error(
        typeof message === "string"
          ? message
          : "Failed to update category",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Activate or deactivate category
  const handleToggleStatus = async () => {
    if (!categoryDetails || isUpdatingStatus) return;

    const newStatus: CategoryStatus =
      categoryDetails.status === "ACTIVE"
        ? "INACTIVE"
        : "ACTIVE";

    setIsUpdatingStatus(true);

    try {
      await updateCategoryStatus(
        categoryDetails.id,
        newStatus,
      );

      toast.success(
        newStatus === "ACTIVE"
          ? "Category activated successfully"
          : "Category deactivated successfully",
      );

      await dispatch(
        getCategoryDetailsThunk(categoryDetails.id),
      ).unwrap();
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : error instanceof Error
          ? error.message
          : null;

      toast.error(
        typeof message === "string"
          ? message
          : "Failed to update category status",
      );
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Find department name
  const departmentName =
    departments.find(
      (department) =>
        department.id === categoryDetails?.departmentId,
    )?.name ?? "Department unavailable";

  // Loading state
  if (isFetchingDetails && !categoryDetails) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
        Loading category details...
      </div>
    );
  }

  // Error or category not found
  if (detailsError || !categoryDetails) {
    return (
      <div className="space-y-4">
        <button
          type="button"
          onClick={() =>
            navigate("/company-admin/categories")
          }
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          ← Back to Categories
        </button>

        <div className="rounded-xl border border-red-200 bg-white p-8 text-center">
          <p className="text-red-600">
            {detailsError ?? "Category not found"}
          </p>

          <button
            type="button"
            onClick={() => {
              if (categoryId) {
                dispatch(
                  getCategoryDetailsThunk(categoryId),
                );
              }
            }}
            className="mt-4 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <button
          type="button"
          onClick={() =>
            navigate("/company-admin/categories")
          }
          className="mb-4 text-sm font-medium text-gray-500 hover:text-blue-600"
        >
          ← Back to Categories
        </button>

        <h1 className="text-2xl font-semibold text-gray-900">
          Category Details
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          View and manage category information.
        </p>
      </div>

      {/* Category details */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <h2 className="text-xl font-semibold text-gray-900">
            {categoryDetails.name}
          </h2>

          <div className="flex flex-wrap items-center gap-3">
            {/* Category status */}
            <span
              className={`w-fit rounded-full px-3 py-1 text-xs font-medium ${
                categoryDetails.status === "ACTIVE"
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-600"
              }`}
            >
              {categoryDetails.status}
            </span>

            {/* Edit button */}
            <button
              type="button"
              onClick={() =>
                openEditModal(categoryDetails)
              }
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              Edit Category
            </button>

            {/* Activate / Deactivate button */}
            <button
              type="button"
              disabled={isUpdatingStatus}
              onClick={handleToggleStatus}
              className={`rounded-lg px-4 py-2 text-sm font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
                categoryDetails.status === "ACTIVE"
                  ? "bg-red-600 hover:bg-red-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {isUpdatingStatus
                ? "Updating..."
                : categoryDetails.status === "ACTIVE"
                  ? "Deactivate Category"
                  : "Activate Category"}
            </button>
          </div>
        </div>

        {/* Category information */}
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <p className="text-sm text-gray-500">
              Department
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {departmentName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">
              Created At
            </p>

            <p className="mt-1 font-medium text-gray-900">
              {new Date(
                categoryDetails.createdAt,
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>

          <div className="sm:col-span-2">
            <p className="text-sm text-gray-500">
              Description
            </p>

            <p className="mt-1 whitespace-pre-wrap text-gray-900">
              {categoryDetails.description?.trim() ||
                "No description available"}
            </p>
          </div>
        </div>
      </section>

      {/* Employees section */}
     <CategoryEmployeesTab
  categoryId={categoryDetails.id}
  departmentId={categoryDetails.departmentId}
/>

      {/* Edit category modal */}
      <CreateCategoryModal
        isOpen={isModalOpen}
        mode="edit"
        category={selectedCategory}
        departmentId={selectedCategory?.departmentId}
        departments={departments}
        isSubmitting={isSubmitting}
        onClose={closeEditModal}
        onSubmit={handleEditCategory}
      />
    </div>
  );
};

export default CategoryDetailsPage;
