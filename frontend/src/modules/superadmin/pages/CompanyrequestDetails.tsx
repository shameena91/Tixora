import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import {
  approveCompanyRequestThunk,
  fetchCompanyRequestById,
  moreInfoCompanyRequestThunk,
  rejectCompanyRequestThunk,
} from "../../../redux/slices/companyrequestSlice";
import RequestMoreInfoModal from "../components/RemarksModal";
import { getCompanyDocumentDownloadUrl, getCompanyDocumentViewUrl, rejectCompanyDocument, verifyCompanyDocument } from "../services/superadminServices";

type Tab = "company" | "documents" | "timeline";

function CompanyRequestDetails() {
  const [showMoreInfoModal, setShowMoreInfoModal] = useState(false);

  const { companyRequestId } = useParams();

  const dispatch = useAppDispatch();

  const { companyRequest, loading, error } = useAppSelector(
    (state) => state.companyRequest,
  );
  console.log("detail", companyRequest);
  
  const [activeTab, setActiveTab] = useState<Tab>("company");
const handleViewDocument = async (
  companyRequestId: string,
  documentType: string,
) => {
  try {
    const response = await getCompanyDocumentViewUrl(
      companyRequestId,
      documentType,
    );

    const url = response.data.url;

    window.open(url, "_blank");
  } catch (error) {
    console.error("Failed to view document:", error);
  }
};

const handleDownloadDocument = async (
  companyRequestId: string,
  documentType: string,
) => {
  try {
    const response = await getCompanyDocumentDownloadUrl(
      companyRequestId,
      documentType,
    );

    const url = response.data.url;

    const link = document.createElement("a");
    link.href = url;
    link.download = "";
    // link.target = "_blank";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("Failed to download document:", error);
  }
};

const handleVerify = async (
  companyRequestId: string,
  documentType: string,
) => {
  try {
    await verifyCompanyDocument(
      companyRequestId,
      documentType,
    );

   await dispatch(
      fetchCompanyRequestById(companyRequestId),
    );
  } catch (error) {
        console.error("Failed to reject document:", error);
  }
};

const handleReject = async (
  companyRequestId: string,
  documentType: string,
) => {
  try {
    await rejectCompanyDocument(
      companyRequestId,
      documentType,
    );
   await dispatch(
      fetchCompanyRequestById(companyRequestId),
    );    // refresh company request
  } catch (error) {
        console.error("Failed to reject document:", error);

  }
};

  useEffect(() => {
    if (companyRequestId) {
      dispatch(fetchCompanyRequestById(companyRequestId));
    }
  }, [companyRequestId, dispatch]);

  if (!companyRequest && loading) {
    return (
      <div className="py-10 text-center text-sm text-gray-500">
        Loading company request...
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-10 text-center text-sm text-red-500">{error}</div>
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
          <h1 className="text-2xl font-semibold text-gray-900">Request {companyRequest.company.requestId}</h1>

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
    : companyRequest.status === "MORE_INFO_REQUIRED"
      ? "On Hold"
      : companyRequest.status}
</span>



         
          {/* Request More Information */}
          {(companyRequest.status === "PENDING" ) && (
            <button
              type="button"
              onClick={()=>setShowMoreInfoModal(true)}
              className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Request More Information
            </button>
          )}

          {/* Reject */}
          {(companyRequest.status === "PENDING" ||
            companyRequest.status === "MORE_INFO_REQUIRED") && (
            <button
              type="button"
              onClick={() =>
                dispatch(rejectCompanyRequestThunk(companyRequest.id))
              }
              disabled={loading}
              className="rounded-lg border border-red-200 bg-white px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              {loading ? "Rejecting..." : "Reject Request"}
            </button>
          )}

          {/* Approve */}
          {(companyRequest.status === "PENDING" ||
            companyRequest.status === "MORE_INFO_REQUIRED") && (
            <button
              type="button"
              onClick={() =>
                dispatch(approveCompanyRequestThunk(companyRequest.id))
              }
              disabled={loading}
              className="rounded-lg bg-[#7C3AED] px-4 py-2 text-sm font-medium text-white hover:bg-[#6D28D9] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Approving..." : "Approve Request"}
            </button>
          )}
        </div>
      </div>

      {/* Request Summary */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Request ID</p>

          <p className="mt-1 font-semibold text-gray-900">
            {companyRequest.company.requestId}
          </p>
  {companyRequest.company.logo ? (
  <img
    src={companyRequest.company.logo}
    alt="Company Logo"
    className="w-24 h-24 object-contain"
  />
) : (
  <span>No logo</span>
)}
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Submitted On</p>

          <p className="mt-1 font-semibold text-gray-900">
            {new Date(companyRequest.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
          <p className="text-sm text-gray-500">Requested By</p>

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
              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Company Name</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.company.companyName}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">
                  Registration Number
                </p>
                <p className="font-medium text-gray-900">
                  {companyRequest.company.registrationNumber}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Company Email</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.company.companyEmail}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.company.phone}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Company Type</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.company.companyType}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Employees</p>
                <p className="font-medium text-gray-900">
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
              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Name</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.admin.name}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Email</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.admin.email}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Phone</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.admin.phone}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Designation</p>
                <p className="font-medium text-gray-900">
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
              <div className="flex items-center justify-between ">
                <p className="w-48 text-sm text-gray-500">Address</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.location.address}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">City</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.location.city}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">State</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.location.state}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Country</p>
                <p className="font-medium text-gray-900">
                  {companyRequest.location.country}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="w-48 text-sm text-gray-500">Postal Code</p>
                <p className="font-medium text-gray-900">
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
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Documents & Verifications
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Review and verify the documents submitted by the company.
            </p>
          </div>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-4 py-3 font-medium text-gray-600">
                    Document Type
                  </th>

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Document
                  </th>

                  {/* <th className="px-4 py-3 font-medium text-gray-600">
              Uploaded On
            </th> */}

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Preview
                  </th>

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Download
                  </th>

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Verification Status
                  </th>

                  <th className="px-4 py-3 font-medium text-gray-600">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {companyRequest.documents.map((document) => (
                  <tr key={document.fileUrl} className="hover:bg-gray-50">
                    {/* Document Type */}
                    <td className="px-4 py-4 font-medium text-gray-900">
                      {document.documentType === "REGISTRATION_CERTIFICATE"
                        ? "Registration Certificate"
                        : document.documentType === "TAX_DOCUMENT"
                          ? "Tax Document"
                          : document.documentType === "BUSINESS_LICENSE"
                            ? "Business License"
                            : "Other"}
                    </td>

                    {/* File Name */}
                    <td className="px-4 py-4 text-gray-700">
                      {document.fileName}
                    </td>

                    {/* Uploaded On */}
                    {/* <td className="px-4 py-4 text-gray-600">
  {new Date(document.uploadedAt).toLocaleDateString()}
</td> */}

                    {/* Preview */}
                    <td className="px-4 py-4">
  <button
  type="button"
  onClick={() =>
    handleViewDocument(
      companyRequest.id,
      document.documentType,
    )
  }
  className="font-medium text-[#7C3AED] hover:underline"
>
  View
</button>
                    </td>

                    {/* Download */}
                  <td className="px-4 py-4">
  <button
    type="button"
    onClick={() =>
      handleDownloadDocument(
        companyRequest.id,
        document.documentType,
      )
    }
    className="font-medium text-gray-700 hover:underline"
  >
    Download
  </button>
</td>
                    {/* Verification Status */}
                    {/* Verification Status */}
                    <td className="px-4 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          document.verificationStatus === "PENDING"
                            ? "bg-yellow-50 text-yellow-700"
                            : document.verificationStatus === "VERIFIED"
                              ? "bg-green-50 text-green-700"
                              : "bg-red-50 text-red-700"
                        }`}
                      >
                        {document.verificationStatus}
                      </span>
                    </td>

                    {/* Action */}
                    <td className="px-4 py-4">
                      {document.verificationStatus === "PENDING" && (
                        <div className="flex gap-2">
                          <button
                           onClick={() =>
    handleVerify(
     companyRequest.id,
      document.documentType,
    )
  }
                            type="button"
                            className="rounded-md bg-green-50 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100"
                          >
                            Accept
                          </button>

                          <button
                            type="button"
                             onClick={() =>
    handleReject(
      companyRequest.id,
      document.documentType,
    )
  }
                            className="rounded-md bg-red-50 px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-100"
                          >
                            Reject
                          </button>
                        </div>
                      )}

            

                      {(document.verificationStatus === "VERIFIED" || document.verificationStatus === "REJECTED")&& (
                        <span className="text-xs text-gray-400">No action</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Timeline Tab */}
      {/* Timeline Tab */}
      {activeTab === "timeline" && (
        <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
          {/* Header */}
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Request Timeline
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Track the activity and status changes of this company request.
            </p>
          </div>

          {/* Timeline */}
          <div className="mt-8">
            {/* Timeline Item */}
            <div className="relative flex gap-4">
              {/* Line */}
              <div className="absolute left-[11px] top-6 h-full w-px bg-gray-200" />

              {/* Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>

              {/* Content */}
              <div className="pb-8">
                <h3 className="font-medium text-gray-900">Request Created</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Company registration request was created.
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {new Date(companyRequest.createdAt).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Timeline Item */}
            <div className="relative flex gap-4">
              {/* Line */}
              <div className="absolute left-[11px] top-6 h-full w-px bg-gray-200" />

              {/* Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>

              {/* Content */}
              <div className="pb-8">
                <h3 className="font-medium text-gray-900">
                  Company Details Submitted
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Company information was added to the registration request.
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Company details completed
                </p>
              </div>
            </div>

            {/* Timeline Item */}
            <div className="relative flex gap-4">
              {/* Line */}
              <div className="absolute left-[11px] top-6 h-full w-px bg-gray-200" />

              {/* Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-green-100">
                <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
              </div>

              {/* Content */}
              <div className="pb-8">
                <h3 className="font-medium text-gray-900">
                  Documents Uploaded
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Required company documents were uploaded.
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  {companyRequest.documents.length} document(s) uploaded
                </p>
              </div>
            </div>

            {/* Timeline Item */}
            <div className="relative flex gap-4">
              {/* Line */}
              <div className="absolute left-[11px] top-6 h-full w-px bg-gray-200" />

              {/* Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-yellow-100">
                <div className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
              </div>

              {/* Content */}
              <div className="pb-8">
                <h3 className="font-medium text-gray-900">Pending Review</h3>

                <p className="mt-1 text-sm text-gray-500">
                  The request is waiting for Super Admin review.
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Current status: {companyRequest.status}
                </p>
              </div>
            </div>

            {/* Current Status */}
            <div className="relative flex gap-4">
              {/* Dot */}
              <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-100">
                <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
              </div>

              {/* Content */}
              <div>
                <h3 className="font-medium text-gray-900">Current Status</h3>

                <p className="mt-1 text-sm text-gray-500">
                  Current request status is{" "}
                  <span className="font-medium text-gray-700">
                    {companyRequest.status}
                  </span>
                  .
                </p>

                <p className="mt-2 text-xs text-gray-400">
                  Last updated:{" "}
                  {new Date(companyRequest.updatedAt).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

<RequestMoreInfoModal
  isOpen={showMoreInfoModal}
  onClose={() => setShowMoreInfoModal(false)}
  onSubmit={async(remarks) => {
    if (!companyRequestId) {
      return;
    }

    console.log("Remarks:", remarks);
      const result = await dispatch(
      moreInfoCompanyRequestThunk({
        companyRequestId,
        remarks,
      })
    )
      if (moreInfoCompanyRequestThunk.fulfilled.match(result)) {
      setShowMoreInfoModal(false);

   
  }}
}
  loading={loading}
/>

    </div>
  );
}

export default CompanyRequestDetails;
