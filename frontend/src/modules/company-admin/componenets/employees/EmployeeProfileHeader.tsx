import { Pencil, UserCheck, UserX } from "lucide-react";
import type { Employee } from "../../types/EmployeeUI";

interface EmployeeProfileHeaderProps {
  employee: Employee;
  onEdit: () => void;
  onStatusClick: () => void;
}

const EmployeeProfileHeader = ({
  employee,
  onEdit,
  onStatusClick,
}: EmployeeProfileHeaderProps) => {
  const getStatusStyle = () => {
    switch (employee.status) {
      case "ACTIVE":
        return "bg-emerald-50 text-emerald-700";

      case "INACTIVE":
        return "bg-red-50 text-red-700";

      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  const initials =
    `${employee.firstName?.charAt(0) ?? ""}${employee.lastName?.charAt(0) ?? ""}` || "E";

  const isActive = employee.status === "ACTIVE";

  const canChangeStatus =
    employee.status === "ACTIVE" || employee.status === "INACTIVE";

  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

        {/* Employee Information */}
        <div className="flex items-center gap-4">
          {employee.profilePhoto ? (
            <img
              src={employee.profilePhoto}
              alt={`${employee.firstName} ${employee.lastName}`}
              className="h-16 w-16 shrink-0 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-purple-100 text-xl font-semibold text-[#7C3AED]">
              {initials}
            </div>
          )}

          <div className="min-w-0">
            <h1 className="text-xl font-bold text-gray-900">
              {employee.firstName} {employee.lastName}
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              {employee.employeeId || "Employee ID Not Available"}
            </p>

            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-purple-50 px-3 py-1 text-xs font-medium text-[#7C3AED]">
                {employee.roleName || "Role Not Available"}
              </span>

              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusStyle()}`}
              >
                {employee.status}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">

          {/* Edit Button */}
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#6D28D9]"
          >
            <Pencil size={16} />
            Edit Employee
          </button>

          {/* Activate / Deactivate Button */}
          {canChangeStatus && (
            <button
              type="button"
              onClick={onStatusClick}
              className={`flex items-center justify-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                  : "border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
              }`}
            >
              {isActive ? (
                <>
                  <UserX size={16} />
                  Deactivate
                </>
              ) : (
                <>
                  <UserCheck size={16} />
                  Activate
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfileHeader;