export enum CompanyDocumentType {
  REGISTRATION_CERTIFICATE = "REGISTRATION_CERTIFICATE",
  TAX_DOCUMENT = "TAX_DOCUMENT",
  BUSINESS_LICENSE = "BUSINESS_LICENSE",
  OTHER = "OTHER",
}

export class CompanyDocument {
  constructor(
    public readonly documentType: CompanyDocumentType,
    public readonly fileName: string,
    public readonly fileUrl: string
  ) {}
}