import { CompanyLogoFile } from "../../../domain/types/CompanyDocumentFile";
import { IUpdateCompanyLogo } from "../../abstraction/company-requests/IUpdateCompanyLogo";
import { IFileStoragePort } from "../../ports/IFileStoragePort";

export class UpdateCompanyLogo implements IUpdateCompanyLogo {
  constructor(private readonly _fileStorage: IFileStoragePort) {}

  async execute(logo: CompanyLogoFile): Promise<string> {
    console.log("logo");

    const logoPath = `company-requests/logo`;

    const uploadedFile = await this._fileStorage.upload(
      logo.file,
      logo.fileName,
      logo.mimeType,
      logoPath,
    );

    return uploadedFile.key;
  }
}
