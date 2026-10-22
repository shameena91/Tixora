import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ICompanyRepository } from "../../../company/domain/repositories/ICompanyRepository";
import type { IInvoiceRepository } from "../../domain/repositories/IInvoiceRepository";
import type { IGetCompanyInvoicesUseCase } from "../abstraction/IGetCompanyInvoicesUseCase";
import type {
  InvoiceResponseDto,
  GetAllInvoicesResponseDto,
} from "../Dtos/InvoiceResponseDto";

export class GetCompanyInvoicesUseCase
  implements IGetCompanyInvoicesUseCase
{
  constructor(
    private readonly _invoiceRepository: IInvoiceRepository,
    private readonly _companyRepository:ICompanyRepository
  ) {}

  async execute(
    accountId: string,
  ): Promise<GetAllInvoicesResponseDto> {

    const company=await this._companyRepository.findByAccountId(accountId)
if (!company) {
  throw new AppErrors(
    "Company not found for this account",
    HttpStatusCode.NOT_FOUND,
  );
}



    const invoices =
      await this._invoiceRepository.findByCompanyId(company.id);

    const data: InvoiceResponseDto[] = invoices.map((invoice) => ({
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      companyId: invoice.companyId,
      companyName: invoice.companyName,
      planName: invoice.planName,
      billingCycle: invoice.billingCycle,
      amount: invoice.amount,
      currency: invoice.currency,
      paymentDate: invoice.paymentDate,
      paymentMethod: invoice.paymentMethod,
      paymentStatus: invoice.paymentStatus,
      createdAt: invoice.createdAt,
    }));

    return {
      invoices: data,
      total: data.length,
    };
  }
}