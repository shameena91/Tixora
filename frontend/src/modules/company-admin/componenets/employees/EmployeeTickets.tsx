import { Ticket } from "lucide-react";

interface EmployeeTicketsProps {
  ticketLabel: string;
}

const EmployeeTickets = ({
  ticketLabel,
}: EmployeeTicketsProps) => {
  return (
    <section>
      <div>
        <h2 className="text-base font-semibold text-gray-900">
          {ticketLabel}
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Tickets related to this employee
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-200 px-4 py-12 text-center">
        <div className="rounded-full bg-purple-50 p-4 text-[#7C3AED]">
          <Ticket size={28} />
        </div>

        <h3 className="mt-4 text-sm font-semibold text-gray-800">
          Ticket data not available
        </h3>

        <p className="mt-2 max-w-sm text-sm text-gray-500">
          Employee-related tickets will be displayed here
          after Ticket Management integration.
        </p>
      </div>
    </section>
  );
};

export default EmployeeTickets;