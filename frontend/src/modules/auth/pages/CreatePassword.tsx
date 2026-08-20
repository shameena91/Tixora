import { useState,  } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import AuthSidebar from "../components/AuthSidebar";
import Navbar from "../../../components/home/navbar";
import { createPassword } from "../services/authService";

const CreatePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
const location = useLocation();
  const navigate = useNavigate();
const email = location.state?.email;
  const passwordRules = {
    minLength: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const isPasswordValid =
    passwordRules.minLength &&
    passwordRules.uppercase &&
    passwordRules.lowercase &&
    passwordRules.number &&
    passwordRules.special;

  const passwordsMatch =
    password.length > 0 &&
    password === confirmPassword;

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
if (!email) {
  console.error("EMAIL NOT FOUND IN CREATE PASSWORD PAGE");
  return;
}

console.log("CREATE PASSWORD EMAIL:", email);
    if (!isPasswordValid) {
      return;
    }

    if (!passwordsMatch) {
      return;
    }
 try {
    const result = await createPassword({
    email,
      password,
      confirmPassword,
    });
   
  console.log("Password created successfully",result);
    navigate("/register/admin-register", {
      state: {
        email: email,
      },
    });
  }
 
      
  catch (error) {
    console.error("Password creation failed:", error);
  }
  }
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
            <span className="inline-block rounded-full bg-purple-100 px-4 py-2 text-xs font-semibold text-[#4b1591]">
              STEP 3 OF 6
            </span>

            {/* Heading */}
            <h1 className="mt-5 text-3xl font-bold tracking-tight text-[#18134b] md:text-4xl">
              Create Your Password
            </h1>

            {/* Description */}
            <p className="mt-3 max-w-xl text-base leading-7 text-slate-600">
              Create a strong password to secure your TicketPro
              account and protect your organization.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="mt-8">

              {/* Password */}
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-slate-700"
              >
                Password
              </label>

              <div className="relative mt-3">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-xl border border-slate-300 bg-[#faf8ff] px-4 py-4 pr-12 text-sm outline-none transition focus:border-[#4b1591] focus:ring-2 focus:ring-purple-100"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => !prev)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showPassword ? "◉" : "◌"}
                </button>
              </div>

              {/* Strength */}
              <div className="mt-4">

                <div className="mb-2 flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase text-slate-600">
                    Password Strength
                  </span>

                  <span
                    className={`text-xs font-bold ${
                      isPasswordValid
                        ? "text-green-600"
                        : "text-slate-400"
                    }`}
                  >
                    {isPasswordValid ? "STRONG" : "WEAK"}
                  </span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-slate-200">
                  <div
                    className={`h-1.5 rounded-full transition-all ${
                      isPasswordValid
                        ? "w-full bg-green-500"
                        : password.length >= 4
                        ? "w-1/2 bg-yellow-400"
                        : "w-1/4 bg-red-400"
                    }`}
                  />
                </div>

              </div>

              {/* Confirm Password */}
              <label
                htmlFor="confirmPassword"
                className="mt-7 block text-sm font-semibold text-slate-700"
              >
                Confirm Password
              </label>

              <div className="relative mt-3">
                <input
                  id="confirmPassword"
                  type={
                    showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  placeholder="Re-enter your password"
                  required
                  className={`w-full rounded-xl border bg-[#faf8ff] px-4 py-4 pr-12 text-sm outline-none transition focus:ring-2 ${
                    confirmPassword.length > 0 &&
                    !passwordsMatch
                      ? "border-red-400 focus:border-red-400 focus:ring-red-100"
                      : "border-slate-300 focus:border-[#4b1591] focus:ring-purple-100"
                  }`}
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword(
                      (prev) => !prev
                    )
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
                >
                  {showConfirmPassword ? "◉" : "◌"}
                </button>
              </div>

              {/* Password Requirements */}
              <div className="mt-6 rounded-xl border border-purple-100 bg-[#f8f4ff] p-5">

                <p className="text-sm font-bold uppercase tracking-wide text-[#18134b]">
                  Password must contain:
                </p>

                <div className="mt-4 space-y-3">

                  <PasswordRule
                    valid={passwordRules.minLength}
                    text="Minimum 8 characters"
                  />

                  <PasswordRule
                    valid={passwordRules.uppercase}
                    text="One uppercase letter (A-Z)"
                  />

                  <PasswordRule
                    valid={passwordRules.lowercase}
                    text="One lowercase letter (a-z)"
                  />

                  <PasswordRule
                    valid={passwordRules.number}
                    text="One number (0-9)"
                  />

                  <PasswordRule
                    valid={passwordRules.special}
                    text="One special character (!@#$%^&*)"
                  />

                </div>
              </div>

              {/* Password mismatch */}
              {confirmPassword.length > 0 &&
                !passwordsMatch && (
                  <p className="mt-3 text-sm font-medium text-red-600">
                    Passwords do not match.
                  </p>
                )}

              {/* Button */}
              <button
                type="submit"
                disabled={!isPasswordValid || !passwordsMatch}
                className={`mt-7 w-full rounded-xl px-5 py-4 text-sm font-semibold text-white shadow-lg transition ${
                  isPasswordValid && passwordsMatch
                    ? "bg-[#4b1591] shadow-purple-200 hover:bg-[#3d0f78]"
                    : "cursor-not-allowed bg-slate-300 shadow-none"
                }`}
              >
                Create Password & Continue
              </button>

            </form>

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

const PasswordRule = ({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) => {
  return (
    <div className="flex items-center gap-3">
      <span
        className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
          valid
            ? "bg-green-500 text-white"
            : "bg-slate-300 text-white"
        }`}
      >
        ✓
      </span>

      <span
        className={`text-sm ${
          valid
            ? "text-slate-700"
            : "text-slate-500"
        }`}
      >
        {text}
      </span>
    </div>
  );
};

export default CreatePassword;