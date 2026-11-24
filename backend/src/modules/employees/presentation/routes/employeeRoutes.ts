import { Router } from "express";

import { authMiddleware } from "../../../auth/container/container";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { AccountRole } from "../../../auth/domain/entities/Account";

import { EMPLOYEE_ROUTE_CONSTANTS } from "../../../../shared/constants/route";
import { employeeController } from "../../container/Container";

const router = Router();
router.post(
 EMPLOYEE_ROUTE_CONSTANTS.VARIFY,
  employeeController.verifyInvitation.bind(employeeController)
);
router.post(
  EMPLOYEE_ROUTE_CONSTANTS.ACCEPT_INVITATION,
  employeeController.acceptInvitation.bind(employeeController)
);
router.post(
  EMPLOYEE_ROUTE_CONSTANTS.RESEND_INVITATION,

  employeeController.resendInvitation.bind(employeeController),
);
router.use(
  authMiddleware.authenticate.bind(authMiddleware),
);

router.post(
  EMPLOYEE_ROUTE_CONSTANTS.CREATE,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  employeeController.createEmployee.bind(employeeController),
);

router.get(
  EMPLOYEE_ROUTE_CONSTANTS.GET_ALL,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  employeeController.getAllEmployees.bind(employeeController),
);
router.get(
  EMPLOYEE_ROUTE_CONSTANTS.GET_BY_ID,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  employeeController.getEmployeeById.bind(employeeController),
);

router.put(
  EMPLOYEE_ROUTE_CONSTANTS.UPDATE,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  employeeController.updateEmployee.bind(employeeController),
);

router.patch(
  EMPLOYEE_ROUTE_CONSTANTS.UPDATE_STATUS,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  employeeController.updateEmployeeStatus.bind(employeeController),
);


export default router;