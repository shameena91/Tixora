import { ShieldCheck, CheckCircle2, Users } from "lucide-react";
import type { RoleListItem } from "../../types/roles/RoleUI";

interface RoleStatsCardsProps {
  roles: RoleListItem[];
}

function RoleStatsCards({ roles }: RoleStatsCardsProps) {
  const totalRoles = roles.length;

  const activeRoles = roles.filter((role) => role.status === "ACTIVE").length;

  // const assignedUsers = roles.reduce(
  //   (total, role) => total + role.assignedUsersCount,
  //   0,
  // );

  const stats = [
    {
      title: "Total Roles",
      value: totalRoles,
      icon: ShieldCheck,
      iconStyle: "bg-violet-50 text-violet-600",
    },
    {
      title: "Active Roles",
      value: activeRoles,
      icon: CheckCircle2,
      iconStyle: "bg-green-50 text-green-600",
    },
    {
      title: "Assigned Users",
      // value: assignedUsers,
      icon: Users,
      iconStyle: "bg-blue-50 text-blue-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold text-slate-800">
                  {stat.value}
                </h2>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconStyle}`}
              >
                <Icon size={22} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RoleStatsCards;
