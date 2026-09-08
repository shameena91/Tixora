import { Clock3 } from "lucide-react";


import Navbar from "../../../components/home/Navbar";

import { AuthContext } from "../../auth/context/AuthContext"
import { useContext } from "react";


function Dashbord() {

 
const auth = useContext(AuthContext);
const name = auth?.userName;
console.log("MAAA",name)
  return (
    <div className="min-h-screen bg-[#faf7ff] text-[#182238]">
      {/* Navbar */}
     <Navbar  showLogin={false} showRegister={false}  name={name}/>
       
      {/* Main */}

      <main className="flex justify-center px-5 py-[2px]">
    
        <section className="mt-0 flex min-h-[683px] w-full max-w-[672px] flex-col items-center rounded-[14px] border border-[#e7e2ed] bg-white px-8 py-12 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
            
          {/* Clock Icon */}
          <div className="flex h-[192px] w-[192px] items-center justify-center rounded-full border-[4px] border-dashed border-[#d5c5f0] bg-[#f7f3ff]">
            <div className="relative flex h-[82px] w-[82px] items-center justify-center rounded-full border-[5px] border-[#7146b8]">
              
              {/* Clock hands */}
              <div className="absolute left-1/2 top-[18px] h-[28px] w-[5px] -translate-x-1/2 rounded-full bg-[#7146b8] origin-bottom rotate-0" />

              <div className="absolute left-1/2 top-1/2 h-[5px] w-[31px] -translate-y-1/2 rounded-full bg-[#7146b8] origin-left rotate-[35deg]" />

              {/* Center */}
              <div className="absolute left-1/2 top-1/2 h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7146b8]" />

              {/* Clock dots */}
              <span className="absolute -top-[9px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#7146b8]" />
              <span className="absolute -bottom-[9px] left-1/2 h-[10px] w-[10px] -translate-x-1/2 rounded-full bg-[#7146b8]" />
              <span className="absolute -left-[9px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-[#7146b8]" />
              <span className="absolute -right-[9px] top-1/2 h-[10px] w-[10px] -translate-y-1/2 rounded-full bg-[#7146b8]" />
              <span className="absolute left-[8px] top-[8px] h-[9px] w-[9px] rounded-full bg-[#7146b8]" />
              <span className="absolute right-[8px] top-[8px] h-[9px] w-[9px] rounded-full bg-[#7146b8]" />
              <span className="absolute bottom-[8px] left-[8px] h-[9px] w-[9px] rounded-full bg-[#7146b8]" />
              <span className="absolute bottom-[8px] right-[8px] h-[9px] w-[9px] rounded-full bg-[#7146b8]" />
            </div>
          </div>

          {/* Status */}
          <div className="mt-8 rounded-full border border-[#f4d98b] bg-[#fff5d4] px-[17px] py-[7px] text-[11px] font-semibold tracking-[1.3px] text-[#e69b00]">
            UNDER VERIFICATION
      
          </div>

          {/* Heading */}
          <h1 className="mt-5 text-center text-[24px] font-bold leading-[1.3] text-[#172033]">
            Your registration is under verification
          </h1>

          {/* Description */}
          <p className="mt-5 text-center text-[16px] leading-[26px] text-[#50617b]">
            Our team is currently reviewing your information.
            <br />
            This usually takes 1-2 business days.
          </p>

          {/* Submitted Date */}
          <div className="mt-8 flex items-center gap-2 rounded-lg bg-[#f7f9fc] px-4 py-[9px] text-[13px] text-[#526681]">
            <Clock3 size={15} strokeWidth={1.8} />
            <span>
              Submitted on:{" "}
              <span className="text-[#33445e]">
                08 July 2025, 02:30 PM
              </span>
            </span>
          </div>

          {/* Refresh Button */}
          <button
            type="button"
            className="mt-10 h-[52px] w-[190px] rounded-lg border-2 border-[#5728a8] bg-white text-[14px] font-semibold text-[#5728a8] transition hover:bg-[#5728a8] hover:text-white"
          >
            Refresh Status
          </button>

          {/* Support */}
          <p className="mt-9 text-[13px] text-[#8a9bb5]">
            Need help?{" "}
            <a
              href="#"
              className="font-medium text-[#5728a8] hover:underline"
            >
              Contact Support
            </a>
          </p>
        </section>
      </main>
    </div>
  );
}

export default Dashbord;