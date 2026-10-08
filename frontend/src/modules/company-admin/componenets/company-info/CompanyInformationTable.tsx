
import {
  Building2,
  FolderTree,
  Globe,
  Lock,
  Mail,
  MapPin,
 
  Phone,
  Tags,
  Users,
} from "lucide-react";

import type { CompanyDetails } from "../../../../redux/slices/company/companyTypes";

interface CompanyInformationTableProps {
  company: CompanyDetails;

  onEdit: (
    field: {
      key: string;
      label: string;
    },
    value: string,
  ) => void;
  
}

const CompanyInformationTable = ({
  company,

  //  onRequestChange,
}: CompanyInformationTableProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
  {/* Header */}
  <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
    <div>
      <h3 className="text-lg font-semibold text-slate-900">
        Company Information
      </h3>

      <p className="mt-1 text-sm text-slate-500">
        View and manage your company profile information.
      </p>
    </div>

    {/* <button
      type="button"
    onClick={onRequestChange}
      className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-4 py-2.5 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
    >
      <Pencil className="h-4 w-4" />
      Request Change
    </button> */}
  </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/70">
              <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Field
              </th>

              <th className="px-6 py-3.5 text-xs font-semibold uppercase tracking-wide text-slate-500">
                Information
              </th>

              {/* <th className="px-6 py-3.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                Editability
              </th> */}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {/* Company Name */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Building2 className="h-4 w-4" />}
                  label="Company Name"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.companyName || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <ApprovalRequired />
              </td> */}
            </tr>

            {/* Registration Number */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Tags className="h-4 w-4" />}
                  label="Registration Number"
                />
              </td>

              <td className="px-6 py-4">
                <span className="font-mono text-sm font-semibold text-slate-800">
                  {company.registrationNumber || "Not provided"}
                </span>
              </td>

             
            </tr>

            {/* Company Email */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.companyEmail || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <EditButton
                  onClick={() =>
                    onEdit(
                      {
                        key: "email",
                        label: "Email",
                      },
                      company.companyEmail,
                    )
                  }
                />
              </td> */}
            </tr>

            {/* Phone */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Phone className="h-4 w-4" />}
                  label="Phone"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.phone || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <EditButton
                  onClick={() =>
                    onEdit(
                      {
                        key: "phone",
                        label: "Phone",
                      },
                      company.phone,
                    )
                  }
                />
              </td> */}
            </tr>

            {/* Company Type */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<FolderTree className="h-4 w-4" />}
                  label="Company Type"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.companyType || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <ApprovalRequired />
              </td> */}
            </tr>

            {/* Employees */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Users className="h-4 w-4" />}
                  label="Employees"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.numberOfEmployees || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <ApprovalRequired />
              </td> */}
            </tr>

            {/* Year Established */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Building2 className="h-4 w-4" />}
                  label="Year Established"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.yearEstablished ?? "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <ApprovalRequired />
              </td> */}
            </tr>

            {/* Website */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Globe className="h-4 w-4" />}
                  label="Website"
                />
              </td>

              <td className="px-6 py-4">
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
                  <span className="text-sm font-semibold text-slate-400">
                    Not provided
                  </span>
                )}
              </td>

              {/* <td className="px-6 py-4 text-right">
                <EditButton
                  onClick={() =>
                    onEdit(
                      {
                        key: "website",
                        label: "Website",
                      },
                      company.website ?? "",
                    )
                  }
                />
              </td> */}
            </tr>

            {/* Status */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Lock className="h-4 w-4" />}
                  label="Status"
                />
              </td>

              <td className="px-6 py-4">
                <StatusValue status={company.status} />
              </td>
{/* 
              <td className="px-6 py-4 text-right">
                <SystemControlled />
              </td> */}
            </tr>

            {/* Address */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<MapPin className="h-4 w-4" />}
                  label="Address"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.location?.address || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <ApprovalRequired />
              </td> */}
            </tr>

            {/* City */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<MapPin className="h-4 w-4" />}
                  label="City"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.location?.city || "Not provided"}
                </InformationValue>
              </td>

              <td className="px-6 py-4 text-right">
                {/* <ApprovalRequired /> */}
              </td>
            </tr>

            {/* State */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<MapPin className="h-4 w-4" />}
                  label="State"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.location?.state || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <ApprovalRequired />
              </td> */}
            </tr>

            {/* Country */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<Globe className="h-4 w-4" />}
                  label="Country"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.location?.country || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <ApprovalRequired />
              </td> */}
            </tr>

            {/* Postal Code */}
            <tr className="transition-colors hover:bg-slate-50/50">
              <td className="px-6 py-4">
                <FieldLabel
                  icon={<MapPin className="h-4 w-4" />}
                  label="Postal Code"
                />
              </td>

              <td className="px-6 py-4">
                <InformationValue>
                  {company.location?.postalCode || "Not provided"}
                </InformationValue>
              </td>

              {/* <td className="px-6 py-4 text-right">
                <ApprovalRequired />
              </td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* =========================================================
   INFORMATION VALUE
========================================================= */

interface InformationValueProps {
  children: React.ReactNode;
}

const InformationValue = ({
  children,
}: InformationValueProps) => {
  return (
    <span className="text-sm font-semibold text-slate-900">
      {children}
    </span>
  );
};

/* =========================================================
   FIELD LABEL
========================================================= */

interface FieldLabelProps {
  icon: React.ReactNode;
  label: string;
}

const FieldLabel = ({
  icon,
  label,
}: FieldLabelProps) => {
  return (
    <div className="flex items-center gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        {icon}
      </span>

      <span className="text-sm font-medium text-slate-600">
        {label}
      </span>
    </div>
  );
};

/* =========================================================
   APPROVAL REQUIRED
========================================================= */

// const ApprovalRequired = () => {
//   return (
//     <span className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
//       <Lock className="h-3.5 w-3.5" />
//       Approval Required
//     </span>
//   );
// };

/* =========================================================
   SYSTEM CONTROLLED
========================================================= */

// const SystemControlled = () => {
//   return (
//     <span className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-500">
//       <Lock className="h-3.5 w-3.5" />
//       System Controlled
//     </span>
//   );
// };

/* =========================================================
   STATUS
========================================================= */

interface StatusValueProps {
  status: CompanyDetails["status"];
}

const StatusValue = ({
  status,
}: StatusValueProps) => {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
      {status}
    </span>
  );
};

/* =========================================================
   EDIT BUTTON
========================================================= */

// interface EditButtonProps {
//   onClick: () => void;
// }

// const EditButton = ({
//   onClick,
// }: EditButtonProps) => {
//   return (
//     <button
//       type="button"
//       onClick={onClick}
//       className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-blue-50 hover:text-blue-600"
//       title="Edit"
//     >
//       <Pencil className="h-4 w-4" />
//     </button>
//   );
// };

export default CompanyInformationTable;

