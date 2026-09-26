import { Router } from "express";
import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { SubscriptionPlanCreateData, SubscriptionPlanDocument } from "../application/mappers/SubscriptionPlanMapper";
import { SubscriptionPlanModel } from "../infrastructure/database/models/SubscriptionPlanModel";
import { CreateSubscriptionPlan } from "../application/usecases/CreateSubscriptionPlan";
import { SubscriptionPlanController } from "../presentation/controllers/SubscriptionPlanController";
import { GetAllSubscriptions } from "../application/usecases/GetAllSubscriptionPlan";
import { GetSubscriptionPlanById } from "../application/usecases/GetSubscriptionPlanById";
import { UpdateSubscriptionPlan } from "../application/usecases/UpdateSubscriptionPlan";
import { UpdatePlanStatus } from "../application/usecases/UpdatePlanStatus";
import { SubscriptionPlanRepository } from "../infrastructure/database/repositoris/SubScriptionPlanRepository";
import { DeletePlan } from "../application/usecases/DeletePlan";
import { SubscriptionCreateData, SubscriptionDocument } from "../application/mappers/SubscriptionMapper";
import { SubscriptionModel } from "../infrastructure/database/models/SubscriptionModel";
import { SubscriptionRepository } from "../infrastructure/database/repositoris/SubscriptionRepository";
import { CreateSubscription } from "../application/usecases/CreateSubscription";
import { CompanyRepository } from "../../company/Infrastructure/database/repositories/CompanyRepository";
import { CompanyModel } from "../../company/Infrastructure/database/models/CompanyModel";
import { SubscriptionController } from "../presentation/controllers/SubscriptionController";
import { GetMySubscriptionStatus } from "../application/usecases/GetMySubscriptionStatus";

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
const getSubscriptionPlanById=new GetSubscriptionPlanById(
  subscriptionPlanRepository
)
  const getAllSubscriptionPlans=new GetAllSubscriptions(subscriptionPlanRepository)
  const updateSubscriptionPlan=new UpdateSubscriptionPlan(subscriptionPlanRepository)
  const updateplanStatus=new UpdatePlanStatus(subscriptionPlanRepository)
  const deletePlan=new DeletePlan(subscriptionPlanRepository)


const baseSubscriptionRepository =
  new BaseRepository<
    SubscriptionDocument,
    SubscriptionCreateData
  >(SubscriptionModel);

const subscriptionRepository =
  new SubscriptionRepository(
    baseSubscriptionRepository
  );
  const baseCompanyrepository =
  new BaseRepository(CompanyModel);

const companyRepository =
  new CompanyRepository(baseCompanyrepository);

const createSubscription =
  new CreateSubscription(
    subscriptionRepository,
    companyRepository,
    subscriptionPlanRepository
  );
  const getMySubscription =
  new GetMySubscriptionStatus(
    companyRepository,
    subscriptionRepository
  );
  export const createSubscriptionPlanController =
  new SubscriptionPlanController(
    createSubscriptionPlanUseCase,
    getAllSubscriptionPlans,
    getSubscriptionPlanById,
    updateSubscriptionPlan,
    updateplanStatus,
    deletePlan
  );

  export const createSubScriptionController=
  new SubscriptionController(createSubscription,
    getMySubscription
  )