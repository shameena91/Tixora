
import type { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";

import { ICreateInvoiceUseCase } from "../../application/abstraction/ICreateInvoiceUseCase";
import { IGetInvoiceUseCase } from "../../application/abstraction/IGetInvoiceUseCase";
import { IGetCompanyInvoicesUseCase } from "../../application/abstraction/IGetCompanyInvoicesUseCase";
import { IGetInvoicePdfUrlUseCase } from "../../application/abstraction/IGetInvoicePdfUrlUseCase";
import { IDownloadInvoicePdfUrlUseCase } from "../../application/abstraction/IDownloadInvoicePdfUrlUseCase";

export class InvoiceController {
  constructor(
    private readonly _createInvoice: ICreateInvoiceUseCase,
    private readonly _getInvoice: IGetInvoiceUseCase,
    private readonly _getCompanyInvoices: IGetCompanyInvoicesUseCase,
    private readonly _getInvoicePdfUrl: IGetInvoicePdfUrlUseCase,
    private readonly _dowloadInvoice:IDownloadInvoicePdfUrlUseCase
  ) {}

  async createInvoice(req: Request, res: Response) {
    const data = req.body 

    const invoice = await this._createInvoice.execute(data);

    return sendSuccess(
      res,
      "Invoice created successfully",
      invoice,
      HttpStatusCode.CREATED,
    );
  }

  async getInvoice(req: Request, res: Response) {
    const { invoiceId } = req.params;

    if (typeof invoiceId !== "string" || !invoiceId.trim()) {
      return sendError(
        res,
        "Invalid invoice ID",
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const invoice = await this._getInvoice.execute(invoiceId);

    if (!invoice) {
      return sendError(
        res,
        "Invoice not found",
        HttpStatusCode.NOT_FOUND,
      );
    }

    return sendSuccess(
      res,
      "Invoice fetched successfully",
      invoice,
      HttpStatusCode.OK,
    );
  }

async getCompanyInvoices(req: Request, res: Response) {
  const accountId = req.user!.accountId;

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  const invoices = await this._getCompanyInvoices.execute(
    accountId,
    page,
    limit,
  );

  return sendSuccess(
    res,
    "Company invoices fetched successfully",
    invoices,
    HttpStatusCode.OK,
  );
}
  
async getInvoicePdf(req: Request, res: Response) {
  const { invoiceId } = req.params;
  const accountId = req.user?.accountId;

 
if (typeof invoiceId !== "string" || !invoiceId.trim()) {
  return sendError(
    res,
    "Invalid invoice ID",
    HttpStatusCode.BAD_REQUEST,
  );
  
}
  if (!accountId) {
    return sendError(
      res,
      "Unauthorized",
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  const url = await this._getInvoicePdfUrl.execute(
    invoiceId,
    accountId,
  );

  if (!url) {
    return sendError(
      res,
      "Invoice not found",
      HttpStatusCode.NOT_FOUND,
    );
  }

  return sendSuccess(
    res,
    "Invoice PDF URL generated successfully",
    { url },
    HttpStatusCode.OK,
  );
}


async downloadInvoice(req: Request, res: Response) {
  const invoiceId = req.params.invoiceId;
  const accountId = req.user?.accountId;

  if (typeof invoiceId !== "string" || !invoiceId.trim()) {
    return sendError(
      res,
      "Invalid invoice ID",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  if (!accountId) {
    return sendError(
      res,
      "Unauthorized",
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  const url = await this._dowloadInvoice.execute(
    invoiceId,
    accountId,
  );

  if (!url) {
    return sendError(
      res,
      "Invoice not found",
      HttpStatusCode.NOT_FOUND,
    );
  }

  return sendSuccess(
    res,
    "Invoice download URL generated successfully",
    { url },
    HttpStatusCode.OK,
  );
}


}
