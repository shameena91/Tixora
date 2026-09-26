
import {
  CalendarDays,
  Check,
  CircleDollarSign,
  FileText,
  FolderTree,
  ShieldCheck,
  Ticket,
  Users,
  X,
  Pencil,
  Trash2,
  Power,
} from "lucide-react";

import type {
  SubscriptionPlanDetails,
} from "../../../redux/slices/subscriptionPlanSlice";

interface SubscriptionPlanDetailsModalProps {
  plan: SubscriptionPlanDetails | null;
  open: boolean;
  onClose: () => void;

  onEdit: (
    plan: SubscriptionPlanDetails
  ) => void;

  onToggleStatus: (
    plan: SubscriptionPlanDetails
  ) => void;

  onDelete: (
    plan: SubscriptionPlanDetails
  ) => void;
}

const SubscriptionPlanDetailsModal = ({
  plan,
  open,
  onClose,
  onEdit,
  onToggleStatus,
  onDelete,
}: SubscriptionPlanDetailsModalProps) => {
  if (!open || !plan) {
    return null;
  }

  const formatLimit = (value: number | null) => {
    return value === null
      ? "Unlimited"
      : value.toLocaleString("en-IN");
  };

  const formatPrice = (value: number) => {
    return value === 0
      ? "Free"
      : `₹${value.toLocaleString("en-IN")}`;
  };

  const formatDate = (value: string) => {
    return new Date(value).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  const isActive =
    plan.status === "ACTIVE";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-3xl overflow-hidden rounded-2xl bg-white shadow-2xl">

        {/* Header */}
        <div className="relative border-b border-gray-100 bg-gradient-to-r from-violet-50 via-white to-white px-6 py-5">
          <button
            type="button"
            onClick={onClose}
            className="absolute right-5 top-5 rounded-full p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="pr-10">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                <ShieldCheck className="h-6 w-6 text-[#7C3AED]" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  {plan.name}
                </h2>

                <p className="text-sm text-gray-500">
                  Subscription Plan Details
                </p>
              </div>
            </div>

            <p className="max-w-2xl text-sm leading-6 text-gray-600">
              {plan.description}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="max-h-[72vh] overflow-y-auto px-6 py-6">

          {/* Status + pricing */}
          <div className="mb-6 grid gap-4 md:grid-cols-3">

            {/* Status */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <Power className="h-4 w-4 text-gray-500" />

                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Status
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold ${
                  isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                <span
                  className={`h-1.5 w-1.5 rounded-full ${
                    isActive
                      ? "bg-green-600"
                      : "bg-red-600"
                  }`}
                />

                {plan.status}
              </span>
            </div>

            {/* Monthly */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-gray-500" />

                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Monthly
                </span>
              </div>

              <p className="text-xl font-bold text-gray-900">
                {formatPrice(plan.monthlyPrice)}
              </p>
            </div>

            {/* Yearly */}
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
              <div className="mb-2 flex items-center gap-2">
                <CircleDollarSign className="h-4 w-4 text-gray-500" />

                <span className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  Yearly
                </span>
              </div>

              <p className="text-xl font-bold text-gray-900">
                {formatPrice(plan.yearlyPrice)}
              </p>
            </div>
          </div>

          {/* Limits */}
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2">
              <Users className="h-4 w-4 text-[#7C3AED]" />

              <h3 className="text-sm font-semibold text-gray-900">
                Plan Limits
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Members */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                    <Users className="h-4 w-4 text-[#7C3AED]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Members
                    </p>

                    <p className="mt-0.5 font-semibold text-gray-900">
                      {formatLimit(plan.memberLimit)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Company Admins */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                    <ShieldCheck className="h-4 w-4 text-[#7C3AED]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Company Admins
                    </p>

                    <p className="mt-0.5 font-semibold text-gray-900">
                      {formatLimit(
                        plan.companyAdminLimit
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Departments */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                    <FolderTree className="h-4 w-4 text-[#7C3AED]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Departments
                    </p>

                    <p className="mt-0.5 font-semibold text-gray-900">
                      {formatLimit(
                        plan.departmentLimit
                      )}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tickets */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50">
                    <Ticket className="h-4 w-4 text-[#7C3AED]" />
                  </div>

                  <div>
                    <p className="text-xs text-gray-500">
                      Tickets / Month
                    </p>

                    <p className="mt-0.5 font-semibold text-gray-900">
                      {formatLimit(
                        plan.ticketLimit
                      )}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <div className="mb-4 flex items-center gap-2">
              <Check className="h-4 w-4 text-[#7C3AED]" />

              <h3 className="text-sm font-semibold text-gray-900">
                Features
              </h3>
            </div>

            <div className="rounded-xl border border-gray-200">

              {/* Automatic Ticket Assignment */}
              <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
                <span className="text-sm text-gray-600">
                  Automatic Ticket Assignment
                </span>

                {plan.automaticTicketAssignment ? (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                    <Check className="h-4 w-4" />
                    Enabled
                  </span>
                ) : (
                  <span className="text-sm font-medium text-gray-400">
                    Disabled
                  </span>
                )}
              </div>

              {/* SLA Management */}
              <div className="flex items-center justify-between px-4 py-4">
                <span className="text-sm text-gray-600">
                  SLA Management
                </span>

                {plan.slaManagement ? (
                  <span className="flex items-center gap-1.5 text-sm font-medium text-green-600">
                    <Check className="h-4 w-4" />
                    Enabled
                  </span>
                ) : (
                  <span className="text-sm font-medium text-gray-400">
                    Disabled
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Dates */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-[#7C3AED]" />

              <h3 className="text-sm font-semibold text-gray-900">
                Plan Information
              </h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Created At */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Created At
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {formatDate(plan.createdAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Last Updated */}
              <div className="rounded-xl border border-gray-200 p-4">
                <div className="flex items-center gap-3">
                  <CalendarDays className="h-4 w-4 text-gray-400" />

                  <div>
                    <p className="text-xs text-gray-500">
                      Last Updated
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-900">
                      {formatDate(plan.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-3 border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(plan)}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>

          <div className="flex flex-col gap-3 sm:flex-row">

            {/* Activate / Deactivate */}
            <button
              type="button"
              onClick={() =>
                onToggleStatus(plan)
              }
              className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
                isActive
                  ? "border border-amber-200 bg-white text-amber-700 hover:bg-amber-50"
                  : "border border-green-200 bg-white text-green-700 hover:bg-green-50"
              }`}
            >
              <Power className="h-4 w-4" />

              {isActive
                ? "Deactivate"
                : "Activate"}
            </button>

            {/* Edit */}
            <button
              type="button"
              onClick={() => onEdit(plan)}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#6D28D9]"
            >
              <Pencil className="h-4 w-4" />
              Edit Plan
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlanDetailsModal;

