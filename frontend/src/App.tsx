import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./modules/auth/components/protectedRoute";
import AdminRegister from "./modules/auth/pages/AdminRegister";
import CreatePassword from "./modules/auth/pages/CreatePassword";
import EmailVarification from "./modules/auth/pages/EmailVarification";
import ForgotPassword from "./modules/auth/pages/ForgotPassword";
import LoginPage from "./modules/auth/pages/LoginPage";
import OtpVerification from "./modules/auth/pages/OtpVerification";
import PasswordReset from "./modules/auth/pages/PasswordReset";
import CheckStatus from "./modules/company/pages/CheckStatus";
import CompanyDocuments from "./modules/company/pages/CompanyDocuments";
import CompanyInformation from "./modules/company/pages/CompanyInformation";
import CompanyLocation from "./modules/company/pages/CompanyLocation";
import CompanySubscriptionPlan from "./modules/company/pages/CompanySubscriptionPlan";
import RegistrationSubmitted from "./modules/company/pages/RegistrationSubmitted";
import ReviewDeclaration from "./modules/company/pages/RevieDeclaration";
import SuperAdminLayout from "./modules/superadmin/layout/SuperAdminLayout";
import Companies from "./modules/superadmin/pages/company/Companies";
import CompanyDetails from "./modules/superadmin/pages/company/CompanyDetails";
// import CompanyRequestDetails from "./modules/superadmin/pages/CompanyrequestDetails";
import CompanyRequests from "./modules/superadmin/pages/companyRequests/CompanyRequests";
import SubscriptionPlan from "./modules/superadmin/pages/subscription/SubscriptionPlan";
import SuperAdminDashbord from "./modules/superadmin/pages/SuperAdminDashbord";
// import ViewPlanDetail from "./modules/superadmin/pages/ViewPlanDetail";
import Home from "./pages/Home";
import ViewPlanDetail from "./modules/superadmin/pages/subscription/ViewPlanDetail";
import CompanyRequestDetails from "./modules/superadmin/pages/companyRequests/CompanyrequestDetails";
import CompanyAdminLayout from "./modules/company-admin/layouts/CompanyAdminLayout";
import CompanyAdminDashboard from "./modules/company-admin/pages/CompanyAdminDashboard";
import CompanyProfile from "./modules/company-admin/pages/CompanyProfile";
import DepartmentListPage from "./modules/department/pages/DepartmentListPage";
import ViewDepartmentPage from "./modules/department/pages/ViewDepartmentPage";


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
          path="/register/company-register/:companyRequestId"
          element={<CompanyInformation />}
        />

        <Route
          path="/register/company-register/:companyRequestId/location"
          element={<CompanyLocation />}
        />

        <Route
          path="/register/company-register/:companyRequestId/documents"
          element={<CompanyDocuments />}
        />
        <Route
          path="/register/company-register/:companyRequestId/review-declaration"
          element={<ReviewDeclaration />}
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
          path="/register/company-register/success"
          element={<RegistrationSubmitted />}
        />
        <Route
          path="/company-admin/check-status"
          element={
            <ProtectedRoute>
              <CheckStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/company-admin/select-subscription"
          element={
            <ProtectedRoute>
              <CompanySubscriptionPlan />
            </ProtectedRoute>
          }
        />


<Route
  path="/company-admin"
  element={
    <ProtectedRoute>
      <CompanyAdminLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<CompanyAdminDashboard />} />
  <Route path="company-information" element={<CompanyProfile/>} />
    <Route path="departments" element={<DepartmentListPage/>} />
<Route
  path="departments/:departmentId"
  element={<ViewDepartmentPage />}
/>
  
  </Route>
        <Route
          path="/super-admin"
          element={
            <ProtectedRoute>
              <SuperAdminLayout />
            </ProtectedRoute>
          }
        >
          <Route path="dashbord" element={<SuperAdminDashbord />} />

          <Route path="company-requests" element={<CompanyRequests />} />

          <Route
            path="company-requests/:companyRequestId"
            element={<CompanyRequestDetails />}
          />

          <Route path="companies" element={<Companies/>} />
          <Route path="companies/:companyId" element={<CompanyDetails/>} />

          <Route path="subscription-plan" element={<SubscriptionPlan />} />
          <Route path="subscription-plan/:id" element={<ViewPlanDetail />} />
        </Route>



        
      </Routes>
    </BrowserRouter>
  );
};

export default App;
