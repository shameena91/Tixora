
import {
  Globe,
  Mail,
  MapPin,
  Phone,
  ShieldAlert,
} from "lucide-react";

import { useState } from "react";

import StatusBadge from "../commonComponenets/StatusBadge";


import ConfirmationModal from "../../../../components/common/ConfirmationModal";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";
import type { CompanyDetails } from "../../../../redux/slices/company/companyTypes";
import { updateCompanyStatusThunk } from "../../../../redux/slices/company/companyThunk";

interface CompanyDetailsHeaderProps {
  company: CompanyDetails;
}

const CompanyDetailsHeader = ({
  company,
}: CompanyDetailsHeaderProps) => {
  const dispatch = useAppDispatch();

  const [showSuspendModal, setShowSuspendModal] =
    useState(false);

  const { companyStatusLoading } =
    useAppSelector((state) => state.company);

  const companyName =
    company.companyName || "Company";

  const initials = companyName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word: string) => word[0])
    .join("")
    .toUpperCase();

  const isActive =
    company.status === "ACTIVE";

  const targetStatus = isActive
    ? "INACTIVE"
    : "ACTIVE";

  const statusModal = {
    title: isActive
      ? "Deactivate Company"
      : "Reactivate Company",

    message: isActive
      ? "Are you sure you want to deactivate this company?"
      : "Are you sure you want to reactivate this company?",

    confirmText: isActive
      ? "Deactivate"
      : "Reactivate",

    loadingText: isActive
      ? "Deactivating..."
      : "Reactivating...",
  };

  const handleUpdateCompanyStatus =
    async () => {
      if (!company.id) return;

      const result = await dispatch(
        updateCompanyStatusThunk({
          companyId: company.id,
          status: targetStatus,
        }),
      );

      if (
        updateCompanyStatusThunk.fulfilled.match(
          result,
        )
      ) {
        setShowSuspendModal(false);
      }
    };

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
      <div className="h-1.5 bg-gradient-to-r from-[#7C3AED] via-[#8B5CF6] to-[#A78BFA]" />

      <div className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-gray-50">
              {company.logo ? (
                <img
                  src={company.logo}
                  alt={companyName}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-[#7C3AED]">
                  {initials}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="mb-2 flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold text-gray-900">
                  {companyName}
                </h1>

                <StatusBadge
                  status={company.status}
                />
              </div>

              <p className="mb-4 text-sm text-gray-500">
                {company.companyType
                  ? company.companyType.replace(
                      /_/g,
                      " ",
                    )
                  : "Company"}
              </p>

              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                {company.companyEmail && (
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>
                      {company.companyEmail}
                    </span>
                  </div>
                )}

                {company.phone && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{company.phone}</span>
                  </div>
                )}

                {company.website && (
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span>{company.website}</span>
                  </div>
                )}

                {company.location?.city && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>
                      {company.location.city}
                      {company.location.state
                        ? `, ${company.location.state}`
                        : ""}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button
            type="button"
            disabled={companyStatusLoading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            onClick={() =>
              setShowSuspendModal(true)
            }
          >
            <ShieldAlert className="h-4 w-4" />

            {isActive
              ? "Deactivate Company"
              : "Reactivate Company"}
          </button>
        </div>
      </div>

      <ConfirmationModal
        open={showSuspendModal}
        loading={companyStatusLoading}
        onClose={() =>
          setShowSuspendModal(false)
        }
        onConfirm={handleUpdateCompanyStatus}
        modalData={statusModal}
      />
    </div>
  );
};

export default CompanyDetailsHeader;

