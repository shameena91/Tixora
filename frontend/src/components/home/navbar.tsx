import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logout } from "../../modules/auth/services/authService";
import { AuthContext } from "../../modules/auth/context/AuthContext"
import { useContext } from "react";
import { clearAccessToken } from "../../modules/auth/api/tokenStorage";

interface NavbarProps {
  showRegister?: boolean;
  showLogin?: boolean;
  name?:string|null
}

const Navbar = ({
  showRegister = true,
  showLogin = true,
  name,
}: NavbarProps) => {
    const auth = useContext(AuthContext);
    const navigate = useNavigate();


const handleLogout =async()=>{
   
    try {
        await logout()
      auth?.setAccessToken(null);
clearAccessToken();

auth?.setUserName(null);
localStorage.removeItem("userName");

navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  
}

  console.log("NAVBAR NAME:", name);
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 lg:px-8">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
            ✦
          </div>

          <span className="text-lg font-bold tracking-tight">
            Tixora
          </span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">
          <Link to="/" className="transition hover:text-indigo-600">
            Home
          </Link>

          <a href="#features" className="transition hover:text-indigo-600">
            Features
          </a>

          <a href="#pricing" className="transition hover:text-indigo-600">
            Pricing
          </a>

          <a href="#about" className="transition hover:text-indigo-600">
            About
          </a>

          <a href="#contact" className="transition hover:text-indigo-600">
            Contact
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
  {name && (
    <>
      <span className="text-sm font-semibold text-slate-700">
        {name}
      </span>

     <button
  type="button"
  onClick={handleLogout}
  className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50"
>
  Logout
</button>
    </>
  )}
          {showLogin === true && (
            <Link
              to="/login"
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-indigo-600 transition hover:bg-slate-50"
            >
              Login
            </Link>
          )}

          {showRegister === true && (
            <Link
              to="/register/email"
              className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-indigo-700"
            >
              Register Company
            </Link>
          )}

        </div>
      </nav>
    </header>
  );
};

export default Navbar;