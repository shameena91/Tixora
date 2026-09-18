
const AuthSidebar = () => {
  return (
    <aside className=" max-auto flex h-full w-[280px] flex-col bg-gradient-to-b from-[#32106f] to-[#25075b] px-7 py-10 text-white">
      {/* Logo */}
      {/* <div className="flex justify-center">
        <img
          src={logo2}
          alt="Tixora logo"
          className="h-16 w-20 object-contain rounded-lg bg-white"
        />
      </div> */}

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
        <div className="text-2xl">✉</div>

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
