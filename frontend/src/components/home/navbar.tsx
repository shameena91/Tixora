import { Link } from "react-router-dom";

const Navbar = ({showRegister=true}:{showRegister?:boolean}) => {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            ✦
          </div>

          <span className="text-lg font-bold tracking-tight">
            Tixora
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <Link
            to="/"
            className="transition hover:text-indigo-600"
          >
            Home
          </Link>

          <a
            href="#features"
            className="transition hover:text-indigo-600"
          >
            Features
          </a>

          <a
            href="#pricing"
            className="transition hover:text-indigo-600"
          >
            Pricing
          </a>

          <a
            href="#about"
            className="transition hover:text-indigo-600"
          >
            About
          </a>

          <a
            href="#contact"
            className="transition hover:text-indigo-600"
          >
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-slate-50"
          >
            Login
          </Link>

         {showRegister && (
  <Link to="/register/email"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-white transition bg-indigo-600 hover:bg-indigo-700"

  >
    Register Company
  </Link>
)}
        </div>

      </nav>
    </header>
  );
};

export default Navbar;