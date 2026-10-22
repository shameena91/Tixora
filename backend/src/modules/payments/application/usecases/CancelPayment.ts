import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { ICompanyRepository } from "../../../company/domain/repositories/ICompanyRepository";
import { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";
import { PaymentStatus } from "../../domain/types/PaymentStatus";
import { ICancelPayment } from "../abstraction/ICancelPayment";


export class CancelPayment implements ICancelPayment {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _paymentRepository: IPaymentRepository,
  ) {}

  async execute(
    accountId: string,
    razorpayOrderId: string,
  ): Promise<void> {
    const company =
      await this._companyRepository.findByAccountId(accountId);

    if (!company) {
      throw new AppErrors(
        MESSAGES.COMPANY_NOT_FOUND,
        ErrorCode.COMPY_NOT_FOUND,
      );
    }

    const payment =
      await this._paymentRepository.findByRazorpayOrderId(
        razorpayOrderId,
      );

    if (!payment || payment.companyId !== company.id) {
      throw new AppErrors(
        "Payment not found",
        ErrorCode.SUBSCRIPTION_PLAN_NOT_FOUND,
      );
    }

    // Never overwrite a completed or failed payment.
    if (payment.status !== PaymentStatus.PENDING) {
      return;
    }

    await this._paymentRepository.updateStatusByRazorpayOrderId(
      razorpayOrderId,
      PaymentStatus.CANCELLED,
    );
  }
}
