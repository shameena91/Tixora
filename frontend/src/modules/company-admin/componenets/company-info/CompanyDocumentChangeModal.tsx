import {  useState, type FormEvent } from "react";
import { FileUp, X } from "lucide-react";

interface CompanyDocumentChangeModalProps {
  isOpen: boolean;
  documentType: string;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
}

const CompanyDocumentChangeModal = ({
  isOpen,
  documentType,
  onClose,
  onSubmit,
}: CompanyDocumentChangeModalProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  


  if (!isOpen) {
    return null;
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!file) {
      setError("Please select the new document.");
      return;
    }

    const formData = new FormData();
    formData.append("documentType", documentType);
    formData.append("document", file);

    if (reason.trim()) {
      formData.append("reason", reason.trim());
    }

    try {
      setLoading(true);
      setError("");

      await onSubmit(formData);
      onClose();
    } catch (error: unknown) {
  const message =
    typeof error === "string"
      ? error
      : error instanceof Error
        ? error.message
        : "Failed to submit document change request.";

  setError(message);
} finally {
  setLoading(false);
} 
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="document-change-title"
        className="w-full max-w-xl rounded-2xl bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2
              id="document-change-title"
              className="text-xl font-semibold text-slate-900"
            >
              Request Document Replacement
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Upload a new file for {documentType}.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close modal"
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-5 p-6">
            <div>
              <label
                htmlFor="replacement-document"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New Document
                <span className="ml-1 text-red-500">*</span>
              </label>

              <input
                id="replacement-document"
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                required
                disabled={loading}
                onChange={(event) =>
                  setFile(event.target.files?.[0] ?? null)
                }
                className="block w-full rounded-lg border border-slate-300 bg-white text-sm text-slate-600 file:mr-4 file:border-0 file:bg-slate-100 file:px-4 file:py-3 file:text-sm file:font-medium file:text-slate-700 hover:file:bg-slate-200"
              />

              <p className="mt-1.5 text-xs text-slate-500">
                Accepted formats: PDF, PNG, JPG, JPEG.
              </p>
            </div>

            <div>
              <label
                htmlFor="document-change-reason"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Reason for Change
                <span className="ml-1 font-normal text-slate-400">
                  (Optional)
                </span>
              </label>

              <textarea
                id="document-change-reason"
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Explain why you want to replace this document"
                rows={3}
                disabled={loading}
                className="w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 disabled:bg-slate-100"
              />
            </div>

            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !file}
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FileUp className="h-4 w-4" />
              {loading ? "Submitting..." : "Submit Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompanyDocumentChangeModal;