import { CompanyDocumentType } from "../Value-objects/CompanyDocuments";
export interface CompanyDocumentFile {
  documentType: CompanyDocumentType;
  file: Buffer;
  fileName: string;
  mimeType: string;
}