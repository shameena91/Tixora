import {
  Ticket,
  LayoutDashboard,
  PlusCircle,
  User,
  LogOut,
  Inbox,
  Users,
  Tags,
  ClipboardList,
  UserCheck,
  ListChecks,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import { PERMISSIONS } from "../../../shared/constants/permissionCatalog";


interface EmployeeSidebarProps {
  onLogout?: () => void;
}

const EmployeeSidebar = ({ onLogout }: EmployeeSidebarProps) => {
  const { permissions } = useAuth();

  const menuItems = [
    {
      title: "Dashboard",
      path: "/employee/dashboard",
      icon: LayoutDashboard,
      permission: null,
    },
    {
      title: "My Tickets",
      path: "/employee/tickets",
      icon: Ticket,
      permission: PERMISSIONS.TICKETS_VIEW_OWN,
    },
    {
      title: "Create Ticket",
      path: "/employee/tickets/create",
      icon: PlusCircle,
      permission: PERMISSIONS.TICKETS_CREATE,
    },
    {
      title: "My Assigned Tickets",
      path: "/employee/assigned-tickets",
      icon: Inbox,
      permission: PERMISSIONS.TICKETS_VIEW_ASSIGNED,
    },
    {
      title: "Department Tickets",
      path: "/employee/department-tickets",
      icon: ClipboardList,
      permission: PERMISSIONS.TICKETS_VIEW_DEPARTMENT,
    },
    {
      title: "Unassigned Tickets",
      path: "/employee/unassigned-tickets",
      icon: ListChecks,
      permission: PERMISSIONS.TICKETS_VIEW_DEPARTMENT,
    },
    {
      title: "All Department Tickets",
      path: "/employee/all-department-tickets",
      icon: Ticket,
      permission: PERMISSIONS.TICKETS_VIEW_DEPARTMENT,
    },
    {
      title: "Assign Tickets",
      path: "/employee/assign-tickets",
      icon: UserCheck,
      permission: PERMISSIONS.TICKETS_ASSIGN_DEPARTMENT,
    },
    {
      title: "Categories",
      path: "/employee/categories",
      icon: Tags,
      permission: PERMISSIONS.CATEGORIES_VIEW_DEPARTMENT,
    },
    {
      title: "Support Agents",
      path: "/employee/support-agents",
      icon: Users,
      permission: PERMISSIONS.MEMBERS_VIEW_DEPARTMENT,
    },
    {
      title: "My Profile",
      path: "/employee/profile",
      icon: User,
      permission: null,
    },
  ];

  const visibleMenu = menuItems.filter(
    (item) =>
      item.permission === null ||
      permissions.includes(item.permission),
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col bg-[#183B36] text-white md:flex">
        <div className="flex h-20 items-center border-b border-white/10 px-6">
          <h1 className="text-2xl font-bold tracking-wide">
            Tixora
          </h1>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4 py-6">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          {visibleMenu.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                end={item.path === "/employee/dashboard"}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                    isActive
                      ? "bg-[#11A675] text-white"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                {item.title}
              </NavLink>
            );
          })}
        </nav>

        {onLogout && (
          <div className="border-t border-white/10 p-4">
            <button
              type="button"
              onClick={onLogout}
              className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-300 hover:bg-white/10 hover:text-white"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>
        )}
      </aside>

      {/* Mobile Navigation */}
      <nav className="flex gap-2 overflow-x-auto bg-white px-4 py-3 md:hidden">
        {visibleMenu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              end={item.path === "/employee/dashboard"}
              className={({ isActive }) =>
                `flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-xs ${
                  isActive
                    ? "bg-[#11A675] text-white"
                    : "bg-gray-100 text-gray-600"
                }`
              }
            >
              <Icon size={16} />
              {item.title}
            </NavLink>
          );
        })}
      </nav>
    </>
  );
};

export default EmployeeSidebar;