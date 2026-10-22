import { Router } from "express";

import { authMiddleware } from "../../../auth/container/container";
import { AccountRole } from "../../../auth/domain/entities/Account";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { categoryController } from "../../container/Container";
import { CATEGORY_ROUTE_CONSTANTS } from "../../../../shared/constants/route";


const router = Router();

router.use(
  authMiddleware.authenticate.bind(authMiddleware),
);

router.post(
  CATEGORY_ROUTE_CONSTANTS.CREATE,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  categoryController.createCategory.bind(categoryController),
);
router.get(
 CATEGORY_ROUTE_CONSTANTS.GET_CATEGORY,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  categoryController.getCategoryDetails.bind(categoryController),
);
router.get(
  CATEGORY_ROUTE_CONSTANTS.GET_ALL,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  categoryController.getAllCategories.bind(categoryController),
);


router.patch(
CATEGORY_ROUTE_CONSTANTS.UPDATE,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  categoryController.updateCategory.bind(categoryController),
);



router.patch(
 CATEGORY_ROUTE_CONSTANTS.UPDATE_STATUS,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  categoryController.updateCategoryStatus.bind(categoryController),
);
export default router;