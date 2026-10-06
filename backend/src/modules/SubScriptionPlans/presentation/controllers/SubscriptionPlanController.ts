import { Request, Response } from "express";

import {
  sendError,
  sendSuccess,
} from "../../../../presentation/response/ResponseHelper";

import { HttpStatusCode } from "../../../../shared/constants/httpStattusCode";
import { MESSAGES } from "../../../../shared/constants/messages";
import { AppErrors } from "../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../shared/errors/ErrorCode";

import { ICreateSubscriptionPlan } from "../../application/abstraction/subscription-plan/ICreateSubscriptionPlan";
import { IDeletePlan } from "../../application/abstraction/subscription-plan/IDeletePlan";
import { IGetAllSubscriptions } from "../../application/abstraction/subscription-plan/IGetAllSubscriptions";
import { IGetSubscriptionPlanById } from "../../application/abstraction/subscription-plan/IGetSubscriptionPlanById";
import { IUpdatePlanStatus } from "../../application/abstraction/subscription-plan/IUpdatePlanStatus";
import { IUpdateSubscriptionPlan } from "../../application/abstraction/subscription-plan/IUpdateSubscriptionPlan";

import { createSubscriptionPlanSchema } from "../validator/CreateSubscriptionPlanValidator";

import { SubscriptionPlanName } from "../../domain/entities/SubscriptionPlan";
import { IGetActiveSubscriptionPlans } from "../../application/abstraction/subscription-plan/IGetActiveSubscriptionPlans";

export class SubscriptionPlanController {
  constructor(
    private readonly _createSubscriptionPlan: ICreateSubscriptionPlan,
  
    private readonly _viewSubscriptionPlan: IGetSubscriptionPlanById,
    private readonly _updateSubscriptionPlan: IUpdateSubscriptionPlan,
    private readonly _updateSubscriptionPlanStatus: IUpdatePlanStatus,
    private readonly _deleteSubscriptionPlan: IDeletePlan,
      private readonly _getAllSubscriptionPlans: IGetAllSubscriptions,
    private readonly _getActiveSubscriptionPlans: IGetActiveSubscriptionPlans,
  ) {}

  async createPlan(req: Request, res: Response) {
    const data = createSubscriptionPlanSchema.parse(req.body);

    const subscriptionPlan = await this._createSubscriptionPlan.execute(data);

    return sendSuccess(
      res,
      MESSAGES.PLAN_CREATED,
      subscriptionPlan,
      HttpStatusCode.OK,
    );
  }

  async getPlanNames(req: Request, res: Response) {
    return sendSuccess(
      res,
      MESSAGES.PLAN_FETCHED_SUCCESSFULLY,
      Object.values(SubscriptionPlanName),
      HttpStatusCode.OK,
    );
  }

  
  async getAllSubscriptionPlans(
    req: Request,
    res: Response,
  ) {
    const page =
      typeof req.query.page === "string"
        ? Number(req.query.page)
        : 1;

    const limit =
      typeof req.query.limit === "string"
        ? Number(req.query.limit)
        : 3;

    const plans =
      await this._getAllSubscriptionPlans.execute(
        page,
        limit,
      );

    return sendSuccess(
      res,
      MESSAGES.SUBSCRIPTION_PLAN_LIST_FETCHED,
      plans,
      HttpStatusCode.OK,
    );
  }

  
  async getActiveSubscriptionPlans(
    _req: Request,
    res: Response,
  ) {
    const plans =
      await this._getActiveSubscriptionPlans.execute();

    return sendSuccess(
      res,
      MESSAGES.SUBSCRIPTION_PLAN_LIST_FETCHED,
      plans,
      HttpStatusCode.OK,
    );
  }


  async getPlanById(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const subscriptionPlan = await this._viewSubscriptionPlan.execute(id);

    if (!subscriptionPlan) {
      throw new AppErrors(
        MESSAGES.SUBSCRIPTION_PLAN_NOT_FOUND,
        ErrorCode.ACCOUNT_NOT_FOUND,
      );
    }

    return sendSuccess(
      res,
      MESSAGES.PLAN_FETCHED_SUCCESSFULLY,
      subscriptionPlan,
      HttpStatusCode.OK,
    );
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const data = createSubscriptionPlanSchema.parse(req.body);

    const subscriptionPlan = await this._updateSubscriptionPlan.execute(
      id,
      data,
    );

    return sendSuccess(
      res,
      MESSAGES.SUBSCRIPTION_PLAN_UPDATED,
      subscriptionPlan,
      HttpStatusCode.OK,
    );
  }

  async updateStatus(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(
        res,
        MESSAGES.INVALID_COMPANY_REQUEST_ID,
        HttpStatusCode.BAD_REQUEST,
      );
    }

    const { status } = req.body;

    const subscriptionPlan = await this._updateSubscriptionPlanStatus.execute(
      id,
      status,
    );

    return sendSuccess(
      res,
      MESSAGES.SUBSCRIPTION_PLAN_UPDATED,
      subscriptionPlan,
      HttpStatusCode.OK,
    );
  }

  async deletePlan(req: Request, res: Response) {
    const { id } = req.params;

    if (typeof id !== "string") {
      return sendError(res, MESSAGES.INVALID_PLAN, HttpStatusCode.BAD_REQUEST);
    }

    const subscriptionPlan = await this._deleteSubscriptionPlan.execute(id);

    return sendSuccess(
      res,
      MESSAGES.SUBSCRIPTION_PLAN_UPDATED,
      subscriptionPlan,
      HttpStatusCode.OK,
    );
  }
}
