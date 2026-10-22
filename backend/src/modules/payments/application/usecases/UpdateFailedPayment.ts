
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";
import { ICompanyRepository } from "../../../company/domain/repositories/ICompanyRepository";
import { IRazorpayOrderService } from "../../../SubScriptionPlans/application/ports/IRazorpayOrderService";
import { IPaymentRepository } from "../../domain/repositories/IPaymentRepository";
import { PaymentStatus } from "../../domain/types/PaymentStatus";
import { IUpdateFailedPayment } from "../abstraction/IUpdateFailedPayment";

export class UpdateFailedPayment implements IUpdateFailedPayment {
  constructor(
    private readonly _companyRepository: ICompanyRepository,
    private readonly _paymentRepository: IPaymentRepository,
    private readonly _razorpayOrderService: IRazorpayOrderService,
  ) {}

  async execute(
    accountId: string,
    orderId: string,
    paymentId: string,
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
      await this._paymentRepository.findByRazorpayOrderId(orderId);

    if (!payment || payment.companyId !== company.id) {
      throw new AppErrors(
        MESSAGES.PAYMENT_NOT_FOUND,
        ErrorCode.PAYMENT_NOT_FOUND,
      );
    }

    // Do not overwrite a successful payment.
    if (payment.status === PaymentStatus.SUCCESS) {
      return;
    }

    const paymentDetails =
      await this._razorpayOrderService.getPaymentDetails(paymentId);

    if (paymentDetails.orderId !== orderId) {
      throw new AppErrors(
        MESSAGES.INVALID_PAYMENT_SIGNATURE,
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

    // Only Razorpay-confirmed failures may be marked FAILED.
    if (paymentDetails.status !== "failed") {
      throw new AppErrors(
        "Razorpay has not confirmed this payment as failed",
        ErrorCode.INVALID_PAYMENT_SIGNATURE,
      );
    }

    if (payment.status === PaymentStatus.PENDING) {
      await this._paymentRepository.updateStatusByRazorpayOrderId(
        orderId,
        PaymentStatus.FAILED,
      );
    }
  }
}