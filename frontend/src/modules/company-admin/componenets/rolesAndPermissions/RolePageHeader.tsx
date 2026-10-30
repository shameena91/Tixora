import { Plus } from "lucide-react";

interface RolePageHeaderProps {
  onCreate: () => void;
}

function RolePageHeader({ onCreate }: RolePageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-slate-800">
          Roles & Permissions
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage roles and access permissions for your company.
        </p>
      </div>

      <button
        type="button"
        onClick={onCreate}
        className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#7C3AED] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
      >
        <Plus size={18} />
        Create Role
      </button>
    </div>
  );
}

export default RolePageHeader;
