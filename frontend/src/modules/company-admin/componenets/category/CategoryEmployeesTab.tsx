
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { getAllEmployeesThunk } from "../../../../redux/slices/employee/employeeThunks";

import type { DataTableColumn } from "../../../../components/common/Datatable";
import DataTable from "../../../../components/common/Datatable";

import type { Employee } from "../../types/EmployeeUI";
import type { UnassignedEmployee } from "../../types/categoryTypes";

import {
  assignEmployees,
  getUnassignedEmployeesForCategory,
  removeEmployee,
} from "../../services/category/CategoryServices";

interface CategoryEmployeesTabProps {
  categoryId: string;
  departmentId: string;
}

const CategoryEmployeesTab = ({
  categoryId,

}: CategoryEmployeesTabProps) => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

  // Available employees
  const [availableEmployees, setAvailableEmployees] = useState<
    UnassignedEmployee[]
  >([]);

  const [isAvailableEmployeesLoading, setIsAvailableEmployeesLoading] =
    useState(false);

  const {
    employees,
    isLoading,
    error,
    pagination,
  } = useAppSelector((state) => state.employee);

  // Fetch available employees
  const fetchAvailableEmployees = async () => {
    try {
      setIsAvailableEmployeesLoading(true);
console.log("daaaaaaaaaaaaaa")
      const data = await getUnassignedEmployeesForCategory(categoryId);

      setAvailableEmployees(data);
    } catch (error) {
      console.error("Fetch available employees error:", error);
      toast.error("Failed to fetch available employees");
    } finally {
      setIsAvailableEmployeesLoading(false);
    }
  };

  // Fetch assigned employees
  const fetchAssignedEmployees = () => {
    dispatch(
      getAllEmployeesThunk({
        page,
        limit: 10,
        search: "",
        categoryId,
      }),
    );
  };

  // Fetch assigned employees when category or page changes
  useEffect(() => {
    if (!categoryId) return;

    fetchAssignedEmployees();
  }, [dispatch, categoryId, page]);

  // Fetch available employees when category changes
  useEffect(() => {
    if (!categoryId) return;

    let ignore = false;

    const fetchEmployees = async () => {
      try {
        setIsAvailableEmployeesLoading(true);

        const data =
          await getUnassignedEmployeesForCategory(categoryId);

        if (!ignore) {
          setAvailableEmployees(data);
        }
      } catch (error) {
        if (!ignore) {
          console.error("Fetch available employees error:", error);
          toast.error("Failed to fetch available employees");
        }
      } finally {
        if (!ignore) {
          setIsAvailableEmployeesLoading(false);
        }
      }
    };

    void fetchEmployees();

    return () => {
      ignore = true;
    };
  }, [categoryId]);

  // Assign employees
  const assignEmploye = async () => {
    if (selectedEmployeeIds.length === 0) {
      toast.error("Please select at least one employee");
      return;
    }

    try {
      await assignEmployees(categoryId, selectedEmployeeIds);

      toast.success("Employees assigned successfully");

      setSelectedEmployeeIds([]);
      setIsAssignModalOpen(false);

      // Refresh available employees
      await fetchAvailableEmployees();

      // Refresh assigned employees
      fetchAssignedEmployees();
    } catch (error) {
      console.error("Assign employees error:", error);
      toast.error("Failed to assign employees");
    }
  };

  // Remove employee
  const handleRemoveEmployee = async (employee: Employee) => {
    try {
      await removeEmployee(categoryId, employee.id);

      toast.success("Employee removed successfully");

      // Refresh assigned employees
      fetchAssignedEmployees();

      // Refresh available employees
      await fetchAvailableEmployees();
    } catch (error) {
      console.error("Remove employee error:", error);
      toast.error("Failed to remove employee");
    }
  };

  // Search available employees
  const filteredAvailableEmployees = availableEmployees.filter((employee) => {
    const search = searchTerm.toLowerCase().trim();

    return (
      employee.name.toLowerCase().includes(search) ||
      employee.email.toLowerCase().includes(search)
    );
  });

  // Assigned employee table columns
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
    {
      header: "Actions",
      accessor: "id",
      render: (_value, employee) => (
        <button
          type="button"
          onClick={() => handleRemoveEmployee(employee)}
          className="font-medium text-red-600 hover:underline"
        >
          Remove
        </button>
      ),
    },
  ];

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-6">
      {/* Header */}
      <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Assigned Employees
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage employees assigned to this category.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setSearchTerm("");
            setSelectedEmployeeIds([]);
            setIsAssignModalOpen(true);
            void fetchAvailableEmployees();
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          Assign Employee
        </button>
      </div>

      {/* Assigned Employees */}
      {isLoading ? (
        <div className="py-10 text-center text-sm text-gray-500">
          Loading employees...
        </div>
      ) : error ? (
        <div className="py-10 text-center text-sm text-red-600">
          {error}
        </div>
      ) : (
        <DataTable
          columns={columns}
          data={employees}
        />
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Page {pagination.page} of {pagination.totalPages}
          </p>

          <div className="flex gap-2">
            <button
              type="button"
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            <button
              type="button"
              disabled={page >= pagination.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
              className="rounded-lg border border-gray-300 px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Assign Employees Modal */}
      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-xl rounded-xl bg-white p-6 shadow-xl">

            {/* Modal Header */}
            <div className="mb-5 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">
                Assign Employees
              </h2>

              <button
                type="button"
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedEmployeeIds([]);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            {/* Search */}
            <div className="mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search employees..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm outline-none focus:border-blue-500"
              />
            </div>

            {/* Available Employees */}
            <div className="max-h-72 overflow-y-auto rounded-lg border border-gray-200">

              {isAvailableEmployeesLoading ? (
                <p className="p-6 text-center text-sm text-gray-500">
                  Loading employees...
                </p>
              ) : filteredAvailableEmployees.length === 0 ? (
                <p className="p-6 text-center text-sm text-gray-500">
                  No employees found.
                </p>
              ) : (
                filteredAvailableEmployees.map((employee) => (
                  <label
                    key={employee.id}
                    className="flex cursor-pointer items-center gap-3 border-b border-gray-100 p-4 last:border-b-0 hover:bg-gray-50"
                  >
                    <input
                      type="checkbox"
                      checked={selectedEmployeeIds.includes(employee.id)}
                      onChange={(e) => {
                        setSelectedEmployeeIds((prev) =>
                          e.target.checked
                            ? [...prev, employee.id]
                            : prev.filter((id) => id !== employee.id),
                        );
                      }}
                      className="h-4 w-4 accent-blue-600"
                    />

                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {employee.name}
                      </p>

                      <p className="text-xs text-gray-500">
                        {employee.email}
                      </p>
                    </div>
                  </label>
                ))
              )}
            </div>

            {/* Modal Footer */}
            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsAssignModalOpen(false);
                  setSelectedEmployeeIds([]);
                }}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={
                  selectedEmployeeIds.length === 0 ||
                  isAvailableEmployeesLoading
                }
                onClick={assignEmploye}
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Assign Selected ({selectedEmployeeIds.length})
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};

export default CategoryEmployeesTab;
