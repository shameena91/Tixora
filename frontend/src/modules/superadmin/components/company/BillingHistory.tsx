import { CreditCard } from "lucide-react";
import { useEffect, useState } from "react";



import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import DataTable from "../../../../components/common/Datatable";
import type { DataTableColumn } from "../../../../components/common/Datatable";

import DetailsDrawer from "../../../../components/common/DetailsDrawer";
import InfoCard from "../commonComponenets/InfoCard";
import StatusBadge from "../commonComponenets/StatusBadge";
import { fetchBillingHistory } from "../../../../redux/slices/company/companyThunk";
import type { BillingHistoryType, CompanyDetails } from "../../../../redux/slices/company/companyTypes";

interface BillingHistoryProps {
  company: CompanyDetails;
}

const BillingHistory = ({
  company,
}: BillingHistoryProps) => {
  const dispatch = useAppDispatch();

  const [showPaymentDrawer, setShowPaymentDrawer] =
    useState(false);

  const [selectedPayment, setSelectedPayment] =
    useState<BillingHistoryType | null>(null);

  useEffect(() => {
    if (company.id) {
      dispatch(
        fetchBillingHistory(company.id),
      );
    }
  }, [dispatch, company.id]);

  const {
    billingHistory,
    billingHistoryLoading,
    billingHistoryError,
  } = useAppSelector(
    (state) => state.company,
  );

  const billingHistoryColumns: DataTableColumn<BillingHistoryType>[] =
    [

      {
        header: "Payment Id",
        accessor: "paymentId",
        render: (value) =>
          String(value)
      },
      {
        header: "Razorpay Payment ID",
        accessor: "razorpayPaymentId",
        render: (value) =>
          String(value ?? "-"),
      },

      {
        header: "Payment Date",
        accessor: "paymentDate",
        render: (value) =>
          value
            ? new Date(
                String(value),
              ).toLocaleDateString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "-",
      },

      {
        header: "Amount Paid",
        accessor: "amount",
        render: (value) =>
          `₹${String(value)}`,
      },

      {
        header: "Payment Status",
        accessor: "status",
        render: (value) => (
          <StatusBadge
            status={String(value)}
          />
        ),
      },

      {
        header: "Action",
        accessor: "id",
        render: (_value, row) => (
          <button
            type="button"
            onClick={() => {
              setSelectedPayment(row);
              setShowPaymentDrawer(true);
            }}
            className="text-sm font-medium text-[#7C3AED] hover:text-[#6D28D9]"
          >
            View
          </button>
        ),
      },
    ];

  if (billingHistoryLoading) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-gray-500">
          Loading billing history...
        </p>
      </div>
    );
  }

  if (billingHistoryError) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-red-500">
          {billingHistoryError}
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <InfoCard
        title="Billing History"
        icon={
          <CreditCard className="h-5 w-5" />
        }
      >
        {billingHistory.length > 0 ? (
          <DataTable
            data={billingHistory}
            columns={billingHistoryColumns}
          />
        ) : (
          <div className="py-10 text-center">
            <p className="text-sm text-gray-500">
              No billing history available.
            </p>
          </div>
        )}
      </InfoCard>

      <DetailsDrawer
        open={showPaymentDrawer}
        title="Payment Details"
        onClose={() => {
          setShowPaymentDrawer(false);
          setSelectedPayment(null);
        }}
      >
        {selectedPayment && (
          <div className="space-y-5">
          
             <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
             Payment ID
              </p>

              <p className="mt-1 break-all text-sm text-gray-700">
                {selectedPayment.paymentId ||
                  "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Payment Date
              </p>

              <p className="mt-1 text-sm text-gray-700">
                {selectedPayment.paymentDate
                  ? new Date(
                      selectedPayment.paymentDate,
                    ).toLocaleDateString(
                      "en-IN",
                      {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      },
                    )
                  : "-"}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Amount Paid
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                ₹{selectedPayment.amount}
              </p>
            </div>

            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Payment Status
              </p>

              <div className="mt-1">
                <StatusBadge
                  status={selectedPayment.status}
                />
              </div>
            </div>

             <div>
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Razorpay Payment ID
              </p>

              <p className="mt-1 break-all text-sm font-semibold text-gray-900">
                {selectedPayment.razorpayPaymentId ||
                  "-"}
              </p>
            </div>
          </div>
        )}
      </DetailsDrawer>
    </div>
  );
};

export default BillingHistory;