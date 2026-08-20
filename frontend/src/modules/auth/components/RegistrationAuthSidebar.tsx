

interface AuthSidebarProps {
  currentStep: number;
}

const RegistrationAuthSidebar = ({ currentStep }: AuthSidebarProps) => {
  const steps = [
    "Admin Registration",
    "Company Information",
    "Verification",
    "Review",
    "Complete",
  ];

  return (
    <aside className="hidden min-h-screen w-75 flex-col bg-[#24113F] px-8 py-10 text-white lg:flex">
      
      {/* Logo */}
      <div className="mb-16">
        <h1 className="text-3xl font-bold tracking-wide">
          TIXORA
        </h1>

        <p className="mt-2 text-sm text-purple-200">
          Ticket Management System
        </p>
      </div>

      {/* Registration Steps */}
      <div>
        <p className="mb-7 text-xs font-semibold uppercase tracking-[0.2em] text-purple-300">
          Registration
        </p>

        <div className="space-y-7">
          {steps.map((step, index) => {
            const stepNumber = index + 1;

            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;

            return (
              <div
                key={step}
                className="flex items-center gap-4"
              >
                {/* Step Circle */}
                <div
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold transition ${
                    isActive
                      ? "bg-white text-[#24113F]"
                      : isCompleted
                      ? "bg-[#6D3CC9] text-white"
                      : "border border-purple-400/40 text-purple-300"
                  }`}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>

                {/* Step Name */}
                <span
                  className={`text-sm transition ${
                    isActive
                      ? "font-semibold text-white"
                      : isCompleted
                      ? "text-purple-100"
                      : "text-purple-200/60"
                  }`}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Information */}
      <div className="mt-auto">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs leading-5 text-purple-200">
            Complete the registration process to get started with Tixora.
          </p>
        </div>
      </div>

    </aside>
  );
};

export default RegistrationAuthSidebar;