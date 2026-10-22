
const DepartmentEmployeesTab = () => {
  return (
    <section className="mt-5 rounded-2xl border border-gray-200 bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.7}
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"
          />
        </svg>
      </div>

      <h2 className="mt-4 font-semibold text-gray-900">
        Department Employees
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm text-gray-500">
        Employees belonging to this department will appear here.
      </p>
    </section>
  );
};

export default DepartmentEmployeesTab;

