import {
  CheckCircle2,
  Info,
  Lock,
} from "lucide-react";

const AboutThisPage = () => {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Info className="h-5 w-5 text-blue-600" />

        <h3 className="text-base font-semibold text-slate-900">
          About This Page
        </h3>
      </div>

      {/* Content */}
      <div className="mt-5 space-y-5">

        {/* Editable */}
        <div className="flex gap-3">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />

          <div>
            <h4 className="text-sm font-semibold text-slate-800">
              Editable Directly
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Some company information can be updated
              directly by the Company Admin.
            </p>
          </div>
        </div>

        {/* Approval */}
        <div className="flex gap-3">
          <Lock className="mt-0.5 h-5 w-5 shrink-0 text-amber-500" />

          <div>
            <h4 className="text-sm font-semibold text-slate-800">
              Approval Required
            </h4>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Certain company information requires
              Super Admin approval before it can be changed.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutThisPage;