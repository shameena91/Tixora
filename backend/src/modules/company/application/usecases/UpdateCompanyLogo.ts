import { CompanyLogoFile } from "../../domain/types/CompanyDocumentFile";
import { IUpdateCompanyLogo } from "../abstraction/IUpdateCompanyLogo";
import { IFileStoragePort } from "../ports/IFileStoragePort";

export class UpdateCompanyLogo implements IUpdateCompanyLogo {
  constructor(
    private readonly fileStorage: IFileStoragePort,
  ) {}

  async execute(
    
    logo: CompanyLogoFile,
  ): Promise<string> {
  console.log("logo")

    const logoPath =
      `company-requests/logo`;

    const uploadedFile = await this.fileStorage.upload(
      logo.file,
      logo.fileName,
      logo.mimeType,
      logoPath,
    );

    return uploadedFile.key;
  }
}