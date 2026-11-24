import { AlertTriangle, X } from "lucide-react";

interface EmployeeStatusModalProps {
  isOpen: boolean;
  employeeName: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING";
  onClose: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
}

const EmployeeStatusModal = ({
  isOpen,
  employeeName,
  status,
  onClose,
  onConfirm,
  isLoading = false,
}: EmployeeStatusModalProps) => {
  if (!isOpen) return null;

  const isActive = status === "ACTIVE";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">

        <div className="flex items-start justify-between">
          <div
            className={`rounded-full p-3 ${
              isActive
                ? "bg-red-50 text-red-600"
                : "bg-emerald-50 text-emerald-600"
            }`}
          >
            <AlertTriangle size={24} />
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100"
          >
            <X size={20} />
          </button>
        </div>

        <h2 className="mt-4 text-lg font-bold text-gray-900">
          {isActive ? "Deactivate Employee?" : "Activate Employee?"}
        </h2>

        <p className="mt-2 text-sm leading-6 text-gray-500">
          {isActive
            ? `Are you sure you want to deactivate ${employeeName}? The employee will no longer be able to access the employee portal.`
            : `Are you sure you want to activate ${employeeName}? The employee will regain access to the employee portal.`}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={isLoading}
            className="rounded-lg border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isLoading}
            className={`rounded-lg px-4 py-2.5 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-60 ${
              isActive
                ? "bg-red-600 hover:bg-red-700"
                : "bg-emerald-600 hover:bg-emerald-700"
            }`}
          >
            {isLoading
              ? "Processing..."
              : isActive
                ? "Yes, Deactivate"
                : "Yes, Activate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmployeeStatusModal;