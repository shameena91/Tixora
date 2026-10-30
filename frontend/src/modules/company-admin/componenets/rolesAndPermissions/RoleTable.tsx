import { Eye, Pencil } from "lucide-react";

import RoleStatusBadge from "./RoleStatusBadge";
import type { DataTableColumn } from "../../../../components/common/Datatable";
import DataTable from "../../../../components/common/Datatable";
import type { RoleListItem } from "../../types/roles/RoleUI";

interface RoleTableProps {
  roles: RoleListItem[];
  onView: (role: RoleListItem) => void;
  onEdit: (role: RoleListItem) => void;
  onToggleStatus: (role: RoleListItem) => void;
}

function RoleTable({ roles, onView, onEdit }: RoleTableProps) {
  const columns: DataTableColumn<RoleListItem>[] = [
    {
      header: "Role Name",
      accessor: "name",
      render: (_value, row) => (
        <div>
          <button
            type="button"
            onClick={() => onView(row)}
            className="font-semibold text-slate-800 hover:text-violet-700"
          >
            {row.name}
          </button>
        </div>
      ),
    },

    {
      header: "Assigned Users",
      accessor: "assignedUsersCount",
      render: (_value, row) => (
        <span className="font-medium text-slate-700">
          {row.assignedUsersCount}
        </span>
      ),
    },
    {
      header: "Permissions",
      accessor: "permissions",
      render: (_value, row) => (
        <span className="text-slate-600">
          {row.permissions.length} Permissions
        </span>
      ),
    },
    {
      header: "Status",
      accessor: "status",
      render: (_value, row) => <RoleStatusBadge status={row.status} />,
    },
    {
      id: "actions",
      header: "Actions",
      accessor: "id",
      render: (_value, row) => (
        <div className="flex items-center gap-2">
          <button
            type="button"
            title="View Role"
            onClick={() => onView(row)}
            className="rounded-lg p-2 text-slate-500 hover:bg-violet-50 hover:text-violet-600"
          >
            <Eye size={17} />
          </button>

          <button
            type="button"
            title="Edit Role"
            disabled={row.isSystemRole}
            onClick={() => onEdit(row)}
            className="rounded-lg p-2 text-slate-500 hover:bg-violet-50 hover:text-violet-600 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Pencil size={17} />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      {roles.length > 0 ? (
        <DataTable<RoleListItem> data={roles} columns={columns} />
      ) : (
        <div className="rounded-xl border border-slate-200 bg-white px-6 py-16 text-center">
          <p className="font-semibold text-slate-700">No roles found</p>

          <p className="mt-1 text-sm text-slate-500">
            Try changing your search or status filter.
          </p>
        </div>
      )}
    </div>
  );
}

export default RoleTable;
