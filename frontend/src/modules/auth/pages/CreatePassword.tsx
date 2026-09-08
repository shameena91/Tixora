import { Link, useLocation, useNavigate } from "react-router-dom";

import Navbar from "../../../components/home/navbar";
import AuthSidebar from "../components/AuthSidebar";
import PasswordForm from "../components/PasswordForm";
import { createPassword } from "../services/authService";
import toast from "react-hot-toast";

const CreatePassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  return (
    <div className="min-h-screen bg-[#faf7ff]">
      {/* Navbar */}
      <Navbar showRegister={false} />

      <div className="flex min-h-screen pt-16">
        {/* Sidebar */}
        <AuthSidebar />

        {/* Main Content */}
        <main className="flex flex-1 justify-center px-6 py-10">
          <div className="w-full max-w-2xl rounded-2xl border border-purple-200 bg-white p-8 shadow-sm md:p-10">

            {/* Step */}
            {/* <span className="inline-block rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold text-[#4b1591]">
              STEP 3 OF 6
            </span> */}

            {/* Heading */}
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#18134b] md:text-4xl">
              Create Your Password
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Create a strong password to secure your TicketPro
              account and protect your organization.
            </p>

            {/* Password Form */}
            {email && (
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
        </main>
      </div>
    </div>
  );
};

export default CreatePassword;