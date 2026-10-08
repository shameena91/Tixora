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

const Home = () => {


  const auth = useContext(AuthContext);
  const navigate = useNavigate();
useEffect(() => {
    if (auth?.isInitializing) {
      return;
    }

    if (auth?.role === "COMPANY_ADMIN") {
      navigate("/company-admin/check-status", { replace: true });
      return;
    }

    if (auth?.role === "SUPER_ADMIN") {
      navigate("/super-admin/dashbord", { replace: true });
    }
  }, [auth?.isInitializing, auth?.role, navigate]);

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