import { Router } from "express";
import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { SubscriptionPlanCreateData, SubscriptionPlanDocument } from "../application/mappers/SubscriptionPlanMapper";
import { CreateSubscriptionPlan } from "../application/usecases/CreateSubscriptionPlan";
import { SubscriptionPlanModel } from "../infrastructure/database/models/SubscriptionPlanModel";
import { SubscriptionPlanRepository } from "../infrastructure/database/repositoris/SubScriptionPlanRepository";
import { SubscriptionPlanController } from "../presentation/controllers/SubscriptionPlanController";

const router=Router()


const baseSubscriptionPlanRepository =
  new BaseRepository<
    SubscriptionPlanDocument,
    SubscriptionPlanCreateData
  >(SubscriptionPlanModel);


const subscriptionPlanRepository =
new SubscriptionPlanRepository(baseSubscriptionPlanRepository)

const createSubscriptionPlanUseCase =
  new CreateSubscriptionPlan(
    subscriptionPlanRepository
  );
  export const createSubscriptionPlanController =
  new SubscriptionPlanController(
    createSubscriptionPlanUseCase
  );