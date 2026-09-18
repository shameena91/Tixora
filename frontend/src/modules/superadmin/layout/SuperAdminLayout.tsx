import { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "../components/SuperAdminSidebar";
import SuperAdminNavbar from "../components/SuperAdminNavbar";

function SuperAdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-slate-50">

      {/* Sidebar */}
      <SuperAdminSidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      {/* Right Section */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Navbar */}
        <SuperAdminNavbar
          onMenuClick={handleToggleSidebar}
        />

        {/* Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            <Outlet />
          </div>
        </main>

      </div>
    </div>
  );
}

export default SuperAdminLayout;