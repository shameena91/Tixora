
import {
  Ticket,
  Clock,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../../../shared/hooks/useAuth";

const EmployeeDashboard = () => {
  const { userName } = useAuth();

  const stats = [
    {
      title: "My Tickets",
      count: 0,
      icon: Ticket,
    },
    {
      title: "In Progress",
      count: 0,
      icon: Clock,
    },
    {
      title: "Pending",
      count: 0,
      icon: AlertCircle,
    },
    {
      title: "Resolved",
      count: 0,
      icon: CheckCircle2,
    },
  ];

  return (
    <div className="p-5 sm:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#183B36]">
          Welcome back, {userName}!
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          Here's your ticket overview.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>

                <div className="rounded-lg bg-[#EAF5EE] p-3 text-[#11A675]">
                  <Icon size={22} />
                </div>
              </div>

              <h2 className="mt-4 text-3xl font-bold text-[#183B36]">
                {stat.count}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeDashboard;
