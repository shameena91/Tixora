import React from "react";

interface PaginationProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
  onLimitChange: (limit: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
  onLimitChange,
}) => {
  if (total === 0) {
    return null;
  }

  return (
    <div className="mt-5 flex flex-col gap-4 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="text-sm text-gray-500">
        Page{" "}
        <span className="font-medium text-gray-700">
          {page}
        </span>{" "}
        of{" "}
        <span className="font-medium text-gray-700">
          {totalPages}
        </span>
      </div>

      <div className="flex items-center gap-3">
        {/* <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">
            Rows
          </span>

          <select
            value={limit}
            onChange={(event) =>
              onLimitChange(
                Number(event.target.value),
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-violet-500"
          >
            <option value={3}>3</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div> */}

        <button
          type="button"
          onClick={() =>
            onPageChange(page - 1)
          }
          disabled={page === 1}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Previous
        </button>

        <button
          type="button"
          onClick={() =>
            onPageChange(page + 1)
          }
          disabled={page === totalPages}
          className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;