import { useNavigate } from "react-router-dom";

import AuthSidebar from "../components/AuthSidebar";

import EmailVerificationForm from "../components/EmailVerificationForm";

import { sendVerificationOtp } from "../services/authService";
import Navbar from "../../../components/home/Navbar";

const EmailVerification = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Navbar showRegister={false}/>

      <div className="flex min-h-[calc(100vh-72px)]">
        <AuthSidebar />

        <div className="flex flex-1 items-center justify-center px-6 py-10">
          <div className="w-full max-w-md">
            {/* Step */}
            {/* <p className="text-sm font-semibold text-[#5420a8]">
              STEP 1 OF 6
            </p> */}

            {/* Heading */}
            <h1 className="mt-3 text-3xl font-bold text-slate-900">
              Verify Company Email
            </h1>

            {/* Description */}
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Enter your company email address. We will send a verification
              code to confirm your email.
            </p>

            {/* Information box */}
            <div className="mt-6 rounded-lg border border-purple-100 bg-purple-50 p-4">
              <p className="text-sm leading-6 text-slate-600">
                Please use your official company email address. This email
                will be used for your company registration.
              </p>
            </div>

            {/* Reusable Email Form */}
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

            {/* Login link */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;