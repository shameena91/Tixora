import { ICompanyRepository } from "../../../company/domain/repositories/ICompanyRepository";
import { S3FileStorage } from "../../../company/Infrastructure/storageservices/S3FileStorage";
import { IInvoiceRepository } from "../../domain/repositories/IInvoiceRepository";
import { IDownloadInvoicePdfUrlUseCase } from "../abstraction/IDownloadInvoicePdfUrlUseCase";

export class DownloadInvoicePdfUrlUseCase implements IDownloadInvoicePdfUrlUseCase{

    constructor(
        private readonly _companyRepository:ICompanyRepository,
        private readonly _invoiceRepository:IInvoiceRepository,
        private readonly _fileStorage:S3FileStorage

    ){}
    
async execute(
  invoiceId: string,
  accountId: string,
): Promise<string | null> {
  const company =
    await this._companyRepository.findByAccountId(accountId);

  if (!company) return null;

  const invoice = await this._invoiceRepository.find(invoiceId);

  if (!invoice || invoice.companyId !== company.id) {
    return null;
  }

  if (!invoice.pdfKey) return null;

  return this._fileStorage.getSignedDownloadUrl(invoice.pdfKey);
}

}