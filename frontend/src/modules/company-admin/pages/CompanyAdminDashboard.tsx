const CompanyAdminDashboard = () => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-900">
        Dashboard
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        Welcome to your company dashboard.
      </p>

      {/* Company Information */}
      <div className="mt-6">
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-900">
            Company Information
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            View your company's information and submitted details.
          </p>

          <a
            href="/company-information"
            className="mt-4 inline-flex rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
          >
            View Company Information
          </a>
        </div>
      </div>
    </div>
  );
};

export default CompanyAdminDashboard;