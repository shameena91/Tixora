import Razorpay from "razorpay";
import { createHmac } from "crypto";

import { env } from "../../../../config/env";
import { IRazorpayOrderService } from "../../application/ports/IRazorpayOrderService";

export class RazorpayOrderService
  implements IRazorpayOrderService
{
  private readonly razorpay: Razorpay;

  constructor() {
    this.razorpay = new Razorpay({
      key_id: env.razorpayKeyId,
      key_secret: env.razorpaySecretKey,
    });
  }

  async createOrder(
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
  }> {
    const order =
      await this.razorpay.orders.create({
        amount,
        currency: "INR",
        receipt,
                notes,

      });

    return {
      orderId: order.id,
      amount: Number(order.amount),
      currency: order.currency,
    };
  }

async getOrder(
  orderId: string,
): Promise<{
  orderId: string;
  notes: {
    companyId: string;
    planId: string;
    billingCycle: "MONTHLY" | "YEARLY";
    isRenewal?: string;
    isUpgrade?: string;
    subscriptionId?: string;
  };
}> {
  const order =
    await this.razorpay.orders.fetch(orderId);

  const companyId = order.notes?.companyId;
  const planId = order.notes?.planId;
  const billingCycle = order.notes?.billingCycle;
 const isRenewal = order.notes?.isRenewal;
const isUpgrade = order.notes?.isUpgrade;
const subscriptionId = order.notes?.subscriptionId;

  if (
    typeof companyId !== "string" ||
    typeof planId !== "string" ||
    (billingCycle !== "MONTHLY" &&
      billingCycle !== "YEARLY")
  ) {
    throw new Error("Invalid Razorpay order metadata");
  }

  return {
  orderId: order.id,
  notes: {
    companyId,
    planId,
    billingCycle,
    ...(typeof isRenewal === "string"
      ? { isRenewal }
      : {}),
    ...(typeof isUpgrade === "string"
      ? { isUpgrade }
      : {}),
    ...(typeof subscriptionId === "string"
      ? { subscriptionId }
      : {}),
  },
};
}

   verifyPayment(
    orderId: string,
    paymentId: string,
    signature: string,
  ): boolean {
    const generatedSignature =
      createHmac(
        "sha256",
        env.razorpaySecretKey,
      )
        .update(
          `${orderId}|${paymentId}`,
        )
        .digest("hex");

    return generatedSignature === signature;
  }

 
async getPaymentDetails(
  paymentId: string,
): Promise<{
  orderId: string | null;
  status: string;
  paymentMethod: string;
  createdAt: Date;

}> {
  const payment =
    await this.razorpay.payments.fetch(paymentId);

  return {
    orderId: payment.order_id ?? null,
    status: payment.status,
    paymentMethod: payment.method,
    createdAt: new Date(payment.created_at * 1000),
  };
}

}