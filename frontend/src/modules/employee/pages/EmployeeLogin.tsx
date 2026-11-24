
import logo3 from "../../../assets/logo2.png";

import {
  Ticket,
  ShieldCheck,
  Headphones,
  Users,
  Layers,
  CheckCircle2,
  Clock3,
  Sparkles,
  Zap,
  MessageCircle,
  LockKeyhole,
} from "lucide-react";


import { login } from "../../auth/services/authService";
import EmployeeLoginForm from "../componenets/EmployeeLoginForm";
import { useEmployeeAuth } from "../hooks/useEmployeeAuth";
import { Navigate } from "react-router-dom";

interface EmployeeLoginProps {
  onForgotPassword?: () => void;
}

const EmployeeLogin = ({
  onForgotPassword,
}: EmployeeLoginProps) => {
 const { accessToken, isInitializing } = useEmployeeAuth();

  if (isInitializing) {
    return <div>Loading...</div>;
  }

  if (accessToken) {
    return <Navigate to="/employee/dashboard" replace />;
  }
 
const handleLogin = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await login(
    credentials.email,
    credentials.password
  );
console.log('responseeeeee',response.data)
  return response.data;
};
  return (
    <div className="min-h-screen bg-[#F7FDFB] lg:grid lg:grid-cols-2">

      {/* LEFT SECTION - LOGIN */}
      <section className="relative flex min-h-screen flex-col overflow-hidden px-6 py-7 sm:px-12 lg:px-14 xl:px-24">

        {/* Background Decoration */}
        <div className="pointer-events-none absolute -left-32 top-40 h-72 w-72 rounded-full bg-[#B4E8DA]/20 blur-3xl" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative z-10 flex items-center">
            <div className="flex h-16 w-24 items-center justify-center transition duration-300 hover:scale-105">
              <img
                src={logo3}
                alt="Tixora Logo"
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        <div className="relative mx-auto mt-12 hidden h-20 w-full max-w-md sm:block">

          <div className="absolute left-[12%] top-2 flex h-12 w-12 animate-bounce items-center justify-center rounded-2xl border border-[#DCEFE4] bg-white text-[#11A675] shadow-md [animation-duration:4s]">
            <Layers size={22} />
          </div>

          <div className="absolute left-[44%] top-0 flex h-12 w-12 animate-pulse items-center justify-center rounded-2xl border border-[#F4E7AC] bg-white text-[#D0A900] shadow-md">
            <Headphones size={22} />
          </div>

          <div className="absolute right-[12%] top-3 flex h-12 w-12 animate-bounce items-center justify-center rounded-2xl border border-[#E9E2FA] bg-white text-[#9185CA] shadow-md [animation-duration:5s]">
            <Users size={22} />
          </div>
        </div>

        {/* Form Content */}
        <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-10">

          <div className="mb-8">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#DCEFE4] bg-white px-3.5 py-2 text-xs font-semibold text-[#0E966B] shadow-sm">
              <Sparkles size={14} />
              Your workspace starts here
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-[#183B36] sm:text-4xl">
              Welcome Back
              <span className="ml-2 inline-block animate-bounce [animation-duration:2s]">
                👋
              </span>
            </h2>

            <p className="mt-3 max-w-sm text-sm leading-7 text-[#789087]">
              Sign in to your Tixora employee workspace and
              stay connected with your team.
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border border-[#E5F0E9] bg-white p-6 shadow-[0_15px_50px_-20px_rgba(17,166,117,0.16)] sm:p-8">

            {/* Employee Login Form Component */}
            <EmployeeLoginForm
              onSubmit={handleLogin}
              onForgotPassword={onForgotPassword}
             
            />

            {/* Security Note */}
            <div className="mt-6 flex items-center justify-center gap-2 border-t border-[#EDF3EF] pt-5 text-xs text-[#91A69C]">
              <ShieldCheck size={16} className="text-[#11A675]" />
              Secure access to your workspace
            </div>
          </div>

          <div className="mt-7 flex items-center justify-center gap-2 text-xs text-[#91A69C]">
            <LockKeyhole size={13} />
            Protected employee authentication
          </div>
        </div>

        {/* Footer */}
        <p className="relative z-10 pt-5 text-center text-xs text-[#A2B5AB]">
          © {new Date().getFullYear()} Tixora. All rights reserved.
        </p>
      </section>

      {/* RIGHT SECTION - BRANDING PANEL */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#EAF5EE] p-10 lg:flex lg:flex-col xl:p-14">

        {/* Background Decorations */}
        <div className="pointer-events-none absolute -right-40 -top-32 h-[500px] w-[500px] rounded-full bg-[#B4E8DA]/50 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-40 -left-40 h-[450px] w-[450px] rounded-full bg-[#B5EDDB]/50 blur-3xl" />

        <div className="pointer-events-none absolute right-12 top-20 h-20 w-20 rounded-full border border-[#11A675]/10" />

        <div className="pointer-events-none absolute bottom-32 right-20 h-32 w-32 rounded-full border border-[#11A675]/10" />

        <div className="relative z-10 mx-auto flex w-full max-w-xl flex-1 flex-col justify-center">

          {/* Brand Message */}
          <div className="mb-9">

            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#CFE8D8] bg-white/70 px-3.5 py-2 text-xs font-bold text-[#0E966B] shadow-sm">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#11A675]" />
              TIXORA EMPLOYEE WORKSPACE
            </div>

            <h2 className="max-w-lg text-3xl font-extrabold leading-tight tracking-tight text-[#183B36] xl:text-4xl">
              Work smarter.
              <br />

              <span className="text-[#11A675]">
                Support better.
              </span>

              <br />
              Grow together.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#709386]">
              Everything your team needs to manage tickets,
              collaborate effortlessly, and deliver better
              customer experiences.
            </p>
          </div>

          {/* Dashboard Preview */}
          <div className="rounded-3xl border border-white bg-white/90 p-5 shadow-[0_25px_70px_-25px_rgba(24,59,54,0.20)] backdrop-blur-xl sm:p-7">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <p className="text-[10px] font-bold tracking-[2px] text-[#91A69C]">
                  EMPLOYEE DASHBOARD
                </p>

                <h3 className="mt-1 text-xl font-bold text-[#183B36]">
                  Your Workspace
                </h3>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EAF5EE] text-[#11A675]">
                <Ticket size={23} />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">

              <div className="rounded-2xl bg-[#EAF5EE] p-3.5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#11A675]">
                  <Ticket size={16} />
                </div>

                <p className="text-[11px] font-medium text-[#709386]">
                  My Tickets
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#183B36]">
                  24
                </p>
              </div>

              <div className="rounded-2xl bg-[#FFF8DE] p-3.5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#D0A900]">
                  <Clock3 size={16} />
                </div>

                <p className="text-[11px] font-medium text-[#92865B]">
                  Pending
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#8A7110]">
                  08
                </p>
              </div>

              <div className="rounded-2xl bg-[#F0ECFA] p-3.5">
                <div className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#9185CA]">
                  <CheckCircle2 size={16} />
                </div>

                <p className="text-[11px] font-medium text-[#8A7FB2]">
                  Resolved
                </p>

                <p className="mt-1 text-2xl font-extrabold text-[#66579E]">
                  16
                </p>
              </div>
            </div>

            {/* Recent Tickets */}
            <div className="mt-7">

              <div className="mb-4 flex items-center justify-between">
                <h4 className="text-sm font-bold text-[#183B36]">
                  Recent Tickets
                </h4>

                <span className="text-xs font-semibold text-[#11A675]">
                  Activity overview
                </span>
              </div>

              <div className="space-y-4">

                {/* Ticket 1 */}
                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0ECFA] text-[#9185CA]">
                      <Layers size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#183B36]">
                        Software Issue
                      </p>

                      <p className="mt-1 text-[10px] text-[#91A69C]">
                        TKT-1024
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#FFF8DE] px-3 py-1.5 text-[10px] font-bold text-[#A18413]">
                    Pending
                  </span>
                </div>

                {/* Ticket 2 */}
                <div className="flex items-center justify-between gap-3">

                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EAF5EE] text-[#11A675]">
                      <Headphones size={18} />
                    </div>

                    <div>
                      <p className="text-xs font-bold text-[#183B36]">
                        Network Problem
                      </p>

                      <p className="mt-1 text-[10px] text-[#91A69C]">
                        TKT-1025
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full bg-[#EAF5EE] px-3 py-1.5 text-[10px] font-bold text-[#0E966B]">
                    Resolved
                  </span>
                </div>

              </div>
            </div>

            {/* Bottom Note */}
            <div className="mt-6 flex items-center gap-2 border-t border-[#EDF3EF] pt-5">

              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EAF5EE] text-[#11A675]">
                <CheckCircle2 size={16} />
              </div>

              <p className="text-xs font-medium text-[#709386]">
                Your team workspace is ready!
              </p>

              <Sparkles size={15} className="ml-auto text-[#EFD03D]" />
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="mt-6 grid grid-cols-3 gap-3">

            <div className="rounded-2xl border border-white bg-white/60 p-3 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white">
              <Zap size={19} className="mx-auto text-[#11A675]" />

              <p className="mt-2 text-[10px] font-bold text-[#365A4D]">
                Smart Workflow
              </p>
            </div>

            <div className="rounded-2xl border border-white bg-white/60 p-3 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white">
              <Users size={19} className="mx-auto text-[#9185CA]" />

              <p className="mt-2 text-[10px] font-bold text-[#365A4D]">
                Team Collaboration
              </p>
            </div>

            <div className="rounded-2xl border border-white bg-white/60 p-3 text-center backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white">
              <MessageCircle size={19} className="mx-auto text-[#DE1860]" />

              <p className="mt-2 text-[10px] font-bold text-[#365A4D]">
                Better Support
              </p>
            </div>

          </div>
        </div>

        {/* Footer */}
        <div className="relative z-10 mt-8 flex items-center justify-between text-xs font-medium text-[#709386]">

          <span>
            One workspace. Better teamwork.
          </span>

          <span className="flex items-center gap-1">
            Made for better support
            <Sparkles size={13} className="text-[#D0A900]" />
          </span>

        </div>
      </section>
    </div>
  );
};

export default EmployeeLogin;
