
import type { ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onClose: () => void;
  onSubmit?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
  isSubmitting?: boolean;
  submitDisabled?: boolean;
}

export default function BaseModal({
  isOpen,
  title,
  description,
  children,
  onClose,
  onSubmit,
  submitLabel = "Submit",
  cancelLabel = "Cancel",
  isSubmitting = false,
  submitDisabled = false,
}: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onMouseDown={(event) => {
        if (
          event.target === event.currentTarget &&
          !isSubmitting
        ) {
          onClose();
        }
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="base-modal-title"
        className="w-full max-w-lg rounded-xl bg-white shadow-xl"
      >
        <div className="border-b border-slate-200 px-6 py-4">
          <h2
            id="base-modal-title"
            className="text-lg font-semibold text-slate-900"
          >
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-slate-500">
              {description}
            </p>
          )}
        </div>

        <div className="px-6 py-5">
          {children}
        </div>

        <div className="flex justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            {cancelLabel}
          </button>

          {onSubmit && (
            <button
              type="button"
              onClick={onSubmit}
              disabled={isSubmitting || submitDisabled}
              className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? "Submitting..." : submitLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
