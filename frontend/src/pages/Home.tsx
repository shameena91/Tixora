import CTA from "../components/home/CTA";
import Features from "../components/home/Features";
import Footer from "../components/home/Footer";
import Hero from "../components/home/Hero";
import HowItWorks from "../components/home/HowItWorks ";
import Navbar from "../components/home/navbar"
import Testimonials from "../components/home/Testimonal";

const Home = () => {
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