import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

import CreateDepartmentModal from "../components/CreateDepartmentModal";

import type { Department } from "../types/departmentTypes";
import type { CreateDepartmentFormData } from "../schemas/departmentValidation";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/hooks";

import {
  createDepartmentThunk,
  getAllDepartmentsThunk,
} from "../../../redux/slices/department/departmentThunk";

import type { DataTableColumn } from "../../../components/common/Datatable";
import DataTable from "../../../components/common/Datatable";

const DEFAULT_LIMIT = 3;
const MAX_LIMIT = 100;

const DepartmentListPage = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const rawPage = searchParams.get("page");
  const rawLimit = searchParams.get("limit");

  const parsedPage = Number(rawPage);
  const parsedLimit = Number(rawLimit);

  const isValidPage =
    rawPage !== null &&
    Number.isInteger(parsedPage) &&
    parsedPage >= 1;

  const isValidLimit =
    rawLimit !== null &&
    Number.isInteger(parsedLimit) &&
    parsedLimit >= 1 &&
    parsedLimit <= MAX_LIMIT;

  const page = isValidPage ? parsedPage : 1;
  const limit = isValidLimit ? parsedLimit : DEFAULT_LIMIT;

  const {
    departments,
    isLoading: isCreating,
    isFetching,
    fetchError,
    total,
    totalPages,
  } = useAppSelector((state) => state.department);

  // Set default pagination values in the URL
  useEffect(() => {
    if (isValidPage && isValidLimit) {
      return;
    }

    const params = new URLSearchParams(searchParams);

    if (!isValidPage) {
      params.set("page", "1");
    }

    if (!isValidLimit) {
      params.set("limit", String(DEFAULT_LIMIT));
    }

    setSearchParams(params, { replace: true });
  }, [
    isValidPage,
    isValidLimit,
    searchParams,
    setSearchParams,
  ]);

  // Fetch departments when page or limit changes
  useEffect(() => {
    if (!isValidPage || !isValidLimit) {
      return;
    }

    dispatch(
      getAllDepartmentsThunk({
        page,
        limit,
      }),
    );
  }, [
    dispatch,
    page,
    limit,
    isValidPage,
    isValidLimit,
  ]);

  // Show fetch errors through toast
  useEffect(() => {
    if (fetchError) {
      toast.error(fetchError);
    }
  }, [fetchError]);

  // Update pagination through URL
  const updatePage = (nextPage: number) => {
    const params = new URLSearchParams(searchParams);

    params.set("page", String(Math.max(1, nextPage)));
    params.set("limit", String(limit));

    setSearchParams(params);
  };

  // Create Department
  const handleCreateDepartment = async (
    data: CreateDepartmentFormData,
  ) => {
    try {
      await dispatch(createDepartmentThunk(data)).unwrap();

      setIsCreateModalOpen(false);

      toast.success("Department created successfully");

      if (page !== 1) {
        updatePage(1);
      } else {
        dispatch(
          getAllDepartmentsThunk({
            page: 1,
            limit,
          }),
        );
      }
    } catch (error: unknown) {
      const message =
        typeof error === "string"
          ? error
          : error instanceof Error
            ? error.message
            : "Failed to create department";

      toast.error(message);
    }
  };

  // Department table columns
  const columns: DataTableColumn<Department>[] = [
    {
      id: "name",
      header: "Department Name",
      accessor: "name",
    },
    {
      id: "code",
      header: "Code",
      accessor: "code",
    },
    {
      id: "description",
      header: "Description",
      accessor: "description",
      render: (value: unknown) => String(value || "—"),
    },
    {
      id: "manager",
      header: "Manager",
      accessor: "managerId",
      render: (value: unknown) =>
        value ? String(value) : "Not assigned",
    },
    {
      id: "status",
      header: "Status",
      accessor: "status",
      render: (value: unknown) => {
        const status = String(value ?? "INACTIVE");

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              status === "ACTIVE"
                ? "bg-green-50 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status}
          </span>
        );
      },
    },
    {
      id: "createdAt",
      header: "Created At",
      accessor: "createdAt",
      render: (value: unknown) => {
        if (!value) return "—";

        const date = new Date(String(value));

        return Number.isNaN(date.getTime())
          ? "—"
          : date.toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            });
      },
    },
    {
      id: "action",
      header: "Action",
      accessor: "id",
      render: (_value: unknown, row: Department) => (
        <button
          type="button"
          onClick={() =>
            navigate(`/company-admin/departments/${row.id}`)
          }
          className="text-sm font-medium text-blue-600 hover:underline"
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Departments
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your company's departments.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsCreateModalOpen(true)}
          className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          + Add Department
        </button>
      </div>

      {/* Initial Loading */}
      {isFetching && departments.length === 0 && (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center text-sm text-gray-500">
          Loading departments...
        </div>
      )}

      {/* Department Table */}
      {departments.length > 0 && (
        <>
          {isFetching && (
            <p className="text-sm text-gray-500">
              Updating departments...
            </p>
          )}

          <DataTable
            data={departments}
            columns={columns}
          />

          {/* Pagination */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              {total === 0 ? 0 : (page - 1) * limit + 1}
              {"–"}
              {Math.min(page * limit, total)} of {total} departments
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={page <= 1 || isFetching}
                onClick={() => updatePage(page - 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>

              <span className="text-sm text-gray-600">
                Page {page} of {Math.max(totalPages, 1)}
              </span>

              <button
                type="button"
                disabled={page >= totalPages || isFetching}
                onClick={() => updatePage(page + 1)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Empty State */}
      {!isFetching &&
        departments.length === 0 &&
        !fetchError && (
          <div className="rounded-xl border border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <span className="text-2xl text-blue-600">+</span>
            </div>

            <h2 className="text-base font-semibold text-gray-900">
              No departments found
            </h2>

            <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
              You haven't created any departments yet.
              Add your first department to get started.
            </p>

            <button
              type="button"
              onClick={() => setIsCreateModalOpen(true)}
              className="mt-5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Create your first department
            </button>
          </div>
        )}

      {/* Create Department Modal */}
      <CreateDepartmentModal
        isOpen={isCreateModalOpen}
        mode="create"
        isSubmitting={isCreating}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateDepartment}
      />
    </div>
  );
};

export default DepartmentListPage;