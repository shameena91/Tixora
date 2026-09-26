import { Router } from "express";

import { authMiddleware } from "../../../auth/container/container";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { AccountRole } from "../../../auth/domain/entities/Account";

import {
  createSubScriptionController,
} from "../../container/Container";

import {
  SUBSCRIPTION_ROUTE_CONSTANTS,
} from "../../../../shared/constants/route";

const router = Router();

router.use(
  authMiddleware.authenticate.bind(authMiddleware)
);
router.post(
  SUBSCRIPTION_ROUTE_CONSTANTS.SELECT_SUBSCRIPTION,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  createSubScriptionController.createSubscriptionPlan.bind(
    createSubScriptionController
  )
);
router.get(
  SUBSCRIPTION_ROUTE_CONSTANTS.MY_SUBSCRIPTION_STATUS,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  createSubScriptionController.getMySubscriptionStatus.bind(
    createSubScriptionController
  )
);



export default router;