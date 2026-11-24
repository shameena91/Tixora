import {
  Building2,
  User,
  CalendarDays,
  Layers,
  Hash,
} from "lucide-react";


import EmployeeDetailItem from "./EmployeeDetailItem";
import type { Employee } from "../../types/EmployeeUI";

interface EmployeeWorkInfoProps {
  employee: Employee;
  isSupportAgent: boolean;
}

const EmployeeWorkInfo = ({
  employee,
  isSupportAgent,
}: EmployeeWorkInfoProps) => {
  const formatDate = (date: string) => {
    if (!date) return "Not Available";
console.log("mployee.categories",employee)
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Not Available";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <section className="border-t border-gray-100 pt-6">
      <h2 className="text-base font-semibold text-gray-900">
        Work Information
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <EmployeeDetailItem
          icon={Hash}
          label="Employee ID"
          value={employee.employeeId || "Not Available"}
        />

        <EmployeeDetailItem
          icon={Building2}
          label="Department"
          value={employee.departmentName || "Not Available"}
        />

        <EmployeeDetailItem
          icon={User}
          label="Employee Role"
          value={employee.roleName || "Not Available"}
        />

        <EmployeeDetailItem
          icon={CalendarDays}
          label="Joining Date"
          value={formatDate(employee.joiningDate)}
        />
      </div>

      {/* Assigned Categories */}
     {/* Assigned Categories */}
{isSupportAgent && (
  <div className="mt-7 border-t border-gray-100 pt-6">
    <div className="flex items-center gap-2">
      <Layers size={18} className="text-[#7C3AED]" />

      <h3 className="text-sm font-semibold text-gray-900">
        Assigned Categories
      </h3>
    </div>

    {employee.categories && employee.categories.length > 0 ? (
      <div className="mt-4 flex flex-wrap gap-2">
        {employee.categories.map((category) => (
          <span
            key={category.id}
            className="rounded-lg border border-purple-100 bg-purple-50 px-3 py-2 text-sm font-medium text-[#7C3AED]"
          >
            {category.name}
          </span>
        ))}
      </div>
    ) : employee.categoryIds?.length > 0 ? (
      <p className="mt-3 text-sm text-gray-400">
        Category names not available
      </p>
    ) : (
      <p className="mt-3 text-sm text-gray-400">
        No categories assigned
      </p>
    )}
  </div>
)}
    </section>
  );
};

export default EmployeeWorkInfo;