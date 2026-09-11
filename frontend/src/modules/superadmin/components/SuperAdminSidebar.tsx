import { NavLink } from "react-router-dom";

function SuperAdminSidebar() {
  return (
    <aside className="w-64 min-h-screen border-r border-gray-200 bg-white">

      {/* Logo */}
      <div className="flex h-16 items-center border-b border-gray-100 px-6">
        <h1 className="text-xl font-bold text-[#7C3AED]">
          Tixora
        </h1>
      </div>

      {/* Navigation */}
      <nav className="p-4">

        <NavLink
          to="/super-admin/dashbord"
          className={({ isActive }) =>
            `mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium ${
              isActive
                ? "bg-[#F3E8FF] text-[#7C3AED]"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/super-admin/company-requests"
          className={({ isActive }) =>
            `mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium ${
              isActive
                ? "bg-[#F3E8FF] text-[#7C3AED]"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          Company Requests
        </NavLink>

        <NavLink
          to="/super-admin/companies"
          className={({ isActive }) =>
            `mb-2 flex items-center rounded-lg px-4 py-3 text-sm font-medium ${
              isActive
                ? "bg-[#F3E8FF] text-[#7C3AED]"
                : "text-gray-600 hover:bg-gray-50"
            }`
          }
        >
          Companies
        </NavLink>

      </nav>
    </aside>
  );
}

export default SuperAdminSidebar;