import type { Request, Response } from "express";

import { sendError, sendSuccess } from "../../../../presentation/response/ResponseHelper";
import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import type { CreatePaymentRequestDto } from "../../application/dto/CreatePaymentDto";
import { ICreatePayment } from "../../application/abstraction/ICreatePayment";
import { IGetPaymentHistory } from "../../application/abstraction/IGetPaymentHistory";

export class PaymentController {
  constructor(
    private readonly _createPayment: ICreatePayment,
      private readonly _getPaymentHistory: IGetPaymentHistory,
  ) {}

  async createPayment(req: Request, res: Response) {
    const data = req.body as CreatePaymentRequestDto;

    const payment = await this._createPayment.execute(data);

    return sendSuccess(
      res,
     "payment created successfully",
      payment,
      HttpStatusCode.CREATED,
    );
  }


  async getPaymentHistory(
  req: Request,
  res: Response,
) {
  const { companyId } = req.params;

  if (typeof companyId !== "string") {
    return sendError(
      res,
      MESSAGES.INVALID_COMPANY_REQUEST_ID,
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const payments =
    await this._getPaymentHistory.execute(
      companyId,
    );
console.log("payments",payments)
  return sendSuccess(
    res,
    MESSAGES.PAYMENT_HISTORY_FETCHED_SUCCESSFULLY,
    payments,
    HttpStatusCode.OK,
  );
}
}