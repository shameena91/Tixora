
import { useEffect } from "react";
import { useNavigate ,useSearchParams,
} from "react-router-dom";

import DataTable, {
  type DataTableColumn,
} from "../../../../components/common/Datatable";

import Pagination from "../../../../components/common/Pagination";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";
import type { CompanyList } from "../../../../redux/slices/company/companyTypes";
import { fetchCompanyListsThunk } from "../../../../redux/slices/company/companyThunk";


function Companies() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] =
  useSearchParams();

const search =
  searchParams.get("search") || "";

const page =
  Number(searchParams.get("page")) || 1;

const limit =
  Number(searchParams.get("limit")) || 3;

  const {
    companyList,
    companyListLoading,
    companyListError,
    companyListTotal,
   
    companyListTotalPages,
  } = useAppSelector(
    (state) => state.company,
  );

//   const [search, setSearch] = useState("");
// const [page, setPage] = useState(1);
// const [limit, setLimit] = useState(3);
useEffect(() => {
  if (
    !searchParams.get("page") ||
    !searchParams.get("limit")
  ) {
    const params = new URLSearchParams(
      searchParams,
    );

    if (!params.get("page")) {
      params.set("page", "1");
    }

    if (!params.get("limit")) {
      params.set("limit", "3");
    }

    setSearchParams(params, {
      replace: true,
    });
  }
}, [searchParams, setSearchParams]);
 useEffect(() => {
  const timer = setTimeout(() => {
    dispatch(
      fetchCompanyListsThunk({
        search: search.trim() || undefined,
        page,
        limit,
      }),
    );
  }, 500);

  return () => {
    clearTimeout(timer);
  };
}, [
  search,
  page,
  limit,
  dispatch,
]);
const handleSearch = (
  event: React.ChangeEvent<HTMLInputElement>,
) => {
  const value = event.target.value;

  const params = new URLSearchParams(
    searchParams,
  );

  params.set("page", "1");

  if (value.trim()) {
    params.set(
      "search",
      value.trim(),
    );
  } else {
    params.delete("search");
  }

  setSearchParams(params);
};
 const handleResetSearch = () => {
  const params = new URLSearchParams();

  params.set("page", "1");
  params.set("limit", String(limit));

  setSearchParams(params);
};
const handlePageChange = (newPage: number) => {
  const params = new URLSearchParams(searchParams);

  params.set("page", String(newPage));

  setSearchParams(params);
};

const handleLimitChange = (newLimit: number) => {
  const params = new URLSearchParams(searchParams);

  params.set("page", "1");
  params.set("limit", String(newLimit));

  setSearchParams(params);
};

  const columns: DataTableColumn<CompanyList>[] = [
    {
      header: "Logo",
      accessor: "logo",
      render: (value: unknown) => {
        const logo = value as string | null;

        return logo ? (
          <img
            src={logo}
            alt="Company logo"
            className="h-10 w-10 rounded-lg object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100 text-xs text-gray-400">
            N/A
          </div>
        );
      },
    },

    {
      header: "Company Name",
      accessor: "companyName",
    },

    {
      header: "Email",
      accessor: "companyEmail",
    },

    {
      header: "Status",
      accessor: "status",
      render: (value: unknown) => {
        const status = String(value);

        const statusClass =
          status === "ACTIVE"
            ? "bg-green-50 text-green-600"
            : "bg-red-50 text-red-600";

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${statusClass}`}
          >
            {status}
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
        row: CompanyList,
      ) => (
        <button
          type="button"
          className="text-sm font-medium text-[#7C3AED] hover:underline"
          onClick={() =>
            navigate(
              `/super-admin/companies/${row.id}`,
            )
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
            Companies
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            View and manage registered companies.
          </p>
        </div>

        {/* Companies Card */}
        <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
          {/* Card Header */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold">
              Registered Companies
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              View companies registered on Tixora.
            </p>
          </div>

          {/* Search */}
          <div className="mb-6 rounded-xl border border-gray-100 bg-gray-50 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <label className="mb-1.5 block text-sm font-medium text-gray-700">
                  Search
                </label>

                <input
                  type="text"
                  value={search}
                  onChange={handleSearch}
                  placeholder="Search company name or email..."
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                />
              </div>

              <button
                type="button"
                onClick={handleResetSearch}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Result Count */}
          {!companyListLoading &&
            !companyListError && (
              <div className="mb-4 text-sm text-gray-500">
                Showing{" "}
                <span className="font-medium text-gray-700">
                  {companyList.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-700">
                  {companyListTotal}
                </span>{" "}
                compan
                {companyListTotal !== 1
                  ? "ies"
                  : "y"}
              </div>
            )}

          {/* Loading */}
          {companyListLoading && (
            <p className="py-6 text-center text-sm text-gray-500">
              Loading companies...
            </p>
          )}

          {/* Error */}
          {companyListError && (
            <p className="py-6 text-center text-sm text-red-500">
              {companyListError}
            </p>
          )}

          {/* Data Table */}
          {!companyListLoading &&
            !companyListError && (
              <>
                {companyList.length > 0 ? (
                  <DataTable
                    data={companyList}
                    columns={columns}
                  />
                ) : (
                  <p className="py-10 text-center text-sm text-gray-500">
                    No companies found.
                  </p>
                )}
<Pagination
  page={page}
  totalPages={companyListTotalPages}
  total={companyListTotal}
  limit={limit}
  onPageChange={handlePageChange}
  onLimitChange={handleLimitChange}
/>
              </>
            )}
        </div>
      </main>
    </div>
  );
}

export default Companies;
