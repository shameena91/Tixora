const Testimonials = () => {
  const testimonials = [
    {
      quote:
        "Tixora reduced our ticket response time by 40%. The AI auto-assignment feature is a game changer!",
      name: "Sarah Johnson",
      role: "IT Manager, TechWave Inc.",
    },
    {
      quote:
        "Finally, a ticket system that is smart, simple, and powerful. Our support team loves it!",
      name: "David Wilson",
      role: "Operations Lead, SoftEdge",
    },
  ];

  return (
    <section className="bg-[#faf7ff] py-20">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">

        {/* Heading */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Trusted by IT Teams Worldwide
          </h2>
        </div>

        {/* Testimonials */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.name}
              className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-1 text-yellow-400">
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
                <span>★</span>
              </div>

              {/* Quote */}
              <p className="mt-5 text-sm italic leading-6 text-slate-600">
                "{testimonial.quote}"
              </p>

              {/* User */}
              <div className="mt-7 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-700">
                  {testimonial.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {testimonial.name}
                  </h3>

                  <p className="text-xs text-slate-500">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;