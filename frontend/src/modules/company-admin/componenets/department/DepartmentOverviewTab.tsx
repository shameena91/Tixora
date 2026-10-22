
interface DepartmentOverviewTabProps {
  department: {
    name: string;
    code: string;
    managerId: string | null;
    status: string;
    description: string | null;
    createdAt?: string | Date | null;
    updatedAt?: string | Date | null;
  };
}

const formatDate = (value?: string | Date | null) => {
  if (!value) return "—";

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime())
    ? "—"
    : date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const DepartmentOverviewTab = ({
  department,
}: DepartmentOverviewTabProps) => {
  return (
    <section className="mt-5 rounded-2xl border border-gray-200 bg-white p-6">
      <h2 className="text-lg font-semibold text-gray-900">
        General Information
      </h2>

      <p className="mt-1 text-sm text-gray-500">
        Basic information about this department.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm text-gray-500">Department Name</p>
          <p className="mt-1 font-medium text-gray-900">
            {department.name}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Department Code</p>
          <p className="mt-1 font-medium text-gray-900">
            {department.code}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Manager</p>
          <p className="mt-1 font-medium text-gray-900">
            {department.managerId || "Not assigned"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Status</p>
          <p className="mt-1 font-medium text-gray-900">
            {department.status}
          </p>
        </div>

        <div className="sm:col-span-2">
          <p className="text-sm text-gray-500">Description</p>
          <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-gray-700">
            {department.description || "No description provided"}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Created At</p>
          <p className="mt-1 font-medium text-gray-900">
            {formatDate(department.createdAt)}
          </p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Last Updated</p>
          <p className="mt-1 font-medium text-gray-900">
            {formatDate(department.updatedAt)}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DepartmentOverviewTab;
