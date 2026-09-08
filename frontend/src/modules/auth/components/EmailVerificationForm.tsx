
import { useState } from "react";
import toast from "react-hot-toast";

type EmailVerificationFormProps = {
  purpose: "registration" | "forgot-password";

  sendOtp: (email: string) => Promise<unknown>;

  onSuccess: (
    email: string,
    purpose: "registration" | "forgot-password"
  ) => void;
};

const EmailVerificationForm = ({
  purpose,
  sendOtp,
  onSuccess,
}: EmailVerificationFormProps) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      setLoading(true);

      await sendOtp(email);

      toast.success("OTP sent successfully");

      onSuccess(email, purpose);
    } catch (error) {
      console.error("Failed to send OTP:", error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to send OTP");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-7">
      <label
        htmlFor="email"
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        Email address
      </label>

      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        autoComplete="email"
        required
        className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#5420a8] focus:ring-2 focus:ring-[#5420a8]/10"
      />

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-lg bg-[#5420a8] px-5 py-3.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Verification Code"}
      </button>
    </form>
  );
};

export default EmailVerificationForm;

