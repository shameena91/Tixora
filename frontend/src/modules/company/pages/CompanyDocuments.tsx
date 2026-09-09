
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/home/navbar";
import RegistrationAuthSidebar from "../../auth/components/RegistrationAuthSidebar";

import {
  submitCompanyDocuments,
  uploadCompanyDocument,
} from "../Services/CompanyRequestService";
import type { DocumentErrors } from "../types/companyTypes";

type DocumentKey =
  | "registrationCertificate"
  | "taxDocument"
  | "businessLicense";

const CompanyDocuments = () => {
  const navigate = useNavigate();

  const [documents, setDocuments] = useState<
    Record<DocumentKey, File | null>
  >({
    registrationCertificate: null,
    taxDocument: null,
    businessLicense: null,
  });

  const [uploading, setUploading] = useState<
    Record<DocumentKey, boolean>
  >({
    registrationCertificate: false,
    taxDocument: false,
    businessLicense: false,
  });

  const [uploaded, setUploaded] = useState<
    Record<DocumentKey, boolean>
  >({
    registrationCertificate: false,
    taxDocument: false,
    businessLicense: false,
  });
  const [errors, setErrors] = useState<DocumentErrors>({});

  const documentTypeMap: Record<DocumentKey, string> = {
    registrationCertificate: "REGISTRATION_CERTIFICATE",
    taxDocument: "TAX_DOCUMENT",
    businessLicense: "BUSINESS_LICENSE",
  };

  const handleFileChange = async (
    name: DocumentKey,
    file: File | null
  ) => {
    if (!file) {
      return;
    }

    const companyRequestId =
      localStorage.getItem("companyRequestId");
console.log("Company Request ID:", companyRequestId);
    if (!companyRequestId) {
      toast.error("Company request ID not found");
      return;
    }

    try {
      setUploading((prev) => ({
        ...prev,
        [name]: true,
      }));

      setUploaded((prev) => ({
        ...prev,
        [name]: false,
      }));

      setDocuments((prev) => ({
        ...prev,
        [name]: file,
      }));

      await uploadCompanyDocument(
        companyRequestId,
        file,
        documentTypeMap[name]
      );

      setUploaded((prev) => ({
        ...prev,
        [name]: true,
      }));
  setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
      toast.success(
        `${file.name} uploaded successfully`
      );
    } catch (error) {
  setDocuments((prev) => ({
    ...prev,
    [name]: null,
  }));

  setUploaded((prev) => ({
    ...prev,
    [name]: false,
  }));

  setErrors((prev) => ({
    ...prev,
    [name]:
      error instanceof Error
        ? error.message
        : "Failed to upload document",
  }));
}
finally {
      setUploading((prev) => ({
        ...prev,
        [name]: false,
      }));
    }
  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const companyRequestId =
      localStorage.getItem("companyRequestId");

    if (!companyRequestId) {
      toast.error("Company request ID not found");
      return;
    }

    const allDocumentsUploaded =
      uploaded.registrationCertificate &&
      uploaded.taxDocument &&
      uploaded.businessLicense;

    if (!allDocumentsUploaded) {
      toast.error(
        "Please upload all required company documents"
      );
      return;
    }

    try {
      await submitCompanyDocuments(
        companyRequestId
      );

      toast.success(
        "Company documents submitted successfully"
      );

      navigate(
        "/register/company-register/review-declaration"
      );
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to submit company documents"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 lg:p-10">
      <Navbar showRegister={false} />

      <div className="mx-auto flex min-h-[calc(100vh-64px)] max-w-7xl gap-8 px-5 lg:px-8">

        {/* Sidebar */}
        <RegistrationAuthSidebar currentStep={3} />

        <div className="mx-auto max-w-4xl w-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900">
              Company Documents
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Upload the required company documents
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-xl bg-white p-8 shadow-sm"
          >
            <div className="space-y-6">

              {/* Registration Certificate */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Registration Certificate
                </label>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={
                    uploading.registrationCertificate
                  }
                  onChange={(e) =>
                    handleFileChange(
                      "registrationCertificate",
                      e.target.files?.[0] ?? null
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />

                {documents.registrationCertificate && (
                  <p className="mt-2 text-sm text-gray-500">
                    {documents.registrationCertificate.name}
                  </p>
                )}

                {uploading.registrationCertificate && (
                  <p className="mt-2 text-sm text-blue-600">
                    Uploading...
                  </p>
                )}

                {uploaded.registrationCertificate &&
                  !uploading.registrationCertificate && (
                    <p className="mt-2 text-sm font-medium text-green-600">
                      Uploaded successfully
                    </p>
                  )}
                  {errors.registrationCertificate && (
  <p className="mt-1 text-sm text-red-500">
    {errors.registrationCertificate}
  </p>
)}
              </div>

              {/* Tax Document */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Tax Document
                </label>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={
                    uploading.taxDocument
                  }
                  onChange={(e) =>
                    handleFileChange(
                      "taxDocument",
                      e.target.files?.[0] ?? null
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />

                {documents.taxDocument && (
                  <p className="mt-2 text-sm text-gray-500">
                    {documents.taxDocument.name}
                  </p>
                )}

                {uploading.taxDocument && (
                  <p className="mt-2 text-sm text-blue-600">
                    Uploading...
                  </p>
                )}

                {uploaded.taxDocument &&
                  !uploading.taxDocument && (
                    <p className="mt-2 text-sm font-medium text-green-600">
                      Uploaded successfully
                    </p>
                  )}
                  {errors.taxDocument && (
  <p className="mt-1 text-sm text-red-500">
    {errors.taxDocument}
  </p>
)}
              </div>

              {/* Business License */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Business License
                </label>

                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png"
                  disabled={
                    uploading.businessLicense
                  }
                  onChange={(e) =>
                    handleFileChange(
                      "businessLicense",
                      e.target.files?.[0] ?? null
                    )
                  }
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5"
                />

                {documents.businessLicense && (
                  <p className="mt-2 text-sm text-gray-500">
                    {documents.businessLicense.name}
                  </p>
                )}

                {uploading.businessLicense && (
                  <p className="mt-2 text-sm text-blue-600">
                    Uploading...
                  </p>
                )}

                {uploaded.businessLicense &&
                  !uploading.businessLicense && (
                    <p className="mt-2 text-sm font-medium text-green-600">
                      Uploaded successfully
                    </p>
                  )}
                                  {errors.businessLicense && (
  <p className="mt-1 text-sm text-red-500">
    {errors.businessLicense}
  </p>
)}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-between border-t pt-6">

              <button
                type="button"
                onClick={() =>
                  window.history.back()
                }
                className="rounded-lg border border-gray-300 px-6 py-2.5 font-medium text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>

              <button
                type="submit"
                disabled={
                  uploading.registrationCertificate ||
                  uploading.taxDocument ||
                  uploading.businessLicense ||
                  !(
                    uploaded.registrationCertificate &&
                    uploaded.taxDocument &&
                    uploaded.businessLicense
                  )
                }
                className="rounded-lg bg-blue-600 px-7 py-2.5 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Submit Registration
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CompanyDocuments;
