
import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import { ICreateSubscription } from "../../application/abstraction/company-subscription/ICreateSubscription";
import { IGetMySubscriptionStatus } from "../../application/abstraction/company-subscription/IGetMySubscriptionStatus";

import { createSubscriptionSchema } from "../../application/validator/CreateSubscriptionValidator";

import {
    SubscriptionStatus,
} from "../../domain/entities/Subscription";
import { IgetCompanySubscription } from "../../application/abstraction/company-subscription/IgetCompanySubscription";
import { IVerifySubscriptionPayment } from "../../application/abstraction/company-subscription/IVerifySubscriptionPayment";

export class SubscriptionController {
  constructor(
    private readonly _createSubscription: ICreateSubscription,
    private readonly _getMySubscription: IGetMySubscriptionStatus,
     private readonly _verifySubscriptionPayment: IVerifySubscriptionPayment,

     private readonly _getCompanySubscription:IgetCompanySubscription
  ) {}

  async createSubscription(
    req: Request,
    res: Response,
  ): Promise<void> {
    const data =
      createSubscriptionSchema.parse(req.body);

    const accountId = req.user?.accountId;

    if (!accountId) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.UNAUTHORIZED,
      });

      return;
    }

    const subscription =
      await this._createSubscription.execute(
        accountId,
        data.planId,
        data.billingCycle,
      );


    const message =
      subscription.status === SubscriptionStatus.ACTIVE
        ? "Subscription activated successfully"
        : "Subscription created. Please complete the payment.";

    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message,
      data: subscription,
    });
  }

  async getMySubscriptionStatus(
    req: Request,
    res: Response,
  ): Promise<void> {
    const accountId = req.user?.accountId;

    if (!accountId) {
      res.status(HttpStatusCode.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.UNAUTHORIZED,
      });

      return;
    }

    const subscription =
      await this._getMySubscription.execute(
        accountId,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      data: subscription,
    });
  }

  async verifyPayment(req:Request,
    res:Response
  ):Promise<void>{


const accountId = req.user?.accountId;

  if (!accountId) {
    res.status(HttpStatusCode.UNAUTHORIZED).json({
      success: false,
      message: MESSAGES.UNAUTHORIZED,
    });

    return;
  }

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  } = req.body;

  const subscription =
    await this._verifySubscriptionPayment.execute(
      accountId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    );

  res.status(HttpStatusCode.OK).json({
    success: true,
    message: "Payment verified successfully",
    data: subscription,
  });
}

async getCompanySubscription(
  req: Request,
  res: Response,
): Promise<void> {
  const companyId = req.params.id;
  console.log("ttttt",companyId)
  if (typeof companyId !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }
  const result =
    await this._getCompanySubscription.execute(companyId);
console.log("from compsub controller",result)
  res.status(200).json({
    success: true,
    message: "Company subscription fetched successfully",
    data: result,
  });
}


 
}

