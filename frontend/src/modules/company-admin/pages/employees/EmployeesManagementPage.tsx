
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Plus,
  Users,
  UserCheck,
  UserX,
  Clock,
  Pencil,
  Eye,
  RotateCcw,
} from "lucide-react";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import { getAllEmployeesThunk, resendEmployeeInvitationThunk } from "../../../../redux/slices/employee/employeeThunks";

import type { Employee } from "../../types/EmployeeUI";

import type { DataTableColumn } from "../../../../components/common/Datatable";
import DataTable from "../../../../components/common/Datatable";


const PAGE_LIMIT = 4;

const EmployeesManagementPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const {
    employees,
    isLoading,
    error,
    pagination,
  } = useAppSelector((state) => state.employee);
  const { isResendingInvitation, resendInvitationError } =
  useAppSelector((state) => state.employee);

const [resendSuccess, setResendSuccess] = useState("");

  console.log("Employeeeeeeees",employees)
  useEffect(() => {
    dispatch(
      getAllEmployeesThunk({
        page,
        limit: PAGE_LIMIT,
        search,
        
      }),


    );
  }, [dispatch, page, search]);

  const handleResendInvitation = async (accountId: string) => {
  setResendSuccess("");

  
    await dispatch(resendEmployeeInvitationThunk(accountId)).unwrap();
    setResendSuccess("Invitation resent successfully");
 
};

  // Employee statistics
  const activeCount = employees.filter(
    (employee) => employee.status === "ACTIVE",
  ).length;

  const inactiveCount = employees.filter(
    (employee) => employee.status === "INACTIVE",
  ).length;

  const pendingCount = employees.filter(
    (employee) => employee.status === "PENDING",
  ).length;

  const stats = [
    {
      label: "Total Employees",
      value: pagination.total,
      icon: Users,
    },
    {
      label: "Active Employees",
      value: activeCount,
      icon: UserCheck,
    },
    {
      label: "Inactive Employees",
      value: inactiveCount,
      icon: UserX,
    },
    {
      label: "Pending Invitations",
      value: pendingCount,
      icon: Clock,
    },
  ];


  const columns: DataTableColumn<Employee>[] = [
     {
      header: "Employee ID",
      accessor: "employeeId",
    },{
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
    }, {
      header: "Department",
      accessor: "departmentName",
     
    },
     {
      header: "Role",
      accessor: "roleName",
     
    },
   
    {
      header: "Workload",
      accessor: "workload",
      render: (value) =>
        value !== null && value !== undefined
          ? String(value)
          : "—",
    },
    {
      header: "Status",
      accessor: "status",
      render: (_value, employee) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            employee.status === "ACTIVE"
              ? "bg-green-50 text-green-700"
              : employee.status === "INACTIVE"
                ? "bg-red-50 text-red-700"
                : "bg-amber-50 text-amber-700"
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
    <div className="flex items-center gap-2">
 <button
  type="button"
  onClick={() =>
    navigate(`/company-admin/employee-management/${employee.accountId}`)
  }
  title="View employee"
  className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-[#7C3AED]"
>
  <Eye size={16} />
</button>

      <button
        type="button"
        onClick={() =>
          navigate(
            `/company-admin/employee-management/${employee.id}/edit`,
          )
        }
        title="Edit employee"
        className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-[#7C3AED]"
      >
        <Pencil size={16} />
      </button>
      {employee.status === "PENDING" && (
  <button
    type="button"
    onClick={() => handleResendInvitation(employee.accountId)}
    disabled={isResendingInvitation}
    title="Resend invitation"
    className="rounded-lg border border-slate-200 p-2 text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-50"
  >
    <RotateCcw
      size={16}
      className={isResendingInvitation ? "animate-spin" : ""}
    />
  </button>
)}
    </div>
  ),
},
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Employee Management
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage your company employees and their assignments.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate("/company-admin/employee-management/create")
          }
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#6D28D9]"
        >
          <Plus size={18} />
          Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <div className="rounded-lg bg-purple-50 p-2 text-[#7C3AED]">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-800">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Employee List */}
      <div className="space-y-5">
        {/* Heading and Search */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-800">
              All Employees
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              View and manage your employee list.
            </p>
          </div>

         <div className="flex w-full gap-2 sm:w-auto">
  <input
    type="text"
    value={search}
    onChange={(event) => {
      setSearch(event.target.value);
      setPage(1);
    }}
    placeholder="Search employees..."
    className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100 sm:w-72"
  />

  <button
    type="button"
    onClick={() => {
      setSearch("");
      setPage(1);
    }}
    disabled={!search}
    title="Reset search"
    className="inline-flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:border-purple-200 hover:bg-purple-50 hover:text-[#7C3AED] disabled:cursor-not-allowed disabled:opacity-40"
  >
    <RotateCcw size={16} />
    Reset
  </button>
</div>
        </div>

        {/* Error */}
        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-sm text-red-600">
            {error}
          </div>
        ) : (
          <>
          {resendSuccess && (
  <div className="mb-4 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-700">
    {resendSuccess}
  </div>
)}

{resendInvitationError && (
  <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
    {resendInvitationError}
  </div>
)}
            {/* DataTable */}
            {isLoading && employees.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white py-12 text-center text-sm text-slate-500">
                Loading employees...
              </div>
            ) : employees.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white py-12 text-center">
                <Users
                  size={36}
                  className="mx-auto text-slate-300"
                />
                <p className="mt-3 font-medium text-slate-700">
                  No employees found
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {search
                    ? "Try searching with another keyword."
                    : "Add your first employee to get started."}
                </p>
              </div>
            ) : (
              <DataTable<Employee>
                data={employees}
                columns={columns}
              />
            )}

            {/* Pagination */}
            {employees.length > 0 && (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-slate-500">
                  Showing{" "}
                  {(pagination.page - 1) * pagination.limit + 1}
                  {"–"}
                  {Math.min(
                    pagination.page * pagination.limit,
                    pagination.total,
                  )}{" "}
                  of {pagination.total} employees
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={page <= 1 || isLoading}
                    onClick={() =>
                      setPage((current) => current - 1)
                    }
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Previous
                  </button>

                  <span className="whitespace-nowrap text-sm text-slate-600">
                    Page {pagination.page} of{" "}
                    {Math.max(pagination.totalPages, 1)}
                  </span>

                  <button
                    type="button"
                    disabled={
                      page >= pagination.totalPages ||
                      isLoading
                    }
                    onClick={() =>
                      setPage((current) => current + 1)
                    }
                    className="rounded-lg border border-slate-300 px-4 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

    </div>
  );
};

export default EmployeesManagementPage;
