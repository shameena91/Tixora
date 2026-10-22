import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import toast from "react-hot-toast";
import RazorpayCheckout from "@razorpay/razorpay-js/checkout";

import Navbar from "../../../components/home/Navbar";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/hooks";

import { AuthContext } from "../../auth/context/AuthContext";

import SubscriptionPlanCard from "../../superadmin/components/subscription/SubscriptionPlanCard";

import {
  getMySubscriptionPlanThunk,
  getMySubscriptionStatusThunk,
  selectSubscriptionPlanThunk,
  verifyPaymentThunk,
} from "../../../redux/slices/companySubscription/companySubscriptionThunk";

import type { SubScriptionListItems } from "../../../redux/slices/subscriptionPlan/subscriptionPlanTypes";

import { fetchActiveSubscriptionPlansThunk } from "../../../redux/slices/subscriptionPlan/subscriptionPlanThunk";

import {
  updateCancelledPayment,
  updateFailedPayment,
} from "../../superadmin/services/subscriptionPlanServices";

type BillingCycle = "MONTHLY" | "YEARLY";

type RenewalNavigationState = {
  isRenewal?: boolean;
  planId?: string;
  billingCycle?: BillingCycle;
};

type RenewalCandidate = {
  planId: string;
  billingCycle: BillingCycle;
  status: string;
  startDate: Date | string;
  endDate: Date | string | null;
  createdAt?: Date | string;
  updatedAt?: Date | string;
};

type SubscriptionStatusPayload = {
  currentSubscription: RenewalCandidate | null;
  subscriptionHistory: RenewalCandidate[];
};

const toTimestamp = (
  value: Date | string | null | undefined,
): number => {
  if (!value) {
    return 0;
  }

  const timestamp = new Date(value).getTime();

  return Number.isFinite(timestamp) ? timestamp : 0;
};

// Prefer the active subscription. If none exists,
// choose the latest expired subscription for renewal.
const findRenewalCandidate = (
  response: SubscriptionStatusPayload,
): RenewalCandidate | null => {
  const current = response.currentSubscription;

  if (
    current?.planId &&
    (
      current.billingCycle === "MONTHLY" ||
      current.billingCycle === "YEARLY"
    )
  ) {
    return current;
  }

  const candidates = (response.subscriptionHistory ?? [])
    .filter(
      (subscription) =>
        subscription.status === "ACTIVE" ||
        subscription.status === "EXPIRED",
    )
    .sort((a, b) => {
      if (
        a.status === "ACTIVE" &&
        b.status !== "ACTIVE"
      ) {
        return -1;
      }

      if (
        b.status === "ACTIVE" &&
        a.status !== "ACTIVE"
      ) {
        return 1;
      }

      return (
        toTimestamp(b.endDate) -
          toTimestamp(a.endDate) ||
        toTimestamp(b.startDate) -
          toTimestamp(a.startDate)
      );
    });

  return candidates[0] ?? null;
};

const CompanySubscriptionPlans = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const auth = useContext(AuthContext);

  // ------------------------------------
  // Navigation Mode
  // ------------------------------------

  const routeMode = searchParams.get("mode");
  const isUpgrade = routeMode === "upgrade";

  const navigationState =
    location.state as RenewalNavigationState | null;

  const isRenewal =
    routeMode === "renew" ||
    (!routeMode && navigationState?.isRenewal === true);

  // ------------------------------------
  // Local State
  // ------------------------------------

  const [selectedPlan, setSelectedPlan] =
    useState<SubScriptionListItems | null>(null);

  const [paymentFailed, setPaymentFailed] = useState(false);
  const [isBillingModalOpen, setIsBillingModalOpen] =
    useState(false);

  const [subscriptionDetailsReady, setSubscriptionDetailsReady] =
    useState(false);

  const [subscriptionDetailsError, setSubscriptionDetailsError] =
    useState("");

  const [renewalPaymentLoading, setRenewalPaymentLoading] =
    useState(false);

  const [renewalSubscriptionFallback, setRenewalSubscriptionFallback] =
    useState<{
      planId: string;
      billingCycle: BillingCycle;
    } | null>(null);

  const renewalAutoStartedRef = useRef(false);

  // ------------------------------------
  // Redux State
  // ------------------------------------

  const {
    activeSubscriptionPlans,
    activeSubscriptionPlansLoading,
    activeSubscriptionPlansError,
  } = useAppSelector((state) => state.subscriptionPlan);

  const {
    mySubscription,
    myPlan,
    loading: subscriptionLoading,
    error: subscriptionError,
  } = useAppSelector((state) => state.companySubscription);

