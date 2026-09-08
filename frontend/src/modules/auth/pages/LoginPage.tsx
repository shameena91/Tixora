
import { Eye, EyeOff, Ticket } from "lucide-react";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import { loginSchema } from "../validators/loginSchema";
import { AuthContext } from "../context/AuthContext";
import { storeAccessToken } from "../api/tokenStorage";


const LoginPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error,setErrors]=useState<{email?:string;
    password?:string;}>({})

  const auth = useContext(AuthContext);


if (!auth) {
  throw new Error("AuthContext must be used inside AuthProvider");
}

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({})
      const result = loginSchema.safeParse(formData);

  if (!result.success) {
    const newErrors: {
      email?: string;
      password?: string;
    } = {};

 result.error.issues.forEach((issue) => {
      const field = issue.path[0];

      if (field === "email" || field === "password") {
        newErrors[field] = issue.message;
      }
    });

    setErrors(newErrors);
    return;
  }
    try {

      
    console.log("Login data:", formData);
      const response= await login(formData.email,formData.password)

      console.log("LoginResponse",response)
       console.log("LoginResponse",response.data.name)


auth.setAccessToken(response.data.accessToken)
storeAccessToken(response.data.accessToken);
auth.setUserName(response.data.name)
localStorage.setItem("userName",response.data.name)

navigate("/dashboard"

 
)
    } catch (error) {
       console.error("Login error:", error);

       if(error instanceof Error)
       {
toast.error(error.message)
       }
       
    }


    // Backend login API will be connected here later.
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <header className="flex h-20 items-center border-b border-slate-200 bg-white px-6 lg:px-12">

        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#5420a8]">
            <Ticket
              size={20}
              className="text-white"
              fill="white"
            />
          </div>

          <span className="text-xl font-bold text-slate-900">
            Tixora
          </span>
        </div>

      </header>

      {/* Main */}
      <main className="flex min-h-[calc(100vh-80px)] items-center justify-center px-5 py-10">

        <div className="w-full max-w-md">

          {/* Heading */}
          <div className="mb-8 text-center">

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Login to your Tixora account
            </p>

          </div>

          {/* Login Card */}
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">

            <form onSubmit={handleSubmit}>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700"
                >
                  Email address
                </label>

                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  autoComplete="email"
                  
                  className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5420a8] focus:ring-2 focus:ring-[#5420a8]/10"
                />
                {error.email && (
  <p className="text-red-500 text-sm mt-1">
    {error.email}
  </p>
)}
              </div>

              {/* Password */}
              <div className="mt-5">

                <div className="mb-2 flex items-center justify-between">

                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Password
                  </label>

                

                </div>

                <div className="relative">

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    
                    className="w-full rounded-lg border border-slate-300 px-4 py-3 pr-12 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5420a8] focus:ring-2 focus:ring-[#5420a8]/10"
                  />
                  {error.password && (
  <p className="text-red-500 text-sm mt-1">
    {error.password}
  </p>
)}

                  {/* Show / Hide Password */}
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-slate-600"
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* forgot password  */}
               <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-[#5420a8] transition hover:text-[#481a91] mt-4"
                  >
                    Forgot password?
                  </button>
              {/* Login Button */}
              <button
                type="submit"
                className="mt-7 w-full rounded-lg bg-[#5420a8] px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-purple-200 transition hover:bg-[#481a91] active:scale-[0.99]"
              >
                Login
              </button>

            </form>

            {/* Register */}
            <div className="mt-7 border-t border-slate-100 pt-6 text-center">

              <p className="text-sm text-slate-500">
                Don't have an account?
              </p>

              <button
                type="button"
                onClick={() =>
                  navigate("/register/company-register")
                }
                className="mt-1 text-sm font-semibold text-[#5420a8] transition hover:text-[#481a91]"
              >
                Register your company
              </button>

            </div>

          </div>

          {/* Footer */}
          <p className="mt-6 text-center text-xs text-slate-400">
            © 2026 Tixora. All rights reserved.
          </p>

        </div>

      </main>

    </div>
  );
};

export default LoginPage;

