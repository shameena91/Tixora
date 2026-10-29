import {
  CalendarDays,
  CreditCard,
} from "lucide-react";

import type { GetCompanySubscriptionItemDto } from "../../../../redux/slices/companySubscription/companySubscriptionTypes";
import type { SubscriptionPlanDetails } from "../../../../redux/slices/subscriptionPlan/subscriptionPlanTypes";
import { useNavigate } from "react-router-dom";

interface CurrentPlanCardProps {
 
  currentSubscription:
    | GetCompanySubscriptionItemDto
    | null
    | undefined;
  loading?: boolean;
  myPlan:SubscriptionPlanDetails|null
}

const formatDate = (
  value: string | Date | null | undefined,
): string => {
  if (!value) {
    return "—";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatBillingCycle = (
  value: string | null | undefined,
): string => {
  if (!value) {
    return "—";
  }

  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
};

const CurrentPlanCard = ({

  currentSubscription,
  myPlan,
  loading = false,
}: CurrentPlanCardProps) => {
  const status = currentSubscription?.status ?? "";
const navigate=useNavigate()
  const isActive = status.toUpperCase() === "ACTIVE";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <CreditCard className="h-5 w-5" />
          </div>

          <span className="text-sm font-semibold text-slate-700">
            Current Plan
          </span>
        </div>

        {!loading && currentSubscription && status && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
              isActive
                ? "bg-emerald-50 text-emerald-700"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            {status}
          </span>
        )}
      </div>

      {/* Plan details */}
      <div className="mt-6">
        {loading ? (
          <p className="text-sm text-slate-500">
            Loading subscription...
          </p>
        ) : currentSubscription ? (
          <>
            <h3 className="break-words text-xl font-semibold tracking-tight text-slate-900">
{myPlan?.name  }          </h3>

            
          </>
        ) : (
          <>
            <h3 className="text-xl font-semibold tracking-tight text-slate-900">
              No Subscription
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              No current subscription details are available.
            </p>
          </>
        )}
      </div>

      {/* Subscription details */}
      {!loading && currentSubscription && (
        <div className="mt-6 space-y-3">
          {/* Billing Cycle */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <span className="text-sm text-slate-500">
              Billing Cycle
            </span>

            <span className="text-right text-sm font-semibold text-slate-800">
              {formatBillingCycle(
                currentSubscription.billingCycle,
              )}
            </span>
          </div>

          {/* Start Date */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4 shrink-0" />
              Start Date
            </span>

            <span className="text-right text-sm font-semibold text-slate-800">
              {formatDate(currentSubscription.startDate)}
            </span>
          </div>

          {/* Renewal / End Date */}
          <div className="flex items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3">
            <span className="flex items-center gap-2 text-sm text-slate-500">
              <CalendarDays className="h-4 w-4 shrink-0" />
              Renewal Date
            </span>

            <span className="text-right text-sm font-semibold text-slate-800">
              {formatDate(currentSubscription.endDate)}
            </span>
          </div>
        </div>
      )}

      {/* Action */}
      <button
        type="button"
        onClick={()=>navigate("/company-admin/subscription")}
        className="mt-6 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
      >
        Manage Subscription
      </button>
    </div>
  );
};

export default CurrentPlanCard;