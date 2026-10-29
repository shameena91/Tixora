
import { useEffect, useState } from "react";
import { Eye, Download, LoaderCircle } from "lucide-react";
import toast from "react-hot-toast";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import { getCompanyInvoicesThunk } from "../../../../redux/slices/companySubscription/companySubscriptionThunk";

import type { Invoice } from "../../../../redux/slices/companySubscription/companySubscriptionTypes";
import type { DataTableColumn } from "../../../../components/common/Datatable";

import DataTable from "../../../../components/common/Datatable";

import {
  getInvoiceDownloadUrl,
  getInvoicePdfUrl,
} from "../../services/subscription/SubscriptionService";

const BillingHistory = () => {
  const dispatch = useAppDispatch();

  const {
    invoices,
    invoiceLoading,
    invoiceError,
    invoiceTotal,
    invoicePagination,
  } = useAppSelector((state) => state.companySubscription);

  const [page, setPage] = useState(1);

  const limit =
    Number(import.meta.env.VITE_INVOICE_PAGE_LIMIT) || 3;

  const [downloadingInvoiceId, setDownloadingInvoiceId] =
    useState<string | null>(null);

  useEffect(() => {
    dispatch(getCompanyInvoicesThunk({ page, limit }));
  }, [dispatch, page, limit]);

  const handleViewInvoice = async (invoiceId: string) => {
    try {
      const response = await getInvoicePdfUrl(invoiceId);
      const url = response.data?.url ?? response.url;

      if (!url) {
        toast.error("Invoice PDF URL is unavailable.");
        return;
      }

      window.open(url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to open invoice PDF:", error);
      toast.error("Unable to open invoice. Please try again.");
    }
  };

  const handleDownloadInvoice = async (invoiceId: string) => {
    try {
      setDownloadingInvoiceId(invoiceId);

      const response = await getInvoiceDownloadUrl(invoiceId);
      const url = response.data?.url ?? response.url;

      if (!url) {
        throw new Error("Invoice download URL not found.");
      }

      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${invoiceId}.pdf`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      toast.success("Invoice download started.");
    } catch (error) {
      console.error("Failed to download invoice:", error);
      toast.error("Invoice download failed. Please try again.");
    } finally {
      setDownloadingInvoiceId(null);
    }
  };

  const formatDate = (date: string) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "—";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
    }).format(amount);

  const columns: DataTableColumn<Invoice>[] = [
    {
      header: "Invoice ID",
      accessor: "invoiceNumber",
      render: (value) => (
        <span className="font-semibold text-gray-900">
          {String(value)}
        </span>
      ),
    },
    {
      header: "Date",
      accessor: "paymentDate",
      render: (value) => formatDate(String(value ?? "")),
    },
    {
      header: "Amount",
      accessor: "amount",
      render: (value, row) =>
        formatAmount(Number(value), row.currency),
    },
    {
      header: "Status",
      accessor: "paymentStatus",
      render: (value) => {
        const status = String(value ?? "UNKNOWN");

        const style =
          status === "SUCCESS" || status === "PAID"
            ? "bg-green-100 text-green-700"
            : status === "PENDING"
              ? "bg-yellow-100 text-yellow-700"
              : status === "FAILED" || status === "CANCELLED"
                ? "bg-red-100 text-red-700"
                : "bg-gray-100 text-gray-700";

        return (
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${style}`}
          >
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      accessor: "id",
      render: (value, row) => {
        const invoiceId = String(value);

        const isPaid =
          row.paymentStatus === "SUCCESS" ||
          row.paymentStatus === "PAID";

        const isDownloading =
          downloadingInvoiceId === invoiceId;

        return (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleViewInvoice(invoiceId)}
              disabled={!isPaid}
              title="View Invoice"
              aria-label="View Invoice"
              className="rounded-lg p-2 text-indigo-600 transition hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Eye size={18} />
            </button>

            <button
              type="button"
              onClick={() => handleDownloadInvoice(invoiceId)}
              disabled={!isPaid || isDownloading}
              title={
                isDownloading
                  ? "Downloading invoice"
                  : "Download Invoice"
              }
              aria-label="Download Invoice"
              className="rounded-lg p-2 text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isDownloading ? (
                <LoaderCircle
                  size={18}
                  className="animate-spin"
                />
              ) : (
                <Download size={18} />
              )}
            </button>
          </div>
        );
      },
    },
  ];

  const totalPages = invoicePagination?.totalPages ?? 0;

  return (
    <section className="space-y-5 rounded-2xl border border-indigo-100 bg-white p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-bold text-gray-900">
          Billing History
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          View your subscription payments and invoices.
        </p>
      </div>

      {invoiceLoading ? (
        <div className="flex items-center justify-center gap-2 py-10 text-sm text-gray-500">
          <LoaderCircle size={18} className="animate-spin" />
          Loading billing history...
        </div>
      ) : invoiceError ? (
        <p className="py-10 text-center text-sm text-red-600">
          {invoiceError}
        </p>
      ) : invoices.length === 0 ? (
        <p className="py-10 text-center text-sm text-gray-500">
          No billing records available.
        </p>
      ) : (
        <>
          <DataTable data={invoices} columns={columns} />

          <div className="flex flex-col gap-3 border-t border-gray-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Total invoices: {invoiceTotal}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                disabled={page <= 1 || invoiceLoading}
                onClick={() => setPage((current) => current - 1)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              <span className="whitespace-nowrap text-sm text-gray-600">
                Page {page} of {totalPages}
              </span>

              <button
                type="button"
                disabled={page >= totalPages || invoiceLoading}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default BillingHistory;
