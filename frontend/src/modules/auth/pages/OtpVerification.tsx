
import { Link, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../../components/home/navbar";
import AuthSidebar from "../components/AuthSidebar";
import OtpVerificationForm from "../components/OtpVerificationForm";

import {
  sendForgotPasswordOtp,
  sendVerificationOtp,
  verifyOtp,
} from "../services/authService";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const purpose = location.state?.purpose;

  console.log("OTP PAGE LOCATION STATE:", location.state);
  console.log("OTP PAGE EMAIL:", email);
  console.log("OTP PAGE PURPOSE:", purpose);

  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <Navbar showRegister={false} />

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-8 px-5 lg:px-8">

        {/* Sidebar */}
        <AuthSidebar />

        {/* Main Content */}
        <main className="flex flex-1 items-center justify-center px-6 py-12">

          <div className="w-full max-w-md">

            {/* Step */}
            {/* <span className="inline-block rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold text-[#4b1591]">
              STEP 2 OF 6
            </span> */}

            {/* Heading */}
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-[#18134b]">
              Verify OTP
            </h1>

            {/* Description */}
            <p className="mt-4 text-base leading-7 text-slate-600">
              We’ve sent a 6-digit verification code
              to your company email address.
            </p>

            {/* Email */}
            <p className="mt-2 text-sm font-semibold text-[#4b1591]">
              {email}
            </p>

            {/* Reusable OTP Form */}
            {email && (
              <OtpVerificationForm
                email={email}

                verifyOtp={async (otp) => {
                  return verifyOtp({
                    email,
                    otp,
                    purpose,
                  });
                }}

                resendOtp={async () => {
                  if (purpose === "forgot-password") {
                    return sendForgotPasswordOtp({
                      email,
                      purpose: "forgot-password",
                    });
                  }

                  return sendVerificationOtp({
                    email,
                    purpose: "registration",
                  });
                }}

                onSuccess={() => {
                  if (purpose === "forgot-password") {
                    navigate("/forgot-password/reset-password", {
                      state: {
                        email,
                      },
                    });
                  } else {
                    navigate("/register/create-password", {
                      state: {
                        email,
                      },
                    });
                  }
                }}
              />
            )}

            {/* Change Email */}
            <p className="mt-4 text-center text-sm text-slate-500">
              Wrong email?{" "}

             <Link
  to={
    purpose === "forgot-password"
      ? "/forgot-password"
      : "/register/email"
  }
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
