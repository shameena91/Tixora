import { CreditCard } from "lucide-react";

import InfoCard from "./components/InfoCard";
import StatusBadge from "./components/StatusBadge";

interface BillingHistoryProps {
  company: any;
}

const BillingHistory = ({
  company,
}: BillingHistoryProps) => {
  const billingHistory = company.billingHistory || [];

  return (
    <div className="p-6">
      <InfoCard
        title="Billing History"
        icon={<CreditCard className="h-5 w-5" />}
      >
        {billingHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Date
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Plan
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Amount
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {billingHistory.map(
                  (item: any, index: number) => (
                    <tr
                      key={item.id || index}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.date || "-"}
                      </td>

                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {item.plan || "-"}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        {item.amount || "-"}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge
                          status={item.status || "PAID"}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-500">
              No billing history available.
            </p>
          </div>
        )}
      </InfoCard>
    </div>
  );
};

export default BillingHistory;