import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthSidebar from"../components/AuthSidebar"

import Navbar from "../../../components/home/navbar";
import { sendVerificationOtp } from "../services/authService";
import toast from "react-hot-toast";

const EmailVerification = () => {
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    await sendVerificationOtp({
      email,
    });
  toast.success("OTP sent successfully");
 

    navigate("/register/otp", {
      state: {
        email: email,
      },
    });
  } catch (error) {
    console.error("Failed to send OTP:", error);
     if (error instanceof Error) {
 
    toast.error(error.message);
  }
  }
};
  return (
    <div className="min-h-screen bg-[#faf7ff]">

      {/* Reusable Home Navbar */}
      <Navbar showRegister={false}/>

<div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-8 px-5 lg:px-8">
        {/* Reusable Auth Sidebar */}
        <AuthSidebar />

        {/* Main Content */}

  <main className="flex flex-1 items-center justify-center">          <div className="w-full max-w-2xl">

            {/* Step */}
            <span className="inline-block rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold text-[#4b1591]">
              STEP 1 OF 6
            </span>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#18134b]">
              Verify Company Email
            </h1>

            <p className="mt-4 text-base leading-7 text-slate-600">
              Enter your company email address. We'll send you a
              6-digit verification code to confirm your identity
              and link your organization.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-10">

              <label
                htmlFor="email"
                className="block text-sm font-semibold text-slate-700"
              >
                Company Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. name@company.com"
                required
                className="mt-3 w-full rounded-xl border border-slate-300 bg-white px-4 py-4 text-sm outline-none transition focus:border-[#4b1591] focus:ring-2 focus:ring-purple-100"
              />
 
              {/* Info */}
              <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  Please use your official company email address.
                  We'll use this email to verify your organization.
                </p>

              </div>
   
              {/* Button */}
              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-[#4b1591] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-[#3d0f78]"
              >
                Send Verification Code →
              </button>

            </form>

            {/* Login */}
            <p className="mt-8 text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-[#4b1591] hover:underline"
              >
                Log in
              </Link>
            </p>

          </div>
        </main>

      </div>
    </div>
  );
};

export default EmailVerification;