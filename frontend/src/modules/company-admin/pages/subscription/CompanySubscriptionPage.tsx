
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getMySubscriptionPlanThunk,
  getMySubscriptionStatusThunk,
} from "../../../../redux/slices/companySubscription/companySubscriptionThunk";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import SubscriptionOverview from "../../componenets/subscription/SubscriptionOverview";
import BillingHistory from "../../componenets/subscription/BillingHistory";

type SubscriptionTab = "overview" | "billing";


const CompanySubscriptionPage = () => {
  const [activeTab, setActiveTab] =
    useState<SubscriptionTab>("overview");



  const [notice, setNotice] = useState("");
  const [currentTime] = useState(() => Date.now());

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    mySubscription,
    myPlan,
    loading,
    error,
  } = useAppSelector((state) => state.companySubscription);

  useEffect(() => {
    dispatch(getMySubscriptionStatusThunk());
    dispatch(getMySubscriptionPlanThunk());
  }, [dispatch]);

 
 

  if (loading && !myPlan && !mySubscription) {
    return (
      <div className="flex min-h-64 items-center justify-center">
        <div className="flex items-center gap-3 rounded-xl border border-indigo-100 bg-white px-6 py-5 shadow-sm">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />

          <p className="text-sm font-medium text-gray-600">
            Loading subscription...
          </p>
        </div>
      </div>
    );
  }

  if (error && !myPlan && !mySubscription) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6">
        <h2 className="font-semibold text-red-800">
          Unable to load subscription
        </h2>

        <p className="mt-2 text-sm text-red-600">{error}</p>

        <button
          type="button"
          onClick={() => {
            dispatch(getMySubscriptionStatusThunk());
            dispatch(getMySubscriptionPlanThunk());
          }}
          className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!mySubscription || !myPlan) {
    return (
      <div className="rounded-xl border border-indigo-100 bg-white p-6 shadow-sm">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-2xl text-indigo-700">
          ◈
        </div>

        <h1 className="mt-4 text-xl font-semibold text-gray-900">
          My Subscription
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          No subscription plan details are available for your company.
        </p>

        {error && (
          <p className="mt-3 text-sm text-red-600">{error}</p>
        )}
      </div>
    );
  }

  const currentSubscription =
    mySubscription.currentSubscription ?? null;

  const subscriptionStatus =
    mySubscription.subscriptionAccessStatus ?? null;

  const subscriptionHistory =
    mySubscription.subscriptionHistory ?? [];

  const subscriptionEndTime = currentSubscription?.endDate
    ? new Date(currentSubscription.endDate).getTime()
    : null;

  const oneDayInMilliseconds = 7 * 24 * 60 * 60 * 1000;

  const isPaidPlan = myPlan.name !== "FREE";

  const isExpired =
    subscriptionEndTime !== null &&
    currentTime !== null &&
    subscriptionEndTime <= currentTime;

  const isRenewalDue =
    subscriptionEndTime !== null &&
    currentTime !== null &&
    subscriptionEndTime - currentTime <= oneDayInMilliseconds;

  const showRenewButton =
    isPaidPlan &&
    (isExpired ||
      (currentSubscription?.status === "ACTIVE" && isRenewalDue));

  return (
    <div className="min-h-full space-y-6 bg-slate-50/60 pb-8">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="h-7 w-1 rounded-full bg-indigo-600" />

            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              My Subscription
            </h1>
          </div>

          <p className="mt-2 pl-3 text-sm text-gray-500">
            View your current plan and manage your subscription.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => {
              setNotice("");
            
  navigate(
    "/company-admin/select-subscription?mode=upgrade"
  );
            }}
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            <span aria-hidden="true">↑</span>
            Upgrade Plan
          </button>


{showRenewButton && (
  <button
    type="button"
    onClick={() => {
      setNotice("");

      navigate(
        "/company-admin/select-subscription?mode=renew",
      );
    }}
    className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
  >
    <span aria-hidden="true">↻</span>
    Renew Subscription
  </button>
)}

        </div>
      </section>

      {/* Action notice */}
      {notice && (
        <div
          role="status"
          className="flex items-start justify-between gap-3 rounded-lg border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm text-indigo-900"
        >
          <p>{notice}</p>

          <button
            type="button"
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
            className="font-semibold text-indigo-500 hover:text-indigo-800"
          >
            ×
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-6">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
              activeTab === "overview"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Overview
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("billing")}
            className={`border-b-2 px-1 pb-3 text-sm font-semibold transition-colors ${
              activeTab === "billing"
                ? "border-indigo-600 text-indigo-700"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            Billing History
          </button>
        </div>
      </div>

      {/* Tab components */}
      {activeTab === "overview" ? (
        <SubscriptionOverview
          subscriptionAccessStatus={subscriptionStatus}
          mySubscription={currentSubscription}
          subscriptionHistory={subscriptionHistory}
          myPlan={myPlan}
          onSelectPlan={() =>
            navigate("/company-admin/select-subscription")
          }
        />
      ) : (
        <BillingHistory />
      )}

      {/* Renewal confirmation modal */}
     
    </div>
  );
};

export default CompanySubscriptionPage;
