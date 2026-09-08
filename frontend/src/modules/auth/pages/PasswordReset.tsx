import { Lock } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PasswordForm from "../components/PasswordForm";
import { resetPassword } from "../services/authService";
import Navbar from "../../../components/home/Navbar";
import AuthSidebar from "../components/AuthSidebar";

const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const handleSuccess = () => {
    toast.success("Password reset successfully");
    navigate("/login");
  };

 return (
  <div className="min-h-screen bg-slate-50">
    <Navbar showRegister={false} showLogin={false} />

    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <AuthSidebar />

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-5 py-10">
        <div className="w-full max-w-md">

          {/* Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            {/* Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#f1ecf8]">
              <Lock
                size={25}
                className="text-[#5420a8]"
              />
            </div>

            {/* Heading */}
            <h1 className="text-2xl font-bold text-slate-900">
              Reset your password
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Create a new password for your Tixora account.
            </p>

            {email && (
              <p className="mt-3 text-sm font-semibold text-[#5420a8]">
                {email}
              </p>
            )}

            {/* Password Form */}
            {email ? (
              <PasswordForm
                submitPassword={async (
                  password,
                  confirmPassword
                ) => {
                  return resetPassword({
                    email,
                    password,
                    confirmPassword,
                  });
                }}
                buttonText="Reset Password"
                loadingText="Resetting..."
                onSuccess={handleSuccess}
              />
            ) : (
              <div className="mt-6">
                <p className="text-sm text-red-500">
                  Email not found. Please restart the
                  password reset process.
                </p>

                <button
                  type="button"
                  onClick={() => navigate("/forgot-password")}
                  className="mt-4 text-sm font-semibold text-[#5420a8] hover:underline"
                >
                  Go back
                </button>
              </div>
            )}

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

export default ResetPassword;