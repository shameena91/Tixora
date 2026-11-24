
import { useState, type FormEvent } from "react";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../shared/hooks/useAuth";
import type { EmployeeRole } from "../types/EmployeeRole";
import { storeAccessToken } from "../../auth/api/tokenStorage";

interface EmployeeLoginUser {
  accessToken: string;
  name: string;
  role: "EMPLOYEE";
  employeeRole:EmployeeRole;
  companyId: string;
  permissions: string[];
}


interface EmployeeLoginFormProps {
  onSubmit: (credentials: {
    email: string;
    password: string;
  }) => Promise<EmployeeLoginUser>;

  onForgotPassword?: () => void;
}
// Login validation schema
const employeeLoginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),

  password: z
    .string()
    .min(1, "Password is required"),
});
const EmployeeLoginForm = ({
  onSubmit,
  onForgotPassword,
}: EmployeeLoginFormProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
const {
  setAccessToken,
  setUserName,
  setRole,
  setEmployeeRole,
  setCompanyId,
  setPermissions,
} = useAuth();
  const navigate=useNavigate()

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    general?: string;
  }>({});

 const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  if (isLoading) return;

  setErrors({});

  const validation = employeeLoginSchema.safeParse({
    email,
    password,
  });

  if (!validation.success) {
    const emailError = validation.error.issues.find(
      (issue) => issue.path[0] === "email"
    )?.message;

    const passwordError = validation.error.issues.find(
      (issue) => issue.path[0] === "password"
    )?.message;

    setErrors({
      email: emailError,
      password: passwordError,
    });

    return;
  }

  try {
    setIsLoading(true);

    const user = await onSubmit(validation.data);
console.log("user.role",user)
    
   if (user.role !== "EMPLOYEE") {
  toast.error("Only employees can access this portal.");
  return;
}
const allowedRoles: EmployeeRole[] = [
  "NORMAL EMPLOYEE",
  "SUPPORT AGENT",
  "DEPARTMENT ADMIN",
];
if (!allowedRoles.includes(user.employeeRole)) {
  toast.error("Employee role is not assigned.");
  return;
}

storeAccessToken(user.accessToken, "employee");

setAccessToken(user.accessToken);
setUserName(user.name);
setRole(user.role);
setEmployeeRole(user.employeeRole);
setCompanyId(user.companyId);
setPermissions(user.permissions ?? []);

toast.success("Login successful!");
navigate("/employee/dashboard", { replace: true })
;

  } catch (error) {
    toast.error(
      error instanceof Error
        ? error.message
        : "Login failed. Please try again."
    );
  } finally {
    setIsLoading(false);
  }
};
  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">

      {/* Email Address */}
      <div>
        <label
          htmlFor="email"
          className="mb-2 block text-sm font-semibold text-[#183B36]"
        >
          Email Address
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({
              ...prev,
              email: undefined,
              general: undefined,
            }));
          }}
          placeholder="Enter your email address"
          autoComplete="username"
          aria-invalid={Boolean(errors.email)}
          className="w-full rounded-xl border border-[#DCE9E1] bg-white px-4 py-3.5 text-sm text-[#183B36] outline-none transition duration-200 placeholder:text-[#ADBFC6] focus:border-[#11A675] focus:ring-4 focus:ring-[#11A675]/10"
        />

        {errors.email && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.email}
          </p>
        )}
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="mb-2 block text-sm font-semibold text-[#183B36]"
        >
          Password
        </label>

        <div className="flex items-center rounded-xl border border-[#DCE9E1] bg-white px-4 transition duration-200 focus-within:border-[#11A675] focus-within:ring-4 focus-within:ring-[#11A675]/10">

          <input
            id="password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErrors((prev) => ({
                ...prev,
                password: undefined,
                general: undefined,
              }));
            }}
            placeholder="Enter your password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            className="min-w-0 flex-1 py-3.5 text-sm text-[#183B36] outline-none placeholder:text-[#ADBFC6]"
          />

          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="ml-2 text-[#8AA49A] transition hover:text-[#11A675]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff size={19} />
            ) : (
              <Eye size={19} />
            )}
          </button>
        </div>

        {errors.password && (
          <p className="mt-1.5 text-xs text-red-500">
            {errors.password}
          </p>
        )}

        <div className="mt-3 flex justify-end">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-sm font-semibold text-[#11A675] transition hover:text-[#0E966B] hover:underline"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* General API Error */}
      {errors.general && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          {errors.general}
        </p>
      )}

      {/* Login Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#11A675] px-5 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-200/70 transition duration-300 hover:-translate-y-0.5 hover:bg-[#0E966B] hover:shadow-xl hover:shadow-emerald-200 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isLoading ? "Signing in..." : "Sign In"}

        {!isLoading && (
          <ArrowRight
            size={18}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        )}
      </button>

    </form>
  );
};

export default EmployeeLoginForm;
