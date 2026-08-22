
import { ArrowLeft, Mail, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Forgot password email:", email);

    // OTP API will be connected here later.
    navigate("/forgot-password/verify-otp");
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="flex h-20 items-center border-b border-slate-200 bg-white px-6 lg:px-12">

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5420a8]">
            <Ticket
              size={20}
              className="text-white"
              fill="white"
            />
          </div>

          <span className="text-xl font-bold text-slate-900">
            Tixora
          </span>
        </div>

      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10">

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

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="mt-7"
            >

              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                autoComplete="email"
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5420a8] focus:ring-2 focus:ring-[#5420a8]/10"
              />

              {/* Send OTP */}
              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-[#5420a8] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-[#481a91] active:scale-[0.99]"
              >
                Send Verification Code
              </button>

            </form>

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
  );
};

export default ForgotPassword;

