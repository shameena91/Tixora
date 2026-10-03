
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
} from "lucide-react";

import { AuthContext } from "../../../auth/context/AuthContext";
import { logout } from "../../../auth/services/authService";
import { clearAccessToken } from "../../../auth/api/tokenStorage";

interface Notification {
  companyRequestId: string;
  title: string;
  message: string;
  time: string;
}

const notifications: Notification[] = [
  {
    companyRequestId: "123",
    title: "New company registration request",
    message: "ABC Technologies submitted a request.",
    time: "10 minutes ago",
  },
  {
    companyRequestId: "456",
    title: "Company request approved",
    message: "Nova Solutions was approved.",
    time: "1 hour ago",
  },
  {
    companyRequestId: "789",
    title: "New registration request",
    message: "Pixel Systems submitted a request.",
    time: "2 hours ago",
  },
];

interface SuperAdminNavbarProps {
  onMenuClick: () => void;
}

function SuperAdminNavbar({
  onMenuClick,
}: SuperAdminNavbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);

  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      auth?.setAccessToken(null);
      auth?.setUserName(null);
      auth?.setRole(null);

      clearAccessToken();

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const userInitial =
    auth?.userName?.charAt(0).toUpperCase() || "S";

  return (
    <header className="sticky top-0 z-40 h-16 border-b border-slate-200 bg-white">

      <div className="flex h-full items-center justify-between px-3 sm:px-6">

        {/* Left Side */}
        <div className="flex min-w-0 items-center gap-2 sm:gap-4">

          {/* Sidebar Toggle */}
          <button
            type="button"
            onClick={onMenuClick}
            className="shrink-0 rounded-lg p-2 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Toggle sidebar"
          >
            <Menu size={22} />
          </button>

          {/* Page Title */}
          <div className="min-w-0">
            <h1 className="truncate text-base font-semibold text-slate-800 sm:text-lg">
              Super Admin Portal
            </h1>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-4">

          {/* Notifications */}
          <div className="relative">

            <button
              type="button"
              onClick={() =>
                setShowNotifications((prev) => !prev)
              }
              className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
              aria-label="Notifications"
            >
              <Bell size={21} />

              {notifications.length > 0 && (
                <span className="absolute right-0.5 top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
                  {notifications.length}
                </span>
              )}
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 z-50 w-[calc(100vw-1.5rem)] max-w-80 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-xl">

                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
                  <h2 className="text-sm font-semibold text-slate-800">
                    Notifications
                  </h2>

                  <span className="rounded-full bg-violet-100 px-2 py-1 text-xs font-medium text-violet-600">
                    {notifications.length} new
                  </span>
                </div>

                {/* Notifications */}
                <div className="max-h-80 overflow-y-auto">

                  {notifications.map((notification) => (
                    <button
                      key={notification.companyRequestId}
                      type="button"
                      onClick={() => {
                        setShowNotifications(false);

                        navigate(
                          `/super-admin/company-requests/${notification.companyRequestId}`
                        );
                      }}
                      className="w-full border-b border-slate-100 px-4 py-3 text-left transition hover:bg-slate-50"
                    >
                      <div className="flex gap-3">

                        {/* Notification Icon */}
                        <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
                          <Bell size={15} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-slate-700">
                            {notification.title}
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {notification.message}
                          </p>

                          <p className="mt-1 text-xs text-slate-400">
                            {notification.time}
                          </p>
                        </div>

                      </div>
                    </button>
                  ))}

                </div>

              </div>
            )}

          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-slate-200 sm:block" />

          {/* Profile */}
          <div className="flex shrink-0 items-center gap-2 sm:gap-3">

            {/* Avatar */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-violet-100 font-semibold text-violet-600">
              {userInitial}
            </div>

            {/* User Details */}
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">
                {auth?.userName || "Super Admin"}
              </p>

              <p className="text-xs text-slate-400">
                Super Admin
              </p>
            </div>

            <ChevronDown
              size={16}
              className="hidden text-slate-400 sm:block"
            />

          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="flex shrink-0 items-center gap-2 rounded-lg border border-slate-200 px-2 py-2 text-sm font-medium text-red-600 transition hover:border-red-100 hover:bg-red-50 sm:px-3"
            aria-label="Logout"
          >
            <LogOut size={17} />

            <span className="hidden sm:inline">
              Logout
            </span>
          </button>

        </div>

      </div>
    </header>
  );
}

export default SuperAdminNavbar;

