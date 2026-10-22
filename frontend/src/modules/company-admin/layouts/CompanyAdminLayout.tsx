
import {
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  useContext,
  useEffect,
  useState,
} from "react";

import CompanyAdminSidebar from "../componenets/common/CompanyAdminSidebar";
import { AuthContext } from "../../auth/context/AuthContext";
import CompanyAdminNavbar from "../componenets/common/CompanyAdminnavbar";

import { getMySubscriptionStatusThunk } from "../../../redux/slices/companySubscription/companySubscriptionThunk";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../redux/hooks/hooks";

import { clearAccessToken } from "../../auth/api/tokenStorage";
import toast from "react-hot-toast";
import { logout } from "../../auth/services/authService";

const CompanyAdminLayout = () => {
  const auth = useContext(AuthContext);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

  const [isCheckingSubscription, setIsCheckingSubscription] =
    useState(true);

  const { mySubscription } = useAppSelector(
    (state) => state.companySubscription,
  );

  const subscriptionAccessStatus =
    mySubscription?.subscriptionAccessStatus;

  const isSubscriptionPage =
    location.pathname.startsWith(
      "/company-admin/select-subscription",
    );

  // ------------------------------------
  // Check Subscription Access
  // ------------------------------------

  useEffect(() => {
    let isMounted = true;

    const checkSubscription = async () => {
      try {
        await dispatch(
          getMySubscriptionStatusThunk(),
        ).unwrap();
      } catch (error) {
        console.error(
          "Failed to check subscription:",
          error,
        );
      } finally {
        if (isMounted) {
          setIsCheckingSubscription(false);
        }
      }
    };

    void checkSubscription();

    return () => {
      isMounted = false;
    };
  }, [dispatch]);

  // ------------------------------------
  // Restrict Company Admin Pages
  // ------------------------------------

  useEffect(() => {
    if (
      isCheckingSubscription ||
      isSubscriptionPage
    ) {
      return;
    }

    if (
      subscriptionAccessStatus !== "ACTIVE" &&
      subscriptionAccessStatus !== "EXPIRED"
    ) {
      navigate(
        "/company-admin/select-subscription",
        { replace: true },
      );
    }
  }, [
    isCheckingSubscription,
    isSubscriptionPage,
    subscriptionAccessStatus,
    navigate,
  ]);

  // ------------------------------------
  // Expired Subscription
  // ------------------------------------

  const isSubscriptionExpired =
    !isCheckingSubscription &&
    subscriptionAccessStatus === "EXPIRED" &&
    !isSubscriptionPage;

  // ------------------------------------
  // Renew Subscription
  // ------------------------------------

const handleRenewSubscription = () => {
  const subscriptionHistory =
    mySubscription?.subscriptionHistory ?? [];

  const latestSubscription = [...subscriptionHistory].sort(
    (a, b) =>
      new Date(b.updatedAt).getTime() -
      new Date(a.updatedAt).getTime(),
  )[0] ?? null;

  const currentSubscription =
    mySubscription?.currentSubscription ??
    latestSubscription;

  console.log("[LAYOUT RENEW]", {
    currentSubscription,
    subscriptionAccessStatus,
    planId: currentSubscription?.planId,
    billingCycle: currentSubscription?.billingCycle,
  });

  navigate(
    "/company-admin/select-subscription?mode=renew",
    {
      state: {
        isRenewal: true,
        planId: currentSubscription?.planId,
        billingCycle: currentSubscription?.billingCycle,
      },
    },
  );
};

  // ------------------------------------
  // Logout
  // ------------------------------------

  const handleLogout = async () => {
    try {
      await logout();

      auth?.setAccessToken(null);
      auth?.setUserName(null);

      clearAccessToken();
      localStorage.removeItem("userName");

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  // ------------------------------------
  // Layout
  // ------------------------------------

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar */}

      <CompanyAdminSidebar
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      {/* Main Area */}

      <div
        className={`min-h-screen transition-all duration-300 ${
          isSidebarCollapsed ? "ml-20" : "ml-70"
        }`}
      >
        {/* Navbar */}

        <CompanyAdminNavbar
          name={auth?.userName}
        />

        {/* Page Content */}

        <main className="px-5 py-6 lg:px-5 lg:py-7">
          <Outlet />
        </main>
      </div>

      {/* ------------------------------------
          Expired Subscription Modal
      ------------------------------------ */}

      {isSubscriptionExpired && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 px-4 py-6 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="subscription-expired-title"
          aria-describedby="subscription-expired-description"
        >
          <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-7 text-center shadow-2xl sm:p-9">
            {/* Icon */}

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                className="h-8 w-8"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" />
                <path d="M12 8v4" />
                <path d="M12 16h.01" />
              </svg>
            </div>

            {/* Status */}

            <span className="mt-5 inline-flex rounded-full bg-red-50 px-3 py-1.5 text-xs font-bold tracking-wide text-red-700">
              SUBSCRIPTION EXPIRED
            </span>

            {/* Message */}

            <h2
              id="subscription-expired-title"
              className="mt-5 text-2xl font-bold tracking-tight text-gray-900"
            >
              Your subscription has expired
            </h2>

            <p
              id="subscription-expired-description"
              className="mt-3 text-sm leading-6 text-gray-600"
            >
              Your company no longer has an active
              subscription. Please renew your plan
              to continue using Tixora.
            </p>

            {/* Actions */}

            <div className="mt-7 flex flex-col gap-3">
              <button
                type="button"
                onClick={handleRenewSubscription}
                className="w-full rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Renew Subscription
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                Logout
              </button>
            </div>

            <p className="mt-4 text-xs text-gray-400">
              Your access will be restored after
              successful renewal.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyAdminLayout;
