
export interface IGetInvoicePdfUrlUseCase {
  execute(
    invoiceId: string,
    accountId: string,
  ): Promise<string | null>;
}
