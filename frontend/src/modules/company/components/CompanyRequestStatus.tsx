import {  Info } from "lucide-react";
import type { CompanyRequestStatus, CompanyRequestStatusProps } from "../../company/types/companyTypes";
import { useNavigate } from "react-router-dom";


interface CompanyRequestStatusConfig {
   label: string;
  title: string;
  message: string;
  nextAction: string;
  showRemarks: boolean;
  showResubmit: boolean;
  actionLabel: string | null;
}

const statusConfig: Record<
  CompanyRequestStatus,
  CompanyRequestStatusConfig
> = {
  PENDING: {
    label: "UNDER VERIFICATION",
    title: "Your registration is under verification",
    message: "Our team is currently reviewing your application.",
    nextAction:
      "Our team will review your company information and submitted documents. You will be notified once the review is completed or if additional information is required.",
    showRemarks: false,
    showResubmit: false,
       actionLabel: null,
  },

  MORE_INFO_REQUIRED: {
    label: "MORE INFORMATION REQUIRED",
    title: "More information is required",
    message:
      "Please review the remarks and provide the required information.",
    nextAction:
      "Please update the required information and resubmit your application for review.",
    showRemarks: true,
    showResubmit: true,
     actionLabel: "Resubmit Application",
  },

  REJECTED: {
    label: "REJECTED",
    title: "Your request has been rejected",
    message:
      "Your company registration request could not be approved.",
    nextAction:
      "Please review the rejection reason, make the necessary changes, and resubmit your application.",
    showRemarks: true,
    showResubmit: true,
     actionLabel: "Resubmit Application",
  },

  APPROVED: {
    label: "APPROVED",
    title: "Your request has been approved",
    message:
      "Your company registration has been successfully approved.",
    nextAction:
      "You can now continue by selecting a subscription plan and completing the next steps.",
    showRemarks: false,
    showResubmit: false,
     actionLabel: "Select Subscription",
   
  },
};



export function CompanyRequestStatus({
  companyRequestId,
  status,
  reviewRemarks,
}: CompanyRequestStatusProps) {
  const config = statusConfig[status];
const navigate=useNavigate()

console.log("from staatus page",companyRequestId)
  return (
  
    <div className="min-h-screen bg-[#faf7ff] text-[#182238]">
      {/* Navbar */}
      
      {/* Main */}
      <main className="flex justify-center px-5 py-8">
        <section className="flex min-h-[680px] w-full max-w-[672px] flex-col items-center rounded-2xl border border-[#e7e2ed] bg-white px-8 py-12 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">

          {/* Clock Icon */}
          <div className="flex h-[170px] w-[170px] items-center justify-center rounded-full border-[4px] border-dashed border-[#d5c5f0] bg-[#f7f3ff]">
            <div className="relative flex h-[78px] w-[78px] items-center justify-center rounded-full border-[5px] border-[#7146b8]">

              {/* Clock hands */}
              <div className="absolute left-1/2 top-[16px] h-[26px] w-[5px] -translate-x-1/2 origin-bottom rounded-full bg-[#7146b8]" />

              <div className="absolute left-1/2 top-1/2 h-[5px] w-[28px] -translate-y-1/2 origin-left rotate-[35deg] rounded-full bg-[#7146b8]" />

              {/* Center */}
              <div className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7146b8]" />

              {/* Clock dots */}
              <span className="absolute -top-[8px] left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[#7146b8]" />

              <span className="absolute -bottom-[8px] left-1/2 h-[9px] w-[9px] -translate-x-1/2 rounded-full bg-[#7146b8]" />

              <span className="absolute -left-[8px] top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-[#7146b8]" />

              <span className="absolute -right-[8px] top-1/2 h-[9px] w-[9px] -translate-y-1/2 rounded-full bg-[#7146b8]" />

              <span className="absolute left-[7px] top-[7px] h-[8px] w-[8px] rounded-full bg-[#7146b8]" />

              <span className="absolute right-[7px] top-[7px] h-[8px] w-[8px] rounded-full bg-[#7146b8]" />

              <span className="absolute bottom-[7px] left-[7px] h-[8px] w-[8px] rounded-full bg-[#7146b8]" />

              <span className="absolute bottom-[7px] right-[7px] h-[8px] w-[8px] rounded-full bg-[#7146b8]" />
            </div>
          </div>

          {/* Status */}
    <div
  className={`rounded-full px-4 py-2 mt-3 text-sm font-semibold ${
    config.label === "PENDING"
      ? "bg-yellow-100 text-yellow-800"
      : config.label === "APPROVED"
        ? "bg-green-100 text-green-800 ring-1 ring-green-300"
        : config.label === "REJECTED"
          ? "bg-red-100 text-red-800"
          : "bg-blue-100 text-blue-800"
  }`}
>
  {config.label}
</div>

          {/* Heading */}
          <h1 className="mt-5 text-center text-[28px] font-bold leading-tight tracking-tight text-[#172033]">
            {config.title}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-[500px] text-center text-[15px] leading-6 text-[#65748b]">
            {config.message}
          </p>

          {/* Information Card */}
          <div className="mt-8 w-full max-w-[480px] rounded-xl border border-[#e8def7] bg-[#faf8ff] px-5 py-5">
            <div className="flex items-start gap-3.5">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eee6fb]">
                <Info
                  size={19}
                  strokeWidth={2}
                  className="text-[#5420a8]"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-[#3d2670]">
                  What happens next?
                </p>

                <p className="mt-1.5 text-sm leading-5 text-slate-600">
               {config.nextAction}
                </p>
              </div>

            </div>
          </div>

       

          {/* Review Remarks */}
          {config.showRemarks && reviewRemarks && (
            <div className="mt-6 w-full max-w-[480px] rounded-xl border border-[#f0dede] bg-[#fff8f8] px-5 py-4">
              <h3 className="text-sm font-semibold text-[#8b3a3a]">
                Review Remarks
              </h3>

              <p className="mt-2 text-sm leading-5 text-[#65748b]">
                {reviewRemarks}
              </p>
            </div>
          )}

          {/* Resubmit Button */}
    {config.actionLabel && (
  <button
    type="button"
    onClick={() => {
      if (status === "REJECTED" || status === "MORE_INFO_REQUIRED") {
        navigate(`/register/company-register/${companyRequestId}`);
      }

      if (status === "APPROVED") {
        navigate("/company-admin/select-subscription");
      }
    }}
    className="mt-6 rounded-lg bg-[#7146b8] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#6039a0]"
  >
    {config.actionLabel}
  </button>
)}

        </section>
      </main>
    </div>
  );
}