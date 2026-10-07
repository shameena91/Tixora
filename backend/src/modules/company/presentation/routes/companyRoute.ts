import { Router } from "express";
import { companyController } from "../../container/container";
import { authMiddleware } from "../../../auth/container/container";
import { COMAPANY_ROUTES } from "../../../../shared/constants/route";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { createSubScriptionController } from "../../../SubScriptionPlans/container/Container";
import { AccountRole } from "../../../auth/domain/entities/Account";

 const router = Router();
router.use(
  authMiddleware.authenticate.bind(authMiddleware)
);
router.get(
  COMAPANY_ROUTES.GET_ALL,
  
  async (req, res) => {
    await companyController.getAllCompanies(req,res);
  }
);
router.get(
  COMAPANY_ROUTES.GET_BY_ID,
  
  async (req, res) => {
    console.log("paased Id")
    await companyController.GetCompany(req,res);
  }
);



router.get(
  COMAPANY_ROUTES.GET_SUBSCRIPTION,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  createSubScriptionController.getCompanySubscription.bind(
    createSubScriptionController,
  ),
  
);

router.get(
  COMAPANY_ROUTES.GET_COMPANY_ADMIN,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  companyController.getCompanyAdmin.bind(
    companyController,
  ),
  
);

router.patch(
 COMAPANY_ROUTES.UPDATE_STATUS,
   authorizeRoles(AccountRole.SUPER_ADMIN),
  companyController.updateCompanyStatus.bind(
    companyController,
  ),
);


export default router;