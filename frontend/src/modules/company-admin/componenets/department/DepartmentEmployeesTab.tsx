import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { getAllEmployeesThunk } from "../../../../redux/slices/employee/employeeThunks";
import type { DataTableColumn } from "../../../../components/common/Datatable";
import type { Employee } from "../../types/EmployeeUI";
import DataTable from "../../../../components/common/Datatable";

const PAGE_LIMIT = 3;

export interface DepartmentEmployeesProps {
  departmentId: string;
}

const DepartmentEmployeesTab = ({
  departmentId,
}: DepartmentEmployeesProps) => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);

  const {
    employees,
    isLoading,
    error,
    pagination,
  } = useAppSelector((state) => state.employee);



  console.log("deptIdddddddddd",departmentId)
  useEffect(() => {
    if (!departmentId) return;

    dispatch(
      getAllEmployeesThunk({
        
        page,
        limit: PAGE_LIMIT,
        search:"",
        departmentId,
      }),
    );
  }, [dispatch, departmentId, page]);
  const columns: DataTableColumn<Employee>[] = [
  {
    header: "Employee ID",
    accessor: "employeeId",
  },
  {
      header: "Employee",
      accessor: "firstName",
      render: (_value, employee) => (
        <div>
          <div className="font-medium text-slate-800">
            {employee.firstName} {employee.lastName}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {employee.email}
          </div>
        </div>
      ),
    },
  {
    header: "Email",
    accessor: "email",
  },
  // {
  //   header: "Role",
  //   accessor: "role",
  // },
  {
    header: "Status",
    accessor: "status",
    render: (_value, employee) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          employee.status === "ACTIVE"
            ? "bg-green-50 text-green-700"
            : "bg-red-50 text-red-600"
        }`}
      >
        {employee.status}
      </span>
    ),
  },
];

  if (isLoading) {
    return (
      <div className="mt-5 rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-500">
        Loading employees...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-5 rounded-xl border border-red-200 bg-white p-8 text-center text-red-600">
        {error}
      </div>
    );
  }

  return (
    <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        Department Employees
      </h2>

      <DataTable
  columns={columns}
  data={employees}
/>

      {pagination && pagination.totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <button
            type="button"
            disabled={page === 1}
            onClick={() => setPage((prev) => prev - 1)}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
          >
            Previous
          </button>

          <span className="text-sm text-gray-500">
            Page {page} of {pagination.totalPages}
          </span>

          <button
            type="button"
            disabled={page >= pagination.totalPages}
            onClick={() => setPage((prev) => prev + 1)}
            className="rounded-lg border px-4 py-2 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
};

export default DepartmentEmployeesTab;