export enum CompanyDocumentType {
  REGISTRATION_CERTIFICATE = "REGISTRATION_CERTIFICATE",
  TAX_DOCUMENT = "TAX_DOCUMENT",
  BUSINESS_LICENSE = "BUSINESS_LICENSE",
  OTHER = "OTHER",
}

export enum DocumentVerificationStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}

 export class CompanyDocument {
  constructor(
    public readonly documentType: CompanyDocumentType,
    public readonly fileName: string,
    public readonly fileKey: string,
    public readonly fileUrl: string,
    public readonly uploadedAt: Date,
    public verificationStatus: DocumentVerificationStatus =
      DocumentVerificationStatus.PENDING
  ) {}

  
  // verify(): void {
  //   this.verificationStatus =
  //     DocumentVerificationStatus.VERIFIED;
  // }

  // reject(): void {
  //   this.verificationStatus =
  //     DocumentVerificationStatus.REJECTED;
  // }
}



