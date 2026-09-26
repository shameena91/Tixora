import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";

import logo2 from "../../../../assets/logo2.png"

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
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link
          to="/Company-admin/dashboard"
          className="flex items-center"
        >
          <img
            src={logo2}
            alt="Tixora logo"
            className="h-14 w-auto object-contain"
          />
        </Link>

      
        
        {/* Right Side */}
        <div className="flex items-center gap-4">

          {name && (
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-800">
                {name}
              </p>

              <p className="text-xs text-slate-400">
                Company Admin
              </p>
            </div>
          )}

          <button
            type="button"
            onClick={handleLogout}
            className="rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          >
            Logout
          </button>

        </div>
      </nav>
    </header>
  );
};

export default CompanyAdminNavbar;