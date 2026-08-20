const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Raise a Ticket",
      description:
        "Employees can quickly create a support ticket with the required details.",
    },
    {
      number: "02",
      title: "AI Analyzes & Assigns",
      description:
        "Tixora intelligently identifies the department, category, and priority.",
    },
    {
      number: "03",
      title: "Resolve & Track",
      description:
        "Support teams resolve tickets efficiently while users track their progress.",
    },
  ];

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold text-indigo-600">
            HOW IT WORKS
          </p>

          <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Simple. Smart. Efficient.
          </h2>

          <p className="mt-4 text-slate-500">
            Manage your support workflow from ticket creation to resolution
            with an intelligent and streamlined process.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              <span className="text-sm font-bold text-indigo-600">
                {step.number}
              </span>

              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                {step.title}
              </h3>

              <p className="mt-3 leading-6 text-slate-500">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;