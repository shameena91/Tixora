
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";


import {
  getMyCompanyRequestForEdit,
  submitCompanyDocuments,
  uploadCompanyDocument,
} from "../Services/CompanyRequestService";

import type {
  DocumentData,
  DocumentErrors,
} from "../types/companyTypes";
import RegistrationLayout from "../../auth/components/RegistrationLayout";

type DocumentKey =
  | "registrationCertificate"
  | "taxDocument"
  | "businessLicense";

const CompanyDocuments = () => {
  const navigate = useNavigate();
  const { companyRequestId } = useParams();

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

  const [uploadedDocuments, setUploadedDocuments] = useState<
    Record<DocumentKey, string | null>
  >({
    registrationCertificate: null,
    taxDocument: null,
    businessLicense: null,
  });

  const [errors, setErrors] = useState<DocumentErrors>({});

  const documentTypeMap: Record<DocumentKey, string> = {
    registrationCertificate: "REGISTRATION_CERTIFICATE",
    taxDocument: "TAX_DOCUMENT",
    businessLicense: "BUSINESS_LICENSE",
  };

  // Load already uploaded documents when editing/resubmitting
  useEffect(() => {
    if (!companyRequestId) {
      return;
    }

    const fetchCompanyRequest = async () => {
      try {
        const response =
          await getMyCompanyRequestForEdit(companyRequestId);

        const companyDocuments = response.data.documents;

        const existingDocuments: Record<
          DocumentKey,
          string | null
        > = {
          registrationCertificate: null,
          taxDocument: null,
          businessLicense: null,
        };

        companyDocuments.forEach(
          (document: DocumentData) => {
            if (
              document.documentType ===
              "REGISTRATION_CERTIFICATE"
            ) {
              existingDocuments.registrationCertificate =
                document.fileName;
            }

            if (
              document.documentType ===
              "TAX_DOCUMENT"
            ) {
              existingDocuments.taxDocument =
                document.fileName;
            }

            if (
              document.documentType ===
              "BUSINESS_LICENSE"
            ) {
              existingDocuments.businessLicense =
                document.fileName;
            }
          }
        );

        setUploadedDocuments(existingDocuments);

        setUploaded({
          registrationCertificate: Boolean(
            existingDocuments.registrationCertificate
          ),
          taxDocument: Boolean(
            existingDocuments.taxDocument
          ),
          businessLicense: Boolean(
            existingDocuments.businessLicense
          ),
        });
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      }
    };

    fetchCompanyRequest();
  }, [companyRequestId]);

  const handleFileChange = async (
    name: DocumentKey,
    file: File | null
  ) => {
    if (!file) {
      return;
    }

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
console.log("Uploading document:", {
  name,
  documentType: documentTypeMap[name],
  fileName: file.name,
  fileType: file.type,
});
      await uploadCompanyDocument(
        companyRequestId,
        file,
        documentTypeMap[name]
      );

      setUploaded((prev) => ({
        ...prev,
        [name]: true,
      }));

      setUploadedDocuments((prev) => ({
        ...prev,
        [name]: file.name,
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
    } finally {
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
console.log("uploaded state:", uploaded);
console.log("uploaded documents:", uploadedDocuments);
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
        `/register/company-register/${companyRequestId}/review-declaration`
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
    <RegistrationLayout currentStep={7}>
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

            {uploadedDocuments.registrationCertificate && (
              <p className="mt-2 text-sm text-green-600">
                Uploaded:{" "}
                <span className="font-medium">
                  {uploadedDocuments.registrationCertificate}
                </span>
              </p>
            )}

            {uploading.registrationCertificate && (
              <p className="mt-2 text-sm text-blue-600">
                Uploading...
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
              disabled={uploading.taxDocument}
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

            {uploadedDocuments.taxDocument && (
              <p className="mt-2 text-sm text-green-600">
                Uploaded:{" "}
                <span className="font-medium">
                  {uploadedDocuments.taxDocument}
                </span>
              </p>
            )}

            {uploading.taxDocument && (
              <p className="mt-2 text-sm text-blue-600">
                Uploading...
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
              disabled={uploading.businessLicense}
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

            {uploadedDocuments.businessLicense && (
              <p className="mt-2 text-sm text-green-600">
                Uploaded:{" "}
                <span className="font-medium">
                  {uploadedDocuments.businessLicense}
                </span>
              </p>
            )}

            {uploading.businessLicense && (
              <p className="mt-2 text-sm text-blue-600">
                Uploading...
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
            onClick={() => navigate(-1)}
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
    </RegistrationLayout>
  );
};

export default CompanyDocuments;

