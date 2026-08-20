const AuthSidebar = () => {
  return (
    <aside className="hidden min-h-[calc(100vh-80px)] w-[280px] bg-gradient-to-b from-[#32106f] to-[#25075b] px-7 py-10 text-white lg:block">

      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-[#32106f]">
          ✦
        </div>

        <span className="text-2xl font-bold">
          Tixora
        </span>
      </div>

      {/* Description */}
      <p className="mt-6 text-sm leading-6 text-purple-200">
        Empowering your IT support desk with intelligent automation
        and real-time insights.
      </p>

      {/* Features */}
      <div className="mt-12 space-y-7">

        <div className="flex items-center gap-4">
          <span className="text-lg">⚙</span>

          <span className="text-sm text-purple-100">
            Smart Ticket Management
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-lg">✦</span>

          <span className="text-sm text-purple-100">
            AI-Powered Automation
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-lg">◷</span>

          <span className="text-sm text-purple-100">
            SLA & Escalation Control
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-lg">♢</span>

          <span className="text-sm text-purple-100">
            Role-Based Security
          </span>
        </div>

      </div>

      {/* Bottom Card */}
      <div className="mt-16 rounded-2xl border border-purple-400/30 bg-purple-400/10 p-5">

        <div className="text-2xl">
          ✉
        </div>

        <h3 className="mt-4 font-semibold">
          Automated Flows
        </h3>

        <p className="mt-2 text-sm leading-6 text-purple-200">
          Reduce response times with our smart routing system.
        </p>

      </div>

    </aside>
  );
};

export default AuthSidebar;