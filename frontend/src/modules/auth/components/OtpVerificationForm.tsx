
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

type OtpVerificationFormProps = {
  email: string;

  verifyOtp: (otp: string) => Promise<unknown>;

  resendOtp: () => Promise<unknown>;

  onSuccess: () => void;
};

const OtpVerificationForm = ({
  email,
  verifyOtp,
  resendOtp,
  onSuccess,
}: OtpVerificationFormProps) => {
  const [otp, setOtp] = useState("");
  const [resendTimer, setResendTimer] = useState(30);
  const [otpError, setOtpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  // Resend OTP timer
  useEffect(() => {
    if (resendTimer <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);

  // Verify OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Email not found");
      return;
    }

    if (!otp) {
      setOtpError("Please enter OTP");
      return;
    }

    if (otp.length !== 6) {
      setOtpError("OTP must be 6 digits");
      return;
    }

    try {
      setLoading(true);
      setOtpError("");

      await verifyOtp(otp);

      toast.success("OTP verified successfully");

      onSuccess();
    } catch (error) {
      console.error("OTP verification failed:", error);

      const message =
        error instanceof Error ? error.message : "Invalid OTP";

      setOtpError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (!email) {
      toast.error("Email not found");
      return;
    }

    if (resendTimer > 0 || resendLoading) {
      return;
    }

    try {
      setResendLoading(true);

      await resendOtp();

      toast.success("OTP resent successfully");

      setResendTimer(30);
      setOtp("");
      setOtpError("");
    } catch (error) {
      console.error("RESEND OTP ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to resend OTP"
      );
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="mt-10">

        {/* OTP Label */}
        <label
          htmlFor="otp"
          className="block text-sm font-semibold text-slate-700"
        >
          Enter Verification Code
        </label>

        {/* OTP Input */}
        <input
          id="otp"
          type="text"
          inputMode="numeric"
          value={otp}
          onChange={(e) => {
            setOtp(e.target.value.replace(/\D/g, ""));
            setOtpError("");
          }}
          maxLength={6}
          placeholder="Enter 6-digit OTP"
          required
          className={`mt-3 w-full rounded-xl border bg-white px-4 py-4 text-center text-lg tracking-[0.5em] outline-none transition ${
            otpError
              ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-100"
              : "border-slate-300 focus:border-[#4b1591] focus:ring-2 focus:ring-purple-100"
          }`}
        />

        {/* OTP Error */}
        {otpError && (
          <p className="mt-2 text-sm text-red-500">
            {otpError}
          </p>
        )}

        {/* Info */}
        <div className="mt-5 rounded-xl border border-purple-100 bg-purple-50 p-4">
          <p className="text-sm leading-6 text-slate-600">
            Enter the verification code sent to your
            company email address. The code is valid for
            a limited time.
          </p>
        </div>

        {/* Verify Button */}
        <button
          type="submit"
          disabled={loading}
          className={`mt-6 w-full rounded-xl px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-purple-200 transition ${
            loading
              ? "cursor-not-allowed bg-purple-300"
              : "bg-[#4b1591] hover:bg-[#3d0f78]"
          }`}
        >
          {loading ? "Verifying..." : "Verify OTP →"}
        </button>
      </form>

      {/* Resend */}
      <p className="mt-6 text-center text-sm text-slate-500">
        Didn’t receive the code?{" "}

        <button
          type="button"
          onClick={handleResendOtp}
          disabled={resendTimer > 0 || resendLoading}
          className={`font-semibold ${
            resendTimer > 0 || resendLoading
              ? "cursor-not-allowed text-slate-400"
              : "text-[#4b1591] hover:underline"
          }`}
        >
          {resendLoading
            ? "Sending..."
            : resendTimer > 0
            ? `Resend OTP in ${resendTimer}s`
            : "Resend OTP"}
        </button>
      </p>
    </>
  );
};

export default OtpVerificationForm;

