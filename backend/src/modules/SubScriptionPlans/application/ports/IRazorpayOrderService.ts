export interface IRazorpayOrderService {
  createOrder(
    amount: number,
    receipt: string,
      notes: {
      companyId: string;
      planId: string;
      billingCycle: "MONTHLY" | "YEARLY";
       isRenewal?: string;
       isUpgrade?: string;
  subscriptionId?: string;
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
           isRenewal?: string;
           isUpgrade?: string;
  subscriptionId?: string;
    };
  }>;
  verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string,
  ): boolean;
  getPaymentDetails(
  paymentId: string,
): Promise<{
  orderId: string | null;
  status: string;
  paymentMethod: string;
   createdAt: Date;
}>;
}