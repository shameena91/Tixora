import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../auth/context/AuthContext";
import { logout } from "../../auth/services/authService";
import { clearAccessToken } from "../../auth/api/tokenStorage";



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
function SuperAdminNavbar() {
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

  return (
    <header className="sticky top-0 z-50 h-16 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-6">

        {/* Logo & Platform Name */}
        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
            ✦
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-800">
              Tixora
            </h1>

            <p className="text-xs text-slate-400">
              Super Admin Portal
            </p>
          </div>

        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Notification */}
        <div className="relative">

  <button
    type="button"
    onClick={() => setShowNotifications(!showNotifications)}
    className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
    aria-label="Notifications"
  >
    <span className="text-xl">🔔</span>

    <span className="absolute right-1 top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-semibold text-white">
      {notifications.length}
    </span>
  </button>

  {showNotifications && (
    <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-slate-200 bg-white shadow-lg">

      <div className="border-b border-slate-100 px-4 py-3">
        <h2 className="text-sm font-semibold text-slate-800">
          Notifications
        </h2>
      </div>

      <div>
        {notifications.map((notification) => (
          <button
            key={notification.companyRequestId}
            type="button"
            onClick={() =>
    navigate(
      `/super-admin/company-requests/${notification.companyRequestId}`
    )}
            className="w-full border-b border-slate-100 px-4 py-3 text-left hover:bg-slate-50"
          >
            <p className="text-sm font-medium text-slate-700">
              {notification.title}
            </p>

            <p className="mt-1 text-xs text-slate-500">
              {notification.message}
            </p>

            <p className="mt-1 text-xs text-slate-400">
              {notification.time}
            </p>
          </button>
        ))}
      </div>

    </div>
  )}

</div>

          {/* Admin Profile */}
          <div className="flex items-center gap-3 border-l border-slate-200 pl-5">

            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
              {auth?.userName?.charAt(0).toUpperCase()}
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-slate-700">
                {auth?.userName}
              </p>

              <p className="text-xs text-slate-400">
                Super Admin
              </p>
            </div>

            <span className="text-xs text-slate-400">
              ▼
            </span>

          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
}

export default SuperAdminNavbar;