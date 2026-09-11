
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { fetchCompanyRequestById } from "../../../redux/slices/companyrequestSlice";

type Tab = "company" | "documents" | "timeline";

function CompanyRequestDetails() {
  const { companyRequestId } = useParams();

  const dispatch = useAppDispatch();

  const { companyRequest, loading, error } = useAppSelector(
    (state) => state.companyRequest
  );

  const [activeTab, setActiveTab] = useState<Tab>("company");

  useEffect(() => {
    if (companyRequestId) {
      dispatch(fetchCompanyRequestById(companyRequestId));
    }
  }, [companyRequestId, dispatch]);

  if (loading) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        Loading company request...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-sm text-red-500">
        {error}
      </div>
    );
  }

  if (!companyRequest) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        Company request not found.
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            Registration Request Details
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Review and verify the company registration request.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">

          {/* Status */}
          <span
            className={`rounded-full px-4 py-2 text-sm font-medium ${
              companyRequest.status === "PENDING"
                ? "bg-yellow-50 text-yellow-700"
                : companyRequest.status === "APPROVED"
                ? "bg-green-50 text-green-700"
                : companyRequest.status === "REJECTED"
                ? "bg-red-50 text-red-700"
                : "bg-blue-50 text-blue-700"
            }`}
          >
            {companyRequest.status === "PENDING"
              ? "Pending Review"
              : companyRequest.status}
          </span>

          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Request More Information
          </button>

          <button
            type="button"
            className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
          >
            Reject
          </button>

          <button
            type="button"
            className="rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6D28D9]"
          >
            Approve Request
          </button>
        </div>
      </div>

      {/* Request Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Request ID
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {companyRequest.id}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Submitted On
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {new Date(companyRequest.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">
            Requested By
          </p>

          <p className="mt-1 font-semibold text-gray-900">
            {companyRequest.admin.name}
          </p>
        </div>

      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <div className="flex gap-8">

          <button
            type="button"
            onClick={() => setActiveTab("company")}
            className={`border-b-2 pb-3 text-sm font-medium ${
              activeTab === "company"
                ? "border-[#7C3AED] text-[#7C3AED]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Company Details
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("documents")}
            className={`border-b-2 pb-3 text-sm font-medium ${
              activeTab === "documents"
                ? "border-[#7C3AED] text-[#7C3AED]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Documents & Verifications
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("timeline")}
            className={`border-b-2 pb-3 text-sm font-medium ${
              activeTab === "timeline"
                ? "border-[#7C3AED] text-[#7C3AED]"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            Timeline
          </button>

        </div>
      </div>

      {/* Company Details Tab */}
      {activeTab === "company" && (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* Company Information */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Company Information
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Company Name
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.company.companyName}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Registration Number
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.company.registrationNumber}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Company Email
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.company.companyEmail}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.company.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Company Type
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.company.companyType}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Employees
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.company.numberOfEmployees}
                </p>
              </div>

            </div>
          </div>

          {/* Admin Details */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Admin Details
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Name
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.admin.name}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.admin.email}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.admin.phone}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Designation
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.admin.designation}
                </p>
              </div>

            </div>
          </div>

          {/* Location Details */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900">
              Location Details
            </h2>

            <div className="mt-5 space-y-4">

              <div>
                <p className="text-sm text-gray-500">
                  Address
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.location.address}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  City
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.location.city}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  State
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.location.state}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Country
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.location.country}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Postal Code
                </p>

                <p className="mt-1 font-medium text-gray-900">
                  {companyRequest.location.postalCode}
                </p>
              </div>

            </div>
          </div>

        </div>
      )}

      {/* Documents Tab */}
      {activeTab === "documents" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Documents & Verifications
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Document verification details will appear here.
          </p>
        </div>
      )}

      {/* Timeline Tab */}
      {activeTab === "timeline" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900">
            Timeline
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Request activity timeline will appear here.
          </p>
        </div>
      )}

    </div>
  );
}

export default CompanyRequestDetails;

