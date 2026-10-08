import { Outlet } from "react-router-dom";
import { useContext, useState } from "react";

import CompanyAdminSidebar from "../componenets/CompanyAdminSidebar";
import { AuthContext } from "../../auth/context/AuthContext";
import CompanyAdminNavbar from "../componenets/common/CompanyAdminnavbar";

const CompanyAdminLayout = () => {
  const auth = useContext(AuthContext);

  const [isSidebarCollapsed, setIsSidebarCollapsed] =
    useState(false);

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
    </div>
  );
};

export default CompanyAdminLayout;