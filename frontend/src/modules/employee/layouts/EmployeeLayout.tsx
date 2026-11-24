import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import EmployeeSidebar from "../componenets/EmployeeSidebar";
import EmployeeNavbar from "../componenets/EmployeeNavbar";
import { useAuth } from "../../../shared/hooks/useAuth";
import { clearAccessToken } from "../../auth/api/tokenStorage";
import { logoutEmployee } from "../../auth/services/authService";


interface EmployeeLayoutProps {
  children: ReactNode;
}

const EmployeeLayout = ({ children }: EmployeeLayoutProps) => {
  const auth = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutEmployee();
    } catch (error) {
      console.error("Employee logout failed:", error);
      toast.error("Server logout failed. Local session cleared.");
    } finally {
      auth.setAccessToken(null);
      auth.setUserName(null);
      auth.setRole(null);
      auth.setEmployeeRole(null);
      auth.setCompanyId(null);
      auth.setPermissions([]);

      clearAccessToken("employee");
      localStorage.removeItem("userName");

      navigate("/employee-login", { replace: true });
    }
  };

  return (
    <div className="flex min-h-screen">
      <EmployeeSidebar onLogout={handleLogout} />

      <div className="flex-1">
        <EmployeeNavbar title="Employee Portal" />

        <main>{children}</main>
      </div>
    </div>
  );
};

export default EmployeeLayout;