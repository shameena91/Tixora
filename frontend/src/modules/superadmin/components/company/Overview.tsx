import type { CompanyDetails } from "../../../../redux/slices/companySlice";
import InfoCard from "../commonComponenets/InfoCard";
import InfoRow from "../commonComponenets/InfoRow";


interface OverviewProps {
  companyDetails: CompanyDetails;
}

const formatLabel = (value?: string | null) => {
  if (!value) return "-";

  return value
    .replace(/_/g, " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const Overview = ({ companyDetails }: OverviewProps) => {
//   const companyStatus = formatLabel(companyDetails.status);

  const adminInitials = "ad"
//   companyDetails.admin?.name
//     ? companyDetails.admin.name
//         .split(" ")
//         .map((name: string) => name[0])
//         .slice(0, 2)
//         .join("")
//         .toUpperCase()
//     : "A";

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* =================================================
            LEFT BIG COMPANY INFORMATION CARD
        ================================================= */}
        <div className="xl:col-span-2">
          <InfoCard
            title="Company Information"
            subtitle="Basic company information and registered address"
            
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {/* =========================================
                  COMPANY INFORMATION
              ========================================== */}
              <div className="space-y-4">
                <InfoRow
                  label="Company Name"
                  value={companyDetails.companyName}
                />

                <InfoRow
                  label="Registration Number"
                  value={companyDetails.registrationNumber}
                />

                <InfoRow
                  label="Email"
                  value={companyDetails.companyEmail}
                />

                <InfoRow
                  label="Phone"
                  value={companyDetails.phone}
                />

                <InfoRow
                  label="Company Type"
                  value={formatLabel(
                    companyDetails.companyType,
                  )}
                />

                <InfoRow
                  label="Employees"
                  value={companyDetails.numberOfEmployees}
                />

                <InfoRow
                  label="Year Established"
                  value={
                    companyDetails.yearEstablished?.toString() ??
                    "-"
                  }
                />

                <InfoRow
                  label="Website"
                  value={companyDetails.website ?? "-"}
                />

                <InfoRow
                  label="Status"
                  value={companyDetails.status}
                  valueType={
                    companyDetails.status === "ACTIVE"
                      ? "success"
                      : "default"
                  }
                />
              </div>

              {/* =========================================
                  LOCATION
              ========================================== */}
              <div className="space-y-4 border-gray-100 md:border-l md:pl-8">
                <InfoRow
                  label="Address"
                  value={
                    companyDetails.location?.address ?? "-"
                  }
                />

                <InfoRow
                  label="City"
                  value={
                    companyDetails.location?.city ?? "-"
                  }
                />

                <InfoRow
                  label="State"
                  value={
                    companyDetails.location?.state ?? "-"
                  }
                />

                <InfoRow
                  label="Country"
                  value={
                    companyDetails.location?.country ?? "-"
                  }
                />

                <InfoRow
                  label="Postal Code"
                  value={
                    companyDetails.location?.postalCode ?? "-"
                  }
                />
              </div>
            </div>
          </InfoCard>
        </div>

        {/* =================================================
            RIGHT SIDE CARDS
        ================================================= */}
        <div className="space-y-6">
          {/* =============================================
              SUBSCRIPTION SUMMARY
          ============================================== */}
          <InfoCard
            title="Subscription Summary"
            subtitle="Current subscription plan"
          
          >
            <div className="rounded-xl border border-purple-100 bg-purple-50/60 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#7C3AED] shadow-sm">
                  ◆
                </div>

                <div>
                  <p className="text-xs font-medium text-gray-500">
                    Current Plan
                  </p>

                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {
                      companyDetails.subscription
                        .subscriptionName
                    }
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-4">
              <InfoRow
                label="Status"
                value={
                  companyDetails.subscription.status
                }
                valueType="success"
              />

              <InfoRow
                label="Billing Cycle"
                value={
                  companyDetails.subscription.billingCycle
                }
              />
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7C3AED] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6D28D9]"
            >
              <span>View Subscription</span>

              <span className="text-base">→</span>
            </button>
          </InfoCard>

          {/* =============================================
              COMPANY ADMIN
          ============================================== */}
          <InfoCard
            title="Company Admin"
            subtitle="Primary administrator"
           
          >
            <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white text-sm font-semibold text-blue-600 shadow-sm">
                  {adminInitials}
                </div>

                {/* Admin details */}
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-gray-900">
                    {companyDetails.admin.name}
                  </p>

                  <p className="mt-1 truncate text-xs text-gray-500">
                    {companyDetails.admin.email}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-blue-200 bg-white px-4 py-2.5 text-sm font-medium text-blue-600 transition hover:bg-blue-50"
            >
              <span>View Admin</span>

              <span className="text-base">→</span>
            </button>
          </InfoCard>
        </div>
      </div>

      {/* =================================================
          COMPANY DESCRIPTION
      ================================================= */}
      <div className="mt-6">
        <InfoCard
          title="Company Description"
          subtitle="About this company"
        
        >
          <div className="rounded-xl bg-gray-50 p-5">
            <p className="text-sm leading-7 text-gray-600">
              {companyDetails.description ||
                "No description available."}
            </p>
          </div>
        </InfoCard>
      </div>
    </div>
  );
};

export default Overview;