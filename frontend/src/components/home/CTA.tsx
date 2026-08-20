import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <section className="bg-white px-5 py-8 lg:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-700 to-purple-700 px-6 py-16 text-center text-white sm:px-10">

        {/* Background decoration */}
        <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-white/10" />

        <div className="absolute -bottom-20 -left-16 h-48 w-48 rounded-full bg-white/10" />

        {/* Content */}
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to Transform Your IT Support?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm text-indigo-100 sm:text-base">
            Join Tixora today and experience intelligent ticket management.
          </p>

          <Link
            to="/register"
            className="mt-8 inline-flex rounded-lg bg-white px-7 py-3 text-sm font-semibold text-indigo-700 shadow-lg transition hover:bg-indigo-50"
          >
            Get Started
          </Link>
        </div>

      </div>
    </section>
  );
};

export default CTA;