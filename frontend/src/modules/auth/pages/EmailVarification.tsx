import { useNavigate } from "react-router-dom";

import EmailVerificationForm from "../components/EmailVerificationForm";
import { sendVerificationOtp } from "../services/authService";
import RegistrationLayout from "../components/RegistrationLayout";


const EmailVerification = () => {
  const navigate = useNavigate();

  return (
    <RegistrationLayout currentStep={1}>
      {/* Heading */}
      <h1 className="text-3xl font-bold text-slate-900">
        Verify Company Email
      </h1>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-slate-500">
        Enter your company email address. We will send a verification
        code to confirm your email.
      </p>

      {/* Information Box */}
      <div className="mt-6 rounded-lg border border-purple-100 bg-purple-50 p-4">
        <p className="text-sm leading-6 text-slate-600">
          Please use your official company email address. This email
          will be used for your company registration.
        </p>
      </div>

      {/* Email Verification Form */}
      <EmailVerificationForm
        purpose="registration"
        sendOtp={(email) => sendVerificationOtp({ email })}
        onSuccess={(email, purpose) => {
          navigate("/register/otp", {
            state: {
              email,
              purpose,
            },
          });
        }}
      />

      {/* Login Link */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <button
          type="button"
          onClick={() => navigate("/login")}
          className="font-semibold text-[#5420a8] hover:underline"
        >
          Login
        </button>
      </p>
    </RegistrationLayout>
  );
};

export default EmailVerification;