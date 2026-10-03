import type { ReactNode } from "react";

interface InfoRowProps {
  label: string;
  value: ReactNode;
  valueType?: "success" | "default";
}

const InfoRow = ({
  label,
  value,
  valueType = "default",
}: InfoRowProps) => {
  const valueClassName =
    valueType === "success"
      ? "text-emerald-600"
      : "text-gray-900";

  return (
    <div className="flex items-start justify-between gap-4 border-b border-gray-50 py-3 last:border-b-0">
      <span className="text-sm text-gray-500">
        {label}
      </span>

      <span
        className={`text-right text-sm font-medium ${valueClassName}`}
      >
        {value || "-"}
      </span>
    </div>
  );
};

export default InfoRow;