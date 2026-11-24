import { Mail, Phone } from "lucide-react";

import EmployeeDetailItem from "./EmployeeDetailItem";
import type { Employee } from "../../types/EmployeeUI";

interface EmployeePersonalInfoProps {
  employee: Employee;
}

const EmployeePersonalInfo = ({
  employee,
}: EmployeePersonalInfoProps) => {
  return (
    <section>
      <h2 className="text-base font-semibold text-gray-900">
        Personal Information
      </h2>

      <div className="mt-5 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <EmployeeDetailItem
          icon={Mail}
          label="Email Address"
          value={employee.email || "Not Available"}
        />

        <EmployeeDetailItem
          icon={Phone}
          label="Phone Number"
          value={employee.phone || "Not Available"}
        />
      </div>
    </section>
  );
};

export default EmployeePersonalInfo;