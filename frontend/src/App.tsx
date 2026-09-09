import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmailVarification from "./modules/auth/pages/EmailVarification";
import OtpVerification from "./modules/auth/pages/OtpVerification";
import CreatePassword from "./modules/auth/pages/CreatePassword";
import AdminRegister from "./modules/auth/pages/AdminRegister";
import CompanyInformation from "./modules/company/pages/CompanyInformation";

import CompanyDocuments from "./modules/company/pages/CompanyDocuments";
import ReviewDeclaration from "./modules/company/pages/RevieDeclaration";
import CompanyRegistrationSuccess from "./modules/company/pages/CompanyRegistrationSuccess";
import CompanyLocation from "./modules/company/pages/CompanyLocation";
import LoginPage from "./modules/auth/pages/LoginPage";
import ForgotPassword from "./modules/auth/pages/ForgotPassword";

import ProtectedRoute from "./modules/auth/components/protectedRoute";
import PasswordReset from "./modules/auth/pages/PasswordReset";
import Dashbord from "./modules/dashbord/pages/CompanyDashbord";
import SuperAdminDashbord from "./modules/superadmin/SuperAdminDashbord";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register/email" element={<EmailVarification />} />
        <Route path="/register/otp" element={<OtpVerification />} />
        <Route path="/register/create-password" element={<CreatePassword />} />
        <Route path="/register/admin-register" element={<AdminRegister />} />
        <Route
          path="/register/company-register"
          element={<CompanyInformation />}
        />
        <Route
          path="/register/company-register/location"
          element={<CompanyLocation />}
        />
        <Route
          path="/register/company-register/documents"
          element={<CompanyDocuments />}
        />
        <Route
          path="/register/company-register/review-declaration"
          element={<ReviewDeclaration />}
        />
        <Route
          path="/register/company-register/success"
          element={<CompanyRegistrationSuccess />}
        />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/forgot-password/verify-otp"
          element={<OtpVerification />}
        />
        <Route
          path="/forgot-password/reset-password"
          element={<PasswordReset />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashbord />
            </ProtectedRoute>
          }
        />
      <Route path="/super-admin/dashbord" element={<SuperAdminDashbord/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
