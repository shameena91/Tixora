
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import Navbar from "../../../components/home/Navbar";



import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/hooks";

import { AuthContext } from "../../auth/context/AuthContext";

import SubscriptionPlanCard from "../../superadmin/components/subscription/SubscriptionPlanCard";

import RazorpayCheckout from "@razorpay/razorpay-js/checkout";

import {

  selectSubscriptionPlanThunk,
  verifyPaymentThunk,
} from "../../../redux/slices/companySubscription/companySubscriptionThunk";
import type { SubScriptionListItems } from "../../../redux/slices/subscriptionPlan/subscriptionPlanTypes";
import { fetchActiveSubscriptionPlansThunk } from "../../../redux/slices/subscriptionPlan/subscriptionPlanThunk";

const CompanySubscriptionPlans = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const [selectedPlan, setSelectedPlan] =
    useState<SubScriptionListItems | null>(null);

  const [paymentFailed, setPaymentFailed] =
    useState(false);

  const [isBillingModalOpen, setIsBillingModalOpen] =
    useState(false);

  // ------------------------------------
  // Company Subscription State
  // ------------------------------------

  const {
    activeSubscriptionPlans,
    activeSubscriptionPlansLoading,
    activeSubscriptionPlansError,
  } = useAppSelector(
    (state) => state.subscriptionPlan,
  );

  // ------------------------------------
  // Load Active Subscription Plans
  // ------------------------------------

  useEffect(() => {
    dispatch(
      fetchActiveSubscriptionPlansThunk(),
    );
  }, [dispatch]);

  // ------------------------------------
  // Select Plan
  // ------------------------------------

  const handleSelectPlan = async (
    plan: SubScriptionListItems,
  ) => {
    console.log("SELECT PLAN:", plan);

    try {
      // ------------------------------------
      // FREE PLAN
      // ------------------------------------

      if (plan.name === "FREE") {
        await dispatch(
          selectSubscriptionPlanThunk({
            planId: plan.id,
            billingCycle: "MONTHLY",
          }),
        ).unwrap();

        toast.success(
          "Subscription plan selected successfully",
        );

        navigate("/company-admin/dashboard");

        return;
      }

      // ------------------------------------
      // PAID PLAN
      // ------------------------------------

      setPaymentFailed(false);
      setSelectedPlan(plan);
      setIsBillingModalOpen(true);
    } catch (error) {
      toast.error(
        typeof error === "string"
          ? error
          : "Failed to select subscription plan",
      );
    }
  };

  // ------------------------------------
  // Billing Cycle Selection
  // ------------------------------------

  const handleBillingCycleSelect = async (
    billingCycle: "MONTHLY" | "YEARLY",
  ) => {
    if (!selectedPlan) {
      return;
    }

    try {
      const response = await dispatch(
        selectSubscriptionPlanThunk({
          planId: selectedPlan.id,
          billingCycle,
        }),
      ).unwrap();

      console.log(
        "Subscription response:",
        response.data,
      );

      // Close billing modal
      setIsBillingModalOpen(false);

      // ------------------------------------
      // Razorpay Order
      // ------------------------------------

      if (response.data.orderId) {
        await openRazorpayCheckout(
          response.data.orderId,
          response.data.amount,
          response.data.currency,
        );
      }
    } catch (error) {
      console.error(
        "Subscription order creation error:",
        error,
      );

      setPaymentFailed(true);

      toast.error(
        typeof error === "string"
          ? error
          : "Failed to create payment order",
      );
    }
  };

  // ------------------------------------
  // Open Razorpay Checkout
  // ------------------------------------

  const openRazorpayCheckout = async (
    orderId: string,
    amount: number,
    currency: string,
  ) => {
    try {
      const razorpay =
        await RazorpayCheckout({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,

          amount,
          currency,

          name: "Tixora",

          description: "Tixora Subscription",

          order_id: orderId,

          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
              // ------------------------------------
              // Verify Payment
              // ------------------------------------

              const result = await dispatch(
                verifyPaymentThunk({
                  razorpay_order_id:
                    response.razorpay_order_id,

                  razorpay_payment_id:
                    response.razorpay_payment_id,

                  razorpay_signature:
                    response.razorpay_signature,
                }),
              ).unwrap();

              console.log(
                "Payment verified:",
                result,
              );

              // Payment successful
              setPaymentFailed(false);
              setSelectedPlan(null);
              setIsBillingModalOpen(false);

              toast.success(
                "Payment successful",
              );

              navigate(
                "/company-admin/dashboard",
              );
            } catch (error) {
              console.error(
                "Payment verification error:",
                error,
              );

              setPaymentFailed(true);

              toast.error(
                typeof error === "string"
                  ? error
                  : "Payment verification failed",
              );
            }
          },
        });

      razorpay.open();
    } catch (error) {
      console.error(
        "Razorpay checkout error:",
        error,
      );

      setPaymentFailed(true);

      toast.error(
        "Unable to open Razorpay checkout",
      );
    }
  };

  // ------------------------------------
  // Retry Payment
  // ------------------------------------

  const handleRetryPayment = () => {
    if (!selectedPlan) {
      return;
    }

    setPaymentFailed(false);
    setIsBillingModalOpen(true);
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* ------------------------------------
          Navbar
      ------------------------------------ */}

      <div className="w-full border-b border-gray-100 bg-white">
        <Navbar
          showLogin={false}
          showRegister={false}
          name={auth?.userName}
        />
      </div>

      {/* ------------------------------------
          Main Content
      ------------------------------------ */}

      <main className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        {/* ------------------------------------
            Header
        ------------------------------------ */}

        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Choose Your Plan
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            Choose a subscription plan that fits
            your company needs.
          </p>
        </div>

        {/* ------------------------------------
            Plans
        ------------------------------------ */}

        <section className="mt-12">
          {activeSubscriptionPlansLoading ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-gray-500">
                Loading subscription plans...
              </p>
            </div>
          ) : activeSubscriptionPlansError ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-red-500">
                {activeSubscriptionPlansError}
              </p>
            </div>
          ) : activeSubscriptionPlans.length === 0 ? (
            <div className="flex min-h-[300px] items-center justify-center">
              <p className="text-sm text-gray-500">
                No subscription plans available.
              </p>
            </div>
          ) : (
            <div className="flex flex-wrap items-stretch justify-center gap-6">
              {activeSubscriptionPlans.map(
                (
                  plan: SubScriptionListItems,
                ) => (
                  <div
                    key={plan.id}
                    className="flex w-full justify-center sm:w-[340px]"
                  >
                    <SubscriptionPlanCard
                      plan={plan}
                      buttonText="Select Plan"
                      onButtonClick={() =>
                        handleSelectPlan(plan)
                      }
                    />
                  </div>
                ),
              )}
            </div>
          )}
        </section>

        {/* ------------------------------------
            Payment Failed / Retry
        ------------------------------------ */}

        {paymentFailed &&
          selectedPlan && (
            <div className="mt-8 flex justify-center">
              <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm">
                <p className="text-sm text-gray-600">
                  Payment was not completed.
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  You can try the payment again.
                </p>

                <button
                  type="button"
                  onClick={
                    handleRetryPayment
                  }
                  className="mt-4 rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                >
                  Retry Payment
                </button>
              </div>
            </div>
          )}
      </main>

      {/* ------------------------------------
          Billing Cycle Modal
      ------------------------------------ */}

      {isBillingModalOpen &&
        selectedPlan && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
              <h2 className="text-xl font-semibold text-gray-900">
                Choose Billing Cycle
              </h2>

              <p className="mt-2 text-sm text-gray-500">
                {selectedPlan.name}
              </p>

              <div className="mt-6 grid grid-cols-2 gap-4">
                {/* ------------------------------------
                    Monthly
                ------------------------------------ */}

                <button
                  type="button"
                  onClick={() => {
                    handleBillingCycleSelect(
                      "MONTHLY",
                    );
                  }}
                  className="rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-400"
                >
                  <p className="font-semibold text-gray-900">
                    Monthly
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹
                    {
                      selectedPlan.monthlyPrice
                    }{" "}
                    / month
                  </p>
                </button>

                {/* ------------------------------------
                    Yearly
                ------------------------------------ */}

                <button
                  type="button"
                  onClick={() => {
                    handleBillingCycleSelect(
                      "YEARLY",
                    );
                  }}
                  className="rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-400"
                >
                  <p className="font-semibold text-gray-900">
                    Yearly
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹
                    {
                      selectedPlan.yearlyPrice
                    }{" "}
                    / year
                  </p>
                </button>
              </div>

              {/* ------------------------------------
                  Cancel
              ------------------------------------ */}

              <button
                type="button"
                onClick={() => {
                  setIsBillingModalOpen(false);
                  setSelectedPlan(null);
                  setPaymentFailed(false);
                }}
                className="mt-6 w-full rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
    </div>
  );
};

export default CompanySubscriptionPlans;

