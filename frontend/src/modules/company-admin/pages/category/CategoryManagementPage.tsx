
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import type {
  Category,
  CategoryFormData,
} from "../../types/categoryTypes";

import {
  createCategoryThunk,
  getCategoriesByDepartmentThunk,
} from "../../../../redux/slices/category/categoryThunk";

import { getAllDepartmentsThunk } from "../../../../redux/slices/department/departmentThunk";

// Change this import path to your actual DataTable location.


import CreateCategoryModal from "../../componenets/category/CreateCategoryModal";
import type { DataTableColumn } from "../../../../components/common/Datatable";
import DataTable from "../../../../components/common/Datatable";

const PAGE_LIMIT = 3;

const CategoryManagementPage = () => {
  const { departmentId } = useParams<{
    departmentId: string;
  }>();

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    categories,
    isFetching,
    isCreating,
    fetchError,
    total,
    totalPages,
  } = useAppSelector((state) => state.category);

  const {
    departments,
    isFetching: isDepartmentsLoading,
  } = useAppSelector((state) => state.department);

  // Fetch departments for the global category page.
  useEffect(() => {
    if (!departmentId && departments.length === 0) {
      dispatch(
        getAllDepartmentsThunk({
          page: 1,
          limit: 100,
        }),
      );
    }
  }, [dispatch, departmentId, departments.length]);

  // Fetch categories.
  useEffect(() => {
    dispatch(
      getCategoriesByDepartmentThunk({
        departmentId,
        page,
        limit: PAGE_LIMIT,
      }),
    );
  }, [dispatch, departmentId, page]);

  // Show fetch errors.
  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError]);

  const refreshCategories = async () => {
    await dispatch(
      getCategoriesByDepartmentThunk({
        departmentId,
        page,
        limit: PAGE_LIMIT,
      }),
    ).unwrap();
  };

  const handleCreateCategory = () => {
    setIsModalOpen(true);
  };

  // Create a category. Editing is handled on the details page.
  const handleSubmit = async (data: CategoryFormData) => {
    if (isCreating) return;

    const effectiveDepartmentId =
      departmentId || data.departmentId;

    if (!effectiveDepartmentId) {
      toast.error("Please select a department");
      return;
    }

    const normalizedData: CategoryFormData = {
      name: data.name.trim(),
      description: data.description.trim(),
      departmentId: effectiveDepartmentId,
    };

    try {
      await dispatch(
        createCategoryThunk({
          departmentId: effectiveDepartmentId,
          data: normalizedData,
        }),
      ).unwrap();

      toast.success("Category created successfully");
      setIsModalOpen(false);

      if (page !== 1) {
        setPage(1);
      } else {
        try {
          await refreshCategories();
        } catch {
          toast.error(
            "Category created, but refreshing the list failed",
          );
        }
      }
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message
        : error instanceof Error
          ? error.message
          : null;

      toast.error(
        typeof message === "string"
          ? message
          : typeof error === "string"
            ? error
            : "Failed to create category",
      );
    }
  };

  // Define reusable DataTable columns.
  const columns: DataTableColumn<Category>[] = [
    {
      header: "Name",
      accessor: "name",
    },
    {
      header: "Description",
      accessor: "description",
      render: (value) =>
        typeof value === "string" && value.trim()
          ? value
          : "—",
    },
  ];

  // Show the Department column only on the global page.
  if (!departmentId) {
    columns.push({
      header: "Department",
      accessor: "departmentId",
      render: (_value, category) =>
        departments.find(
          (department) =>
            department.id === category.departmentId,
        )?.name ?? "Department unavailable",
    });
  }

  columns.push(
    {
      header: "Status",
      accessor: "status",
      render: (_value, category) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            category.status === "ACTIVE"
              ? "bg-green-50 text-green-700"
              : "bg-red-50 text-red-600"
          }`}
        >
          {category.status}
        </span>
      ),
    },
    {
      header: "Created At",
      accessor: "createdAt",
      render: (_value, category) =>
        new Date(category.createdAt).toLocaleDateString(
          "en-IN",
          {
            day: "2-digit",
            month: "short",
            year: "numeric",
          },
        ),
    },
    {
      header: "Actions",
      accessor: "id",
      render: (_value, category) => (
        <button
          type="button"
          onClick={() =>
            navigate(
              `/company-admin/categories/${category.id}`,
            )
          }
          className="font-medium text-blue-600 hover:underline"
        >
          View
        </button>
      ),
    },
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          {departmentId && (
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/company-admin/departments/${departmentId}`,
                )
              }
              className="mb-3 text-sm font-medium text-gray-500 hover:text-blue-600"
            >
              ← Back to Department
            </button>
          )}

          <h1 className="text-2xl font-semibold text-gray-900">
            Category Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {departmentId
              ? "Manage categories belonging to this department."
              : "Manage categories across all departments."}
          </p>
        </div>

        <button
          type="button"
          onClick={handleCreateCategory}
          disabled={
            isCreating ||
            (!departmentId && isDepartmentsLoading)
          }
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          + Add Category
        </button>
      </div>

      {/* Initial Loading */}
      {isFetching && categories.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white p-12 text-center text-sm text-gray-500">
          Loading categories...
        </div>
      )}

      {/* Category DataTable */}
      {categories.length > 0 && (
        <>
          {isFetching && (
            <p className="text-sm text-gray-500">
              Updating categories...
            </p>
          )}

          <DataTable<Category>
            data={categories}
            columns={columns}
          />

          {/* Pagination */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {total === 0
                ? 0
                : (page - 1) * PAGE_LIMIT + 1}
              {"–"}
              {Math.min(page * PAGE_LIMIT, total)} of{" "}
              {total} categories
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() =>
                  setPage((current) => current - 1)
                }
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {Math.max(totalPages, 1)}
              </span>

              <button
                type="button"
                disabled={
                  page >= totalPages || isFetching
                }
                onClick={() =>
                  setPage((current) => current + 1)
                }
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!isFetching &&
        categories.length === 0 &&
        !fetchError && (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
              +
            </div>

            <h2 className="mt-4 font-semibold text-gray-900">
              No categories found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              {departmentId
                ? "Create the first category for this department."
                : "Create the first category and assign it to a department."}
            </p>

            <button
              type="button"
              onClick={handleCreateCategory}
              disabled={
                isCreating ||
                (!departmentId && isDepartmentsLoading)
              }
              className="mt-5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              Create Category
            </button>
          </div>
        )}

      {/* Create Category Modal */}
      <CreateCategoryModal
        isOpen={isModalOpen}
        mode="create"
        category={null}
        departmentId={departmentId}
        departments={departments}
        isSubmitting={isCreating}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default CategoryManagementPage;
