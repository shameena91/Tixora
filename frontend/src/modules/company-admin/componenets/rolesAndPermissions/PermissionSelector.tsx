import { Check } from "lucide-react";

import { PERMISSION_GROUPS } from "../../../../shared/constants/permissionCatalog";

import type { PermissionCode } from "../../../../shared/constants/permissionCatalog";

interface PermissionSelectorProps {
  selectedPermissions: PermissionCode[];
  onChange: (permissions: PermissionCode[]) => void;
  error?: string;
}

function PermissionSelector({
  selectedPermissions,
  onChange,
  error,
}: PermissionSelectorProps) {
  const togglePermission = (code: PermissionCode) => {
    const updated = selectedPermissions.includes(code)
      ? selectedPermissions.filter((item) => item !== code)
      : [...selectedPermissions, code];

    onChange(updated);
  };

  const toggleGroup = (codes: PermissionCode[]) => {
    const allSelected = codes.every((code) =>
      selectedPermissions.includes(code),
    );

    const updated = allSelected
      ? selectedPermissions.filter((code) => !codes.includes(code))
      : [
          ...selectedPermissions,
          ...codes.filter((code) => !selectedPermissions.includes(code)),
        ];

    onChange(updated);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">
            Assign Permissions
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Select the permissions assigned to this role.
          </p>
        </div>

        <span className="rounded-full bg-violet-50 px-3 py-1.5 text-xs font-semibold text-violet-700">
          {selectedPermissions.length} Selected
        </span>
      </div>

      {PERMISSION_GROUPS.map((group) => {
        const codes = group.permissions.map((permission) => permission.code);

        const allSelected = codes.every((code) =>
          selectedPermissions.includes(code),
        );

        return (
          <div
            key={group.title}
            className="overflow-hidden rounded-xl border border-slate-200"
          >
            <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-5 py-4">
              <h4 className="font-semibold text-slate-700">{group.title}</h4>

              <button
                type="button"
                onClick={() => toggleGroup(codes)}
                className="text-sm font-semibold text-violet-600 hover:text-violet-800"
              >
                {allSelected ? "Deselect All" : "Select All"}
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3 p-5 sm:grid-cols-2 lg:grid-cols-3">
              {group.permissions.map((permission) => {
                const checked = selectedPermissions.includes(permission.code);

                return (
                  <label
                    key={permission.code}
                    className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => togglePermission(permission.code)}
                      className="sr-only"
                    />

                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded border ${
                        checked
                          ? "border-violet-600 bg-violet-600 text-white"
                          : "border-slate-300 bg-white"
                      }`}
                    >
                      {checked && <Check size={13} />}
                    </span>

                    <span className="text-sm text-slate-700">
                      {permission.label}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
        );
      })}

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}
    </div>
  );
}

export default PermissionSelector;
