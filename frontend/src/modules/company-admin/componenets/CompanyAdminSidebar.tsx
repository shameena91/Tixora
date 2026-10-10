
import { NavLink } from "react-router-dom";
import {
  Building2,
  ChevronLeft,
  ChevronRight,
//   CreditCard,
  FolderTree,
//   HelpCircle,
  LayoutDashboard,
  LogOut,
//   PlusCircle,
  Settings,
//   Shield,
//   Sliders,
  Tags,
//   Ticket,
//   Users,
} from "lucide-react";

import logo2 from "../../../assets/l.png";
import React from "react";

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
      className={`fixed left-0 top-0 z-40 h-screen border-r border-slate-800 bg-[#0F172A] text-slate-400 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo Section */}
      <div className="flex h-20 items-center border-b border-slate-800 px-4">
        {!isCollapsed && (
         <div className="flex w-full items-center justify-center">
            <img
              src={logo2}
              alt="Tixora"
              className="h-23 w-auto object-contain"
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex h-[calc(100vh-5rem)] flex-col justify-between">
        <nav className="flex-1 overflow-y-auto px-4 py-6">

          {/* Dashboard */}
          <div className="mb-6">
            <NavItem
              to="/company-admin/dashboard"
              icon={LayoutDashboard}
              label="Dashboard"
              isCollapsed={isCollapsed}
            />
          </div>

          {/* Company */}
          <NavSection
            title="Company"
            isCollapsed={isCollapsed}
          >
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
              to="/categories"
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
          {/* <NavSection
            title="Operations"
            isCollapsed={isCollapsed}
          >
            <NavGroup
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
            />

            <NavItem
              to="/subscription"
              icon={CreditCard}
              label="Subscription"
              isCollapsed={isCollapsed}
            />
          </NavSection> */}

          {/* Account & Access */}
          {/* <NavSection
            title="Account & Access"
            isCollapsed={isCollapsed}
          >
            <NavItem
              to="/roles-permissions"
              icon={Shield}
              label="Roles & Permissions"
              isCollapsed={isCollapsed}
            />
          </NavSection> */}

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
        <div className="border-t border-slate-800 bg-[#0A0F1D] p-3">

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
              className="mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-medium text-slate-400 transition-all hover:bg-slate-800/60 hover:text-rose-400"
            >
              <LogOut
                size={17}
                strokeWidth={2}
              />

              <span>
                Logout
              </span>
            </button>
          )}

          {isCollapsed && (
            <button
              type="button"
              title="Logout"
              className="mt-1 flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-slate-400 transition-all hover:bg-slate-800/60 hover:text-rose-400"
            >
              <LogOut
                size={17}
                strokeWidth={2}
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
          isCollapsed
            ? "Expand sidebar"
            : "Collapse sidebar"
        }
        className="absolute -right-3 top-20 flex h-7 w-7 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 shadow-md transition hover:bg-slate-100"
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
    <div className="mb-6">
      {!isCollapsed && (
        <div className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {title}
        </div>
      )}

      <div className="space-y-0.5">
        {children}
      </div>
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
        `group flex w-full items-center rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
          isActive
            ? "border border-blue-500/20 bg-blue-600/15 font-bold text-blue-400"
            : "text-slate-400 hover:bg-slate-800/40 hover:text-slate-200"
        } ${isCollapsed ? "justify-center" : "gap-3"}`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            size={17}
            strokeWidth={2}
            className={`shrink-0 ${
              isActive
                ? "text-blue-400"
                : "text-slate-400 group-hover:text-slate-200"
            }`}
          />

          {!isCollapsed && (
            <span className="truncate">
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
// }

// const NavGroup = ({
//   label,
//   icon: Icon,
//   isCollapsed,
//   children,
// }: NavGroupProps) => {
//   const [isOpen, setIsOpen] = React.useState(true);

//   if (isCollapsed) {
//     return (
//       <div className="mb-0.5">
//         <button
//           type="button"
//           title={label}
//           className="group flex w-full items-center justify-center rounded-xl px-3 py-2.5 text-xs font-medium text-slate-400 transition-all hover:bg-slate-800/40 hover:text-slate-200"
//         >
//           <Icon
//             size={17}
//             strokeWidth={2}
//             className="shrink-0"
//           />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-0.5">
//       <button
//         type="button"
//         onClick={() => setIsOpen((prev) => !prev)}
//         className="group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium text-slate-400 transition-all hover:bg-slate-800/40 hover:text-slate-200"
//       >
//         <div className="flex min-w-0 items-center gap-3">
//           <Icon
//             size={17}
//             strokeWidth={2}
//             className="shrink-0 text-slate-400 group-hover:text-slate-200"
//           />

//           <span className="truncate">
//             {label}
//           </span>
//         </div>

//         <ChevronRight
//           size={14}
//           className={`shrink-0 transition-transform duration-200 ${
//             isOpen ? "rotate-90" : ""
//           }`}
//         />
//       </button>

//       {isOpen && (
//         <div className="ml-4 space-y-0.5 border-l border-slate-800 pl-4">
//           {children}
//         </div>
//       )}
//     </div>
//   );
// };

// interface NavSubItemProps {
//   to: string;
//   label: string;
// }

// const NavSubItem = ({
//   to,
//   label,
// }: NavSubItemProps) => {
//   return (
//     <NavLink
//       to={to}
//       className={({ isActive }) =>
//         `block rounded-lg px-3 py-1.5 text-xs transition-all ${
//           isActive
//             ? "bg-blue-600/10 font-bold text-blue-400"
//             : "text-slate-400 hover:text-slate-200"
//         }`
//       }
//     >
//       {label}
//     </NavLink>
//   );
// };

export default CompanyAdminSidebar;
