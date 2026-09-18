import { Link, useLocation, useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import PasswordForm from "../components/PasswordForm";
import { createPassword } from "../services/authService";
import RegistrationLayout from "../components/RegistrationLayout";


const CreatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  return (
    <RegistrationLayout currentStep={3}>
      {/* Card */}
      <div className="rounded-2xl border border-purple-200 bg-white p-8 shadow-sm md:p-10">

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-[#18134b] md:text-4xl">
          Create Your Password
        </h1>

        {/* Description */}
        <p className="mt-3 text-base leading-7 text-slate-600">
          Create a strong password to secure your Tixora account
          and protect your organization.
        </p>

        {/* Password Form */}
        {email ? (
          <PasswordForm
            submitPassword={async (
              password,
              confirmPassword
            ) => {
              return createPassword({
                email,
                password,
                confirmPassword,
              });
            }}
            buttonText="Create Password & Continue"
            loadingText="Creating..."
            onSuccess={() => {
              toast.success("Password created successfully");

              navigate("/register/admin-register", {
                state: {
                  email,
                },
              });
            }}
          />
        ) : (
          <div className="mt-6">
            <p className="text-sm text-red-500">
              Email not found. Please restart the registration process.
            </p>

            <button
              type="button"
              onClick={() => navigate("/register/email")}
              className="mt-4 text-sm font-semibold text-[#5420a8] hover:underline"
            >
              Start Registration Again
            </button>
          </div>
        )}

        {/* Back */}
        <p className="mt-6 text-center text-sm text-slate-500">
          <Link
            to="/register/otp"
            className="font-semibold text-[#4b1591] hover:underline"
          >
            ← Back to Previous Step
          </Link>
        </p>
      </div>
    </RegistrationLayout>
  );
};

export default CreatePassword;