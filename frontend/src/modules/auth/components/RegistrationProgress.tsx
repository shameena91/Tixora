interface RegistrationProgressProps {
  currentStep: number;
}

const steps = [
  "Email",
  "OTP",
  "Password",
  "Admin Details",
  "Company Details",
  "Location",
  "Documents",
  "Review",
];

const RegistrationProgress = ({
  currentStep,
}: RegistrationProgressProps) => {
  return (
    <div className="w-full">

      {/* Mobile Step Count */}
      <div className="mb-4 text-center sm:hidden">
        <p className="text-sm font-medium text-slate-600">
          Step {currentStep} of {steps.length}
        </p>

        <p className="mt-1 text-sm font-semibold text-indigo-600">
          {steps[currentStep - 1]}
        </p>
      </div>

      {/* Desktop / Tablet Progress */}
      <div className="hidden items-start justify-center sm:flex">

        {steps.map((step, index) => {
          const stepNumber = index + 1;

          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div
              key={step}
              className="flex items-start"
            >

              {/* Step */}
              <div className="flex w-16 flex-col items-center lg:w-24">

                {/* Circle */}
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full border-2 text-xs font-semibold transition-all ${
                    isCompleted
                      ? "border-indigo-600 bg-indigo-600 text-white"
                      : isCurrent
                        ? "border-indigo-600 bg-white text-indigo-600 ring-4 ring-indigo-50"
                        : "border-slate-300 bg-white text-slate-400"
                  }`}
                >
                  {isCompleted ? "✓" : stepNumber}
                </div>

                {/* Label */}
                <span
                  className={`mt-2 text-center text-xs font-medium leading-4 ${
                    isCompleted || isCurrent
                      ? "text-indigo-600"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </span>

              </div>

              {/* Connector */}
              {stepNumber < steps.length && (
                <div
                  className={`mt-[18px] h-[2px] w-5 sm:w-8 lg:w-10 ${
                    stepNumber < currentStep
                      ? "bg-indigo-600"
                      : "bg-slate-200"
                  }`}
                />
              )}

            </div>
          );
        })}

      </div>

    </div>
  );
};

export default RegistrationProgress;