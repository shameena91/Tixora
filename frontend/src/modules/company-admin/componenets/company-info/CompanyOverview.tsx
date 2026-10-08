const CompanyOverview = () => {
  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div>
        <h2 className="text-lg font-semibold text-slate-900">
          Company Overview
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View your registered company information.
        </p>
      </div>

      {/* Company Information */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Company Name */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Company Name
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            Tixora Technologies
          </p>
        </div>

        {/* Registration Number */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Registration Number
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            REG-123456
          </p>
        </div>

        {/* Company Type */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Company Type
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            Private Limited
          </p>
        </div>

        {/* Email */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Email
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            company@example.com
          </p>
        </div>

        {/* Phone */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Phone
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            +91 98765 43210
          </p>
        </div>

        {/* Website */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Website
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            www.example.com
          </p>
        </div>

        {/* Year Established */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Year Established
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            2020
          </p>
        </div>

        {/* Number of Employees */}
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
            Number of Employees
          </p>

          <p className="mt-1 text-sm font-medium text-slate-900">
            51 - 200
          </p>
        </div>
      </div>

      {/* Location */}
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Company Location
        </h3>

        <div className="mt-4 grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Address
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              Company address
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              City
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              Thiruvananthapuram
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              State
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              Kerala
            </p>
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
              Country
            </p>

            <p className="mt-1 text-sm font-medium text-slate-900">
              India
            </p>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-sm font-semibold text-slate-900">
          Company Description
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Company description will appear here once the company
          information is loaded from the backend.
        </p>
      </div>
    </div>
  );
};

export default CompanyOverview;