



export interface IDownloadInvoicePdfUrlUseCase{
execute(
  invoiceId: string,
  accountId: string,
): Promise<string | null>;
}

