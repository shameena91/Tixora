
import {  Info, Ticket } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RegistrationSubmitted = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate("/");
  };

 

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-5">
      <div className="mx-auto min-h-[calc(100vh-40px)] max-w-[576px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">

        {/* Header */}
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-6">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#5420a8]">
              <Ticket
                size={18}
                className="text-white"
                fill="white"
              />
            </div>

            <span className="text-xl font-semibold text-slate-900">
              Tixora
            </span>
          </div>

          {/* Back to Home */}
          
        </div>

        {/* Content */}
        <div className="flex flex-col items-center px-6 pb-24 pt-14">

          {/* Illustration */}
          <div className="mb-10 flex h-[280px] w-[235px] items-center justify-center">
            <div className="relative h-full w-full rounded-md bg-gradient-to-b from-[#faf7ff] to-white">

              {/* Progress Steps */}
              <div className="absolute left-1/2 top-6 flex w-[170px] -translate-x-1/2 items-center justify-between">
                {[1, 2, 3, 4, 5].map((step) => (
                  <div
                    key={step}
                    className="flex items-center"
                  >
                    <div className="h-3 w-3 rounded-full bg-[#5420a8]" />

                    {step !== 5 && (
                      <div className="h-[2px] w-[29px] bg-[#5420a8]" />
                    )}
                  </div>
                ))}
              </div>

              {/* Envelope */}
              <div className="absolute left-1/2 top-[75px] flex h-[135px] w-[135px] -translate-x-1/2 items-center justify-center rounded-full bg-[#f2ecff]">

                <div className="relative h-[75px] w-[100px] rounded-lg bg-white shadow-md">

                  {/* Envelope top */}
                  <div className="absolute left-0 top-0 h-12 w-[70px] origin-top-right rotate-[32deg] rounded-tl-lg bg-[#6940c1]" />

                  <div className="absolute right-0 top-0 h-12 w-[70px] origin-top-left -rotate-[32deg] rounded-tr-lg bg-[#7046c8]" />

                  {/* Envelope bottom */}
                  <div className="absolute bottom-0 left-0 h-14 w-full overflow-hidden rounded-b-lg">
                    <div className="absolute -bottom-10 left-1/2 h-[75px] w-[75px] -translate-x-1/2 rotate-45 bg-[#5b2bb1]" />
                  </div>

                  {/* Success badge */}
                  <div className="absolute -bottom-4 -right-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#5420a8] text-sm font-bold text-white">
                    ✓
                  </div>

                </div>
              </div>

              {/* Illustration Text */}
              <div className="absolute bottom-8 left-0 right-0 text-center">
                <p className="text-[9px] font-bold text-slate-800">
                  Registration Submitted!
                </p>

                <p className="mt-1 text-[5px] text-slate-400">
                  Your registration has been submitted successfully.
                </p>
              </div>

            </div>
          </div>

          {/* Title */}
          <h1 className="text-center text-[30px] font-bold tracking-tight text-slate-900">
            Registration Submitted!
          </h1>

          {/* Description */}
          <p className="mt-3 text-center text-base leading-6 text-slate-500">
            Thank you! Your company registration has been
            <br />
            submitted successfully.
          </p>

          {/* Information */}
          <div className="mt-8 flex w-full max-w-[480px] items-start gap-4 rounded-lg bg-[#f1ecf8] px-6 py-5">

            <Info
              size={21}
              className="mt-0.5 shrink-0 text-[#5420a8]"
            />

            <div>
              <p className="text-sm font-semibold text-[#5420a8]">
                Our team will review your information.
              </p>

              <p className="mt-1 text-sm text-slate-600">
                You will be notified once your company is verified.
              </p>
            </div>

          </div>

          {/* Login Button */}
          <button
            type="button"
            onClick={handleBackToHome}
            className="mt-10 h-14 w-full max-w-[480px] rounded-lg bg-[#5420a8] text-[15px] font-semibold text-white shadow-lg shadow-purple-200 transition hover:bg-[#481a91]"
          >
           Back to Home
          </button>

        </div>
      </div>
    </div>
  );
};

export default RegistrationSubmitted;

