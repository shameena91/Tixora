import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";


import { SubscriptionStatus } from "../../domain/entities/Subscription";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";
import { IGetMySubscriptionStatus } from "../../application/abstraction/company-subscription/IGetMySubscriptionStatus";
import { IgetCompanySubscription } from "../../application/abstraction/company-subscription/IgetCompanySubscription";
import { IVerifySubscriptionPayment } from "../../application/abstraction/company-subscription/IVerifySubscriptionPayment";
import { ICreateSubscription } from "../../application/abstraction/company-subscription/ICreateSubscription";
import { createSubscriptionSchema } from "../validator/CreateSubscriptionValidator";
import { IUpdateFailedPayment } from "../../../payments/application/abstraction/IUpdateFailedPayment";
import { IGetMySubscriptionPlan } from "../../application/abstraction/company-subscription/IGetMySubscriptionPlan";

export class SubscriptionController {
  constructor(
    private readonly _createSubscription: ICreateSubscription,
    private readonly _getMySubscription: IGetMySubscriptionStatus,
    private readonly _verifySubscriptionPayment: IVerifySubscriptionPayment,
    private readonly _getCompanySubscription: IgetCompanySubscription,
  private readonly _updateFailedPayment: IUpdateFailedPayment,
    private readonly _getMySubscriptionPlan: IGetMySubscriptionPlan,
  ) {}

  async createSubscription(req: Request, res: Response) {
    const data = createSubscriptionSchema.parse(req.body);
console.log("boddddd",data)
    const accountId = req.user?.accountId;

    if (!accountId) {
      return sendError(res, MESSAGES.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
    }

    const subscription = await this._createSubscription.execute(
      accountId,
      data.planId,
      data.billingCycle,
     
  data.isRenewal,
  data.isUpgrade, 
 
    );

    const message =
      subscription.status === SubscriptionStatus.ACTIVE
        ? "Subscription activated successfully"
        : "Subscription created. Please complete the payment.";

    return sendSuccess(res, message, subscription, HttpStatusCode.CREATED);
  }


async getMySubscriptionStatus(req: Request, res: Response) {
  const accountId = req.user?.accountId;

  if (!accountId) {
    return sendError(
      res,
      MESSAGES.UNAUTHORIZED,
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  if (
    !Number.isInteger(page) ||
    page < 1 ||
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 100
  ) {
    return sendError(
      res,
      "Invalid pagination parameters",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const subscription = await this._getMySubscription.execute(
    accountId,
    page,
    limit,
  );

  return sendSuccess(
    res,
    "subscription fetched",
    subscription,
    HttpStatusCode.OK,
  );
}


  async verifyPayment(req: Request, res: Response) {
    const accountId = req.user?.accountId;

    if (!accountId) {
      return sendError(res, MESSAGES.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const subscription = await this._verifySubscriptionPayment.execute(
      accountId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    );

    return sendSuccess(
      res,
      "payment verified successfully",
      subscription,
      HttpStatusCode.OK,
    );
  }

 
async getCompanySubscription(req: Request, res: Response) {
  const { id: companyId } = req.params;

  if (typeof companyId !== "string") {
    return sendError(
      res,
      MESSAGES.INVALID_COMPANY_REQUEST_ID,
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const page = Number(req.query.page ?? 1);
  const limit = Number(req.query.limit ?? 10);

  if (
    !Number.isInteger(page) ||
    page < 1 ||
    !Number.isInteger(limit) ||
    limit < 1 ||
    limit > 100
  ) {
    return sendError(
      res,
      "Invalid pagination parameters",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  const result = await this._getCompanySubscription.execute(
    companyId,
    page,
    limit,
  );

  return sendSuccess(
    res,
    "company subscription fetched",
    result,
    HttpStatusCode.OK,
  );
}

async getMySubscriptionPlan(
  req: Request,
  res: Response,
): Promise<void> {
  const accountId = req.user?.accountId;

  if (typeof accountId !== "string" || !accountId) {
    sendError(
      res,
      MESSAGES.AUTHENTICATED_ID_MISING,
      HttpStatusCode.UNAUTHORIZED,
    );
    return;
  }

  const plan = await this._getMySubscriptionPlan.execute(accountId);

  if (!plan) {
    sendError(
      res,
      MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
      HttpStatusCode.NOT_FOUND,
    );
    return;
  }

  sendSuccess(
    res,
    MESSAGES.PLAN_FETCHED_SUCCESSFULLY,
    plan,
    HttpStatusCode.OK,
  );
}

async updateFailedPayment(req: Request, res: Response) {
  const accountId = req.user?.accountId;

  if (!accountId) {
    return sendError(
      res,
      MESSAGES.UNAUTHORIZED,
      HttpStatusCode.UNAUTHORIZED,
    );
  }

  const { razorpay_order_id, razorpay_payment_id } = req.body;

  if (
    typeof razorpay_order_id !== "string" ||
    typeof razorpay_payment_id !== "string"
  ) {
    return sendError(
      res,
      "Invalid payment details",
      HttpStatusCode.BAD_REQUEST,
    );
  }

  await this._updateFailedPayment.execute(
    accountId,
    razorpay_order_id,
    razorpay_payment_id,
  );

  return sendSuccess(
    res,
    "Failed payment status updated",
    null,
    HttpStatusCode.OK,
  );
}
}
