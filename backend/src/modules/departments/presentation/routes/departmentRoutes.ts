import { Router } from "express";

import { authMiddleware } from "../../../auth/container/container";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { AccountRole } from "../../../auth/domain/entities/Account";

import { DEPARTMENT_ROUTE_CONSTATNTS } from "../../../../shared/constants/route";
import { departmentController } from "../../container/Container";


const router = Router();

router.use(
  authMiddleware.authenticate.bind(authMiddleware),
);

router.post(
  DEPARTMENT_ROUTE_CONSTATNTS.CREATE,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  departmentController.createDepartment.bind(departmentController),
);

router.get(
  DEPARTMENT_ROUTE_CONSTATNTS.GET_ALL,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  departmentController.getAllDepartments.bind(departmentController),
);
router.get(
  DEPARTMENT_ROUTE_CONSTATNTS.GET_DEPARTMENT,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  departmentController.getDepartment.bind(departmentController),
);
router.patch(
  DEPARTMENT_ROUTE_CONSTATNTS.UPDATE_STATUS,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  departmentController.updateDepartmentStatus.bind(departmentController),
);

router.patch(
 
   DEPARTMENT_ROUTE_CONSTATNTS.UPDATE,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  departmentController.updateDepartment.bind(departmentController),
);

export default router;