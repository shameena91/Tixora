import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";

import { ICreateSubscription } from "../../application/abstraction/ICreateSubscription";
import { createSubscriptionSchema } from "../../application/validator/CreateSubscriptionValidator";
import { IGetMySubscriptionStatus } from "../../application/abstraction/IGetmySubscriptionStatus";


export class SubscriptionController {
  constructor(
    private readonly _createSubscription: ICreateSubscription,
    private readonly _getMySubscription:IGetMySubscriptionStatus
  ) {}

  async createSubscriptionPlan(
    req: Request,
    res: Response
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
        data.billingCycle
      );
console.log("select Sub:",subscription)
    res.status(HttpStatusCode.CREATED).json({
      success: true,
      message: "Subscription activated successfully",
      data: subscription,
    });
  }

  async getMySubscriptionStatus(
  req: Request,
  res: Response
): Promise<void> {

  const accountId = req.user?.accountId;

  if (!accountId) {
    res.status(
      HttpStatusCode.UNAUTHORIZED
    ).json({
      success: false,
      message: MESSAGES.UNAUTHORIZED,
    });

    return;
  }

  const subscription =
    await this._getMySubscription.execute(
      accountId
    );

  res.status(HttpStatusCode.OK).json({
    success: true,
    data: subscription,
  });
}
}

