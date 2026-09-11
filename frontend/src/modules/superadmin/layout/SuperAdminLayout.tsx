import { Outlet } from "react-router-dom";
import SuperAdminNavbar from "../components/SuperAdminNavbar";
import SuperAdminSidebar from "../components/SuperAdminSidebar";

function SuperAdminLayout() {
  return (
    <div className="min-h-screen bg-[#faf7ff]">

      <SuperAdminNavbar />

      <div className="flex">
        <SuperAdminSidebar />

        <main className="flex-1">
          <Outlet />
        </main>
      </div>

    </div>
  );
}

export default SuperAdminLayout;