import { MESSAGES } from "../../../../../shared/constants/messages";
import { AppErrors } from "../../../../../shared/errors/AppErrors";
import { ErrorCode } from "../../../../../shared/errors/ErrorCode";
import {
  SubscriptionPlan,
  SubscriptionPlanStatus,
} from "../../../domain/entities/SubscriptionPlan";
import { ISubscriptionPlanRepository } from "../../../domain/repositories/ISubscriptionPlanRepository";
import { IUpdatePlanStatus } from "../../abstraction/subscription-plan/IUpdatePlanStatus";

export class UpdatePlanStatus implements IUpdatePlanStatus {
  constructor(
    private readonly _subscriptionPlanRepository: ISubscriptionPlanRepository,
  ) {}

  async execute(id: string, status: SubscriptionPlanStatus): Promise<void> {
    const subscriptionPlan =
      await this._subscriptionPlanRepository.findById(id);

    if (!subscriptionPlan) {
      throw new AppErrors(MESSAGES.PLAN_NOT_FOUND, ErrorCode.ACCOUNT_NOT_FOUND);
    }

    const updatedSubscriptionPlan =
      await this._subscriptionPlanRepository.updateStatus(id, status);
  }
}
