interface StatusBadgeProps {
  status?: string | null;
}

const StatusBadge = ({
  status,
}: StatusBadgeProps) => {
  const normalizedStatus =
    status?.toUpperCase() || "UNKNOWN";

  const getStyle = () => {
    switch (normalizedStatus) {
      case "ACTIVE":
      case "PAID":
      case "RESOLVED":
        return "bg-emerald-50 text-emerald-600 border-emerald-100";

      case "PENDING":
      case "IN_PROGRESS":
        return "bg-amber-50 text-amber-600 border-amber-100";

      case "INACTIVE":
      case "EXPIRED":
      case "REJECTED":
        return "bg-gray-100 text-gray-600 border-gray-200";

      case "OPEN":
        return "bg-blue-50 text-blue-600 border-blue-100";

      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStyle()}`}
    >
      {normalizedStatus.replace(/_/g, " ")}
    </span>
  );
};

export default StatusBadge;