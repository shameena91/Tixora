
import { useSearchParams, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import PasswordForm from "../components/PasswordForm";
import { acceptEmployeeInvitation } from "../services/authService";

const AcceptInvitation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const token = searchParams.get("token");

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#faf8ff] px-4 py-10">
      <div className="w-full max-w-lg rounded-2xl border border-purple-200 bg-white p-8 shadow-sm md:p-10">
        <h1 className="text-3xl font-bold tracking-tight text-[#18134b] md:text-4xl">
          Set Your Password
        </h1>

        <p className="mt-3 text-base leading-7 text-slate-600">
          Create a strong password to activate your Tixora employee account.
        </p>

        {token ? (
          <PasswordForm
            submitPassword={async (password, confirmPassword) => {
              return acceptEmployeeInvitation({
                token,
                password,
                confirmPassword,
              });
            }}
            buttonText="Set Password"
            loadingText="Setting Password..."
            onSuccess={() => {
              toast.success("Password set successfully. Please login.");

              navigate("/employee-login", { replace: true });
            }}
          />
        ) : (
          <div className="mt-6">
            <p className="text-sm text-red-500">
              Invalid invitation link. Invitation token is missing.
            </p>

            <button
              type="button"
              onClick={() => navigate("/login")}
              className="mt-4 text-sm font-semibold text-[#5420a8] hover:underline"
            >
              Go to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcceptInvitation;
