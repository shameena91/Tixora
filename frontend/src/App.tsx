import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminRegister from "./modules/auth/pages/AdminRegister";
import CreatePassword from "./modules/auth/pages/CreatePassword";
import EmailVarification from "./modules/auth/pages/EmailVarification";
import OtpVerification from "./modules/auth/pages/OtpVerification";
import CompanyInformation from "./modules/company/pages/CompanyInformation";
import Home from "./pages/Home";

import ForgotPassword from "./modules/auth/pages/ForgotPassword";
import LoginPage from "./modules/auth/pages/LoginPage";
import CompanyDocuments from "./modules/company/pages/CompanyDocuments";
import CompanyLocation from "./modules/company/pages/CompanyLocation";
import CompanyRegistrationSuccess from "./modules/company/pages/CompanyRegistrationSuccess";
import ReviewDeclaration from "./modules/company/pages/RevieDeclaration";

import ProtectedRoute from "./modules/auth/components/protectedRoute";
import PasswordReset from "./modules/auth/pages/PasswordReset";
import Dashbord from "./modules/company/pages/CompanyDashbord";
import SuperAdminLayout from "./modules/superadmin/layout/SuperAdminLayout";
import CompanyRequests from "./modules/superadmin/pages/CompanyRequests";
import CompanyRequestDetails from "./modules/superadmin/pages/CompanyrequestDetails";
import SuperAdminDashbord from "./modules/superadmin/pages/SuperAdminDashbord";

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



<Route path="/super-admin" element={<SuperAdminLayout />}>

  <Route
    path="dashbord"
    element={<SuperAdminDashbord />}
  />

 <Route
  path="company-requests"
  element={<CompanyRequests />}
/>

<Route
  path="company-requests/:companyRequestId"
  element={<CompanyRequestDetails />}
/>
  <Route
    path="companies"
    element={<div>Companies</div>}
  />

</Route>




      </Routes>



      
    </BrowserRouter>
  );
};

export default App;
