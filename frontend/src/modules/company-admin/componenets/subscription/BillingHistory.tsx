
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

  const { invoices, invoiceLoading, invoiceError } =
    useAppSelector((state) => state.companySubscription);

  const [downloadingInvoiceId, setDownloadingInvoiceId] =
    useState<string | null>(null);

  useEffect(() => {
    dispatch(getCompanyInvoicesThunk());
  }, [dispatch]);

  // View Invoice
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

  // Download Invoice
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

  // Format Date
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

  // Format Amount
  const formatAmount = (amount: number, currency: string) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
    }).format(amount);

  // Table Columns
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
            {/* View Invoice */}
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

            {/* Download Invoice */}
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
          <LoaderCircle
            size={18}
            className="animate-spin"
          />
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
        <DataTable data={invoices} columns={columns} />
      )}
    </section>
  );
};

export default BillingHistory;
