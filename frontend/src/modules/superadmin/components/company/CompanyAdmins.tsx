import { Mail, Phone, UserRound } from "lucide-react";
import InfoCard from "../commonComponenets/InfoCard";
import StatusBadge from "../commonComponenets/StatusBadge";



interface CompanyAdminsProps {
  company: any;
}

const CompanyAdmins = ({ company }: CompanyAdminsProps) => {
  const admin = company.admin;

  return (
    <div className="p-6">
      <InfoCard
        title="Company Admins"
        icon={<UserRound className="h-5 w-5" />}
      >
        {admin ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Admin
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Phone
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr className="border-b border-gray-50 last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-50 text-sm font-semibold text-[#7C3AED]">
                        {(admin.name || "A")
                          .split(" ")
                          .map((word: string) => word[0])
                          .slice(0, 2)
                          .join("")
                          .toUpperCase()}
                      </div>

                      <span className="text-sm font-medium text-gray-900">
                        {admin.name || "-"}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="h-4 w-4 text-gray-400" />
                      {admin.email || "-"}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Phone className="h-4 w-4 text-gray-400" />
                      {admin.phone || company.phone || "-"}
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={admin.status || "ACTIVE"} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-500">
              No company admin information available.
            </p>
          </div>
        )}
      </InfoCard>
    </div>
  );
};

export default CompanyAdmins;