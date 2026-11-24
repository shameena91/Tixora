import type {
  CompanyChangeRequestDetails,
} from "../../../../redux/slices/companyRrequest/companyRequestTypes";

interface RequestHistoryItemProps {
  request: CompanyChangeRequestDetails;
}

const RequestHistoryItem = ({ request }: RequestHistoryItemProps) => {
  const isProfileRequest = request.updateType === "PROFILE";

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-amber-50 text-amber-700 ring-amber-200";

      case "UNDER_REVIEW":
        return "bg-blue-50 text-blue-700 ring-blue-200";

      case "APPROVED":
        return "bg-emerald-50 text-emerald-700 ring-emerald-200";

      case "REJECTED":
        return "bg-red-50 text-red-700 ring-red-200";

      case "PARTIALLY_APPROVED":
        return "bg-purple-50 text-purple-700 ring-purple-200";

      default:
        return "bg-slate-100 text-slate-600 ring-slate-200";
    }
  };

  const formattedDate = new Date(request.createdAt).toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    },
  );

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300 hover:shadow-md">
      {/* Card Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 px-5 py-4">
        <div className="flex items-start gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
              isProfileRequest
                ? "bg-blue-50 text-blue-600"
                : "bg-violet-50 text-violet-600"
            }`}
          >
            {isProfileRequest ? (
              <span className="text-lg">✎</span>
            ) : (
              <span className="text-lg">▤</span>
            )}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-800">
              {isProfileRequest
                ? "Profile Update Request"
                : "Document Update Request"}
            </h4>

            <p className="mt-1 text-xs text-slate-500">
              Request ID:{" "}
              <span className="font-medium text-slate-700">
                {request.requestId}
              </span>
            </p>
          </div>
        </div>

        <span
          className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${getStatusStyle(
            request.status,
          )}`}
        >
          {request.status.replaceAll("_", " ")}
        </span>
      </div>

      {/* Card Content */}
      <div className="space-y-4 px-5 py-4">
        {/* Submitted Date */}
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <span>Submitted on</span>
          <span className="font-medium text-slate-700">
            {formattedDate}
          </span>
        </div>

        {/* Profile Changes */}
        {isProfileRequest && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Requested Changes
            </p>

            <div className="space-y-2">
              {request.changes.map((change, index) => (
                <div
                  key={`${change.field}-${index}`}
                  className="grid grid-cols-1 gap-2 rounded-lg bg-slate-50 p-3 sm:grid-cols-[1fr_1fr_1fr] sm:items-center"
                >
                  <p className="text-xs font-semibold text-slate-700">
                    {change.field}
                  </p>

                  <div>
                    <p className="text-[10px] font-medium uppercase text-slate-400">
                      Current Value
                    </p>
                    <p className="mt-1 break-words text-sm text-slate-600">
                      {change.oldValue ?? "Not available"}
                    </p>
                  </div>

                  <div>
                    <p className="text-[10px] font-medium uppercase text-slate-400">
                      Requested Value
                    </p>
                    <p className="mt-1 break-words text-sm font-medium text-blue-700">
                      {change.newValue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Changes */}
        {!isProfileRequest && (
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Document Details
            </p>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Document Type
                </p>
                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {request.documentType.replaceAll("_", " ")}
                </p>
              </div>

              <div className="rounded-lg border border-slate-200 p-3">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  Previous Document
                </p>
                <p className="mt-1 break-all text-sm text-slate-600">
                  {request.oldDocumentName ?? "No previous document"}
                </p>
              </div>

              <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-3 sm:col-span-2">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  New Document
                </p>
                <p className="mt-1 break-all text-sm font-medium text-blue-700">
                  {request.newDocumentName}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Review Remarks */}
        {request.reviewRemarks && (
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold text-slate-700">
              Review Remarks
            </p>
            <p className="mt-1 text-sm text-slate-600">
              {request.reviewRemarks}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RequestHistoryItem;