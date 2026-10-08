import RequestHistoryItem from "./RequestHistoryItem";

const CompanyRequests = () => {
  return (
    <div className="space-y-4 rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm">
      <div>
        <h3 className="text-sm font-bold text-slate-900">
          Recent Company Requests
        </h3>

        <p className="mt-0.5 text-xs text-slate-500">
          Track all ongoing field update requests submitted for
          Super Admin review.
        </p>
      </div>

      <div className="space-y-3 pt-2">
        <RequestHistoryItem
          title="Request to update Legal Business Name"
          date="2 days ago"
          status="Pending"
          statusType="pending"
        />

        <RequestHistoryItem
          title="Industry Category Re-classification"
          date="1 week ago"
          status="Under Review"
          statusType="review"
        />

        <RequestHistoryItem
          title="Primary Email Domain Update"
          date="3 weeks ago"
          status="Approved"
          statusType="approved"
        />
      </div>
    </div>
  );
};

export default CompanyRequests;