const currentSubscription =
  mySubscription?.currentSubscription ?? null;

const historyRenewalCandidate = useMemo(() => {
  const subscriptionHistory =
    mySubscription?.subscriptionHistory ?? [];

  return findRenewalCandidate({
    currentSubscription:
      currentSubscription as RenewalCandidate | null,
    subscriptionHistory:
      subscriptionHistory as RenewalCandidate[],
  });
}, [currentSubscription, mySubscription?.subscriptionHistory]);

  // Prefer current Redux data, then navigation state,
  // then the subscription history and API fallback.
  const renewalPlanId =
    currentSubscription?.planId ??
    navigationState?.planId ??
    historyRenewalCandidate?.planId ??
    renewalSubscriptionFallback?.planId;

  const renewalBillingCycle =
    (
      currentSubscription?.billingCycle ??
      navigationState?.billingCycle ??
      historyRenewalCandidate?.billingCycle ??
      renewalSubscriptionFallback?.billingCycle
    ) as BillingCycle | undefined;

  const hasRenewalDetails =
    Boolean(renewalPlanId) &&
    (
      renewalBillingCycle === "MONTHLY" ||
      renewalBillingCycle === "YEARLY"
    );

  // ------------------------------------
  // Fetch Subscription Details
  // ------------------------------------

 const requestSubscriptionDetails = useCallback(
  async () => {
    const statusResult = await dispatch(
      getMySubscriptionStatusThunk(),
    ).unwrap();

    if (!statusResult) {
      throw new Error(
        "Unable to load your subscription details.",
      );
    }

    const candidate = findRenewalCandidate(
      statusResult as SubscriptionStatusPayload,
    );

    if (!candidate && isRenewal) {
      throw new Error(
        "No previous subscription was found for renewal.",
      );
    }

    if (isUpgrade) {
      await dispatch(
        getMySubscriptionPlanThunk(),
      ).unwrap();
    }

    // Return data without calling setState here.
    return candidate;
  },
  [dispatch, isRenewal, isUpgrade],
);

  // ------------------------------------
  // Load Plans and Required Details
  // ------------------------------------

 useEffect(() => {
  let cancelled = false;

  if (!isRenewal) {
    void dispatch(fetchActiveSubscriptionPlansThunk());
  }

  const needsSubscriptionDetails =
    isUpgrade || (isRenewal && !hasRenewalDetails);

  if (!needsSubscriptionDetails) {
    return () => {
      cancelled = true;
    };
  }

  void requestSubscriptionDetails()
  .then((candidate) => {
    if (cancelled) {
      return;
    }

    if (candidate) {
      setRenewalSubscriptionFallback({
        planId: candidate.planId,
        billingCycle: candidate.billingCycle,
      });
    }

    setSubscriptionDetailsReady(true);
    setSubscriptionDetailsError("");
  })
    .catch((error: unknown) => {
      if (cancelled) {
        return;
      }

      console.error(
        "Failed to load subscription details:",
        error,
      );

      setSubscriptionDetailsReady(false);

      setSubscriptionDetailsError(
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Unable to load your current subscription.",
      );
    });

  return () => {
    cancelled = true;
  };
}, [
  dispatch,
  isUpgrade,
  isRenewal,
  hasRenewalDetails,
  requestSubscriptionDetails,
]);

  // ------------------------------------
  // Current Plan Price
  // ------------------------------------

  const comparisonBillingCycle: BillingCycle =
    currentSubscription?.billingCycle === "YEARLY"
      ? "YEARLY"
      : "MONTHLY";

  const currentPriceValue =
    comparisonBillingCycle === "YEARLY"
      ? myPlan?.yearlyPrice
      : myPlan?.monthlyPrice;

  const currentPlanPrice =
    currentPriceValue == null
      ? Number.NaN
      : Number(currentPriceValue);

  const hasCurrentPlanPrice =
    Number.isFinite(currentPlanPrice);

  // ------------------------------------
  // Filter Upgrade Plans
  // ------------------------------------

  const displayedPlans = useMemo(() => {
    if (!isUpgrade) {
      return activeSubscriptionPlans;
    }

    if (
      !subscriptionDetailsReady ||
      !hasCurrentPlanPrice
    ) {
      return [];
    }

    return activeSubscriptionPlans
      .filter((plan: SubScriptionListItems) => {
        const value =
          comparisonBillingCycle === "YEARLY"
            ? plan.yearlyPrice
            : plan.monthlyPrice;

        const price =
          value == null
            ? Number.NaN
            : Number(value);

        return (
          Number.isFinite(price) &&
          price > currentPlanPrice
        );
      })
      .sort((a, b) => {
        const valueA =
          comparisonBillingCycle === "YEARLY"
            ? a.yearlyPrice
            : a.monthlyPrice;

        const valueB =
          comparisonBillingCycle === "YEARLY"
            ? b.yearlyPrice
            : b.monthlyPrice;

        return Number(valueA) - Number(valueB);
      });
  }, [
    activeSubscriptionPlans,
    comparisonBillingCycle,
    currentPlanPrice,
    hasCurrentPlanPrice,
    isUpgrade,
    subscriptionDetailsReady,
  ]);

  // ------------------------------------
  // Open Razorpay Checkout
  // ------------------------------------

  const openRazorpayCheckout = useCallback(
    async (
      orderId: string,
      amount: number,
      currency: string,
    ) => {
      try {
        const razorpay = await RazorpayCheckout({
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount,
          currency,
          name: "Tixora",
          description: isRenewal
            ? "Tixora Subscription Renewal"
            : "Tixora Subscription",
          order_id: orderId,

          modal: {
            ondismiss: async () => {
              setPaymentFailed(true);

              try {
                await updateCancelledPayment(orderId);
                toast("Payment cancelled");
              } catch (error) {
                console.error(
                  "Failed to update cancelled payment:",
                  error,
                );
              }
            },
          },

          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
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
                "[PAYMENT] Payment verified:",
                result,
              );

              await dispatch(
                getMySubscriptionStatusThunk(),
              ).unwrap();

              await dispatch(
                getMySubscriptionPlanThunk(),
              ).unwrap();

              setPaymentFailed(false);
              setSelectedPlan(null);
              setIsBillingModalOpen(false);

              toast.success("Payment successful");

              navigate("/company-admin/dashboard");
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

        razorpay.on(
          "payment.failed",
          async (response) => {
            console.error(
              "Razorpay payment failed:",
              response,
            );

            const failedOrderId =
              response.error?.metadata?.order_id;

            const paymentId =
              response.error?.metadata?.payment_id;

            setPaymentFailed(true);

            toast.error(
              "Payment failed. Please try again.",
            );

            if (!failedOrderId || !paymentId) {
              console.error(
                "Order ID or payment ID missing from failure response",
              );
              return;
            }

            try {
              await updateFailedPayment({
                razorpay_order_id: failedOrderId,
                razorpay_payment_id: paymentId,
              });
            } catch (error) {
              console.error(
                "Failed to update failed payment:",
                error,
              );
            }
          },
        );

        razorpay.open();
      } catch (error) {
        console.error(
          "Razorpay checkout error:",
          error,
        );

        setPaymentFailed(true);

        toast.error("Unable to open Razorpay checkout");
      }
    },
    [dispatch, isRenewal, navigate],
  );

  // ------------------------------------
  // Renewal Payment
  // ------------------------------------

  const startRenewalPayment = useCallback(
    async () => {
      const planId = renewalPlanId;
      const billingCycle = renewalBillingCycle;

      if (
        !planId ||
        (
          billingCycle !== "MONTHLY" &&
          billingCycle !== "YEARLY"
        )
      ) {
        setSubscriptionDetailsError(
          "Unable to find the current subscription details. Please try again.",
        );

        setPaymentFailed(true);
        return;
      }

      setSubscriptionDetailsError("");
      setPaymentFailed(false);
      setRenewalPaymentLoading(true);

      try {
        const response = await dispatch(
          selectSubscriptionPlanThunk({
            planId,
            billingCycle,
            isRenewal: true,
            isUpgrade: false,
          }),
        ).unwrap();

        const order = response.data;

        if (!order?.orderId) {
          throw new Error(
            "Backend did not return a renewal order ID.",
          );
        }

        await openRazorpayCheckout(
          order.orderId,
          order.amount,
          order.currency,
        );
      } catch (error) {
        console.error(
          "[RENEW ERROR] Failed to start renewal payment:",
          error,
        );

        setPaymentFailed(true);

        toast.error(
          error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : "Unable to start renewal payment.",
        );
      } finally {
        setRenewalPaymentLoading(false);
      }
    },
    [
      dispatch,
      renewalPlanId,
      renewalBillingCycle,
      openRazorpayCheckout,
    ],
  );

  // ------------------------------------
  // Start Renewal Once Details Are Ready
  // ------------------------------------

  useEffect(() => {
    if (
      !isRenewal ||
      !hasRenewalDetails ||
      renewalAutoStartedRef.current
    ) {
      return;
    }

    renewalAutoStartedRef.current = true;

    void startRenewalPayment();
  }, [
    isRenewal,
    hasRenewalDetails,
    startRenewalPayment,
  ]);

  // ------------------------------------
  // Select Plan
  // ------------------------------------

  const handleSelectPlan = async (
    plan: SubScriptionListItems,
  ) => {
    if (isUpgrade) {
      const value =
        comparisonBillingCycle === "YEARLY"
          ? plan.yearlyPrice
          : plan.monthlyPrice;

      const selectedPrice =
        value == null
          ? Number.NaN
          : Number(value);

      if (
        !hasCurrentPlanPrice ||
        !Number.isFinite(selectedPrice) ||
        selectedPrice <= currentPlanPrice
      ) {
        toast.error(
          "Please select a plan with a higher price than your current subscription.",
        );
        return;
      }
    }

    try {
      if (plan.name === "FREE") {
        await dispatch(
          selectSubscriptionPlanThunk({
            planId: plan.id,
            billingCycle: "MONTHLY",
            isRenewal: false,
            isUpgrade: false,
          }),
        ).unwrap();

        await dispatch(
          getMySubscriptionStatusThunk(),
        ).unwrap();

        await dispatch(
          getMySubscriptionPlanThunk(),
        ).unwrap();

        toast.success(
          "Subscription plan selected successfully",
        );

        navigate("/company-admin/dashboard");
        return;
      }

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
    billingCycle: BillingCycle,
  ) => {
    if (!selectedPlan) {
      return;
    }

    if (isUpgrade) {
      const currentValue =
        billingCycle === "YEARLY"
          ? myPlan?.yearlyPrice
          : myPlan?.monthlyPrice;

      const selectedValue =
        billingCycle === "YEARLY"
          ? selectedPlan.yearlyPrice
          : selectedPlan.monthlyPrice;

      const currentPrice =
        currentValue == null
          ? Number.NaN
          : Number(currentValue);

      const selectedPrice =
        selectedValue == null
          ? Number.NaN
          : Number(selectedValue);

      if (
        !Number.isFinite(currentPrice) ||
        !Number.isFinite(selectedPrice) ||
        selectedPrice <= currentPrice
      ) {
        toast.error(
          `Please select a plan with a higher ${billingCycle.toLowerCase()} price than your current subscription.`,
        );
        return;
      }
    }

    try {
      const response = await dispatch(
        selectSubscriptionPlanThunk({
          planId: selectedPlan.id,
          billingCycle,
          isRenewal: false,
          isUpgrade,
        }),
      ).unwrap();

      setIsBillingModalOpen(false);

      if (!response.data.orderId) {
        throw new Error(
          "Payment order was not returned by the server.",
        );
      }

      await openRazorpayCheckout(
        response.data.orderId,
        response.data.amount,
        response.data.currency,
      );
    } catch (error) {
      console.error(
        "Subscription order creation error:",
        error,
      );

      setPaymentFailed(true);

      toast.error(
        error instanceof Error
          ? error.message
          : typeof error === "string"
            ? error
            : "Failed to create payment order",
      );
    }
  };

  // ------------------------------------
  // Retry Payment
  // ------------------------------------

  const handleRetryPayment = () => {
    if (isRenewal) {
      void startRenewalPayment();
      return;
    }

    if (!selectedPlan) {
      return;
    }

    setPaymentFailed(false);
    setIsBillingModalOpen(true);
  };

  // ------------------------------------
  // Retry Subscription Details
  // ------------------------------------

  const handleRetrySubscriptionDetails = () => {
    renewalAutoStartedRef.current = false;
    setSubscriptionDetailsReady(false);
    setSubscriptionDetailsError("");
    setPaymentFailed(false);

    void requestSubscriptionDetails()
      .then(() => {
        setSubscriptionDetailsReady(true);
        setSubscriptionDetailsError("");
      })
      .catch((error: unknown) => {
        console.error(
          "Retry loading subscription details failed:",
          error,
        );

        setSubscriptionDetailsReady(false);

        setSubscriptionDetailsError(
          error instanceof Error
            ? error.message
            : typeof error === "string"
              ? error
              : "Unable to load your current subscription.",
        );
      });
  };

  // ------------------------------------
  // Render State
  // ------------------------------------

  const isPageLoading =
    (!isRenewal && activeSubscriptionPlansLoading) ||
    (
      isUpgrade &&
      (
        subscriptionLoading ||
        !subscriptionDetailsReady
      )
    );

  const cannotDetermineCurrentPrice =
    isUpgrade &&
    subscriptionDetailsReady &&
    !hasCurrentPlanPrice;

  // ------------------------------------
  // Render
  // ------------------------------------

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="w-full border-b border-gray-100 bg-white">
        <Navbar
          showLogin={false}
          showRegister={false}
          name={auth?.userName}
        />
      </div>

      <main className="mx-auto w-full max-w-[1500px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {isRenewal
              ? "Renew Subscription"
              : isUpgrade
                ? "Upgrade Your Plan"
                : "Choose Your Plan"}
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
            {isRenewal
              ? "Preparing payment for your current subscription."
              : isUpgrade
                ? "Choose a higher-priced subscription plan for your company."
                : "Choose a subscription plan that fits your company needs."}
          </p>
        </div>

        {isRenewal ? (
          <section className="mt-12">
            <div className="mx-auto flex min-h-[300px] max-w-lg flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white p-8 text-center shadow-sm">
              {!hasRenewalDetails ? (
                subscriptionDetailsError ? (
                  <>
                    <p className="text-sm text-red-600">
                      {subscriptionDetailsError}
                    </p>

                    <button
                      type="button"
                      onClick={handleRetrySubscriptionDetails}
                      className="mt-5 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                    >
                      Retry
                    </button>
                  </>
                ) : (
                  <>
                    <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />

                    <p className="mt-4 text-sm text-gray-600">
                      Loading your current subscription...
                    </p>
                  </>
                )
              ) : renewalPaymentLoading ? (
                <>
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />

                  <p className="mt-4 text-sm text-gray-600">
                    Preparing your renewal payment...
                  </p>
                </>
              ) : paymentFailed ? (
                <>
                  <p className="text-sm text-gray-700">
                    Renewal payment was not completed.
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    You can retry the payment below.
                  </p>

                  <button
                    type="button"
                    onClick={handleRetryPayment}
                    className="mt-5 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Retry Payment
                  </button>
                </>
              ) : (
                <>
                  <div className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />

                  <p className="mt-4 text-sm text-gray-600">
                    Opening secure payment checkout...
                  </p>
                </>
              )}
            </div>
          </section>
        ) : (
          <section className="mt-12">
            {isPageLoading ? (
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
            ) : isUpgrade && subscriptionDetailsError ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="text-sm text-red-600">
                  {subscriptionDetailsError}
                </p>

                <button
                  type="button"
                  onClick={handleRetrySubscriptionDetails}
                  className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Try Again
                </button>
              </div>
            ) : cannotDetermineCurrentPrice ? (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                <p className="text-sm font-medium text-gray-700">
                  Unable to determine your current subscription price.
                </p>

                {subscriptionError && (
                  <p className="mt-2 text-sm text-red-500">
                    {subscriptionError}
                  </p>
                )}

                <button
                  type="button"
                  onClick={handleRetrySubscriptionDetails}
                  className="mt-4 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Try Again
                </button>
              </div>
            ) : displayedPlans.length === 0 ? (
              <div className="flex min-h-[300px] items-center justify-center">
                <p className="text-center text-sm text-gray-500">
                  {isUpgrade
                    ? "No higher-priced upgrade plans are currently available."
                    : "No subscription plans available."}
                </p>
              </div>
            ) : (
              <div className="flex flex-wrap items-stretch justify-center gap-6">
                {displayedPlans.map(
                  (plan: SubScriptionListItems) => (
                    <div
                      key={plan.id}
                      className="flex w-full justify-center sm:w-[340px]"
                    >
                      <SubscriptionPlanCard
                        plan={plan}
                        buttonText={
                          isUpgrade
                            ? "Upgrade Plan"
                            : "Select Plan"
                        }
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
        )}

        {!isRenewal && paymentFailed && selectedPlan && (
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
                onClick={handleRetryPayment}
                className="mt-4 rounded-md bg-black px-5 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              >
                Retry Payment
              </button>
            </div>
          </div>
        )}
      </main>

      {!isRenewal &&
        isBillingModalOpen &&
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
                <button
                  type="button"
                  onClick={() => {
                    void handleBillingCycleSelect("MONTHLY");
                  }}
                  className="rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-400"
                >
                  <p className="font-semibold text-gray-900">
                    Monthly
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹{selectedPlan.monthlyPrice} / month
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    void handleBillingCycleSelect("YEARLY");
                  }}
                  className="rounded-xl border border-gray-200 p-4 text-left transition hover:border-gray-400"
                >
                  <p className="font-semibold text-gray-900">
                    Yearly
                  </p>

                  <p className="mt-1 text-sm text-gray-500">
                    ₹{selectedPlan.yearlyPrice} / year
                  </p>
                </button>
              </div>

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