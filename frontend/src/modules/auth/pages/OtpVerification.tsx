import { Link, useLocation, useNavigate } from "react-router-dom";

import OtpVerificationForm from "../components/OtpVerificationForm";

import {
  sendForgotPasswordOtp,
  sendVerificationOtp,
  verifyOtp,
} from "../services/authService";
import RegistrationLayout from "../components/RegistrationLayout";

const OtpVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;
  const purpose = location.state?.purpose;

  console.log("OTP PAGE LOCATION STATE:", location.state);
  console.log("OTP PAGE EMAIL:", email);
  console.log("OTP PAGE PURPOSE:", purpose);

  return (
    <RegistrationLayout currentStep={2}>
      {/* Heading */}
      <h1 className="text-4xl font-bold tracking-tight text-[#18134b]">
        Verify OTP
      </h1>

      {/* Description */}
      <p className="mt-4 text-base leading-7 text-slate-600">
        We’ve sent a 6-digit verification code to your company email
        address.
      </p>

      {/* Email */}
      <p className="mt-2 text-sm font-semibold text-[#4b1591]">
        {email}
      </p>

      {/* OTP Form */}
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
    </RegistrationLayout>
  );
};

export default OtpVerification;