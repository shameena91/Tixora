
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useParams } from "react-router-dom";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import BaseModal from "../../../../components/common/BaseModal";
import RequestMoreInfoModal from "../../components/commonComponenets/RemarksModal";

import {
  getCompanyDocumentDownloadUrl,
  getCompanyDocumentViewUrl,
  rejectCompanyDocument,
  verifyCompanyDocument,
} from "../../services/superadminServices";

import CompanyRequestTimeline from "../../components/companyRequests/CompanyRequestTimeline";

import {
  approveCompanyRequestThunk,
  fetchCompanyRequestById,
  moreInfoCompanyRequestThunk,
  rejectCompanyRequestThunk,
} from "../../../../redux/slices/companyRrequest/companyRequestThunk";

type Tab = "company" | "documents" | "timeline";

const formatLabel = (
  value: string | null | undefined,
) => {
  if (!value) return "-";

  return value
    .toLowerCase()
    .split("_")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1),
    )
    .join(" ");
};

function CompanyRequestDetails() {
  const [showMoreInfoModal, setShowMoreInfoModal] =
    useState(false);

  const [activeTab, setActiveTab] =
    useState<Tab>("company");

  const [isRejectModalOpen, setIsRejectModalOpen] =
    useState(false);




    const [isCompanyRejectModalOpen, setIsCompanyRejectModalOpen] =
  useState(false);

const [companyRejectionReason, setCompanyRejectionReason] =
  useState("");

const [isRejectingCompany, setIsRejectingCompany] =
  useState(false);

  const [selectedDocument, setSelectedDocument] =
    useState<{
      companyRequestId: string;
      documentType: string;
    } | null>(null);

  const [rejectionReason, setRejectionReason] =
    useState("");

  const [isRejectingDocument, setIsRejectingDocument] =
    useState(false);

  const { companyRequestId } = useParams();
  const dispatch = useAppDispatch();

  const {
    companyRequest,
    loading,
    error,
  } = useAppSelector((state) => state.companyRequest);

  useEffect(() => {
    if (companyRequestId) {
      dispatch(fetchCompanyRequestById(companyRequestId));
    }
  }, [companyRequestId, dispatch]);

  const handleViewDocument = async (
    requestId: string,
    documentType: string,
  ) => {
    try {
      const response = await getCompanyDocumentViewUrl(
        requestId,
        documentType,
      );

      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error("Failed to view document:", error);
    }
  };

  const handleDownloadDocument = async (
    requestId: string,
    documentType: string,
  ) => {
    try {
      const response = await getCompanyDocumentDownloadUrl(
        requestId,
        documentType,
      );

      const link = document.createElement("a");
      link.href = response.data.url;
      link.download = "";

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download document:", error);
    }
  };



const handleRejectCompanyRequest = async () => {
  const reason = companyRejectionReason.trim();

  if (!companyRequest || !reason || isRejectingCompany) {
    return;
  }

  setIsRejectingCompany(true);

  try {
    await dispatch(
      rejectCompanyRequestThunk({
        companyRequestId: companyRequest.id,
        rejectionReason: reason,
      }),
    ).unwrap();

    setIsCompanyRejectModalOpen(false);
    setCompanyRejectionReason("");

    if (companyRequestId) {
      await dispatch(
        fetchCompanyRequestById(companyRequestId),
      ).unwrap();
    }
  } catch (error) {
    console.error(
      "Failed to reject company request:",
      error,
    );
  } finally {
    setIsRejectingCompany(false);
  }
};



  const handleVerify = async (
    requestId: string,
    documentType: string,
  ) => {
    try {
      await verifyCompanyDocument(requestId, documentType);
      await dispatch(fetchCompanyRequestById(requestId));
    } catch (error) {
      console.error("Failed to verify document:", error);
    }
  };

  const closeRejectModal = () => {
    if (isRejectingDocument) return;

    setIsRejectModalOpen(false);
    setSelectedDocument(null);
    setRejectionReason("");
  };

  const handleReject = async () => {
    if (
      !selectedDocument ||
      !rejectionReason.trim() ||
      isRejectingDocument
    ) {
      return;
    }

    setIsRejectingDocument(true);

    try {
      await rejectCompanyDocument(
        selectedDocument.companyRequestId,
        selectedDocument.documentType,
        rejectionReason.trim(),
      );

      await dispatch(
        fetchCompanyRequestById(
          selectedDocument.companyRequestId,
        ),
      );

      setIsRejectModalOpen(false);
      setSelectedDocument(null);
      setRejectionReason("");
    } catch (error) {
      console.error("Failed to reject document:", error);
    } finally {
      setIsRejectingDocument(false);
    }
  };

  if (!companyRequest && loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-gray-200 border-t-[#7C3AED]" />
          <p className="mt-3 text-sm text-gray-500">
            Loading company request...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!companyRequest) {
    return (
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <p className="text-sm text-gray-500">
          Company request not found.
        </p>
      </div>
    );
  }

  const requestStatus = formatLabel(companyRequest.status);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="h-1 bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA]" />

        <div className="p-6">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                  Request {companyRequest.company.requestId}
                </h1>

                <StatusBadge
                  value={
                    companyRequest.status === "MORE_INFO_REQUIRED"
                      ? "On Hold"
                      : requestStatus
                  }
                  type={getRequestStatusType(companyRequest.status)}
                />
              </div>

              <p className="mt-1 text-sm text-gray-500">
                Review and verify the company registration request.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {companyRequest.status === "PENDING" && (
                <button
                  type="button"
                  onClick={() => setShowMoreInfoModal(true)}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-300 hover:bg-gray-50"
                >
                  Request More Information
                </button>
              )}

              {(companyRequest.status === "PENDING" ||
                companyRequest.status === "MORE_INFO_REQUIRED") && (
                <>
               <button
  type="button"
  onClick={() => {
    setCompanyRejectionReason("");
    setIsCompanyRejectModalOpen(true);
  }}
  disabled={loading || isRejectingCompany}
  className="rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
>
  Reject Request
</button>

                  <button
                    type="button"
                    onClick={() =>
                      dispatch(
                        approveCompanyRequestThunk(companyRequest.id),
                      )
                    }
                    disabled={loading}
                    className="rounded-xl bg-[#7C3AED] px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {loading ? "Approving..." : "Approve Request"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <SummaryCard
          title="Request ID"
          value={companyRequest.company.requestId}
          subtitle="Company registration request"
          icon="◫"
          iconType="purple"
        />

        <SummaryCard
          title="Submitted On"
          value={new Date(companyRequest.createdAt).toLocaleDateString()}
          subtitle="Registration request date"
          icon="◷"
          iconType="blue"
        />

        <SummaryCard
          title="Requested By"
          value={companyRequest.admin.name}
          subtitle="Primary company administrator"
          icon="◎"
          iconType="default"
        />
      </div>

      {/* Tabs */}
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <div className="flex min-w-max border-b border-gray-100 px-4 sm:px-6">
            <TabButton
              label="Company Details"
              active={activeTab === "company"}
              onClick={() => setActiveTab("company")}
            />

            <TabButton
              label="Documents & Verifications"
              active={activeTab === "documents"}
              onClick={() => setActiveTab("documents")}
            />

            <TabButton
              label="Timeline"
              active={activeTab === "timeline"}
              onClick={() => setActiveTab("timeline")}
            />
          </div>
        </div>

        {/* Company Details */}
        {activeTab === "company" && (
          <div className="p-6">
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
              <div className="xl:col-span-2">
                <InfoCard
                  title="Company Information"
                  subtitle="Company, administrator and registered address"
                  accent="purple"
                >
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <div className="space-y-4">
                      <InfoRow label="Company Name" value={companyRequest.company.companyName} />
                      <InfoRow label="Registration Number" value={companyRequest.company.registrationNumber} />
                      <InfoRow label="Company Email" value={companyRequest.company.companyEmail} />
                      <InfoRow label="Phone" value={companyRequest.company.phone} />
                      <InfoRow label="Company Type" value={formatLabel(companyRequest.company.companyType)} />
                      <InfoRow label="Employees" value={String(companyRequest.company.numberOfEmployees ?? "-")} />
                    </div>

                    <div className="space-y-4 md:border-l md:border-gray-100 md:pl-8">
                      <div className="mb-1">
                        <p className="text-sm font-semibold text-gray-900">Admin Details</p>
                        <p className="mt-1 text-xs text-gray-400">Primary administrator</p>
                      </div>

                      <InfoRow label="Name" value={companyRequest.admin.name} />
                      <InfoRow label="Email" value={companyRequest.admin.email} />
                      <InfoRow label="Phone" value={companyRequest.admin.phone} />
                      <InfoRow label="Designation" value={companyRequest.admin.designation} />
                    </div>
                  </div>

                  <div className="my-7 border-t border-gray-100" />

                  <div>
                    <p className="text-sm font-semibold text-gray-900">Registered Address</p>
                    <p className="mt-1 text-xs text-gray-400">Company registered location</p>

                    <div className="mt-5 grid grid-cols-1 gap-x-8 gap-y-4 md:grid-cols-2">
                      <InfoRow label="Address" value={companyRequest.location.address} />
                      <InfoRow label="City" value={companyRequest.location.city} />
                      <InfoRow label="State" value={companyRequest.location.state} />
                      <InfoRow label="Country" value={companyRequest.location.country} />
                      <InfoRow label="Postal Code" value={companyRequest.location.postalCode} />
                    </div>
                  </div>
                </InfoCard>
              </div>

              <div className="space-y-6">
                <InfoCard
                  title="Request Status"
                  subtitle="Current registration request status"
                  accent="blue"
                >
                  <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                        ◫
                      </div>

                      <div>
                        <p className="text-xs font-medium text-gray-500">Current Status</p>
                        <p className="mt-1 text-sm font-semibold text-gray-900">
                          {companyRequest.status === "MORE_INFO_REQUIRED"
                            ? "On Hold"
                            : requestStatus}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-4">
                    <InfoRow label="Request ID" value={companyRequest.company.requestId} />
                    <InfoRow label="Submitted On" value={new Date(companyRequest.createdAt).toLocaleDateString()} />
                    <InfoRow label="Requested By" value={companyRequest.admin.name} />
                  </div>
                </InfoCard>
              </div>
            </div>
          </div>
        )}

        {/* Documents */}
        {activeTab === "documents" && (
          <div className="p-6">
            <InfoCard
              title="Documents & Verifications"
              subtitle="Review and verify the documents submitted by the company"
              accent="purple"
            >
              <div className="overflow-x-auto">
                <table className="w-full min-w-[850px] text-left text-sm">
                  <thead className="border-b border-gray-100 bg-gray-50">
                    <tr>
                      <TableHeader>Document Type</TableHeader>
                      <TableHeader>Document</TableHeader>
                      <TableHeader>Preview</TableHeader>
                      <TableHeader>Download</TableHeader>
                      <TableHeader>Verification Status</TableHeader>
                      <TableHeader>Action</TableHeader>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {companyRequest.documents.map((document) => (
                      <tr key={document.fileUrl} className="transition hover:bg-gray-50">
                        <td className="px-5 py-4 font-medium text-gray-900">
                          {formatLabel(document.documentType)}
                        </td>

                        <td className="px-5 py-4 text-gray-600">
                          {document.fileName}
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleViewDocument(companyRequest.id, document.documentType)
                            }
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#7C3AED] transition hover:bg-purple-50"
                          >
                            View
                          </button>
                        </td>

                        <td className="px-5 py-4">
                          <button
                            type="button"
                            onClick={() =>
                              handleDownloadDocument(companyRequest.id, document.documentType)
                            }
                            className="rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 transition hover:bg-gray-100"
                          >
                            Download
                          </button>
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge
                            value={formatLabel(document.verificationStatus)}
                            type={getDocumentStatusType(document.verificationStatus)}
                          />
                        </td>

                        <td className="px-5 py-4">
                          {document.verificationStatus === "PENDING" && (
                            <div className="flex gap-2">
                              <button
                                type="button"
                                onClick={() =>
                                  handleVerify(companyRequest.id, document.documentType)
                                }
                                className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 transition hover:bg-emerald-100"
                              >
                                Accept
                              </button>

                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedDocument({
                                    companyRequestId: companyRequest.id,
                                    documentType: document.documentType,
                                  });
                                  setRejectionReason("");
                                  setIsRejectModalOpen(true);
                                }}
                                className="rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 transition hover:bg-red-100"
                              >
                                Reject
                              </button>
                            </div>
                          )}

                          {(document.verificationStatus === "VERIFIED" ||
                            document.verificationStatus === "REJECTED") && (
                            <span className="text-xs text-gray-400">No action</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </InfoCard>
          </div>
        )}

        {/* Timeline */}
        {activeTab === "timeline" && (
          <div className="p-6">
            <InfoCard
              title="Request Timeline"
              subtitle="History of actions performed on this request"
              accent="blue"
            >
              <CompanyRequestTimeline companyRequestId={companyRequest.id} />
            </InfoCard>
          </div>
        )}
      </div>

      {/* Document Rejection Modal */}
     
{/* Company Request Rejection Modal */}
<BaseModal
  isOpen={isCompanyRejectModalOpen}
  title="Reject Company Request"
  description="Please provide a reason for rejecting this company registration request."
  onClose={() => {
    if (isRejectingCompany) return;

    setIsCompanyRejectModalOpen(false);
    setCompanyRejectionReason("");
  }}
  onSubmit={handleRejectCompanyRequest}
  submitLabel="Reject Request"
  cancelLabel="Cancel"
  isSubmitting={isRejectingCompany}
  submitDisabled={!companyRejectionReason.trim()}
>
  <label
    htmlFor="companyRejectionReason"
    className="mb-2 block text-sm font-medium text-gray-700"
  >
    Rejection Reason *
  </label>

  <textarea
    id="companyRejectionReason"
    value={companyRejectionReason}
    onChange={(event) =>
      setCompanyRejectionReason(event.target.value)
    }
    placeholder="Explain why this company request is being rejected..."
    rows={4}
    maxLength={1000}
    required
    className="w-full resize-y rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-[#7C3AED] focus:ring-2 focus:ring-purple-100"
  />

  <p className="mt-1 text-right text-xs text-gray-400">
    {companyRejectionReason.length}/1000 characters
  </p>
</BaseModal>


      {/* Request More Information Modal */}
      <RequestMoreInfoModal
        isOpen={showMoreInfoModal}
        onClose={() => setShowMoreInfoModal(false)}
        onSubmit={async (remarks) => {
          if (!companyRequestId) return;

          const result = await dispatch(
            moreInfoCompanyRequestThunk({
              companyRequestId,
              remarks,
            }),
          );

          if (moreInfoCompanyRequestThunk.fulfilled.match(result)) {
            setShowMoreInfoModal(false);
          }
        }}
        loading={loading}
      />
    </div>
  );
}

/* Summary Card */
interface SummaryCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: string;
  iconType: "success" | "default" | "blue" | "purple";
}

const SummaryCard = ({
  title,
  value,
  subtitle,
  icon,
  iconType,
}: SummaryCardProps) => {
  const iconClasses = {
    success: "bg-emerald-50 text-emerald-600 border-emerald-100",
    default: "bg-gray-50 text-gray-600 border-gray-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    purple: "bg-purple-50 text-[#7C3AED] border-purple-100",
  };

  return (
    <div className="group rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 truncate text-xl font-semibold tracking-tight text-gray-900">{value}</p>
          <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
        </div>

        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border text-sm font-semibold ${iconClasses[iconType]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

/* Info Card */
interface InfoCardProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  accent: "purple" | "blue" | "green";
}

const InfoCard = ({
  title,
  subtitle,
  children,
  accent,
}: InfoCardProps) => {
  const accentClasses = {
    purple: "bg-[#7C3AED]",
    blue: "bg-blue-500",
    green: "bg-emerald-500",
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className={`h-1 ${accentClasses[accent]}`} />
      <div className="p-6">
        <h2 className="text-base font-semibold text-gray-900">{title}</h2>
        <p className="mt-1 text-xs text-gray-400">{subtitle}</p>
        <div className="mt-5">{children}</div>
      </div>
    </div>
  );
};

/* Info Row */
interface InfoRowProps {
  label: string;
  value: string;
}

const InfoRow = ({ label, value }: InfoRowProps) => (
  <div className="flex items-center justify-between gap-4 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
    <span className="shrink-0 text-sm text-gray-500">{label}</span>
    <span className="max-w-[65%] text-right text-sm font-medium text-gray-900">{value}</span>
  </div>
);

/* Tab Button */
interface TabButtonProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const TabButton = ({ label, active, onClick }: TabButtonProps) => (
  <button
    type="button"
    onClick={onClick}
    className={`relative px-5 py-4 text-sm font-medium transition ${
      active ? "text-[#7C3AED]" : "text-gray-500 hover:text-gray-800"
    }`}
  >
    {label}
    {active && (
      <span className="absolute inset-x-5 bottom-0 h-0.5 rounded-full bg-[#7C3AED]" />
    )}
  </button>
);

/* Status Badge */
interface StatusBadgeProps {
  value: string;
  type: "active" | "expired" | "warning" | "rejected";
}

const StatusBadge = ({ value, type }: StatusBadgeProps) => {
  const classes = {
    active: "bg-emerald-50 text-emerald-700 border border-emerald-100",
    expired: "bg-gray-100 text-gray-600 border border-gray-200",
    warning: "bg-amber-50 text-amber-700 border border-amber-100",
    rejected: "bg-red-50 text-red-700 border border-red-100",
  };

  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${classes[type]}`}>
      {value}
    </span>
  );
};

const getRequestStatusType = (
  status: string,
): StatusBadgeProps["type"] => {
  switch (status) {
    case "APPROVED":
      return "active";
    case "REJECTED":
      return "rejected";
    case "MORE_INFO_REQUIRED":
      return "warning";
    case "PENDING":
    default:
      return "warning";
  }
};

const getDocumentStatusType = (
  status: string,
): StatusBadgeProps["type"] => {
  switch (status) {
    case "VERIFIED":
      return "active";
    case "REJECTED":
      return "rejected";
    case "PENDING":
    default:
      return "warning";
  }
};

/* Table Header */
const TableHeader = ({ children }: { children: ReactNode }) => (
  <th className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-gray-500">
    {children}
  </th>
);

export default CompanyRequestDetails;
