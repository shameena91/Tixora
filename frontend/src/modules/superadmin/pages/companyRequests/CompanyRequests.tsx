import { useEffect, useState } from "react";
import DataTable, {
  type DataTableColumn,
} from "../../../../components/common/Datatable";

import { useNavigate } from "react-router-dom";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import {
  fetchCompanyRequests,
  fetchCompanyChangeRequestsThunk,
} from "../../../../redux/slices/companyRrequest/companyRequestThunk";

import type {
  CompanyRequestStatus,
} from "../../../company/types/companyTypes";

import type {
  CompanyChangeRequestListItem,
  CompanyChangeRequestStatus,
  CompanyUpdateType,
} from "../../../../redux/slices/companyRrequest/companyRequestTypes";

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

type RequestTab = "REGISTRATION" | "UPDATE";

const PAGE_LIMIT = 10;

function CompanyRequests() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const {
    companyRequests,
    loading,
    error,
    total,
    totalPages,

    companyChangeRequests,
    companyChangeRequestsTotal,
    companyChangeRequestsTotalPages,
    companyChangeRequestsLoading,
    companyChangeRequestsError,
  } = useAppSelector((state) => state.companyRequest);

  const [activeTab, setActiveTab] =
    useState<RequestTab>("REGISTRATION");

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [updateTypeFilter, setUpdateTypeFilter] = useState<
    "ALL" | CompanyUpdateType
  >("ALL");

  const [page, setPage] = useState(1);

  // Fetch Registration Requests
  useEffect(() => {
    if (activeTab !== "REGISTRATION") {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(
        fetchCompanyRequests({
          page,
          limit: PAGE_LIMIT,
          search: search.trim() || undefined,
          status:
            statusFilter === "ALL"
              ? undefined
              : (statusFilter as CompanyRequestStatus),
        }),
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [dispatch, activeTab, page, search, statusFilter]);

  // Fetch Update Requests
  useEffect(() => {
    if (activeTab !== "UPDATE") {
      return;
    }

    const timer = setTimeout(() => {
      dispatch(
        fetchCompanyChangeRequestsThunk({
          page,
          limit: PAGE_LIMIT,
          search: search.trim() || undefined,
          status:
            statusFilter === "ALL"
              ? undefined
              : (statusFilter as CompanyChangeRequestStatus),
          changeType:
            updateTypeFilter === "ALL"
              ? undefined
              : updateTypeFilter,
        }),
      );
    }, 300);

    return () => clearTimeout(timer);
  }, [
    dispatch,
    activeTab,
    page,
    search,
    statusFilter,
    updateTypeFilter,
  ]);

  const handleTabChange = (tab: RequestTab) => {
    setActiveTab(tab);
    setPage(1);
    setSearch("");
    setStatusFilter("ALL");
    setUpdateTypeFilter("ALL");
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleUpdateTypeChange = (value: string) => {
    setUpdateTypeFilter(value as "ALL" | CompanyUpdateType);
    setPage(1);
  };

  const handleResetFilters = () => {
    setSearch("");
    setStatusFilter("ALL");
    setUpdateTypeFilter("ALL");
    setPage(1);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-50 text-green-600";

      case "REJECTED":
        return "bg-red-50 text-red-600";

      case "MORE_INFO_REQUIRED":
      case "UNDER_REVIEW":
        return "bg-blue-50 text-blue-600";

      case "PARTIALLY_APPROVED":
        return "bg-purple-50 text-purple-600";

      default:
        return "bg-yellow-100 text-yellow-600";
    }
  };

  const formatStatus = (status: string) => {
    if (status === "MORE_INFO_REQUIRED") {
      return "On Hold";
    }

    return status.replaceAll("_", " ");
  };

  // Registration Requests columns
  const registrationColumns: DataTableColumn<CompanyRequest>[] = [
    {
      header: "Request ID",
      accessor: "requestId",
    },
    {
      header: "Company",
      accessor: "companyName",
    },
    {
      header: "Request Type",
      accessor: "requestType",
      render: () => "Registration Request",
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

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(status)}`}
          >
            {formatStatus(status)}
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
          View Details
        </button>
      ),
    },
  ];

  // Update Requests columns
  const updateColumns: DataTableColumn<CompanyChangeRequestListItem>[] = [
    {
      header: "Request ID",
      accessor: "requestId",
    },
    {
      header: "Company",
      accessor: "companyName",
    },
    {
      header: "Update Type",
      accessor: "updateType",
      render: (value: unknown) =>
        value === "PROFILE"
          ? "Profile Update"
          : "Document Change",
    },
    {
      header: "Admin",
      accessor: "adminName",
    },
    {
      header: "Submitted On",
      accessor: "submittedAt",
    },
    {
      header: "Status",
      accessor: "status",
      render: (value: unknown) => {
        const status = String(value);

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${getStatusClass(status)}`}
          >
            {formatStatus(status)}
          </span>
        );
      },
    },
    {
      id: "action",
      header: "Action",
      accessor: "companyName",
      render: (
        _value: unknown,
        row: CompanyChangeRequestListItem,
      ) => (
        <button
          type="button"
          className="text-sm font-medium text-[#7C3AED] hover:underline"
          onClick={() =>
            navigate(
              `/super-admin/company-update-requests/${row.id}`,
            )
          }
        >
          View Details
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#faf7ff] text-[#182238]">
      <main className="mx-auto px-4 py-6 sm:px-6 sm:py-8">
        {/* Page Header */}

        <div className="mb-8">
          <h1 className="text-2xl font-bold sm:text-3xl">
            Company Requests
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Review and manage company registration and update requests.
          </p>
        </div>

        {/* Request Tabs */}

        <div className="mb-6 border-b border-gray-200">
          <div className="flex gap-6 overflow-x-auto">
            <button
              type="button"
              onClick={() => handleTabChange("REGISTRATION")}
              className={`whitespace-nowrap border-b-2 px-2 py-3 text-sm font-semibold transition ${
                activeTab === "REGISTRATION"
                  ? "border-[#7C3AED] text-[#7C3AED]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Registration Requests
            </button>

            <button
              type="button"
              onClick={() => handleTabChange("UPDATE")}
              className={`whitespace-nowrap border-b-2 px-2 py-3 text-sm font-semibold transition ${
                activeTab === "UPDATE"
                  ? "border-[#7C3AED] text-[#7C3AED]"
                  : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              Update Requests
            </button>
          </div>
        </div>

        {/* Registration Requests Tab */}

        {activeTab === "REGISTRATION" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Registration Requests
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Review submitted company registration requests.
              </p>
            </div>

            {/* Registration Filters */}

            <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                <div className="flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Search
                  </label>

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      handleSearchChange(event.target.value)
                    }
                    placeholder="Search company, request ID or admin..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                <div className="w-full lg:w-48">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      handleStatusChange(event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="MORE_INFO_REQUIRED">
                      More Info Required
                    </option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>
            </div>

            {!loading && !error && (
              <div className="mb-4 text-sm text-gray-500">
                Total requests:{" "}
                <span className="font-medium text-gray-700">
                  {total}
                </span>
              </div>
            )}

            {loading && (
              <p className="py-6 text-center text-sm text-gray-500">
                Loading registration requests...
              </p>
            )}

            {error && (
              <p className="py-6 text-center text-sm text-red-500">
                {error}
              </p>
            )}

            {!loading && !error && (
              <>
                <DataTable
                  data={companyRequests}
                  columns={registrationColumns}
                />

                <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row">
                  <p className="text-sm text-gray-500">
                    Page {page} of {Math.max(totalPages, 1)}
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={page <= 1 || loading}
                      onClick={() =>
                        setPage((current) => current - 1)
                      }
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      disabled={
                        page >= totalPages ||
                        totalPages === 0 ||
                        loading
                      }
                      onClick={() =>
                        setPage((current) => current + 1)
                      }
                      className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Update Requests Tab */}

        {activeTab === "UPDATE" && (
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-6">
              <h2 className="text-lg font-semibold">
                Update Requests
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Review company profile updates and document replacement requests.
              </p>
            </div>

            {/* Update Filters */}

            <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
                <div className="flex-1">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Search
                  </label>

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      handleSearchChange(event.target.value)
                    }
                    placeholder="Search company, request ID or admin..."
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  />
                </div>

                <div className="w-full lg:w-48">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Status
                  </label>

                  <select
                    value={statusFilter}
                    onChange={(event) =>
                      handleStatusChange(event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="ALL">All Status</option>
                    <option value="PENDING">Pending</option>
                    <option value="PARTIALLY_APPROVED">
                      Partially Approved
                    </option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                  </select>
                </div>

                <div className="w-full lg:w-48">
                  <label className="mb-1.5 block text-sm font-medium text-gray-700">
                    Update Type
                  </label>

                  <select
                    value={updateTypeFilter}
                    onChange={(event) =>
                      handleUpdateTypeChange(event.target.value)
                    }
                    className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                  >
                    <option value="ALL">All Types</option>
                    <option value="PROFILE">Profile Update</option>
                    <option value="DOCUMENT">Document Change</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                >
                  Reset
                </button>
              </div>
            </div>

            {!companyChangeRequestsLoading &&
              !companyChangeRequestsError && (
                <div className="mb-4 text-sm text-gray-500">
                  Total requests:{" "}
                  <span className="font-medium text-gray-700">
                    {companyChangeRequestsTotal}
                  </span>
                </div>
              )}

            {companyChangeRequestsLoading && (
              <p className="py-6 text-center text-sm text-gray-500">
                Loading update requests...
              </p>
            )}

            {companyChangeRequestsError && (
              <p className="py-6 text-center text-sm text-red-500">
                {companyChangeRequestsError}
              </p>
            )}

            {!companyChangeRequestsLoading &&
              !companyChangeRequestsError && (
                <>
                  <DataTable
                    data={companyChangeRequests}
                    columns={updateColumns}
                  />

                  {companyChangeRequests.length === 0 && (
                    <p className="py-4 text-center text-sm text-gray-500">
                      No update requests found.
                    </p>
                  )}

                  <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-4 sm:flex-row">
                    <p className="text-sm text-gray-500">
                      Page {page} of{" "}
                      {Math.max(companyChangeRequestsTotalPages, 1)}
                    </p>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        disabled={page <= 1}
                        onClick={() =>
                          setPage((current) => current - 1)
                        }
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Previous
                      </button>

                      <button
                        type="button"
                        disabled={
                          page >= companyChangeRequestsTotalPages ||
                          companyChangeRequestsTotalPages === 0
                        }
                        onClick={() =>
                          setPage((current) => current + 1)
                        }
                        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </>
              )}
          </div>
        )}
      </main>
    </div>
  );
}

export default CompanyRequests;