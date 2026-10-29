
import { useEffect, useState } from "react";

import InfoCard from "../commonComponenets/InfoCard";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import {
  getCompanySubscriptionThunk,
} from "../../../../redux/slices/companySubscription/companySubscriptionThunk";

import DataTable, {
  type DataTableColumn,
} from "../../../../components/common/Datatable";

import type {
  GetCompanySubscriptionItemDto,
} from "../../../../redux/slices/companySubscription/companySubscriptionTypes";

import StatusBadge from "../commonComponenets/StatusBadge";
import type { CompanyDetails } from "../../../../redux/slices/company/companyTypes";

interface SubscriptionProps {
  company: CompanyDetails;
}

const Subscription = ({ company }: SubscriptionProps) => {
  const dispatch = useAppDispatch();

  const [page, setPage] = useState(1);
  const limit = 3;

  const { companySubscription } = useAppSelector(
    (state) => state.companySubscription,
  );

  useEffect(() => {
    if (company.id) {
      dispatch(
        getCompanySubscriptionThunk({
          companyId: company.id,
          page,
          limit,
        }),
      );
    }
  }, [dispatch, company.id, page]);

  const subscriptionData = companySubscription?.data;
  const currentSubscription = subscriptionData?.currentSubscription;
  const subscriptionHistory = subscriptionData?.subscriptionHistory ?? [];
  const pagination = subscriptionData?.pagination;

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const subscriptionHistoryColumns: DataTableColumn<GetCompanySubscriptionItemDto>[] =
    [
      {
        header: "Plan",
        accessor: "planName",
      },
      {
        header: "Billing Cycle",
        accessor: "billingCycle",
      },
      {
        header: "Start Date",
        accessor: "startDate",
        render: (value) => formatDate(value as Date | string | null),
      },
      {
        header: "End Date",
        accessor: "endDate",
        render: (value) => formatDate(value as Date | string | null),
      },
      {
        header: "Amount",
        accessor: "amount",
        render: (value) => `₹${value}`,
      },
      {
        header: "Status",
        accessor: "status",
        render: (value) => (
          <StatusBadge
            status={value as GetCompanySubscriptionItemDto["status"]}
          />
        ),
      },
    ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900">
          Subscription
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Manage subscription and billing information
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-6">
        <div className="flex min-w-0 flex-col gap-5 xl:col-span-4">
          {currentSubscription ? (
            <InfoCard
              title="Current Subscription"
              subtitle="Active subscription plan"
            >
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-xl font-bold text-[#7C3AED]">
                    ◆
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                      Active Plan
                    </p>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-gray-900">
                      {currentSubscription.planName}
                    </h3>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-gray-100 pt-5 md:grid-cols-4">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Next Renewal
                    </p>
                    <p className="mt-2 text-base font-bold text-gray-900">
                      {formatDate(currentSubscription.endDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Amount
                    </p>
                    <p className="mt-2 text-base font-bold text-gray-900">
                      ₹{currentSubscription.amount}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Billing Cycle
                    </p>
                    <p className="mt-2 text-base font-semibold text-gray-900">
                      {currentSubscription.billingCycle}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Status
                    </p>
                    <div className="mt-2">
                      <StatusBadge status={currentSubscription.status} />
                    </div>
                  </div>
                </div>
              </div>
            </InfoCard>
          ) : (
            <InfoCard
              title="Current Subscription"
              subtitle="Active subscription plan"
            >
              <div className="py-10 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                  —
                </div>
                <p className="mt-4 text-sm font-semibold text-gray-700">
                  No active subscription
                </p>
                <p className="mx-auto mt-1 max-w-sm text-sm text-gray-500">
                  This company currently does not have an active subscription.
                </p>
              </div>
            </InfoCard>
          )}

          <InfoCard
            title="Subscription History"
            subtitle="Previous and current subscription plans"
          >
            <div className="overflow-x-auto">
              <DataTable
                data={subscriptionHistory}
                columns={subscriptionHistoryColumns}
              />
            </div>

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-500">
                Page {pagination?.page ?? page} of {pagination?.totalPages ?? 1}
                {" · "}
                {pagination?.totalCount ?? 0} records
              </p>

              <div className="flex gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((previousPage) => previousPage - 1)}
                  className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>

                <button
                  type="button"
                  disabled={page >= (pagination?.totalPages ?? 1)}
                  onClick={() => setPage((previousPage) => previousPage + 1)}
                  className="rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </InfoCard>
        </div>

        <div className="flex min-w-0 flex-col gap-5 xl:col-span-2">
          <InfoCard
            title="User Usage"
            subtitle="Current plan usage"
          >
            <div className="space-y-5">
              <p className="text-sm text-gray-500">
                Usage details will be available here.
              </p>
            </div>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default Subscription;