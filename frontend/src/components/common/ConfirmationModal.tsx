import React from "react";

export interface ConfirmationModalData {
  title: string;
  message: string;
  confirmText: string;
  loadingText: string;
}
interface ConfirmationModalProps {
  open: boolean;
  loading: boolean;
  onClose: () => void;
  onConfirm: () => void;
  modalData: ConfirmationModalData;
}

const DeactivateSubscriptionModal: React.FC<
  ConfirmationModalProps
> = ({
  open,
  loading,
  onClose,
  onConfirm,
    modalData,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-gray-900">
          {modalData.title}
        </h2>

        <p className="mt-2 text-sm text-gray-500">
 {modalData.message}          
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
             {loading
              ? modalData.loadingText
              : modalData.confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeactivateSubscriptionModal;