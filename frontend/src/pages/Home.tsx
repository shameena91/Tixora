import { useContext, useEffect } from "react";
import CTA from "../components/home/CTA";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks ";
import Navbar from "../components/home/Navbar";

import Testimonials from "../components/home/Testimonal";

import { useNavigate } from "react-router-dom";
import { AuthContext } from "../modules/auth/context/AuthContext";
import { getMySubscriptionStatus } from "../modules/company-admin/services/subscription/SubscriptionService";
import { getMyCompanyRequest } from "../modules/company/Services/CompanyRequestService";

const Home = () => {


  const auth = useContext(AuthContext);
  const navigate = useNavigate();
useEffect(() => {
  if (auth?.isInitializing) {
    return;
  }

  const redirectUser = async () => {
    if (!auth?.accessToken || !auth.role) {
      return;
    }

    if (auth.role === "SUPER_ADMIN") {
      navigate("/super-admin/dashbord", { replace: true });
      return;
    }

    if (auth.role === "COMPANY_ADMIN") {
      try {
        const companyRequest = await getMyCompanyRequest();

        if (companyRequest.data.status !== "APPROVED") {
          navigate("/company-admin/check-status", {
            replace: true,
          });
          return;
        }

        const subscription = await getMySubscriptionStatus();
        const accessStatus =
          subscription?.data?.subscriptionAccessStatus;

        if (accessStatus === "NO_SUBSCRIPTION") {
          navigate("/company-admin/select-subscription", {
            replace: true,
          });
          return;
        }

        if (
          accessStatus === "ACTIVE" ||
          accessStatus === "EXPIRED"
        ) {
          navigate("/company-admin/dashboard", {
            replace: true,
          });
          return;
        }

        navigate("/company-admin/select-subscription", {
          replace: true,
        });
      } catch (error) {
        console.error("Failed to check company access:", error);
      }
    }
  };

  void redirectUser();
}, [
  auth?.isInitializing,
  auth?.accessToken,
  auth?.role,
  navigate,
]);

  if (auth?.isInitializing) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Navbar />

      <main>
         <Hero />
         <HowItWorks/>
         <Features/>
         <Testimonials/>
         <CTA/>
         <Footer/>
      </main>
    </>
  );
};

export default Home;