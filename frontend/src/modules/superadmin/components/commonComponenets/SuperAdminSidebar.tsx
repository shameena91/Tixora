import { Link, NavLink } from "react-router-dom";
import logo2 from "../../../../assets/l.png";

import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Package,
  Settings,
  LogOut,
} from "lucide-react";

interface SuperAdminSidebarProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

function SuperAdminSidebar({
  isOpen,
}: SuperAdminSidebarProps) {
  return (
    <aside
      className={`flex min-h-screen flex-col bg-[#0F172A] text-white transition-all duration-300 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-slate-700 px-5">
        <div className="flex items-center gap-3">
          {isOpen && (
            <div>
              <Link
                to="/"
                className="flex items-center text-center"
              >
                <img
                  src={logo2}
                  alt="Tixora logo"
                  className="h-19 w-auto object-contain"
                />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">
        {/* Dashboard */}
        <NavLink
          to="/super-admin/dashbord"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#7C3AED] text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <LayoutDashboard size={19} />

          {isOpen && <span>Dashboard</span>}
        </NavLink>

        {/* Company Requests */}
        <NavLink
          to="/super-admin/company-requests"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#7C3AED] text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <ClipboardList size={19} />

          {isOpen && <span>Company Requests</span>}
        </NavLink>

        {/* Companies */}
        <NavLink
          to="/super-admin/companies"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#7C3AED] text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <Building2 size={19} />

          {isOpen && <span>Companies</span>}
        </NavLink>

        {/* Plans */}
        <NavLink
          to="/super-admin/subscription-plan"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#7C3AED] text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <Package size={19} />

          {isOpen && <span>Plans</span>}
        </NavLink>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-3">
        {/* Settings */}
        <button
          className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Settings size={19} />

          {isOpen && <span>Settings</span>}
        </button>

        {/* Logout */}
        <button
          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <LogOut size={19} />

          {isOpen && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}

export default SuperAdminSidebar;