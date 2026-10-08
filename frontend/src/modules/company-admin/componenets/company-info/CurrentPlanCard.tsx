import {
  CalendarDays,
  CreditCard,
} from "lucide-react";

interface CurrentPlanCardProps {
  onManage: () => void;
}

const CurrentPlanCard = ({
  onManage,
}: CurrentPlanCardProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <CreditCard className="h-5 w-5" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Current Plan
          </span>
        </div>

        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
          ACTIVE
        </span>
      </div>

      {/* Plan */}
      <div className="mt-6">
        <h3 className="text-2xl font-semibold tracking-tight text-slate-900">
          Professional
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Your current subscription plan
        </p>
      </div>

      {/* Subscription Details */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
          <span className="text-sm text-slate-500">
            Billing Cycle
          </span>

          <span className="text-sm font-semibold text-slate-800">
            Monthly
          </span>
        </div>

        <div className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3">
          <span className="flex items-center gap-2 text-sm text-slate-500">
            <CalendarDays className="h-4 w-4" />
            Renewal Date
          </span>

          <span className="text-sm font-semibold text-slate-800">
            Dec 31, 2026
          </span>
        </div>
      </div>

      {/* Action */}
      <button
        type="button"
        onClick={onManage}
        className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        Manage Subscription
      </button>
    </div>
  );
};

export default CurrentPlanCard;