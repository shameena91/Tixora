export interface IUpdateFailedPayment {
  execute(
    accountId: string,
    orderId: string,
    paymentId: string,
  ): Promise<void>;
}