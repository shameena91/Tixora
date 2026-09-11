import { useEffect } from "react";
import DataTable, {
  type DataTableColumn,
} from "../../../components/common/Datatable";

// import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { fetchCompanyRequests } from "../../../redux/slices/companyrequestSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { useNavigate } from "react-router-dom";

interface CompanyRequest {
  id: string;
  companyName: string;
  adminName: string;
  status: "PENDING" | "APPROVED" | "REJECTED" | "MORE_INFO_REQUIRED";
  createdAt: string;
}

function CompanyRequests() {
  const dispatch = useAppDispatch();
  const { companyRequests, loading, error } = useAppSelector(
    (state) => state.companyRequest,
  );
  useEffect(() => {
    dispatch(fetchCompanyRequests());
  }, [dispatch]);
  const navigate = useNavigate();
  const columns: DataTableColumn<CompanyRequest>[] = [
    {
      header: "Company",
      accessor: "companyName",
    },
    {
      header: "Admin",
      accessor: "adminName",
    },
    {
      header: "Submitted On",
      accessor: "createdAt",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: unknown) => (
        <span
          className={`rounded-full px-3 py-1 text-xs font-medium ${
            value === "Pending"
              ? "bg-yellow-50 text-yellow-600"
              : value === "Approved"
                ? "bg-green-50 text-green-600"
                : "bg-red-50 text-red-600"
          }`}
        >
          {String(value)}
        </span>
      ),
    },
    {
      id: "action",
      header: "Action",
      accessor: "companyName",
      render: (_value: unknown, row: CompanyRequest) => (
        <button
          type="button"
          className="text-sm font-medium text-[#7C3AED] hover:underline"
          onClick={() => navigate(`/super-admin/company-requests/${row.id}`)}
        >
          View
        </button>
      ),
    },
  ];
  return (
    <div className="min-h-screen bg-[#faf7ff] text-[#182238]">
      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Company Requests</h1>

          <p className="mt-2 text-sm text-gray-500">
            Review and manage company registration requests.
          </p>
        </div>

        {/* Registration Requests */}
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">

  <div className="mb-6">
    <h2 className="text-lg font-semibold">
      Registration Requests
    </h2>

    <p className="mt-1 text-sm text-gray-500">
      View submitted company registration requests.
    </p>
  </div>

  {loading && (
    <p className="py-6 text-center text-sm text-gray-500">
      Loading company requests...
    </p>
  )}

  {error && (
    <p className="py-6 text-center text-sm text-red-500">
      {error}
    </p>
  )}

  {!loading && !error && (
    <DataTable
      data={companyRequests}
      columns={columns}
    />
  )}

</div>
      </main>
    </div>
  );
}

export default CompanyRequests;
