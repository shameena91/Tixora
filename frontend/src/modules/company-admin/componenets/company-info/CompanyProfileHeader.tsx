import { Building2 } from "lucide-react";
import type { CompanyDetails } from "../../../../redux/slices/company/companyTypes";



interface CompanyProfileHeaderProps {
  company: CompanyDetails;
}

const CompanyProfileHeader = ({
  company,
}: CompanyProfileHeaderProps) => {
  const companySize =
    company.numberOfEmployees || "Not provided";

  const registeredIn = company.yearEstablished
    ? company.yearEstablished.toString()
    : "Not provided";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-5 border-b border-slate-100 pb-7">
        {/* Company Icon */}
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-sm">
          <Building2 className="h-8 w-8" />
        </div>

        {/* Company Name */}
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">
              {company.companyName}
            </h2>

            <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-700">
              SYSTEM ACCOUNT
            </span>
          </div>

          <p className="mt-2 text-sm text-slate-500">
            Verified Corporate Profile & System Tenant
          </p>
        </div>
      </div>

      {/* Company Metadata */}
      <div className="mt-7 grid grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
        {/* Company Type */}
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
            Company Type
          </p>

          <p className="text-sm font-semibold text-slate-800">
            {company.companyType || "Not provided"}
          </p>
        </div>

        {/* Company Size */}
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
            Company Size
          </p>

          <p className="text-sm font-semibold text-slate-800">
            {companySize}
          </p>
        </div>

        {/* Website */}
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
            Website
          </p>

          {company.website ? (
            <a
              href={
                company.website.startsWith("http")
                  ? company.website
                  : `https://${company.website}`
              }
              target="_blank"
              rel="noreferrer"
              className="break-all text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
            >
              {company.website}
            </a>
          ) : (
            <p className="text-sm font-semibold text-slate-400">
              Not provided
            </p>
          )}
        </div>

        {/* Registered In */}
        <div>
          <p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-slate-400">
            Registered In
          </p>

          <p className="text-sm font-semibold text-slate-800">
            {registeredIn}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfileHeader;