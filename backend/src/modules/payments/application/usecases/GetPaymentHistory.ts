import type { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";

import type { IGetPaymentHistory } from "../abstraction/IGetPaymentHistory";
import type { GetPaymentHistoryDto } from "../dto/GetPaymentHistoryDto";

export class GetPaymentHistory
  implements IGetPaymentHistory
{
  constructor(
    private readonly _paymentRepository: IPaymentRepository,
  ) {}

  async execute(
    companyId: string,
  ): Promise<GetPaymentHistoryDto[]> {
    const payments =
      await this._paymentRepository.findByCompanyId(
        companyId,
      );

    return payments.map((payment) => ({
      razorpayPaymentId:
        payment.razorpayPaymentId,

      paymentDate:
        payment.paymentDate,

      amount:
        payment.amount,

      status:
        payment.status,

      paymentId:payment.paymentId
    }));
  }
}