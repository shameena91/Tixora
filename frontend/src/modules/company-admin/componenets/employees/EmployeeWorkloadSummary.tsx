import { Ticket, UserCheck } from "lucide-react";
import type { Employee } from "../../types/EmployeeUI";


interface EmployeeWorkloadSummaryProps {
  employee: Employee;
  ticketLabel: string;
}

const EmployeeWorkloadSummary = ({
  employee,
  ticketLabel,
}: EmployeeWorkloadSummaryProps) => {
  return (
    <div className="grid grid-cols-1 gap-3 border-t border-gray-100 pt-5 sm:grid-cols-2">
      {/* Current Workload */}
      <div className="flex items-center gap-3 rounded-xl bg-purple-50 p-4">
        <div className="rounded-lg bg-white p-2 text-[#7C3AED]">
          <UserCheck size={20} />
        </div>

        <div>
          <p className="text-xs text-gray-500">
            Current Workload
          </p>

          <p className="mt-1 text-xl font-bold text-gray-900">
            {typeof employee.workload === "number"
              ? employee.workload
              : "Not Available"}
          </p>
        </div>
      </div>

      {/* Ticket Summary */}
      <div className="flex items-center gap-3 rounded-xl bg-gray-50 p-4">
        <div className="rounded-lg bg-white p-2 text-gray-600">
          <Ticket size={20} />
        </div>

        <div>
          <p className="text-xs text-gray-500">
            {ticketLabel}
          </p>

          <p className="mt-1 text-sm font-semibold text-gray-700">
            Not Available
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeWorkloadSummary;