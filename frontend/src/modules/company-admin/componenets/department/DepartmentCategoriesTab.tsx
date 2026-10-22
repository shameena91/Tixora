
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import { getCategoriesByDepartmentThunk } from "../../../../redux/slices/category/categoryThunk";
import type { DataTableColumn } from "../../../../components/common/Datatable";
import type { Category } from "../../types/categoryTypes";
import DataTable from "../../../../components/common/Datatable";



const PAGE_LIMIT = 3;

interface DepartmentCategoriesTabProps {
  departmentId: string;
}

const DepartmentCategoriesTab = ({
  departmentId,
}: DepartmentCategoriesTabProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const {
    categories,
    isFetching,
    fetchError,
    total,
    totalPages,
  } = useAppSelector((state) => state.category);


  useEffect(() => {
    dispatch(
      getCategoriesByDepartmentThunk({
        departmentId,
        page,
        limit: PAGE_LIMIT,
      }),
    );
  }, [dispatch, departmentId, page]);

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
      render: (_value, category) => {
        const date = new Date(category.createdAt);

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
  ];

  return (
    <section className="mt-5 space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">
          Department Categories
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Categories belonging to this department.
        </p>
      </div>

      {isFetching && categories.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
          Loading categories...
        </div>
      ) : fetchError ? (
        <div
          role="alert"
          className="rounded-xl border border-gray-200 bg-white p-8 text-sm text-red-600"
        >
          {fetchError}
        </div>
      ) : categories.length === 0 ? (
        <div className="rounded-xl border border-gray-200 bg-white px-6 py-12 text-center">
          <h3 className="font-semibold text-gray-900">
            No categories found
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            No categories have been created for this department yet.
          </p>
        </div>
      ) : (
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

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing {(page - 1) * PAGE_LIMIT + 1}–
              {Math.min(page * PAGE_LIMIT, total)} of {total} categories
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
                disabled={page >= totalPages || isFetching}
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
    </section>
  );
};

export default DepartmentCategoriesTab;
