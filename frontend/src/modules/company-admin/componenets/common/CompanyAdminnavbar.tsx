import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { AuthContext } from "../../../auth/context/AuthContext";
import { logout } from "../../../auth/services/authService";
import { clearAccessToken } from "../../../auth/api/tokenStorage";

interface CompanyAdminNavbarProps {
  name?: string | null;
}

const CompanyAdminNavbar = ({
  name,
}: CompanyAdminNavbarProps) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();

      auth?.setAccessToken(null);
      auth?.setUserName(null);

      clearAccessToken();
      localStorage.removeItem("userName");

      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <header className="sticky top-0 z-30 h-20 border-b border-slate-200 bg-white">
      <div className="flex h-full items-center justify-between px-6 lg:px-8">

        {/* Left Side */}
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Company Admin
          </h1>

          <p className="text-xs text-slate-500">
            Manage your company
          </p>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-5">

          {/* Notification */}
          <button
            type="button"
            className="relative rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
          >
            <span className="text-xl">
              🔔
            </span>

            <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500" />
          </button>

          {/* User */}
          <div className="hidden items-center gap-3 sm:flex">

            {/* Avatar */}
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-violet-100 text-sm font-semibold text-violet-700">
              {name?.charAt(0).toUpperCase() || "A"}
            </div>

            {/* User Details */}
            <div>
              <p className="text-sm font-semibold text-slate-800">
                {name || "Company Admin"}
              </p>

              <p className="text-xs text-slate-500">
                Company Admin
              </p>
            </div>

          </div>

          {/* Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>

        </div>
      </div>
    </header>
  );
};

export default CompanyAdminNavbar;