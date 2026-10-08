interface RequestHistoryItemProps {
  title: string;
  date: string;
  status: string;
  statusType: "pending" | "review" | "approved";
}

const RequestHistoryItem = ({
  title,
  date,
  status,
  statusType,
}: RequestHistoryItemProps) => {
  const getBadgeClass = () => {
    switch (statusType) {
      case "pending":
        return "bg-amber-100 text-amber-800";

      case "review":
        return "bg-sky-100 text-sky-800";

      case "approved":
        return "bg-emerald-100 text-emerald-800";

      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div>
        <h4 className="text-xs font-bold text-slate-800">
          {title}
        </h4>

        <p className="text-[10px] text-slate-400">
          {date}
        </p>
      </div>

      <span
        className={`rounded-md px-2.5 py-1 text-[10px] font-bold ${getBadgeClass()}`}
      >
        {status}
      </span>
    </div>
  );
};

export default RequestHistoryItem;