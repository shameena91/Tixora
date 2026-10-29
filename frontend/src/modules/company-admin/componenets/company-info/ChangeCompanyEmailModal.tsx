import { useState } from "react";
import type { FormEvent } from "react";
import { Mail, ShieldCheck, X } from "lucide-react";

import BaseModal from "../../../../components/common/BaseModal";

interface ChangeCompanyEmailModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendOtp: (email: string) => Promise<void>;
  onVerifyOtp: (data: {
    email: string;
    otp: string;
  }) => Promise<void>;
  onEmailUpdated: (email: string) => void;
}

const ChangeCompanyEmailModal = ({
  isOpen,
  onClose,
  onSendOtp,
  onVerifyOtp,
  onEmailUpdated,
}: ChangeCompanyEmailModalProps) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleClose = () => {
    if (loading) return;
    onClose();
  };

  const handleSendOtp = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await onSendOtp(email.trim().toLowerCase());
      setOtp("");
      setStep("otp");
      setMessage("OTP sent successfully to your new email.");
    } catch {
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    setError("");
    setMessage("");

    try {
      await onSendOtp(email.trim().toLowerCase());
      setOtp("");
      setMessage("A new OTP has been sent to your email.");
    } catch {
      setError("Failed to resend OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");
    setMessage("");

    try {
      await onVerifyOtp({
        email: email.trim().toLowerCase(),
        otp,
      });

      onEmailUpdated(email.trim().toLowerCase());
      onClose();
    } catch {
      setError("Invalid or expired OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title={step === "email" ? "Change Email" : "Verify Email"}
    >
      <div className="space-y-5">
        {/* Modal Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
            {step === "email" ? (
              <Mail size={22} />
            ) : (
              <ShieldCheck size={22} />
            )}
          </div>

          <div className="flex-1">
            <h3 className="text-base font-semibold text-slate-900">
              {step === "email"
                ? "Enter New Email"
                : "Verify Your Email"}
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              {step === "email"
                ? "An OTP will be sent to your new email address."
                : `Enter the OTP sent to ${email.trim()}.`}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Enter New Email */}
        {step === "email" ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label
                htmlFor="new-company-email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New Email Address
              </label>

              <input
                id="new-company-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Enter new email address"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={handleClose}
                disabled={loading}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={loading || !email.trim()}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          </form>
        ) : (
          /* Verify OTP */
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <div>
              <label
                htmlFor="company-email-otp"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Enter OTP
              </label>

              <input
                id="company-email-otp"
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                required
                minLength={6}
                maxLength={6}
                pattern="[0-9]{6}"
                value={otp}
                onChange={(event) =>
                  setOtp(
                    event.target.value
                      .replace(/\D/g, "")
                      .slice(0, 6),
                  )
                }
                placeholder="Enter 6-digit OTP"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-center text-lg tracking-[0.4em] outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
              />
            </div>

            {/* Resend OTP */}
            <div className="flex items-center justify-between gap-2">
              <p className="text-xs text-slate-500">
                Didn't receive the OTP?
              </p>

              <button
                type="button"
                onClick={() => void handleResendOtp()}
                disabled={loading}
                className="text-sm font-semibold text-violet-600 transition hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Please wait..." : "Resend OTP"}
              </button>
            </div>

            {message && (
              <p role="status" className="text-sm text-green-600">
                {message}
              </p>
            )}

            {error && (
              <p role="alert" className="text-sm text-red-600">
                {error}
              </p>
            )}

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => {
                  setStep("email");
                  setOtp("");
                  setError("");
                  setMessage("");
                }}
                disabled={loading}
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={loading || otp.length !== 6}
                className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </div>
          </form>
        )}
      </div>
    </BaseModal>
  );
};

export default ChangeCompanyEmailModal;