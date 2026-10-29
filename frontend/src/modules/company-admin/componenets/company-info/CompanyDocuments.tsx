import { useEffect, useState } from "react";
import { FileText, Eye, RefreshCw } from "lucide-react";

import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { fetchMyCompanyDocumentsThunk } from "../../../../redux/slices/company/companyThunk";
import { getCompanyDocumentViewUrl } from "../../../superadmin/services/superadminServices";
import CompanyDocumentChangeModal from "./CompanyDocumentChangeModal";


interface CompanyDocumentsProps {
  onSubmitChangeRequest: (
    formData: FormData,
  ) => Promise<void>;
}

const CompanyDocuments = ({
  onSubmitChangeRequest,
}: CompanyDocumentsProps) => {
  const dispatch = useAppDispatch();

  const {
    companyDocuments,
    companyDocumentsLoading,
    companyDocumentsError,
  } = useAppSelector((state) => state.company);

  const [selectedDocumentType, setSelectedDocumentType] =
    useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchMyCompanyDocumentsThunk());
  }, [dispatch]);

  const handleViewDocument = async (
    companyRequestId: string,
    documentType: string,
  ) => {
    try {
      const response = await getCompanyDocumentViewUrl(
        companyRequestId,
        documentType,
      );

      window.open(response.data.url, "_blank", "noopener,noreferrer");
    } catch (error) {
      console.error("Failed to view document:", error);
    }
  };

  if (companyDocumentsLoading) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-slate-500">
          Loading documents...
        </p>
      </div>
    );
  }

  if (companyDocumentsError) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <p className="text-sm text-red-500">
          {companyDocumentsError}
        </p>
      </div>
    );
  }

  if (!companyDocuments || companyDocuments.documents.length === 0) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center">
        <FileText className="mx-auto h-10 w-10 text-slate-300" />

        <p className="mt-3 text-sm font-medium text-slate-600">
          No documents available.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 px-6 py-5">
          <h3 className="text-lg font-semibold text-slate-900">
            Registration Documents
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            View your existing documents or request a replacement.
          </p>
        </div>

        <div className="divide-y divide-slate-100">
          {companyDocuments.documents.map((document) => (
            <div
              key={document.documentType}
              className="flex flex-col justify-between gap-4 px-6 py-4 sm:flex-row sm:items-center"
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                  <FileText className="h-5 w-5 text-slate-500" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-900">
                    {document.documentType}
                  </p>

                  <p className="mt-0.5 truncate text-xs text-slate-500">
                    {document.fileName}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    handleViewDocument(
                      companyDocuments.companyRequestId,
                      document.documentType,
                    )
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  <Eye className="h-4 w-4" />
                  View
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedDocumentType(document.documentType)
                  }
                  className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100"
                >
                  <RefreshCw className="h-4 w-4" />
                  Request Replacement
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedDocumentType && (
        <CompanyDocumentChangeModal
          isOpen={true}
          documentType={selectedDocumentType}
          onClose={() => setSelectedDocumentType(null)}
          onSubmit={onSubmitChangeRequest}
        />
      )}
    </>
  );
};

export default CompanyDocuments;