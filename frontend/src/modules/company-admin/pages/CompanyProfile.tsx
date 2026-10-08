import { useEffect, useState } from "react";

import CompanyProfileHeader from "../componenets/company-info/CompanyProfileHeader";
import CompanyInformationTabs from "../componenets/company-info/CompanyInformationTabs";
import CompanyInformationTable from "../componenets/company-info/CompanyInformationTable";
import CurrentPlanCard from "../componenets/company-info/CurrentPlanCard";
import AdminAccess from "../componenets/company-info/AdminAccess";




import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { fetchMyCompanyThunk } from "../../../redux/slices/company/companyThunk";
import CompanyDocuments from "../componenets/company-info/CompanyDocuments";

const CompanyProfile = () => {
  const dispatch = useAppDispatch();

  const { companyDetails, companyDetailsLoading, companyDetailsError } =
    useAppSelector((state) => state.company);

  const [activeTab, setActiveTab] = useState(
    "Company Information",
  );
// const [isChangeRequestModalOpen, setIsChangeRequestModalOpen] =useState(false);
useEffect(() => {
  console.log("Fetching my company...");
  dispatch(fetchMyCompanyThunk());
}, [dispatch]);
  console.log("Company Profilr",companyDetails)


  const handleEdit = (
    field: {
      key: string;
      label: string;
    },
    value: string,
  ) => {
    console.log("Edit:", field, value);
  };

  const handleManageSubscription = () => {
    console.log("Manage subscription");
  };

  

  const handleAddAdmin = () => {
    console.log("Add admin");
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
      {/* Company Profile Header */}
      <CompanyProfileHeader company={companyDetails} />

      {/* Information Tabs */}
      <CompanyInformationTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

     
      {activeTab === "Company Information" && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
          {/* LEFT - 4 / 6 */}
          <div className="space-y-6 lg:col-span-4">
            <CompanyInformationTable
  company={companyDetails}
  onEdit={handleEdit}
  // onRequestChange={() => setIsChangeRequestModalOpen(true)}
/>
          </div>

          {/* RIGHT - 2 / 6 */}
          <div className="space-y-6 lg:col-span-2">
            <CurrentPlanCard
              onManage={handleManageSubscription}
            />
            <AdminAccess onAddAdmin={handleAddAdmin} company={companyDetails}/>

            {/* <AboutThisPage /> */}

            {/* <ChangeRequestStats
              stats={stats}
              onViewAll={handleViewRequests}
            /> */}
          </div>
        </div>
      )}

    
      {activeTab === "Verification & Documents" && (
        <CompanyDocuments />
      )}

   
      {/* {activeTab === "Company Requests" && (
        <CompanyRequests />
      )} */}
  {/* <CompanyChangeRequestModal
  isOpen={isChangeRequestModalOpen}
  onClose={() => setIsChangeRequestModalOpen(false)}
  company={companyDetails!}
/> */}
    </div>
  );
};

export default CompanyProfile;