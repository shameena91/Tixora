import { useEffect, useState } from "react";
import {
  User,
  Ticket,
  ArrowLeft,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";

import {
  getEmployeeByIdThunk,
  updateEmployeeStatusThunk,
  updateEmployeeThunk,
} from "../../../../redux/slices/employee/employeeThunks";

import EmployeeProfileHeader from "../../componenets/employees/EmployeeProfileHeader";
import EmployeeWorkloadSummary from "../../componenets/employees/EmployeeWorkloadSummary";
import EmployeePersonalInfo from "../../componenets/employees/EmployeePersonalInfo";
import EmployeeWorkInfo from "../../componenets/employees/EmployeeWorkInfo";
import EmployeeTickets from "../../componenets/employees/EmployeeTickets";
import EmployeeStatusModal from "../../componenets/employees/EmployeeStatusModal";
import toast from "react-hot-toast";
import EmployeeEditModal from "../../componenets/employees/EmployeeEditModal";
import type { UpdateEmployeePayload } from "../../types/EmployeeUI";
import { getAllRolesThunk } from "../../../../redux/slices/roles/roleThunk";
import { getCategoriesByDepartmentThunk } from "../../../../redux/slices/category/categoryThunk";

type TabType = "overview" | "tickets";

const EmployeeDetailsPage = () => {
  const navigate = useNavigate();

  const { employeeId } = useParams<{ employeeId: string }>();

  const dispatch = useAppDispatch();

// Employee State
const {
  selectedEmployee,
  isLoading,
  isStatusUpdating,
  error,
} = useAppSelector((state) => state.employee);



console.log("selectedEmployee",selectedEmployee)
// Department List
const departments = useAppSelector(
  (state) => state.department.departments
);

console.log("Department Details:", departments);
// Role List
const roles = useAppSelector(
  (state) => state.roles.roles
);
console.log("roles Details:", roles);
// Category List
const categories = useAppSelector(
  (state) => state.category.categories
);
const currentDepartmentManager = departments.find(
  (department) => department.id === selectedEmployee?.departmentId
)?.manager ?? null;
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Fetch Employee Details
  useEffect(() => {
    if (!employeeId) return;

    dispatch(getEmployeeByIdThunk(employeeId));
  }, [employeeId, dispatch]);
useEffect(() => {
  if (!isEditModalOpen || !selectedEmployee) return;

  dispatch(getAllRolesThunk());

  dispatch(
    getCategoriesByDepartmentThunk({
      departmentId: selectedEmployee.departmentId,
      page: 1,
      limit: 100,
    })
  );
}, [
  isEditModalOpen,
  selectedEmployee?.departmentId,
  dispatch,
]);
  // Loading State
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-purple-100 border-t-[#7C3AED]" />

          <p className="mt-4 text-sm font-medium text-gray-500">
            Loading employee details...
          </p>
        </div>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Unable to load employee
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          {typeof error === "string"
            ? error
            : "Something went wrong while fetching employee details."}
        </p>

        <button
          type="button"
          onClick={() => {
            if (employeeId) {
              dispatch(getEmployeeByIdThunk(employeeId));
            }
          }}
          className="mt-5 rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#6D28D9]"
        >
          Try Again
        </button>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-3 text-sm font-medium text-gray-500 hover:text-gray-800"
        >
          Back to Employees
        </button>
      </div>
    );
  }

  // Employee Not Found
  if (!selectedEmployee) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">
          Employee not found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          The requested employee details are not available.
        </p>

        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-5 rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#6D28D9]"
        >
          Back to Employees
        </button>
      </div>
    );
  }

  // Normalize Role Name
  const normalizedRole = selectedEmployee.roleName
    ?.trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

  const isSupportAgent = normalizedRole === "SUPPORT_AGENT";

  const isDepartmentAdmin = normalizedRole === "DEPARTMENT_ADMIN";

  // Role-based Ticket Label
  const getTicketLabel = () => {
    if (isSupportAgent) return "Assigned Tickets";

    if (isDepartmentAdmin) return "Assigned & Escalated Tickets";

    return "Raised Tickets";
  };

  // Open Status Confirmation Modal
 
const handleEdit = () => {
  setIsEditModalOpen(true);
};

