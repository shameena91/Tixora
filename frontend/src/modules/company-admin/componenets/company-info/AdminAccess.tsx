
import {
  Mail,
  Shield,
  UserPlus,
} from "lucide-react";

import type { CompanyDetails } from "../../../../redux/slices/company/companyTypes";

interface AdminAccessProps {
  company: CompanyDetails;
  onAddAdmin: () => void;
}

const AdminAccess = ({
  company,
  onAddAdmin,
}: AdminAccessProps) => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Shield className="h-5 w-5" />
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Admin Access
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Administrators with access to this company.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onAddAdmin}
          className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
        >
          <UserPlus className="h-4 w-4" />
          Add Admin
        </button>
      </div>

      {/* Admin List */}
      <div className="mt-6 space-y-3">
        {company.admin?.name ? (
          <AdminCard
            name={company.admin.name}
            email={company.admin.email}
          
          />
          
        ) : (
          <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-5 text-center">
            <p className="text-sm font-medium text-slate-500">
              No administrator information available.
            </p>
          </div>
        )}
      </div>

      {/* View All */}
      {/* <button
        type="button"
        className="mt-5 text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
      >
        View All Administrators →
      </button> */}
    </div>
  );
};

interface AdminCardProps {
  name: string;
  email: string | null;
}

const AdminCard = ({
  name,
  email,
}: AdminCardProps) => {
  const initials = name
    .split(" ")
    .filter(Boolean)
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 p-4 transition hover:border-blue-200 hover:bg-blue-50/30">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
          {initials}
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-900">
            {name}
          </h4>

          <p className="mt-0.5 text-xs text-slate-500">
            {email || "Email not available"}
          </p>
        </div>
      </div>

      {email && (
        <a
          href={`mailto:${email}`}
          title={`Contact ${name}`}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white hover:text-blue-600"
        >
          <Mail className="h-4 w-4" />
        </a>
      )}
    </div>
  );
};

export default AdminAccess;
