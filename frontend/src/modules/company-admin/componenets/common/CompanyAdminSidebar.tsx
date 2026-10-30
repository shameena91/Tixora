
import { NavLink } from "react-router-dom";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FolderTree,
  LayoutDashboard,
  LogOut,
  Settings,
  Shield,
  Tags,
} from "lucide-react";
import React from "react";

import logo2 from "../../../../assets/l.png";

interface CompanyAdminSidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CompanyAdminSidebar = ({
  isCollapsed,
  setIsCollapsed,
}: CompanyAdminSidebarProps) => {
  return (
    <aside
      className={`fixed left-0 top-0 z-40 flex h-screen flex-col
      border-r border-slate-800/80 bg-[#0F172A] text-slate-300
      shadow-xl shadow-black/20 transition-[width] duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo Section */}
      <div className="flex h-24 shrink-0 items-center justify-center border-b border-slate-800/80 px-3">
        {!isCollapsed && (
          <div className="flex w-full items-center justify-center overflow-hidden">
            <img
              src={logo2}
              alt="Tixora"
              className="h-20 max-w-full object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex min-h-0 flex-1 flex-col justify-between">
        <nav className="custom-scrollbar flex-1 overflow-x-hidden overflow-y-auto px-3 py-7">
          {/* Dashboard */}
          <div className="mb-7">
            <NavItem
              to="/company-admin/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
              isCollapsed={isCollapsed}
            />
          </div>

          {/* Company */}
          <NavSection title="Company" isCollapsed={isCollapsed}>
            <NavItem
              to="/company-admin/company-information"
              icon={Building2}
              label="Company Profile"
              isCollapsed={isCollapsed}
            />

            <NavItem
              to="/company-admin/departments"
              icon={FolderTree}
              label="Department Management"
              isCollapsed={isCollapsed}
            />

            <NavItem
              to="/company-admin/categories"
              icon={Tags}
              label="Category Management"
              isCollapsed={isCollapsed}
            />

            {/* <NavGroup
              label="Employee Management"
              icon={Users}
              isCollapsed={isCollapsed}
            >
              <NavSubItem
                to="/employees"
                label="Employees"
              />

              <NavSubItem
                to="/employees/skills"
                label="Skills"
              />
            </NavGroup> */}
          </NavSection>

          {/* Operations */}
          <NavSection title="Operations" isCollapsed={isCollapsed}>
            {/* <NavGroup
              label="Rules Management"
              icon={Sliders}
              isCollapsed={isCollapsed}
            >
              <NavSubItem
                to="/assignment-rules"
                label="Assignment Rules"
              />

              <NavSubItem
                to="/sla-policies"
                label="SLA Policies"
              />
            </NavGroup>

            <NavItem
              to="/tickets"
              icon={Ticket}
              label="Ticket Management"
              isCollapsed={isCollapsed}
            /> */}

            <NavItem
              to="/company-admin/subscription"
              icon={CreditCard}
              label="Subscription"
              isCollapsed={isCollapsed}
            />
          </NavSection>

          {/* Account & Access */}
           <NavSection
            title="Account & Access"
            isCollapsed={isCollapsed}
          >
            <NavItem
              to="/company-admin/roles-management"
              icon={Shield}
              label="Roles & Permissions"
              isCollapsed={isCollapsed}
            />
          </NavSection> 

          {/* Support */}
          {/* <NavSection
            title="Support"
            isCollapsed={isCollapsed}
          >
            <NavItem
              to="/support-tickets"
              icon={HelpCircle}
              label="Support Tickets"
              isCollapsed={isCollapsed}
            />

            <NavItem
              to="/support-tickets/create"
              icon={PlusCircle}
              label="Create Support Ticket"
              isCollapsed={isCollapsed}
            />
          </NavSection> */}
        </nav>

        {/* Bottom Section */}
        <div className="shrink-0 space-y-1 border-t border-slate-800/80 bg-[#0A0F1D] p-3">
          {/* Settings */}
          <NavItem
            to="/settings"
            icon={Settings}
            label="Settings"
            isCollapsed={isCollapsed}
          />

          {/* Logout */}
          {!isCollapsed && (
            <button
              type="button"
              className="group mt-1 flex min-h-12 w-full items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-slate-400 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500/60"
            >
              <LogOut
                size={20}
                strokeWidth={1.9}
                className="shrink-0 transition-transform duration-200 group-hover:-translate-x-0.5"
              />
              <span>Logout</span>
            </button>
          )}

          {isCollapsed && (
            <button
              type="button"
              title="Logout"
              className="group mt-1 flex min-h-12 w-full items-center justify-center rounded-xl px-3 py-3 text-slate-400 transition-all duration-200 hover:bg-rose-500/10 hover:text-rose-400"
            >
              <LogOut
                size={20}
                strokeWidth={1.9}
              />
            </button>
          )}
        </div>
      </div>

      {/* Collapse / Expand Button */}
      <button
        type="button"
        onClick={() => setIsCollapsed((prev) => !prev)}
        aria-label={
          isCollapsed ? "Expand sidebar" : "Collapse sidebar"
        }
        className="absolute -right-3.5 top-24 z-50 flex h-7 w-7
        items-center justify-center rounded-full border border-slate-600
        bg-slate-800 text-slate-200 shadow-lg
        transition-all duration-200 hover:scale-110
        hover:border-blue-400 hover:bg-blue-600 hover:text-white
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
      >
        {isCollapsed ? (
          <ChevronRight size={16} />
        ) : (
          <ChevronLeft size={16} />
        )}
      </button>
    </aside>
  );
};

interface NavSectionProps {
  title: string;
  isCollapsed: boolean;
  children: React.ReactNode;
}

const NavSection = ({
  title,
  isCollapsed,
  children,
}: NavSectionProps) => {
  return (
    <div className="mb-7">
      {!isCollapsed && (
        <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
          {title}
        </div>
      )}

      {isCollapsed && (
        <div className="mx-3 mb-3 border-b border-slate-800/80" />
      )}

      <div className="space-y-1.5">{children}</div>
    </div>
  );
};

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isCollapsed: boolean;
}

const NavItem = ({
  to,
  icon: Icon,
  label,
  isCollapsed,
}: NavItemProps) => {
  return (
    <NavLink
      to={to}
      title={isCollapsed ? label : undefined}
      className={({ isActive }) =>
        `group relative flex min-h-12 w-full items-center rounded-xl
        px-3 py-3 text-sm font-medium
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60 ${
          isActive
            ? "border border-blue-500/20 bg-blue-500/15 font-semibold text-blue-300 shadow-sm shadow-blue-950/20"
            : "border border-transparent text-slate-400 hover:bg-slate-800/70 hover:text-white"
        } ${isCollapsed ? "justify-center" : "gap-3"}`
      }
    >
      {({ isActive }) => (
        <>
          {/* Active Indicator */}
          {isActive && (
            <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]" />
          )}

          {/* Icon */}
          <Icon
            size={20}
            strokeWidth={isActive ? 2.2 : 1.8}
            className={`shrink-0 transition-all duration-200 ${
              isActive
                ? "scale-105 text-blue-300"
                : "text-slate-400 group-hover:scale-105 group-hover:text-white"
            }`}
          />

          {!isCollapsed && (
            <span className="min-w-0 flex-1 leading-5">
              {label}
            </span>
          )}

          {/* Tooltip when collapsed */}
          {isCollapsed && (
            <span className="pointer-events-none absolute left-full top-1/2 z-50 ml-3 hidden -translate-y-1/2 whitespace-nowrap rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-sm font-medium text-white shadow-xl group-hover:block">
              {label}
            </span>
          )}
        </>
      )}
    </NavLink>
  );
};

// interface NavGroupProps {
//   label: string;
//   icon: React.ElementType;
//   isCollapsed: boolean;
//   children: React.ReactNode;
// };

// const NavGroup = ... (keep your existing commented implementation here)

// interface NavSubItemProps {
//   to: string;
//   label: string;
// };

// const NavSubItem = ... (keep your existing commented implementation here)

export default CompanyAdminSidebar;