const handleUpdateEmployee = async (
  data: UpdateEmployeePayload
): Promise<void> => {
  if (!employeeId) return;

  try {
    await dispatch(
      updateEmployeeThunk({
        employeeId,
        data,
      })
    ).unwrap();

    toast.success("Employee updated successfully");

  } catch (error) {
    console.error("Employee update failed:", error);

    toast.error(
      typeof error === "string"
        ? error
        : "Failed to update employee"
    );

    throw error;
  }
};
  // Confirm Status Change

   const handleStatusClick = () => {
    setIsStatusModalOpen(true);
  };
 const handleStatusChange = async () => {
  if (!employeeId || !selectedEmployee || isStatusUpdating) return;

  const status =
    selectedEmployee.status === "ACTIVE"
      ? "INACTIVE"
      : "ACTIVE";

  try {
    await dispatch(
      updateEmployeeStatusThunk({
        employeeId,
        status,
      })
    ).unwrap();

    setIsStatusModalOpen(false);

    toast.success(
      `Employee ${status === "ACTIVE" ? "activated" : "deactivated"} successfully`
    );

  } catch (error) {
    console.error("Employee status update failed:", error);

    toast.error(
      typeof error === "string"
        ? error
        : "Failed to update employee status"
    );
  }
};

 

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">

      <div className="mx-auto max-w-6xl space-y-6">

        {/* Back Navigation */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#7C3AED]"
        >
          <ArrowLeft size={18} />
          Back to Employees
        </button>

        {/* Employee Profile */}
        <div className="space-y-6">

          <EmployeeProfileHeader
            employee={selectedEmployee}
            onEdit={handleEdit}
            onStatusClick={handleStatusClick}
          />

          <EmployeeWorkloadSummary
            employee={selectedEmployee}
            ticketLabel={getTicketLabel()}
          />

        </div>

        {/* Tabs */}
        <div className="rounded-2xl border border-gray-100 bg-white shadow-sm">

          <div className="flex border-b border-gray-100 px-5 sm:px-6">

            {/* Overview Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition ${
                activeTab === "overview"
                  ? "border-[#7C3AED] text-[#7C3AED]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <User size={17} />
              Overview
            </button>

            {/* Tickets Tab */}
            <button
              type="button"
              onClick={() => setActiveTab("tickets")}
              className={`flex items-center gap-2 border-b-2 px-4 py-4 text-sm font-medium transition ${
                activeTab === "tickets"
                  ? "border-[#7C3AED] text-[#7C3AED]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              <Ticket size={17} />
              Tickets
            </button>

          </div>

          <div className="p-5 sm:p-6">

            {/* Overview Content */}
            {activeTab === "overview" && (
              <div className="space-y-7">

                <EmployeePersonalInfo
                  employee={selectedEmployee}
                />

                <EmployeeWorkInfo
                  employee={selectedEmployee}
                  isSupportAgent={isSupportAgent}
                />

              </div>
            )}

            {/* Tickets Content */}
            {activeTab === "tickets" && (
              <EmployeeTickets
                ticketLabel={getTicketLabel()}
              />
            )}

          </div>
        </div>

      </div>

      {/* Employee Status Confirmation Modal */}
      <EmployeeStatusModal
        isOpen={isStatusModalOpen}
        employeeName={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
        status={selectedEmployee.status}
        onClose={() => setIsStatusModalOpen(false)}
        onConfirm={handleStatusChange}
        isLoading={isStatusUpdating}
      />
{/* {isEditModalOpen && (
  <EmployeeEditModal
    key={selectedEmployee.id}
    isOpen={true}
    employee={selectedEmployee}
     
  roles={roles}
  categories={categories}
    onClose={() => setIsEditModalOpen(false)}
    onSubmit={handleUpdateEmployee}
  />
)} */}

{isEditModalOpen && (
  <EmployeeEditModal
    key={selectedEmployee.id}
    isOpen={true}
    employee={selectedEmployee}
    roles={roles}
    categories={categories}
    currentDepartmentManager={currentDepartmentManager}
    onClose={() => setIsEditModalOpen(false)}
    onSubmit={handleUpdateEmployee}
  />
)}
    </div>
  );
};

export default EmployeeDetailsPage;