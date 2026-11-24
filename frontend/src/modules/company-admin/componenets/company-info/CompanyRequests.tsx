import type {
  CompanyChangeRequestDetails,
} from "../../../../redux/slices/companyRrequest/companyRequestTypes";

import RequestHistoryItem from "./RequestHistoryItem";

interface CompanyRequestsProps {
  requests: CompanyChangeRequestDetails[];
  loading: boolean;
  error: string | null;
}

const CompanyRequests = ({
  requests,
  loading,
  error,
}: CompanyRequestsProps) => {
  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h3 className="text-base font-semibold text-slate-900">
          Company Update Requests
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          View and track the status of your submitted company update requests.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
          <p className="text-sm text-slate-500">
            Loading your requests...
          </p>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {/* Empty */}
      {!loading && !error && requests.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white px-6 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100">
            <span className="text-xl text-slate-500">📄</span>
          </div>

          <h4 className="mt-4 text-sm font-semibold text-slate-800">
            No update requests yet
          </h4>

          <p className="mt-1 text-sm text-slate-500">
            Your submitted company profile and document requests will appear here.
          </p>
        </div>
      )}

      {/* Request Cards */}
    {/* Request Cards */}
{!loading && !error && requests.length > 0 && (
  <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-2">
    {requests.map((request) => (
      <RequestHistoryItem
        key={request.id ?? request.requestId}
        request={request}
      />
    ))}
  </div>
)}
    </div>
  );
};

export default CompanyRequests;