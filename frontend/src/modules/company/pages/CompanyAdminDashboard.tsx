import { useContext } from "react";

import { AuthContext } from "../../auth/context/AuthContext";
import CompanyAdminNavbar from "../components/common/CompanyAdminnavbar";

const CompanyAdminDashboard = () => {
  const auth = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <CompanyAdminNavbar
        name={auth?.userName}
      />

      {/* Dashboard Content */}
      <main className="p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-2xl font-bold text-slate-900">
            Company Admin Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Welcome back, {auth?.userName}
          </p>
        </div>
      </main>
    </div>
  );
};

export default CompanyAdminDashboard;