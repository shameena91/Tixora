import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Check,
  X,
  FileText,
  Building2,
} from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";

import BaseModal from "../../../../components/common/BaseModal";

import {
  fetchCompanyChangeRequestByIdThunk,
  reviewCompanyProfileChangeRequestThunk,
  reviewCompanyDocumentChangeRequestThunk,
} from "../../../../redux/slices/companyRrequest/companyRequestThunk";

import type {
  CompanyProfileField,
} from "../../../../redux/slices/companyRrequest/companyRequestTypes";

type RejectionTarget =
  | {
      type: "PROFILE";
      field: CompanyProfileField;
    }
  | {
      type: "DOCUMENT";
    }
  | null;

function CompanyUpdateRequestDetails() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { requestId } = useParams<{ requestId: string }>();

  const {
    companyChangeRequest,
    companyChangeRequestsLoading,
    companyChangeRequestsError,
    reviewCompanyChangeLoading,
    reviewCompanyChangeError,
  } = useAppSelector((state) => state.companyRequest);

  const [rejectionTarget, setRejectionTarget] =
    useState<RejectionTarget>(null);

  const [rejectionRemarks, setRejectionRemarks] = useState("");
  const [rejectionError, setRejectionError] = useState("");

  useEffect(() => {
    if (requestId) {
      dispatch(fetchCompanyChangeRequestByIdThunk(requestId));
    }
  }, [dispatch, requestId]);

  // Close the rejection modal
  const closeRejectionModal = () => {
    if (reviewCompanyChangeLoading) return;

    setRejectionTarget(null);
    setRejectionRemarks("");
    setRejectionError("");
  };

  // Profile field review
  const handleProfileReview = async (
    field: CompanyProfileField,
    decision: "APPROVED" | "REJECTED",
  ) => {
    if (!requestId) return;

    if (decision === "REJECTED") {
      setRejectionRemarks("");
      setRejectionError("");
      setRejectionTarget({
        type: "PROFILE",
        field,
      });
      return;
    }

    try {
      await dispatch(
        reviewCompanyProfileChangeRequestThunk({
          requestId,
          field,
          decision,
        }),
      ).unwrap();

      await dispatch(
        fetchCompanyChangeRequestByIdThunk(requestId),
      ).unwrap();
    } catch {
      // Error is stored in Redux state.
    }
  };

  // Document review
  const handleDocumentReview = async (
    decision: "APPROVE" | "REJECT",
  ) => {
    if (!requestId) return;

    if (decision === "REJECT") {
      setRejectionRemarks("");
      setRejectionError("");
      setRejectionTarget({
        type: "DOCUMENT",
      });
      return;
    }

    try {
      await dispatch(
        reviewCompanyDocumentChangeRequestThunk({
          requestId,
          decision,
        }),
      ).unwrap();

      await dispatch(
        fetchCompanyChangeRequestByIdThunk(requestId),
      ).unwrap();
    } catch {
      // Error is stored in Redux state.
    }
  };

  // Confirm rejection with remarks
  const handleConfirmRejection = async () => {
    if (!requestId || !rejectionTarget) return;

    const remarks = rejectionRemarks.trim();

    if (!remarks) {
      setRejectionError("Please enter rejection remarks.");
      return;
    }

    setRejectionError("");

    try {
      if (rejectionTarget.type === "PROFILE") {
        await dispatch(
          reviewCompanyProfileChangeRequestThunk({
            requestId,
            field: rejectionTarget.field,
            decision: "REJECTED",
            remarks,
          }),
        ).unwrap();
      } else {
        await dispatch(
          reviewCompanyDocumentChangeRequestThunk({
            requestId,
            decision: "REJECT",
            remarks,
          }),
        ).unwrap();
      }

      setRejectionTarget(null);
      setRejectionRemarks("");

      await dispatch(
        fetchCompanyChangeRequestByIdThunk(requestId),
      ).unwrap();
    } catch {
      // Keep the modal open if rejection fails.
    }
  };

  const formatLabel = (value: string) =>
    value
      .replace(/([A-Z])/g, " $1")
      .replace(/^./, (character) => character.toUpperCase());

  const formatDate = (value: string | Date) => {
    const date = new Date(value);

    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleString();
  };

  const statusClass = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-50 text-green-700";

      case "REJECTED":
        return "bg-red-50 text-red-700";

      case "PARTIALLY_APPROVED":
        return "bg-purple-50 text-purple-700";

      default:
        return "bg-amber-50 text-amber-700";
    }
  };

  if (companyChangeRequestsLoading && !companyChangeRequest) {
    return (
      <div className="p-8 text-center text-sm text-gray-500">
        Loading request details...
      </div>
    );
  }

  if (!companyChangeRequestsLoading && !companyChangeRequest) {
    return (
      <div className="min-h-screen bg-[#faf7ff] p-6">
        <button
          type="button"
          onClick={() => navigate("/super-admin/company-requests")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-[#7C3AED]"
        >
          <ArrowLeft size={16} />
          Back to Company Requests
        </button>

        <div className="rounded-xl border border-gray-100 bg-white p-8 text-center">
          <p className="font-medium text-gray-700">
            {companyChangeRequestsError ||
              "Company update request not found"}
          </p>
        </div>
      </div>
    );
  }

  if (!companyChangeRequest) return null;

  const request = companyChangeRequest;
  const isPending = request.status === "PENDING";

  return (
    <div className="min-h-screen bg-[#faf7ff] px-4 py-6 text-[#182238] sm:px-6 sm:py-8">
      <main className="mx-auto max-w-6xl">
        {/* Back navigation */}

        <button
          type="button"
          onClick={() => navigate("/super-admin/company-requests")}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-[#7C3AED] hover:underline"
        >
          <ArrowLeft size={17} />
          Back to Company Requests
        </button>

        {/* Page heading */}

        <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
          <div>
            <h1 className="text-2xl font-bold sm:text-3xl">
              Update Request Details
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Review the requested company changes.
            </p>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${statusClass(request.status)}`}
          >
            {request.status.replaceAll("_", " ")}
          </span>
        </div>

        {/* Request information */}

        <div className="mb-6 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <div className="rounded-xl bg-purple-50 p-3 text-[#7C3AED]">
              {request.updateType === "PROFILE" ? (
                <Building2 size={22} />
              ) : (
                <FileText size={22} />
              )}
            </div>

            <div>
              <h2 className="font-semibold">
                {request.updateType === "PROFILE"
                  ? "Profile Update"
                  : "Document Change"}
              </h2>

              <p className="text-sm text-gray-500">
                Request ID: {request.requestId}
              </p>
            </div>
          </div>

          <div className="grid gap-5 border-t border-gray-100 pt-5 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm text-gray-500">Company Name</p>
              <p className="mt-1 break-words text-sm font-medium">
                {request.companyName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Admin Name</p>
              <p className="mt-1 break-words text-sm font-medium">
                {request.adminName}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Company ID</p>
              <p className="mt-1 break-all text-sm font-medium">
                {request.companyId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Account ID</p>
              <p className="mt-1 break-all text-sm font-medium">
                {request.accountId}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Submitted On</p>
              <p className="mt-1 text-sm font-medium">
                {formatDate(request.submittedAt)}
              </p>
            </div>

            {request.reviewedAt && (
              <div>
                <p className="text-sm text-gray-500">Reviewed On</p>
                <p className="mt-1 text-sm font-medium">
                  {formatDate(request.reviewedAt)}
                </p>
              </div>
            )}

            {request.reviewRemarks && (
              <div className="sm:col-span-2">
                <p className="text-sm text-gray-500">
                  Review Remarks
                </p>
                <p className="mt-1 text-sm">
                  {request.reviewRemarks}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Profile Update details */}

        {request.updateType === "PROFILE" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Requested Profile Changes
            </h2>

            <div className="space-y-5">
              {request.changes.map((change) => (
                <div
                  key={change.field}
                  className="rounded-xl border border-gray-200 p-4 sm:p-5"
                >
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                    <h3 className="font-semibold">
                      {formatLabel(change.field)}
                    </h3>

                    <span
                      className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass(change.status)}`}
                    >
                      {change.status}
                    </span>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-lg bg-gray-50 p-3">
                      <p className="text-xs text-gray-500">
                        Current Value
                      </p>

                      <p className="mt-2 break-words text-sm">
                        {change.oldValue || "—"}
                      </p>
                    </div>

                    <div className="rounded-lg bg-purple-50 p-3">
                      <p className="text-xs text-gray-500">
                        Requested Value
                      </p>

                      <p className="mt-2 break-words text-sm font-medium">
                        {change.newValue}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-xs text-gray-500">
                      Reason for Change
                    </p>

                    <p className="mt-1 text-sm">
                      {change.reason || "No reason provided"}
                    </p>
                  </div>

                  {change.reviewRemarks && (
                    <div className="mt-3">
                      <p className="text-xs text-gray-500">
                        Review Remarks
                      </p>

                      <p className="mt-1 text-sm">
                        {change.reviewRemarks}
                      </p>
                    </div>
                  )}

                  {isPending && change.status === "PENDING" && (
                    <div className="mt-5 flex flex-wrap gap-3 border-t border-gray-100 pt-4">
                      <button
                        type="button"
                        disabled={reviewCompanyChangeLoading}
                        onClick={() =>
                          handleProfileReview(
                            change.field,
                            "APPROVED",
                          )
                        }
                        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <Check size={16} />
                        Approve
                      </button>

                      <button
                        type="button"
                        disabled={reviewCompanyChangeLoading}
                        onClick={() =>
                          handleProfileReview(
                            change.field,
                            "REJECTED",
                          )
                        }
                        className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <X size={16} />
                        Reject
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Change details */}

        {request.updateType === "DOCUMENT" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-lg font-semibold">
              Document Change Details
            </h2>

            <div className="space-y-5">
              <div>
                <p className="text-sm text-gray-500">
                  Document Type
                </p>
                <p className="mt-1 font-medium">
                  {formatLabel(request.documentType)}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Reason for Change
                </p>
                <p className="mt-1 text-sm">
                  {request.reason || "No reason provided"}
                </p>
              </div>

              {/* Previous Document */}

              <div className="flex flex-col justify-between gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold">
                    Previous Document
                  </p>

                  <p className="mt-1 break-all text-sm text-gray-600">
                    {request.oldDocumentName || "Not available"}
                  </p>
                </div>

                {request.oldDocumentUrl && (
                  <a
                    href={request.oldDocumentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit shrink-0 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-[#7C3AED] transition hover:bg-purple-50"
                  >
                    View Document
                  </a>
                )}
              </div>

              {/* New Document */}

              <div className="flex flex-col justify-between gap-3 rounded-lg border border-purple-200 bg-purple-50 p-4 sm:flex-row sm:items-center">
                <div>
                  <p className="text-sm font-semibold">
                    New Document
                  </p>

                  <p className="mt-1 break-all text-sm text-gray-600">
                    {request.newDocumentName}
                  </p>
                </div>

                <a
                  href={request.newDocumentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-fit shrink-0 rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white transition hover:bg-purple-700"
                >
                  View Document
                </a>
              </div>

              {/* Approve / Reject */}

              {isPending && (
                <div className="flex flex-wrap justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    disabled={reviewCompanyChangeLoading}
                    onClick={() =>
                      handleDocumentReview("REJECT")
                    }
                    className="flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <X size={16} />
                    Reject Document
                  </button>

                  <button
                    type="button"
                    disabled={reviewCompanyChangeLoading}
                    onClick={() =>
                      handleDocumentReview("APPROVE")
                    }
                    className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check size={16} />
                    Approve Document
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Review error */}

        {reviewCompanyChangeError && !rejectionTarget && (
          <p className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
            {reviewCompanyChangeError}
          </p>
        )}
      </main>

      {/* Rejection Modal */}

      <BaseModal
        isOpen={rejectionTarget !== null}
        title="Reject Request"
        description={
          rejectionTarget?.type === "PROFILE"
            ? "Provide a reason for rejecting this profile field."
            : "Provide a reason for rejecting this document change."
        }
        onClose={closeRejectionModal}
        onSubmit={handleConfirmRejection}
        submitLabel="Confirm Rejection"
        cancelLabel="Cancel"
        isSubmitting={reviewCompanyChangeLoading}
        submitDisabled={!rejectionRemarks.trim()}
      >
        <label
          htmlFor="rejectionRemarks"
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          Rejection Remarks
        </label>

        <textarea
          id="rejectionRemarks"
          value={rejectionRemarks}
          onChange={(event) => {
            setRejectionRemarks(event.target.value);
            setRejectionError("");
          }}
          placeholder="Enter the reason for rejection..."
          rows={4}
          maxLength={500}
          autoFocus
          className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
        />

        <div className="mt-2 flex justify-between gap-3">
          {rejectionError || reviewCompanyChangeError ? (
            <p className="text-sm text-red-600">
              {rejectionError || reviewCompanyChangeError}
            </p>
          ) : (
            <span />
          )}

          <p className="shrink-0 text-xs text-slate-400">
            {rejectionRemarks.length}/500
          </p>
        </div>
      </BaseModal>
    </div>
  );
}

export default CompanyUpdateRequestDetails;