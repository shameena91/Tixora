import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Package,
  CreditCard,
  Receipt,
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

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#7C3AED]">
            <Building2 size={20} />
          </div>

          {isOpen && (
            <div>
              <h1 className="text-lg font-bold">
                Tixora
              </h1>

              <p className="text-[10px] text-slate-400">
                Super Admin
              </p>
            </div>
          )}

        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-3">

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

        <NavLink
          to="/super-admin/plans"
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

        <NavLink
          to="/super-admin/subscriptions"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#7C3AED] text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <CreditCard size={19} />

          {isOpen && <span>Subscriptions</span>}
        </NavLink>

        <NavLink
          to="/super-admin/billing"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition ${
              isActive
                ? "bg-[#7C3AED] text-white"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }`
          }
        >
          <Receipt size={19} />

          {isOpen && <span>Billing</span>}
        </NavLink>

      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-3">

        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-800">
          <Settings size={19} />

          {isOpen && <span>Settings</span>}
        </button>

        <button className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-slate-300 hover:bg-slate-800">
          <LogOut size={19} />

          {isOpen && <span>Logout</span>}
        </button>

      </div>

    </aside>
  );
}

export default SuperAdminSidebar;