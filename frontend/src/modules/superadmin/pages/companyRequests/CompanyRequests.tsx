
import { useEffect, useMemo, useState } from "react";
import DataTable, {
    type DataTableColumn,
} from "../../../../components/common/Datatable";

import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { fetchCompanyRequests } from "../../../../redux/slices/companyrequestSlice";

interface CompanyRequest {
  id: string;

  requestId: string;
  requestType: "REGISTRATION" | "UPDATE";

  companyName: string;
  adminName: string;

  status:
    | "PENDING"
    | "UNDER_REVIEW"
    | "MORE_INFO_REQUIRED"
    | "APPROVED"
    | "REJECTED";

  submittedAt: string;
  createdAt: string;
}

function CompanyRequests() {
  const dispatch = useAppDispatch();

  const { companyRequests, loading, error } = useAppSelector(
    (state) => state.companyRequest,
  );

  const navigate = useNavigate();

  // Filter states
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  useEffect(() => {
    dispatch(fetchCompanyRequests());
  }, [dispatch]);

  // Filter company requests
  const filteredRequests = useMemo(() => {
    return companyRequests.filter((request: CompanyRequest) => {
      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        request.companyName.toLowerCase().includes(searchValue) ||
        request.requestId.toLowerCase().includes(searchValue) ||
        request.adminName.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "ALL" ||
        request.status === statusFilter;

      const matchesType =
        typeFilter === "ALL" ||
        request.requestType === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [companyRequests, search, statusFilter, typeFilter]);

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setTypeFilter("ALL");
  };

  const columns: DataTableColumn<CompanyRequest>[] = [
    {
      header: "Request ID",
      accessor: "requestId",
    },

    {
      header: "Company",
      accessor: "companyName",
    },

    {
      header: "Registration Type",
      accessor: "requestType",
      render: (value: unknown) =>
        value === "REGISTRATION"
          ? "Registration Request"
          : "Update Request",
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
      render: (value: unknown) => {
        const status = String(value);

        const statusClass =
          status === "APPROVED"
            ? "bg-green-50 text-green-600"
            : status === "REJECTED"
              ? "bg-red-50 text-red-600"
              : status === "MORE_INFO_REQUIRED"
                ? "bg-blue-50 text-blue-600"
                : status === "UNDER_REVIEW"
                  ? "bg-blue-50 text-blue-600"
                  : "bg-yellow-100 text-yellow-600";

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
          >
          { status === "MORE_INFO_REQUIRED"
      ? "On Hold"
      :status.replaceAll("_", " ")}
          </span>
        );
      },
    },

    {
      id: "action",
      header: "Action",
      accessor: "companyName",
      render: (_value: unknown, row: CompanyRequest) => (
        <button
          type="button"
          className="text-sm font-medium text-[#7C3AED] hover:underline"
          onClick={() =>
            navigate(`/super-admin/company-requests/${row.id}`)
          }
        >
          View
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf7ff] text-[#182238]">
      <main className="mx-auto px-4 py-6 sm:px-6 sm:py-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Company Requests
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review and manage company registration requests.
          </p>
        </div>

        {/* Registration Requests Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">

          {/* Card Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Registration Requests
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View submitted company registration requests.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4">

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end">

              {/* Search */}
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Search
                </label>

                <input
                  type="text"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search company, request ID or admin..."
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              {/* Status Filter */}
              <div className="w-full lg:w-48">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Status
                </label>

                <select
                  value={statusFilter}
                  onChange={(event) =>
                    setStatusFilter(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                >
                  <option value="ALL">All Status</option>
                  <option value="PENDING">Pending</option>
                  <option value="UNDER_REVIEW">
                    Under Review
                  </option>
                  <option value="MORE_INFO_REQUIRED">
                    More Info Required
                  </option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>

              {/* Registration Type */}
              <div className="w-full lg:w-52">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Request Type
                </label>

                <select
                  value={typeFilter}
                  onChange={(event) =>
                    setTypeFilter(event.target.value)
                  }
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                >
                  <option value="ALL">All Types</option>
                  <option value="REGISTRATION">
                    Registration
                  </option>
                  <option value="UPDATE">
                    Update
                  </option>
                </select>
              </div>

              {/* Reset */}
              <button
                type="button"
                onClick={handleResetFilters}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Reset
              </button>

            </div>
          </div>

          {/* Result Count */}
          {!loading && !error && (
            <div className="mb-4 text-sm text-gray-500">
              Showing{" "}
              <span className="font-medium text-gray-700">
                {filteredRequests.length}
              </span>{" "}
              request
              {filteredRequests.length !== 1 && "s"}
            </div>
          )}

          {/* Loading */}
          {loading && (
            <p className="py-6 text-center text-sm text-gray-500">
              Loading company requests...
            </p>
          )}

          {/* Error */}
          {error && (
            <p className="py-6 text-center text-sm text-red-500">
              {error}
            </p>
          )}

          {/* Data Table */}
          {!loading && !error && (
            <DataTable
              data={filteredRequests}
              columns={columns}
            />
          )}

        </div>
      </main>
    </div>
  );
}

export default CompanyRequests;

