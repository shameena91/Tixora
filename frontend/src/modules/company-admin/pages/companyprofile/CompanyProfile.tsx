import { useEffect, useState } from "react";

import AdminAccess from "../../componenets/company-info/AdminAccess";
import CompanyInformationTable from "../../componenets/company-info/CompanyInformationTable";
import CompanyInformationTabs from "../../componenets/company-info/CompanyInformationTabs";
import CompanyProfileHeader from "../../componenets/company-info/CompanyProfileHeader";
import CurrentPlanCard from "../../componenets/company-info/CurrentPlanCard";
import CompanyDocuments from "../../componenets/company-info/CompanyDocuments";
import CompanyRequests from "../../componenets/company-info/CompanyRequests";

import CompanyChangeRequestModal, {
  type CompanyChangeRequestPayload,
} from "../../componenets/company-info/CompanyChangeRequestModal";

import ChangeCompanyEmailModal from "../../componenets/company-info/ChangeCompanyEmailModal";

import {
  useAppDispatch,
  useAppSelector,
} from "../../../../redux/hooks/hooks";

import {
  fetchMyCompanyThunk,
  submitCompanyChangeRequestThunk,
  submitCompanyDocumentChangeThunk,
} from "../../../../redux/slices/company/companyThunk";

import {
  getCompanyTypes,
  getEmployRange,
} from "../../../company/Services/CompanyRequestService";

import {
  getMySubscriptionPlanThunk,
  getMySubscriptionStatusThunk,
} from "../../../../redux/slices/companySubscription/companySubscriptionThunk";
import { sendCompanyEmailChangeOtp, verifyCompanyEmailChangeOtp } from "../../../superadmin/services/superadminServices";

const CompanyProfile = () => {
  const dispatch = useAppDispatch();

  const [isChangeRequestModalOpen, setIsChangeRequestModalOpen] =
    useState(false);

  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);

  const [companyTypes, setCompanyTypes] = useState<string[]>([]);
  const [employeeRanges, setEmployeeRanges] = useState<string[]>([]);
  const [optionsLoading, setOptionsLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("Company Information");

  const {
    companyDetails,
    companyDetailsLoading,
    companyDetailsError,
  } = useAppSelector((state) => state.company);

  const {
    mySubscription,
    myPlan,
    loading,
  } = useAppSelector((state) => state.companySubscription);

  useEffect(() => {
    dispatch(fetchMyCompanyThunk());
    dispatch(getMySubscriptionStatusThunk());
    dispatch(getMySubscriptionPlanThunk());
  }, [dispatch]);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const [companyTypesResponse, employeeRangesResponse] =
          await Promise.all([
            getCompanyTypes(),
            getEmployRange(),
          ]);

        setCompanyTypes(companyTypesResponse.data);
        setEmployeeRanges(employeeRangesResponse.data);
      } catch (error) {
        console.error(
          "Failed to fetch company profile dropdown options:",
          error,
        );
      } finally {
        setOptionsLoading(false);
      }
    };

    void fetchDropdownOptions();
  }, []);

  const handleCompanyChangeRequest = async (
    payload: CompanyChangeRequestPayload,
  ) => {
    try {
      await dispatch(
        submitCompanyChangeRequestThunk(payload),
      ).unwrap();

      setIsChangeRequestModalOpen(false);
    } catch (error) {
      console.error(
        "Failed to submit company change request:",
        error,
      );
    }
  };

  const handleCompanyDocumentChangeRequest = async (
    formData: FormData,
  ): Promise<void> => {
    await dispatch(
      submitCompanyDocumentChangeThunk(formData),
    ).unwrap();
  };

  const handleEdit = (
    field: {
      key: string;
      label: string;
    },
    value: string,
  ) => {
    if (field.key === "companyEmail") {
      setIsEmailModalOpen(true);
      return;
    }

    // Other fields continue using the existing behavior.
    console.log("Edit:", field, value);
  };

  const handleAddAdmin = () => {
    console.log("Add admin");
  };

 
  const handleSendCompanyEmailOtp = async (
    email: string,
  ): Promise<void> => {
    console.error("Connect the email OTP API:", email);
    await sendCompanyEmailChangeOtp(email);
   ;
  };

 const handleVerifyCompanyEmailOtp = async (data: {
  email: string;
  otp: string;
}): Promise<void> => {
  await verifyCompanyEmailChangeOtp(data);
};

  if (companyDetailsLoading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading company details...
        </p>
      </div>
    );
  }

  if (companyDetailsError) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-red-500">
          {companyDetailsError}
        </p>
      </div>
    );
  }

  if (!companyDetails) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Company details not found.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <CompanyProfileHeader company={companyDetails} />

      <CompanyInformationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {activeTab === "Company Information" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
          {/* Company Information */}
          <div className="space-y-6 lg:col-span-4">
            <CompanyInformationTable
              company={companyDetails}
              onEdit={handleEdit}
              onRequestChange={() =>
                setIsChangeRequestModalOpen(true)
              }
            />
          </div>

          {/* Subscription and Admin Access */}
          <div className="space-y-6 lg:col-span-2">
            <CurrentPlanCard
              currentSubscription={
                mySubscription?.currentSubscription
              }
              myPlan={myPlan}
              loading={loading}
            />

            <AdminAccess
              onAddAdmin={handleAddAdmin}
              company={companyDetails}
            />
          </div>
        </div>
      )}

      {activeTab === "Verification & Documents" && (
        <CompanyDocuments
          onSubmitChangeRequest={
            handleCompanyDocumentChangeRequest
          }
        />
      )}

      {activeTab === "Company Requests" && <CompanyRequests />}

      {/* Existing Company Change Request Modal */}
      {isChangeRequestModalOpen && (
        <CompanyChangeRequestModal
          isOpen={isChangeRequestModalOpen}
          onClose={() =>
            setIsChangeRequestModalOpen(false)
          }
          company={companyDetails}
          companyTypes={companyTypes}
          employeeRanges={employeeRanges}
          optionsLoading={optionsLoading}
          onSubmit={handleCompanyChangeRequest}
        />
      )}

      {/* Change Company Email Modal */}
      {isEmailModalOpen && (
  <ChangeCompanyEmailModal
    isOpen={isEmailModalOpen}
    onClose={() => setIsEmailModalOpen(false)}
    onSendOtp={handleSendCompanyEmailOtp}
    onVerifyOtp={handleVerifyCompanyEmailOtp}
    onEmailUpdated={() => {
      setIsEmailModalOpen(false);
      void dispatch(fetchMyCompanyThunk());
    }}
  />
)}
    </div>
  );
};

export default CompanyProfile;