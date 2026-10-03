
import { Request, Response } from "express";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import { IDeletePlan } from "../../application/abstraction/subscription-plan/IDeletePlan";
import { IGetAllSubscriptions } from "../../application/abstraction/subscription-plan/IGetAllSubscriptions";
import { IGetSubscriptionPlanById } from "../../application/abstraction/subscription-plan/IGetSubscriptionPlanById";
import { IUpdatePlanStatus } from "../../application/abstraction/subscription-plan/IUpdatePlanStatus";
import { IUpdateSubscriptionPlan } from "../../application/abstraction/subscription-plan/IUpdateSubscriptionPlan";

import { createSubscriptionPlanSchema } from "../../application/validator/CreateSubscriptionPlanValidator";
import { SubscriptionPlanName } from "../../domain/entities/SubscriptionPlan";
import { ICreateSubscriptionPlan } from "../../application/abstraction/subscription-plan/ICreateSubscriptionPlan";

export class SubscriptionPlanController {
  constructor(
    private readonly _createSubscriptionPlan: ICreateSubscriptionPlan,
    private readonly _getAllSubscriptionPlans: IGetAllSubscriptions,
    private readonly _viewSubscriptionPlan: IGetSubscriptionPlanById,
    private readonly _updateSubscriptionPlan: IUpdateSubscriptionPlan,
    private readonly _updateSubscriptionPlanStatus: IUpdatePlanStatus,
    private readonly _deleteSubscriptionPlan: IDeletePlan,
  ) {}

  async createPlan(
    req: Request,
    res: Response,
  ): Promise<void> {
    const data = createSubscriptionPlanSchema.parse(req.body);

    const subscriptionPlan =
      await this._createSubscriptionPlan.execute(data);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.PLAN_CREATED,
      data: subscriptionPlan,
    });
  }

  async getPlanNames(
    req: Request,
    res: Response,
  ): Promise<void> {
    res.status(HttpStatusCode.OK).json({
      success: true,
      data: Object.values(SubscriptionPlanName),
    });
  }

  async getAllPlans(
    req: Request,
    res: Response,
  ): Promise<void> {
    const role = req.user?.role;

    const subscriptionPlans =
      await this._getAllSubscriptionPlans.execute(role);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.PLAN_FETCHED_SUCCESSFULLY,
      data: subscriptionPlans,
    });
  }

  async getPlanById(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const subscriptionPlan =
      await this._viewSubscriptionPlan.execute(id);

    if (!subscriptionPlan) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.ACCOUNT_NOT_FOUND,
      );
    }

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.PLAN_FETCHED_SUCCESSFULLY,
      data: subscriptionPlan,
    });
  }

  async update(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const data = createSubscriptionPlanSchema.parse(req.body);

    const subscriptionPlan =
      await this._updateSubscriptionPlan.execute(
        id,
        data,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.SUBSCRIPTION_PLAN_UPDATED,
      data: subscriptionPlan,
    });
  }

  async updateStatus(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_COMPANY_REQUEST_ID,
      });
      return;
    }

    const { status } = req.body;

    const subscriptionPlan =
      await this._updateSubscriptionPlanStatus.execute(
        id,
        status,
      );

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.SUBSCRIPTION_PLAN_UPDATED,
      data: subscriptionPlan,
    });
  }

  async deletePlan(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id } = req.params;

    if (typeof id !== "string") {
      res.status(HttpStatusCode.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.INVALID_PLAN,
      });
      return;
    }

    const subscriptionPlan =
      await this._deleteSubscriptionPlan.execute(id);

    res.status(HttpStatusCode.OK).json({
      success: true,
      message: MESSAGES.SUBSCRIPTION_PLAN_UPDATED,
      data: subscriptionPlan,
    });
  }
}

