import { Router } from "express";



import { ROLE_ROUTES } from "../../../../shared/constants/route";
import { roleController } from "../../container/Container";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { AccountRole } from "../../../auth/domain/entities/Account";
import { authMiddleware } from "../../../auth/container/container";

const router = Router();
router.use(
  authMiddleware.authenticate.bind(authMiddleware),
);

router.post(
  ROLE_ROUTES.CREATE,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  roleController.createRole.bind(roleController),
);

router.get(
  ROLE_ROUTES.GET_ALL,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  roleController.getAllRoles.bind(roleController),
);

router.get(
  ROLE_ROUTES.GET_BY_ID,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  roleController.getRoleDetails.bind(roleController),
);

router.patch(
  ROLE_ROUTES.UPDATE,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  roleController.updateRole.bind(roleController),
);

router.patch(
  ROLE_ROUTES.UPDATE_STATUS,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  roleController.updateRoleStatus.bind(roleController),
);

export default router;