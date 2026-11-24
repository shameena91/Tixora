import type { ElementType } from "react";

interface EmployeeDetailItemProps {
  icon: ElementType;
  label: string;
  value: string;
}

const EmployeeDetailItem = ({
  icon: Icon,
  label,
  value,
}: EmployeeDetailItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="rounded-lg bg-purple-50 p-2 text-[#7C3AED]">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium text-gray-500">
          {label}
        </p>

        <p className="mt-1 break-words text-sm font-semibold text-gray-800">
          {value || "Not Available"}
        </p>
      </div>
    </div>
  );
};

export default EmployeeDetailItem;