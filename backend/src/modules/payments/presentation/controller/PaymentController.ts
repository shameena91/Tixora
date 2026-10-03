import type { Request, Response } from "express";

import type { CreatePaymentRequestDto } from "../../application/dto/CreatePaymentDto";
import { ICreatePayment } from "../../application/abstraction/ICreatePayment";

export class PaymentController {
  constructor(
    private readonly _createPayment: ICreatePayment
  ) {}

  async createPayment(
    req: Request,
    res: Response,
  ): Promise<void> {
    const data =
      req.body as CreatePaymentRequestDto;

    const payment =
      await this._createPayment.execute(data);

    res.status(201).json({
      success: true,
      data: payment,
    });
  }
}