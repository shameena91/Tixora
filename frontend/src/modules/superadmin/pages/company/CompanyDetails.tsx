import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { fetchCompanyThunk } from "../../../../redux/slices/companySlice";
import CompanyDetailsHeader from "../../components/company/CompanyDetailsHeader";
import CompanyDetailsTabs from "../../components/company/CompanyDetailsTabs";
import Overview from "../../components/company/Overview";
import Subscription from "../../components/company/Subscription";


// import Subscription from "./Subscription";
// import CompanyAdmins from "./CompanyAdmins";
// import BillingHistory from "./BillingHistory";
// import SupportTickets from "./SupportTickets";

export type Tab =
  | "overview"
  | "subscription"
  | "admins"
  | "billing"
  | "tickets";

const CompanyDetails = () => {
  const { companyId } = useParams<{ companyId: string }>();

  const dispatch = useAppDispatch();

  const { companyDetails, loading, error } = useAppSelector(
    (state) => state.company
  );

  const [activeTab, setActiveTab] = useState<Tab>("overview");

  useEffect(() => {
    if (companyId) {
      dispatch(fetchCompanyThunk(companyId));
    }
  }, [dispatch, companyId]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-sm text-gray-500">
          Loading company details...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm font-medium text-red-600">
          {error}
        </p>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center">
        <p className="text-sm text-gray-500">
          Company details not found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Common Header */}
      <CompanyDetailsHeader company={companyDetails} />

      {/* Tabs + Tab Content */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        {/* Common Tabs */}
        <CompanyDetailsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* Only this content changes */}
        {activeTab === "overview" && (
          <Overview companyDetails={companyDetails} />
        )}

         {activeTab === "subscription" && (
          <Subscription company={companyDetails} />
        )}
{/*
        {activeTab === "admins" && (
          <CompanyAdmins company={companyDetails} />
        )}

        {activeTab === "billing" && (
          <BillingHistory company={companyDetails} />
        )}

        {activeTab === "tickets" && (
          <SupportTickets company={companyDetails} />
        )} */}
      </div>
    </div>
  );
};

export default CompanyDetails;