import { useEffect } from "react";

import {
 
  type CompanyDetails,
} from "../../../../redux/slices/companySlice";

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


interface SubscriptionProps {
  company: CompanyDetails;
}

const Subscription = ({ company }: SubscriptionProps) => {
  const dispatch = useAppDispatch();




  useEffect(() => {
    if (company.id) {
      dispatch(getCompanySubscriptionThunk(company.id));
    }
  }, [dispatch, company.id]);


  const { companySubscription } = useAppSelector(
    (state) => state.companySubscription,
  );

 


  const currentSubscription =
    companySubscription?.data?.currentSubscription;



  const formatDate = (
    date: Date | string | null | undefined,
  ) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };



  // const subscriptionStatusStyles = {
  //   ACTIVE: {
  //     badge: "bg-emerald-50 text-emerald-600",
  //     dot: "bg-emerald-500",
  //   },

  //   PENDING: {
  //     badge: "bg-yellow-50 text-yellow-600",
  //     dot: "bg-yellow-500",
  //   },

  //   CANCELLED: {
  //     badge: "bg-red-50 text-red-600",
  //     dot: "bg-red-500",
  //   },

  //   EXPIRED: {
  //     badge: "bg-gray-100 text-gray-500",
  //     dot: "bg-gray-400",
  //   },
  // } as const;



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
        render: (value) =>
          value
            ? new Date(
                String(value),
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-",
      },

      {
        header: "End Date",
        accessor: "endDate",
        render: (value) =>
          value
            ? new Date(
                String(value),
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-",
      },

      {
        header: "Amount",
        accessor: "amount",
        render: (value) => `₹${value}`,
      },

      
 {
  header: "Status",
  accessor: "status",
  render: (value) => {
    const status =
      value as GetCompanySubscriptionItemDto["status"];

    return <StatusBadge status={status} />;
  },

},
    ];



  return (
    <div className="p-6">

      <div className="mb-6 flex items-center justify-between">

        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Subscription
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Manage subscription and billing information
          </p>
        </div>

      
      </div>


      <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-6">


        <div className="flex min-w-0 flex-col gap-5 xl:col-span-4">

        

          {currentSubscription ? (
            <InfoCard
              title="Current Subscription"
              subtitle="Active subscription plan"
            >
              <div className="space-y-6">

                <div className="flex items-center justify-between gap-4">

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

               

                 
                </div>


                <div className="grid grid-cols-2 gap-x-6 gap-y-5 border-t border-gray-100 pt-5 md:grid-cols-4">

           

                  <div>
                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                      Next Renewal
                    </p>

                    <p className="mt-2 text-base font-bold text-gray-900">
                      {formatDate(
                        currentSubscription.endDate,
                      )}
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
    <StatusBadge
      status={currentSubscription.status}
    />
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
                  This company currently does not have
                  an active subscription.
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
                data={
                  companySubscription?.data
                    ?.subscriptionHistory ?? []
                }
                columns={subscriptionHistoryColumns}
              />

            </div>


            <div className="mt-4 border-t border-gray-100 pt-4 text-center">

              <button
                type="button"
                className="text-sm font-semibold text-[#7C3AED] transition hover:text-[#6D28D9]"
              >
                View More History
              </button>

            </div>
          </InfoCard>

        </div>


        <div className="flex min-w-0 flex-col gap-5 xl:col-span-2">

       

          <InfoCard
            title="User Usage"
            subtitle="Current plan usage"
          >
            <div className="space-y-5">

              {/* Members */}

              {/* <div>
                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium text-gray-600">
                    Members
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    342 / 500
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-[#7C3AED]"
                    style={{ width: "68%" }}
                  />

                </div>
              </div> */}

              {/* Company Admins */}

              {/* <div>
                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium text-gray-600">
                    Company Admins
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    4 / 10
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-[#7C3AED]"
                    style={{ width: "40%" }}
                  />

                </div>
              </div> */}

              {/* Departments */}
{/* 
              <div>
                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium text-gray-600">
                    Departments
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    12 / 50
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-[#7C3AED]"
                    style={{ width: "24%" }}
                  />

                </div>
              </div> */}

              {/* Tickets */}

              {/* <div>
                <div className="mb-2 flex items-center justify-between">

                  <span className="text-sm font-medium text-gray-600">
                    Tickets
                  </span>

                  <span className="text-sm font-semibold text-gray-900">
                    7,842
                  </span>

                </div>

                <div className="h-2 overflow-hidden rounded-full bg-gray-100">

                  <div
                    className="h-full rounded-full bg-[#7C3AED]"
                    style={{ width: "72%" }}
                  />

                </div>
              </div> */}

            </div>
          </InfoCard>

        </div>
      </div>

    

      

    </div>
  );
};

export default Subscription;