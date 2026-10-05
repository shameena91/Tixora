import { VerifySubscriptionPaymentResponseDto } from "../../dto/VerifySubscriptionPaymentResponseDto";


export interface IVerifySubscriptionPayment {
  execute(
    accountId: string,
    orderId: string,
    paymentId: string,
    signature: string,
  ): Promise<VerifySubscriptionPaymentResponseDto>;
}
