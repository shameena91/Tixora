import { Router } from "express";
import { BaseRepository } from "../../../infrastructure/repositories/Baserepository";
import { CompanyModel } from "../../company/Infrastructure/database/models/CompanyModel";
import { CompanyRepository } from "../../company/Infrastructure/database/repositories/CompanyRepository";
import {
  SubscriptionCreateData,
  SubscriptionDocument,
} from "../application/mappers/SubscriptionMapper";

import { CreateSubscriptionPlan } from "../application/usecases/subscription-plan/CreateSubscriptionPlan";
import { DeletePlan } from "../application/usecases/subscription-plan/DeletePlan";
import { GetAllSubscriptionPlan } from "../application/usecases/subscription-plan/GetAllSubscriptionPlan";
import { GetSubscriptionPlanById } from "../application/usecases/subscription-plan/GetSubscriptionPlanById";
import { UpdateSubscriptionPlan } from "../application/usecases/subscription-plan/UpdateSubscriptionPlan";
import { SubscriptionModel } from "../infrastructure/database/models/SubscriptionModel";
import { SubscriptionPlanModel } from "../infrastructure/database/models/SubscriptionPlanModel";
import { SubscriptionPlanRepository } from "../infrastructure/database/repositoris/SubScriptionPlanRepository";
import { SubscriptionRepository } from "../infrastructure/database/repositoris/SubscriptionRepository";
import { RazorpayOrderService } from "../infrastructure/services/RazorpayOrderService";
import { SubscriptionController } from "../presentation/controllers/SubscriptionController";
import { SubscriptionPlanController } from "../presentation/controllers/SubscriptionPlanController";
import { UpdatePlanStatus } from "../application/usecases/subscription-plan/UpdatePlanStatus";
import { GetMySubscriptionStatus } from "../application/usecases/company-subscription/GetMySubscriptionStatus";
import { VerifySubscriptionPayment } from "../application/usecases/company-subscription/VerifySubscriptionPayment";
import { GetCompanySubscription } from "../application/usecases/company-subscription/getCompanySubscription";
import {
  createPayment,
  paymentRepository,
} from "../../payments/container/Container";
import { GetActiveSubscriptionPlans } from "../application/usecases/subscription-plan/GetActiveSubscriptionPlans";
import { provisionTenant } from "../../tenant/container/Container";
import { SubscriptionPlanCreateData, SubscriptionPlanDocument } from "../application/mappers/SubscriptionPlanMapper";
import { CreateSubscription } from "../application/usecases/company-subscription/CreateSubscription";

const router = Router();

const baseSubscriptionPlanRepository = new BaseRepository<
  SubscriptionPlanDocument,
  SubscriptionPlanCreateData
>(SubscriptionPlanModel);

export const subscriptionPlanRepository = new SubscriptionPlanRepository(
  baseSubscriptionPlanRepository,
);

const createSubscriptionPlanUseCase = new CreateSubscriptionPlan(
  subscriptionPlanRepository,
);
const getSubscriptionPlanById = new GetSubscriptionPlanById(
  subscriptionPlanRepository,
);
const getAllSubscriptionPlans =
  new GetAllSubscriptionPlan(
    subscriptionPlanRepository,
  );

const getActiveSubscriptionPlans =
  new GetActiveSubscriptionPlans(
    subscriptionPlanRepository,
  );
const updateSubscriptionPlan = new UpdateSubscriptionPlan(
  subscriptionPlanRepository,
);
const updateplanStatus = new UpdatePlanStatus(subscriptionPlanRepository);
const deletePlan = new DeletePlan(subscriptionPlanRepository);

const baseSubscriptionRepository = new BaseRepository<
  SubscriptionDocument,
  SubscriptionCreateData
>(SubscriptionModel);

export const subscriptionRepository = new SubscriptionRepository(
  baseSubscriptionRepository,
);
const baseCompanyrepository = new BaseRepository(CompanyModel);

const companyRepository = new CompanyRepository(baseCompanyrepository);
const razorpayOrderService = new RazorpayOrderService();

const createSubscription = new CreateSubscription(
  subscriptionRepository,
  companyRepository,
  subscriptionPlanRepository,
  razorpayOrderService,
  paymentRepository,
);
const getMySubscription = new GetMySubscriptionStatus(
  companyRepository,
  subscriptionRepository,
);

const verifySubscriptionPayment = new VerifySubscriptionPayment(
  subscriptionRepository,
  companyRepository,
  razorpayOrderService,
  paymentRepository,
   provisionTenant,
);

const getCompanySubscription = new GetCompanySubscription(
  subscriptionRepository,
  subscriptionPlanRepository,
);

export const createSubscriptionPlanController = new SubscriptionPlanController(
  createSubscriptionPlanUseCase,
 
  getSubscriptionPlanById,
  updateSubscriptionPlan,
  updateplanStatus,
  deletePlan,
      getAllSubscriptionPlans,
    getActiveSubscriptionPlans,
);

export const createSubScriptionController = new SubscriptionController(
  createSubscription,
  getMySubscription,
  verifySubscriptionPayment,

  getCompanySubscription,
);
