import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";


import AuthSidebar from "../components/AuthSidebar";
import Navbar from "../../../components/home/navbar";

import {
  sendVerificationOtp,
  verifyOtp,
} from "../services/authService";
import toast from "react-hot-toast";


const OtpVerification = () => {
  const [otp, setOtp] = useState("");
  // const [resendMessage, setResendMessage] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
const [otpError, setOtpError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
console.log("OTP PAGE LOCATION STATE:", location.state);
console.log("OTP PAGE EMAIL:", email);
  // Resend OTP timer
  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // Verify OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !otp) {
      return;
    }

    try {
        const response = await verifyOtp({
      email,
      otp,
      });

      console.log("Backend response:", response);;

      navigate("/register/create-password",{
        state:{
          email
        }
      });
    } catch (error) {
      console.error("OTP verification failed:", error);

      if(error instanceof Error){
toast.error(error.message)
      }

    setOtpError(
      error instanceof Error
        ? error.message
        : "Invalid OTP"
    );
    }
  };

  // Resend OTP
const handleResendOtp = async () => {
  console.log("RESEND BUTTON CLICKED");

  if (!email) {
    console.log("EMAIL NOT FOUND");
    return;
  }

  if (resendTimer > 0) {
    console.log("TIMER ACTIVE:", resendTimer);
    return;
  }

  try {
    console.log("SENDING RESEND OTP...");

    const response = await sendVerificationOtp({
      email,
    });

    console.log("RESEND RESPONSE:", response);
toast.success("OTP resent successfully")
    // setResendMessage("OTP resent successfully");
    setResendTimer(20);
  } catch (error) {
    console.error("RESEND OTP ERROR:", error);
    if(error instanceof Error)
    {
toast.error(error.message)
    }
    
  }
};

  return (
    <div className="min-h-screen bg-white">

      {/* Reusable Home Navbar */}
      <Navbar showRegister={false} />

     <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-8 px-5 lg:px-8">
        {/* Reusable Auth Sidebar */}
        <AuthSidebar />

        {/* Auth Sidebar */}
       

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">

            {/* Step */}
            <span className="inline-block rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold text-[#4b1591]">
              STEP 2 OF 6
            </span>

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#18134b]">
              Verify OTP
            </h1>

            {/* Description */}
            <p className="mt-4 text-base leading-7 text-slate-600">
              We’ve sent a 6-digit verification code to your
              company email address.
            </p>

            {/* Email */}
            <p className="mt-2 text-sm font-semibold text-[#4b1591]">
              {email}
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-10">

              {/* OTP Label */}
              <label
                htmlFor="otp"
                className="block text-sm font-semibold text-slate-700"
              >
                Enter Verification Code
              </label>

              {/* OTP Input */}
              <input
                id="otp"
                type="text"
                inputMode="numeric"
                value={otp}
                onChange={(e) => {
                  setOtp(e.target.value.replace(/\D/g, ""));
                 setOtpError("");
                }}
                
                maxLength={6}
                placeholder="Enter 6-digit OTP"
                required
className={`mt-3 w-full rounded-xl border bg-white px-4 py-4 text-center text-lg tracking-[0.5em] outline-none transition ${
    otpError
      ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
      : "border-slate-300 focus:border-[#4b1591] focus:ring-2 focus:ring-purple-100"
  }`}              />

              {/* Info */}
              <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50 p-4">
                <p className="text-sm leading-6 text-slate-600">
                  Enter the verification code sent to your
                  company email address. The code is valid for a
                  limited time.
                </p>
              </div>

              {/* Verify Button */}
              <button
                type="submit"
                className="mt-6 w-full rounded-xl bg-[#4b1591] px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-[#3d0f78]"
              >
               
                Verify OTP →
               
              </button>

            </form>

            {/* Resend */}
            <p className="mt-6 text-center text-sm text-slate-500">
              Didn’t receive the code?{" "}

              <button
                type="button"
                onClick={handleResendOtp}
                disabled={resendTimer > 0}
                className={`font-semibold ${
                  resendTimer > 0
                    ? "cursor-not-allowed text-slate-400"
                    : "text-[#4b1591] hover:underline"
                }`}
              >
                {resendTimer > 0
                  ? `Resend OTP in ${resendTimer}s`
                  : "Resend OTP"}
              </button>
            </p>

            {/* Resend Message */}
            {/* {resendMessage && (
              <p
                className={`mt-3 text-center text-sm ${
                  resendMessage === "OTP resent successfully"
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {resendMessage}
              </p>
              
            )} */}

            {/* Change Email */}
            <p className="mt-4 text-center text-sm text-slate-500">
              Wrong email?{" "}

              <Link
                to="/register/email"
                className="font-semibold text-[#4b1591] hover:underline"
              >
                Change email
              </Link>
            </p>

          </div>

        </main>
      </div>
    </div>
  );
};

export default OtpVerification;