import { CalendarDays, Clock3 } from "lucide-react";

import type { RoleResponseDTO } from "../../types/roles/RoleUI";

interface RoleOverviewProps {
  role: RoleResponseDTO;
}

const formatDate = (value?: string) => {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "—";
  }

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(date);
};

function RoleOverview({ role }: RoleOverviewProps) {
  const isActive = role.status === "ACTIVE";

  return (
    <div className="space-y-6">
      {/* Role Information */}
      <div className="rounded-xl border border-slate-200 bg-white p-6">
        <h2 className="mb-5 text-lg font-semibold text-slate-800">
          Role Information
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Role Name */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Role Name
            </p>

            <p className="mt-2 text-sm font-semibold text-slate-800">
              {role.name}
            </p>
          </div>

          {/* Status */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Status
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                isActive
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {role.status}
            </span>
          </div>

          {/* Description */}
          <div className="md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
              Description
            </p>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              {role.description || "No description provided."}
            </p>
          </div>
        </div>
      </div>

      {/* Date Information */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
          <div className="rounded-lg bg-violet-50 p-3">
            <CalendarDays className="h-6 w-6 text-violet-600" />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">Created On</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatDate(role.createdAt)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-5">
          <div className="rounded-lg bg-violet-50 p-3">
            <Clock3 className="h-6 w-6 text-violet-600" />
          </div>

          <div>
            <p className="text-xs font-medium text-slate-500">Last Updated</p>

            <p className="mt-1 text-sm font-semibold text-slate-800">
              {formatDate(role.updatedAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RoleOverview;
