
import { ArrowLeft, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

import EmailVerificationForm from "../components/EmailVerificationForm";
import { sendForgotPasswordOtp } from "../services/authService";
import AuthSidebar from "../components/AuthSidebar";
import Navbar from "../../../components/home/Navbar";


const ForgotPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50">

      <Navbar showRegister={false} showLogin={false} />
 <div className="flex min-h-[calc(100vh-72px)]">

      {/* Sidebar */}
      <AuthSidebar />

      {/* Main */}
   <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">

          {/* Back */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mb-6 flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800"
          >
            <ArrowLeft size={17} />
            Back to Login
          </button>

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            {/* Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#f1ecf8]">
              <Mail
                size={25}
                className="text-[#5420a8]"
              />
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-slate-900">
              Forgot your password?
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Enter the email address associated with your
              Tixora account. We'll send you a verification
              code to reset your password.
            </p>

            {/* Reusable Email Verification Form */}
            <EmailVerificationForm
              purpose="forgot-password"
              sendOtp={(email) =>
                sendForgotPasswordOtp({
                  email,
                  purpose: "forgot-password",
                })
              }
              onSuccess={(email, purpose) => {
                navigate("/forgot-password/verify-otp", {
                  state: {
                    email,
                    purpose,
                  },
                });
              }}
            />

            {/* Login */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Remember your password?
              </p>

              <button
                type="button"
                onClick={() => navigate("/login")}
                className="mt-1 text-sm font-semibold text-[#5420a8] hover:text-[#481a91]"
              >
                Back to Login
              </button>

            </div>

          </div>

        </div>

      </main>
</div>
    </div>
  );
};

export default ForgotPassword;

