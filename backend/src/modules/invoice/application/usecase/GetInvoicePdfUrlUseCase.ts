
import type { IInvoiceRepository } from "../../domain/repositories/IInvoiceRepository";
import type { ICompanyRepository } from "../../../company/domain/repositories/ICompanyRepository";

import type { IGetInvoicePdfUrlUseCase } from "../abstraction/IGetInvoicePdfUrlUseCase";
import { IFileStoragePort } from "../../../company/application/ports/IFileStoragePort";

export class GetInvoicePdfUrlUseCase
  implements IGetInvoicePdfUrlUseCase
{
  constructor(
    private readonly _invoiceRepository: IInvoiceRepository,
    private readonly _companyRepository: ICompanyRepository,
    private readonly _fileStorage: IFileStoragePort,
  ) {}

  async execute(
    invoiceId: string,
    accountId: string,
  ): Promise<string | null> {
    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      return null;
    }

    const invoice = await this._invoiceRepository.find(invoiceId);

    if (!invoice) {
      return null;
    }


    if (invoice.companyId !== company.id) {
      return null;
    }

    if (!invoice.pdfKey) {
      return null;
    }

    return this._fileStorage.getSignedUrl(invoice.pdfKey);
  }
}
