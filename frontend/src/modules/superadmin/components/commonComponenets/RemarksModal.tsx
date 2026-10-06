import { useState } from "react";

interface RequestMoreInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (remarks: string) => void;
  loading?: boolean;
}

const RequestMoreInfoModal = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
}: RequestMoreInfoModalProps) => {
  const [remarks, setRemarks] = useState("");

  if (!isOpen) {
    return null;
  }

  const handleSubmit = () => {
    if (!remarks.trim()) {
      return;
    }

    onSubmit(remarks.trim());
  };

  const handleClose = () => {
    setRemarks("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Request More Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Please provide the information or documents required from the
            company.
          </p>
        </div>

        {/* Remarks */}
        <div className="mt-5">
          <label
            htmlFor="remarks"
            className="mb-2 block text-sm font-medium text-gray-700"
          >
            Remarks
          </label>

          <textarea
            id="remarks"
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            placeholder="Enter the information required from the company..."
            rows={5}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#7C3AED] focus:ring-1 focus:ring-[#7C3AED] disabled:bg-gray-100"
          />
        </div>

        {/* Actions */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={handleClose}
            disabled={loading}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!remarks.trim() || loading}
            className="rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Requesting..." : "Request Information"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestMoreInfoModal;