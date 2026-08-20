const Features = () => {
  const features = [
    {
      icon: "✦",
      title: "AI Ticket Intelligence",
      description:
        "AI analyzes ticket subject and description to detect the right department, category, and priority automatically.",
    },
    {
      icon: "▣",
      title: "Smart Auto Assignment",
      description:
        "Assigns tickets to the best available employees based on workload. Balanced, fair, and efficient.",
    },
    {
      icon: "◷",
      title: "SLA & Escalation",
      description:
        "Tracks SLA deadlines and automatically escalates overdue tickets to the Department Admin.",
    },
    {
      icon: "♙",
      title: "Role-Based Access",
      description:
        "Secure access control for Super Admin, Company Admin, and Employees with fine-grained permissions.",
    },
  ];

  return (
    <section
      id="features"
      className="bg-[#0d162b] py-20 text-white"
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Powerful Features for Modern IT Teams
          </h2>

          <p className="mt-3 text-sm text-slate-400">
            Everything you need to manage tickets efficiently
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-xl border border-slate-700/70 bg-[#182238] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl"
            >
              {/* Icon */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-900/60 text-lg text-indigo-400">
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="mt-6 text-base font-semibold text-white">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-4 text-sm leading-6 text-slate-400">
                {feature.description}
              </p>

            
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;