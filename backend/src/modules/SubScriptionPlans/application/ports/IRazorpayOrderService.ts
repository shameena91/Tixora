export interface IRazorpayOrderService {
  createOrder(
    amount: number,
    receipt: string,
      notes: {
      companyId: string;
      planId: string;
      billingCycle: "MONTHLY" | "YEARLY";
    }
  ): Promise<{
    orderId: string;
    amount: number;
    currency: string;
  }>;


    getOrder(orderId: string): Promise<{
    orderId: string;
    notes: {
      companyId: string;
      planId: string;
      billingCycle: "MONTHLY" | "YEARLY";
    };
  }>;
  verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string,
  ): boolean;
}