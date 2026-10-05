import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import { ICreateSubscription } from "../../application/abstraction/company-subscription/ICreateSubscription";
import { IGetMySubscriptionStatus } from "../../application/abstraction/company-subscription/IGetMySubscriptionStatus";
import { IVerifySubscriptionPayment } from "../../application/abstraction/company-subscription/IVerifySubscriptionPayment";
import { IgetCompanySubscription } from "../../application/abstraction/company-subscription/IgetCompanySubscription";

import { createSubscriptionSchema } from "../validator/CreateSubscriptionValidator";

import { SubscriptionStatus } from "../../domain/entities/Subscription";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";

export class SubscriptionController {
  constructor(
    private readonly _createSubscription: ICreateSubscription,
    private readonly _getMySubscription: IGetMySubscriptionStatus,
    private readonly _verifySubscriptionPayment: IVerifySubscriptionPayment,
    private readonly _getCompanySubscription: IgetCompanySubscription,
  ) {}

  async createSubscription(req: Request, res: Response) {
    const data = createSubscriptionSchema.parse(req.body);

    const accountId = req.user?.accountId;

    if (!accountId) {
      return sendError(res, MESSAGES.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
    }

    const subscription = await this._createSubscription.execute(
      accountId,
      data.planId,
      data.billingCycle,
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
      return sendError(res, MESSAGES.UNAUTHORIZED, HttpStatusCode.UNAUTHORIZED);
    }

    const subscription = await this._getMySubscription.execute(accountId);

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

    const result = await this._getCompanySubscription.execute(companyId);

    return sendSuccess(
      res,
      "company subscription fetched",
      result,
      HttpStatusCode.OK,
    );
  }
}
