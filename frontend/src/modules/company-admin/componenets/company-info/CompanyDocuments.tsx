import { FileText, Eye } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks/hooks";
import { useEffect } from "react";
import { fetchMyCompanyDocumentsThunk } from "../../../../redux/slices/company/companyThunk";
import { getCompanyDocumentViewUrl } from "../../../superadmin/services/superadminServices";





const CompanyDocuments = () => {
  const dispatch = useAppDispatch();

  const {
    companyDocuments,
    companyDocumentsLoading,
    companyDocumentsError,
  } = useAppSelector(
    (state) => state.company,
  );

  useEffect(() => {
    dispatch(fetchMyCompanyDocumentsThunk());
  }, [dispatch]);
  const handleViewDocument = async (
    companyRequestId: string,
    documentType: string,
  ) => {
    try {
      const response =
        await getCompanyDocumentViewUrl(
          companyRequestId,
          documentType,
        );

      const url = response.data.url;

      window.open(url, "_blank");
    } catch (error) {
      console.error(
        "Failed to view document:",
        error,
      );
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

  if (
    !companyDocuments ||
    companyDocuments.documents.length === 0
  ) {
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
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-6 py-5">
        <h3 className="text-lg font-semibold text-slate-900">
          Registration Documents
        </h3>

        <p className="mt-1 text-sm text-slate-500">
          Documents submitted during company registration.
        </p>
      </div>

      <div className="divide-y divide-slate-100">
        {companyDocuments.documents.map(
          (document) => (
            <div
              key={document.documentType}
              className="flex items-center justify-between px-6 py-4"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100">
                  <FileText className="h-5 w-5 text-slate-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    {document.documentType}
                  </p>

                  <p className="mt-0.5 text-xs text-slate-500">
                    {document.fileName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              
              
               onClick={() =>
                                handleViewDocument(
                                  companyDocuments.companyRequestId,
                                  document.documentType,
                                )
                              }>
                <Eye className="h-4 w-4" />
                View
              </button>
            </div>
          ),
        )}
      </div>
    </div>
  );
};

export default CompanyDocuments;