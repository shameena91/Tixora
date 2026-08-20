import { Link } from "react-router-dom";
import dashbordpreview from"../../assets/dashbordpreview.png"

const Hero = () => {
  return (
    <section className="overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-20">

        {/* Left Content */}
        <div>
          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700">
            <span>✦</span>
            AI-Powered Ticket Management System
          </div>

          {/* Heading */}
          <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">
            Smarter Tickets.
            <span className="block text-indigo-700">
              Faster
            </span>
            <span className="block text-indigo-700">
              Resolutions.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-xl text-base leading-7 text-slate-500">
            Tixora uses AI to analyze, assign, and resolve IT tickets
            intelligently. Save time, improve productivity, and deliver
            exceptional support.
          </p>

          {/* Button */}
          <Link
            to="/register"
            className="mt-7 inline-flex rounded-lg bg-indigo-700 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-800"
          >
            Get Started
          </Link>
        </div>

        {/* Right Dashboard Preview */}
        <div className="relative">
          <div className="absolute -inset-6 rounded-full bg-indigo-100/40 blur-3xl" />

          <div className="relative flex min-h-[350px] items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-xl">
             <img
              src={dashbordpreview}
              alt="Tixora dashboard preview"
              className="w-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;