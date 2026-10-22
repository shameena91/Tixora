import type { DataTableColumn } from "../../../../components/common/Datatable";
import DataTable from "../../../../components/common/Datatable";
import type {
  GetCompanySubscriptionItemDto,
  SubscriptionAccessStatus,
} from "../../../../redux/slices/companySubscription/companySubscriptionTypes";

// Adjust this import path to match your existing DataTable file location.


type SubscriptionOverviewProps = {
  subscriptionAccessStatus: SubscriptionAccessStatus;

  mySubscription: GetCompanySubscriptionItemDto | null;

  subscriptionHistory: GetCompanySubscriptionItemDto[];

  myPlan: {
    name: string;
    description: string;
    monthlyPrice: number;
    yearlyPrice: number;
    memberLimit: number | null;
    companyAdminLimit: number | null;
    departmentLimit: number | null;
    ticketLimit: number | null;
    automaticTicketAssignment: boolean;
    slaManagement: boolean;
  } | null;

  onSelectPlan: () => void;
};

const SubscriptionOverview = ({
  subscriptionAccessStatus,
  mySubscription,
  subscriptionHistory,
  myPlan,
  onSelectPlan,
}: SubscriptionOverviewProps) => {

  console.log("MyPLAB",myPlan)
  const isActive =
    subscriptionAccessStatus === "ACTIVE" &&
    mySubscription !== null;

  const isExpired =
    subscriptionAccessStatus === "EXPIRED";

  const formatPrice = (
    price: number | null | undefined,
  ): string => {
    if (price == null) return "—";

    return `₹${price.toLocaleString("en-IN")}`;
  };

const formatDate = (
  date: string | Date | null | undefined,
): string => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

  const formatLimit = (
    limit: number | null | undefined,
  ): string => {
    if (limit == null) return "—";

    return limit === -1
      ? "Unlimited"
      : limit.toLocaleString("en-IN");
  };

  const billingCycle = isActive
    ? mySubscription.billingCycle
    : undefined;

  const currentPrice = isActive
    ? mySubscription.amount
    : null;

  const planLimits = [
    {
      label: "Employees",
      value: myPlan?.memberLimit,
    },
    {
      label: "Company Admins",
      value: myPlan?.companyAdminLimit,
    },
    {
      label: "Departments",
      value: myPlan?.departmentLimit,
    },
    {
      label: "Tickets",
      value: myPlan?.ticketLimit,
    },
  ];

  const features = myPlan
    ? [
        "Ticket management",
        "Department management",
        myPlan.automaticTicketAssignment
          ? "Automatic ticket assignment"
          : "Manual ticket assignment",
        ...(myPlan.slaManagement
          ? ["SLA management"]
          : []),
      ]
    : [];

  const usageItems = [
    {
      label: "Employees",
      value: `— / ${formatLimit(myPlan?.memberLimit)}`,
      icon: "♙",
      color: "bg-blue-100 text-blue-700",
    },
    {
      label: "Departments",
      value: `— / ${formatLimit(myPlan?.departmentLimit)}`,
      icon: "▦",
      color: "bg-violet-100 text-violet-700",
    },
    {
      label: "Categories",
      value: "—",
      icon: "◇",
      color: "bg-amber-100 text-amber-700",
    },
    {
      label: "Tickets",
      value: `— / ${formatLimit(myPlan?.ticketLimit)}`,
      icon: "▤",
      color: "bg-emerald-100 text-emerald-700",
    },
  ];

  // Reusable DataTable columns for Subscription History
  const subscriptionHistoryColumns: DataTableColumn<GetCompanySubscriptionItemDto>[] =
    [
      {
        id: "plan",
        header: "Plan",
        accessor: "planName",
        render: (_value, row) => (
          <span className="font-semibold text-gray-900">
            {row.planName}
          </span>
        ),
      },
      {
        id: "amount",
        header: "Amount",
        accessor: "amount",
        render: (_value, row) =>
          formatPrice(row.amount),
      },
      {
        id: "billingCycle",
        header: "Billing Cycle",
        accessor: "billingCycle",
        render: (_value, row) => (
          <span className="whitespace-nowrap">
            {row.billingCycle}
          </span>
        ),
      },
      {
        id: "startDate",
        header: "Start Date",
        accessor: "startDate",
        render: (_value, row) =>
          formatDate(row.startDate),
      },
      {
        id: "endDate",
        header: "End Date",
        accessor: "endDate",
        render: (_value, row) =>
          formatDate(row.endDate),
      },
     {
  id: "status",
  header: "Status",
  accessor: "status",
  render: (_value, row) => {
    const statusStyles: Record<
      GetCompanySubscriptionItemDto["status"],
      string
    > = {
      ACTIVE: "bg-emerald-50 text-emerald-700",
      SCHEDULED: "bg-sky-50 text-sky-700",
      UPGRADED: "bg-violet-50 text-violet-700",
      EXPIRED: "bg-gray-100 text-gray-600",
      CANCELLED: "bg-rose-50 text-rose-700",
      PENDING: "bg-amber-50 text-amber-700",
    };

    return (
      <span
        className={`inline-flex whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ${
          statusStyles[row.status]
        }`}
      >
        {row.status}
      </span>
    );
  },
}
    ];
console.log("mySubscription:", mySubscription);
console.log("myPlan:", myPlan);
  return (
    <div className="space-y-6">
      {/* Active Subscription Overview */}
      {isActive && mySubscription ? (
        <>
          <div className="grid grid-cols-1 items-stretch gap-5 xl:grid-cols-5">
            {/* Current Subscription */}
            <section className="overflow-hidden rounded-2xl border border-indigo-100 bg-white shadow-sm transition hover:shadow-md xl:col-span-4">
              <div className="border-b border-indigo-100 bg-gradient-to-r from-indigo-50 via-white to-sky-50 p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-md border border-indigo-100 bg-white/80 px-3 py-1.5 text-xs font-bold tracking-wide text-indigo-700">
                    CURRENT SUBSCRIPTION
                  </span>

                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    ACTIVE
                  </span>
                </div>

                <h2 className="mt-6 text-2xl font-bold tracking-tight text-indigo-950 sm:text-3xl">
                  {mySubscription.planName}
                </h2>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  {myPlan?.description ??
                    "Your current subscription plan details."}
                </p>

                <div className="mt-6 flex flex-wrap items-baseline gap-x-2 gap-y-1">
                  <span className="text-3xl font-bold tracking-tight text-indigo-700">
                    {formatPrice(currentPrice)}
                  </span>

                  {billingCycle && (
                    <span className="text-sm text-gray-500">
                      /{" "}
                      {billingCycle === "MONTHLY"
                        ? "month"
                        : "year"}
                    </span>
                  )}
                </div>

                {billingCycle && (
                  <div className="mt-3">
                    <span className="inline-flex items-center gap-2 rounded-lg bg-white/80 px-3 py-1.5 text-xs font-medium text-indigo-700 ring-1 ring-indigo-100">
                      ◷
                      {billingCycle === "YEARLY"
                        ? "Yearly billing"
                        : "Monthly billing"}
                    </span>
                  </div>
                )}
              </div>

              {/* Subscription Period */}
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-100 text-sky-700">
                    ◷
                  </span>

                  <h3 className="text-base font-semibold text-gray-900">
                    Subscription Period
                  </h3>
                </div>

                <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-sky-100 bg-gradient-to-br from-sky-50/80 to-white p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-sky-700">
                      Start Date
                    </p>

                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {formatDate(mySubscription.startDate)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-violet-100 bg-gradient-to-br from-violet-50/80 to-white p-4">
                    <p className="text-xs font-medium uppercase tracking-wide text-violet-700">
                      End Date
                    </p>

                    <p className="mt-2 text-lg font-bold text-gray-900">
                      {formatDate(mySubscription.endDate)}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Plan Details */}
            <section className="rounded-2xl border border-violet-100 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 xl:col-span-1">
              <span className="inline-flex rounded-full bg-violet-100 px-3 py-1 text-xs font-bold uppercase tracking-wider text-violet-700">
                PLAN OVERVIEW
              </span>

              <h2 className="mt-3 text-lg font-bold text-gray-900">
                Plan Details
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Limits and included features.
              </p>

              <div className="mt-5 divide-y divide-violet-50">
                {planLimits.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <span className="text-sm text-gray-600">
                      {item.label}
                    </span>

                    <span className="shrink-0 rounded-lg bg-violet-50 px-2.5 py-1.5 text-sm font-bold text-violet-700">
                      {formatLimit(item.value)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 border-t border-violet-100 pt-5">
                <h3 className="text-sm font-bold text-gray-900">
                  Included Features
                </h3>

                <ul className="mt-4 space-y-3">
                  {features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-2.5 text-sm text-gray-600"
                    >
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                        ✓
                      </span>

                      <span className="leading-5">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Plan Usage */}
          <section className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900">
              Plan Usage
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Monitor your company's subscription usage.
            </p>

            <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {usageItems.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-indigo-100 bg-gradient-to-br from-white to-indigo-50/70 p-4 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-sm"
                >
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-gray-500">
                      {item.label}
                    </p>

                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-xl text-lg ${item.color}`}
                    >
                      {item.icon}
                    </span>
                  </div>

                  <p className="mt-3 break-words text-2xl font-bold text-indigo-950">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-4 text-xs leading-5 text-gray-400">
              Actual usage counts will be displayed when
              company usage APIs are connected.
            </p>
          </section>
        </>
      ) : (
        /* Expired or No Subscription */
        <section className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm sm:p-12">
          <div className="mx-auto flex max-w-lg flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </span>

            <span className="mt-4 rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold tracking-wide text-red-700">
              {isExpired
                ? "SUBSCRIPTION EXPIRED"
                : "NO ACTIVE SUBSCRIPTION"}
            </span>

            <h2 className="mt-5 text-2xl font-bold tracking-tight text-gray-900">
              {isExpired
                ? "Your current subscription has expired"
                : "No active subscription"}
            </h2>

            <p className="mt-3 text-sm leading-6 text-gray-600">
              {isExpired
                ? "Please renew your subscription to continue using Tixora."
                : "Please select a subscription plan to start using Tixora."}
            </p>

            <button
              type="button"
              onClick={onSelectPlan}
              className="mt-6 inline-flex items-center justify-center rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              {isExpired
                ? "Renew Subscription"
                : "Select a Plan"}
            </button>
          </div>
        </section>
      )}

      {/* Subscription History - Reusable DataTable */}
      <section className="rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              Subscription History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review your previous and current subscription records.
            </p>
          </div>

          <span className="rounded-lg bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">
            {subscriptionHistory.length} Records
          </span>
        </div>

        <div className="mt-5">
          {subscriptionHistory.length > 0 ? (
            <DataTable
              data={subscriptionHistory}
              columns={subscriptionHistoryColumns}
            />
          ) : (
            <div className="rounded-xl border border-gray-100 px-4 py-10 text-center text-sm text-gray-500">
              No subscription history found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SubscriptionOverview;