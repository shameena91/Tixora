interface ChangeRequestStatsProps {
  stats: {
    pending: number;
    underReview: number;
    approved: number;
    rejected: number;
  };

  onViewAll: () => void;
}

const ChangeRequestStats = ({
  stats,
  onViewAll,
}: ChangeRequestStatsProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Request Approval Record
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Track the status of your company change requests.
        </p>
      </div>

      {/* Stats */}
      <div className="mt-5 space-y-3">
        <RequestRow
          label="Pending"
          count={stats.pending}
          className="bg-amber-50 text-amber-700"
          dotClassName="bg-amber-500"
        />

        <RequestRow
          label="Under Review"
          count={stats.underReview}
          className="bg-sky-50 text-sky-700"
          dotClassName="bg-sky-500"
        />

        <RequestRow
          label="Approved"
          count={stats.approved}
          className="bg-emerald-50 text-emerald-700"
          dotClassName="bg-emerald-500"
        />

        <RequestRow
          label="Rejected"
          count={stats.rejected}
          className="bg-rose-50 text-rose-700"
          dotClassName="bg-rose-500"
        />
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={onViewAll}
        className="mt-5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
      >
        View All Requests
      </button>
    </div>
  );
};

interface RequestRowProps {
  label: string;
  count: number;
  className: string;
  dotClassName: string;
}

const RequestRow = ({
  label,
  count,
  className,
  dotClassName,
}: RequestRowProps) => {
  return (
    <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
      <div className="flex items-center gap-3">
        <span
          className={`h-2.5 w-2.5 rounded-full ${dotClassName}`}
        />

        <span className="text-sm font-medium text-slate-700">
          {label}
        </span>
      </div>

      <span
        className={`rounded-lg px-2.5 py-1 text-xs font-bold ${className}`}
      >
        {count}
      </span>
    </div>
  );
};

export default ChangeRequestStats;