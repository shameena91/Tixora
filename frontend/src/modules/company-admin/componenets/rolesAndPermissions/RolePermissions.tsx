import { CheckCircle2, ShieldCheck } from "lucide-react";

interface RolePermissionsProps {
  permissions: string[];
}

const permissionGroups = [
  {
    title: "Tickets",
    prefix: "tickets.",
  },
  {
    title: "Departments",
    prefix: "departments.",
  },
  {
    title: "Categories",
    prefix: "categories.",
  },
  {
    title: "Members",
    prefix: "members.",
  },
];

const permissionLabels: Record<string, string> = {
  "tickets.create": "Create Tickets",
  "tickets.view.own": "View Own Tickets",
  "tickets.reply.own": "Reply to Own Tickets",
  "tickets.view.assigned": "View Assigned Tickets",
  "tickets.reply.assigned": "Reply to Assigned Tickets",
  "tickets.update.assigned": "Update Assigned Tickets",
  "tickets.view.department": "View Department Tickets",
  "tickets.update.department": "Update Department Tickets",
  "tickets.assign.department": "Assign Department Tickets",

  "departments.view.own": "View Own Department",

  "categories.view.department": "View Department Categories",
  "categories.create": "Create Categories",
  "categories.update": "Update Categories",
  "categories.delete": "Delete Categories",

  "members.view.department": "View Department Members",
};

const formatPermissionLabel = (permission: string) => {
  return (
    permissionLabels[permission] ??
    permission
      .split(".")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  );
};

function RolePermissions({ permissions }: RolePermissionsProps) {
  if (!permissions || permissions.length === 0) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
        <ShieldCheck className="mx-auto h-10 w-10 text-slate-300" />

        <h3 className="mt-3 font-semibold text-slate-700">
          No Permissions Assigned
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          This role does not have any permissions.
        </p>
      </div>
    );
  }

  const groupedPermissions = permissionGroups
    .map((group) => ({
      ...group,
      permissions: permissions.filter((permission) =>
        permission.startsWith(group.prefix),
      ),
    }))
    .filter((group) => group.permissions.length > 0);

  const knownPrefixes = permissionGroups.map((group) => group.prefix);

  const otherPermissions = permissions.filter(
    (permission) =>
      !knownPrefixes.some((prefix) => permission.startsWith(prefix)),
  );

  return (
    <div className="space-y-5">
      {/* Permission Header */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
        <div>
          <h2 className="text-lg font-semibold text-slate-800">
            Assigned Permissions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Permissions available for this role.
          </p>
        </div>

        <span className="w-fit rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
          {permissions.length} Permissions
        </span>
      </div>

      {/* Permission Groups */}
      {groupedPermissions.map((group) => (
        <div
          key={group.title}
          className="overflow-hidden rounded-xl border border-slate-200 bg-white"
        >
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
            <h3 className="font-semibold text-slate-800">{group.title}</h3>

            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-xs font-semibold text-violet-700">
              {group.permissions.length}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            {group.permissions.map((permission) => (
              <div key={permission} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />

                <span className="text-sm font-medium text-slate-700">
                  {formatPermissionLabel(permission)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Other Permissions */}
      {otherPermissions.length > 0 && (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
          <div className="border-b border-slate-100 bg-slate-50 px-5 py-4">
            <h3 className="font-semibold text-slate-800">Other Permissions</h3>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
            {otherPermissions.map((permission) => (
              <div key={permission} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-green-600" />

                <span className="text-sm font-medium text-slate-700">
                  {formatPermissionLabel(permission)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RolePermissions;
