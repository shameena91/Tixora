export interface CompanyDocumentResponse {
  documentType: string;
  fileName: string;
}

export interface GetMyCompanyDocumentsResponse {
  companyRequestId: string;
  documents: CompanyDocumentResponse[];
}