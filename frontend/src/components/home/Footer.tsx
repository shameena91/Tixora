const Footer = () => {
  return (
    <footer className="bg-[#0d162b] text-white">
      <div className="mx-auto max-w-7xl px-5 py-14 lg:px-8">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm">
                ✦
              </div>

              <span className="text-lg font-bold">
                Tixora
              </span>
            </div>

            <p className="mt-5 max-w-xs text-sm leading-6 text-slate-400">
              AI-powered IT ticket management system that helps you deliver
              exceptional support.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold">
              Product
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#features" className="hover:text-white">
                  Features
                </a>
              </li>

              <li>
                <a href="#pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>

              <li>
                <a href="#about" className="hover:text-white">
                  About
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold">
              Resources
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  FAQs
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white">
                  Support
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li>
                <a href="#about" className="hover:text-white">
                  About Us
                </a>
              </li>

              <li>
                <a href="#contact" className="hover:text-white">
                  Contact Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-5 border-t border-slate-700 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-500">
            © 2026 Tixora. All rights reserved.
          </p>

          <div className="flex gap-5 text-sm text-slate-400">
            <a href="#" className="hover:text-white">
              𝕏
            </a>

            <a href="#" className="hover:text-white">
              in
            </a>

            <a href="#" className="hover:text-white">
              ◎
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;