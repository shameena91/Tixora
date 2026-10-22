export interface ICancelPayment {
  execute(
    accountId: string,
    razorpayOrderId: string,
  ): Promise<void>;
}