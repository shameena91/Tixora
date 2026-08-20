import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmailVarification from "./modules/auth/pages/EmailVarification"
import OtpVerification from "./modules/auth/pages/OtpVerification";
import CreatePassword from "./modules/auth/pages/CreatePassword";
import AdminRegister from "./modules/auth/pages/AdminRegister";
import CompanyInformation from "./modules/company/pages/CompanyInformation";
import CompanyLocation from "./modules/company/pages/CompanyLocation";
import CompanyDocuments from "./modules/company/pages/CompanyDocuments";
import ReviewDeclaration from "./modules/company/pages/RevieDeclaration";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
   <Route
          path="/register/email"
          element={<EmailVarification />}
        />
        <Route
          path="/register/otp"
          element={<OtpVerification />}
        />
         <Route
          path="/register/create-password"
          element={<CreatePassword />}
        />
        <Route
          path="/register/admin-register"
          element={<AdminRegister/>}
        />
        <Route
          path="/register/company-register"
          element={<CompanyInformation/>}
        />
        <Route
          path="/register/company-register/location"
          element={<CompanyLocation/>}
        />
          <Route
          path="/register/company-register/documents"
          element={<CompanyDocuments/>}
        />
          <Route
          path="/register/company-register/review-declaration"
          element={<ReviewDeclaration/>}
        />
      
      </Routes>
    </BrowserRouter>
  );
};

export default App;