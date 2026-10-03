import {
  AlertCircle,
  CheckCircle2,
  Clock3,
  Headphones,
} from "lucide-react";
import InfoCard from "../commonComponenets/InfoCard";
import StatusBadge from "../commonComponenets/StatusBadge";
import MiniStat from "../commonComponenets/MiniStat";



interface SupportTicketsProps {
  company: any;
}

const SupportTickets = ({
  company,
}: SupportTicketsProps) => {
  const tickets = company.supportTickets || [];

  const openTickets = tickets.filter(
    (ticket: any) =>
      ticket.status === "OPEN" ||
      ticket.status === "IN_PROGRESS"
  ).length;

  const resolvedTickets = tickets.filter(
    (ticket: any) => ticket.status === "RESOLVED"
  ).length;

  const pendingTickets = tickets.filter(
    (ticket: any) => ticket.status === "PENDING"
  ).length;

  return (
    <div className="space-y-6 p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <MiniStat
          title="Open Tickets"
          value={openTickets}
          icon={<AlertCircle className="h-5 w-5" />}
        />

        <MiniStat
          title="Pending Tickets"
          value={pendingTickets}
          icon={<Clock3 className="h-5 w-5" />}
        />

        <MiniStat
          title="Resolved Tickets"
          value={resolvedTickets}
          icon={<CheckCircle2 className="h-5 w-5" />}
        />
      </div>

      {/* Tickets */}
      <InfoCard
        title="Support Tickets"
        icon={<Headphones className="h-5 w-5" />}
      >
        {tickets.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Ticket
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Subject
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Priority
                  </th>

                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {tickets.map(
                  (ticket: any, index: number) => (
                    <tr
                      key={ticket.id || index}
                      className="border-b border-gray-50 last:border-0"
                    >
                      <td className="px-4 py-4 text-sm font-medium text-gray-900">
                        {ticket.ticketNumber ||
                          ticket.id ||
                          "-"}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        {ticket.subject || "-"}
                      </td>

                      <td className="px-4 py-4 text-sm text-gray-600">
                        {ticket.priority || "-"}
                      </td>

                      <td className="px-4 py-4">
                        <StatusBadge
                          status={ticket.status || "OPEN"}
                        />
                      </td>
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-500">
              No support tickets available.
            </p>
          </div>
        )}
      </InfoCard>
    </div>
  );
};

export default SupportTickets;