import { Router } from "express";

import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { AccountRole } from "../../../auth/domain/entities/Account";
import { COMAPANY_ROUTES } from "../../../../shared/constants/route";
import { paymentController } from "../../container/Container";

const router = Router();

router.get(
  COMAPANY_ROUTES.GET_PAYMENT_HISTORY,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  paymentController.getPaymentHistory.bind(
    paymentController,
  ),
);

export default router
