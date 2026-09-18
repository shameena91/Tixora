import type { ReactNode } from "react";
import Navbar from "../../../components/home/Navbar";
import RegistrationProgress from "../components/RegistrationProgress";

interface RegistrationLayoutProps {
  children: ReactNode;
  currentStep: number;
}

const RegistrationLayout = ({
  children,
  currentStep,
}: RegistrationLayoutProps) => {
  return (
    <div className="min-h-screen bg-white">

      {/* Navbar */}
      <Navbar
        showRegister={false}
        showLogin={false}
      />

      {/* Registration Content */}
      <main className="mx-auto w-full max-w-7xl px-5 py-8 sm:px-8 lg:px-12">

        {/* Registration Progress */}
        <div className="mx-auto w-full max-w-4xl">
          <RegistrationProgress currentStep={currentStep} />
        </div>

        {/* Page Content */}
        <div className="mx-auto mt-10 w-full max-w-xl">
          {children}
        </div>

      </main>

    </div>
  );
};

export default RegistrationLayout;