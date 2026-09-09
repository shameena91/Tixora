import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

type PasswordFormProps = {
  submitPassword: (
    password: string,
    confirmPassword: string
  ) => Promise<unknown>;

  buttonText: string;

  loadingText: string;

  onSuccess: () => void;
};

const PasswordForm = ({
  submitPassword,
  buttonText,
  loadingText,
  onSuccess,
}: PasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!isPasswordValid) {
      toast.error("Enter a valid password");
      return;
    }

    if (!passwordsMatch) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      await submitPassword(
        password,
        confirmPassword
      );

     

      onSuccess();
    } catch (error) {
      console.error(
        "PASSWORD SUBMISSION ERROR:",
        error
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8"
    >
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
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          placeholder="Enter your password"
          required
          autoComplete="new-password"
          className="w-full rounded-xl border border-slate-300 bg-[#faf8ff] px-4 py-4 pr-12 text-sm outline-none transition focus:border-[#4b1591] focus:ring-2 focus:ring-purple-100"
        />

        <button
          type="button"
          onClick={() =>
            setShowPassword(
              (prev) => !prev
            )
          }
          className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500"
        >
          {showPassword ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>
      </div>

      {/* Password Strength */}

      {/* <div className="mt-4">
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
            {isPasswordValid
              ? "STRONG"
              : "WEAK"}
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
      </div> */}

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
            setConfirmPassword(
              e.target.value
            )
          }
          placeholder="Re-enter your password"
          required
          autoComplete="new-password"
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
          {showConfirmPassword ? (
            <EyeOff size={19} />
          ) : (
            <Eye size={19} />
          )}
        </button>
      </div>

      {/* Password Requirements */}

  <div className="mt-6 rounded-xl border border-purple-100 bg-[#f8f4ff] p-5">
  <p className="text-sm font-bold uppercase tracking-wide text-[#18134b]">
    Password must contain:
  </p>

  <p className="mt-4 text-sm text-slate-600">
    Minimum 8 characters, one uppercase letter (A-Z),
    one lowercase letter (a-z), one number (0-9), and
    one special character (!@#$%^&*).
  </p>
</div>
      {/* Password mismatch */}

      {confirmPassword.length > 0 &&
        !passwordsMatch && (
          <p className="mt-3 text-sm font-medium text-red-600">
            Passwords do not match.
          </p>
        )}

      {/* Submit */}

      <button
        type="submit"
        disabled={
          loading ||
          !isPasswordValid ||
          !passwordsMatch
        }
        className={`mt-7 w-full rounded-xl px-5 py-4 text-sm font-semibold text-white shadow-lg transition ${
          !loading &&
          isPasswordValid &&
          passwordsMatch
            ? "bg-[#4b1591] shadow-purple-200 hover:bg-[#3d0f78]"
            : "cursor-not-allowed bg-slate-300 shadow-none"
        }`}
      >
        {loading
          ? loadingText
          : buttonText}
      </button>
    </form>
  );
};

// const PasswordRule = ({
//   valid,
//   text,
// }: {
//   valid: boolean;
//   text: string;
// }) => {
//   return (
//     <div className="flex items-center gap-3">
//       <span
//         className={`flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold ${
//           valid
//             ? "bg-green-500 text-white"
//             : "bg-slate-300 text-white"
//         }`}
//       >
//         ✓
//       </span>

//       <span
//         className={`text-sm ${
//           valid
//             ? "text-slate-700"
//             : "text-slate-500"
//         }`}
//       >
//         {text}
//       </span>
//     </div>
//   );
// };

export default PasswordForm;