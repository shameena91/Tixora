import type { ReactNode } from "react";

interface TableHeaderProps {
  children: ReactNode;
}

const TableHeader = ({
  children,
}: TableHeaderProps) => {
  return (
    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
      {children}
    </th>
  );
};

export default TableHeader;