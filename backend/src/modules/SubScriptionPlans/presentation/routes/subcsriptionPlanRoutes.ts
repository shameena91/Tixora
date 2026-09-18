import { Router } from "express";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { AccountRole } from "../../../auth/domain/entities/Account";
import { authMiddleware } from "../../../auth/container/container";
import { createSubscriptionPlanController } from "../../container/Container";
const router=Router()



router.use(
  authMiddleware.authenticate.bind(authMiddleware)
);

router.post(
  "/",
 
  authorizeRoles(AccountRole.SUPER_ADMIN),
  createSubscriptionPlanController.createPlan.bind(
    createSubscriptionPlanController
  )
);