import { CompanyDocumentType } from "../value-objects/CompanyDocuments";
export interface CompanyDocumentFile {
  documentType: CompanyDocumentType;
  file: Buffer;
  fileName: string;
  mimeType: string;
}