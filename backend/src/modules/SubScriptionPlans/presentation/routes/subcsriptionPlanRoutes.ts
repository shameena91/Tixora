import { Router } from "express";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { AccountRole } from "../../../auth/domain/entities/Account";
import { authMiddleware } from "../../../auth/container/container";
import { createSubscriptionPlanController } from "../../container/Container";
import { SUBSCRIPTION_ROUTE_CONSTANTS } from "../../../../shared/constants/route";
const router = Router();

router.use(authMiddleware.authenticate.bind(authMiddleware));
router.get(
  SUBSCRIPTION_ROUTE_CONSTANTS.GET_SUBSCRIPTION_PLAN_NAME,
  createSubscriptionPlanController.getPlanNames.bind(
    createSubscriptionPlanController,
  ),
);
router.post(
  SUBSCRIPTION_ROUTE_CONSTANTS.CREATE,

  authorizeRoles(AccountRole.SUPER_ADMIN),
  createSubscriptionPlanController.createPlan.bind(
    createSubscriptionPlanController,
  ),
);
router.get(
  SUBSCRIPTION_ROUTE_CONSTANTS.GET_ALL_PLANS,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  createSubscriptionPlanController.getAllSubscriptionPlans.bind(
    createSubscriptionPlanController,
  ),
);
router.get(
  SUBSCRIPTION_ROUTE_CONSTANTS.GET_ACTIVE_PLANS,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  createSubscriptionPlanController.getActiveSubscriptionPlans.bind(
    createSubscriptionPlanController,
  ),
);
router.get(
  SUBSCRIPTION_ROUTE_CONSTANTS.GET_PLAN_BY_ID,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  createSubscriptionPlanController.getPlanById.bind(
    createSubscriptionPlanController,
  ),
);
router.patch(
  SUBSCRIPTION_ROUTE_CONSTANTS.UPDTE_PLAN,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  createSubscriptionPlanController.update.bind(
    createSubscriptionPlanController,
  ),
);
router.patch(
  SUBSCRIPTION_ROUTE_CONSTANTS.UPDATE_STATUS,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  createSubscriptionPlanController.updateStatus.bind(
    createSubscriptionPlanController,
  ),
);
router.delete(
  SUBSCRIPTION_ROUTE_CONSTANTS.DELET_PLAN,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  createSubscriptionPlanController.deletePlan.bind(
    createSubscriptionPlanController,
  ),
);

export default router;
