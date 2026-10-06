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
  };
}> {
  const order =
    await this.razorpay.orders.fetch(orderId);

  const companyId = order.notes?.companyId;
  const planId = order.notes?.planId;
  const billingCycle = order.notes?.billingCycle;

  if (
    typeof companyId !== "string" ||
    typeof planId !== "string" ||
    (billingCycle !== "MONTHLY" &&
      billingCycle !== "YEARLY")
  ) {
    throw new Error(
      "Invalid Razorpay order metadata",
    );
  }

  return {
    orderId: order.id,
    notes: {
      companyId,
      planId,
      billingCycle,
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
}