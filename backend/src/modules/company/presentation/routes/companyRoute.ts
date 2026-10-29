import { Router } from "express";
import { companyChangeRequestController, companyController } from "../../container/container";
import { authMiddleware } from "../../../auth/container/container";
import { COMAPANY_ROUTES } from "../../../../shared/constants/route";
import { authorizeRoles } from "../../../auth/presentation/middlewares/AutherizeRole";
import { createSubScriptionController } from "../../../SubScriptionPlans/container/Container";
import { AccountRole } from "../../../auth/domain/entities/Account";
import { documentUpload } from "../../Infrastructure/http/multer/documentUpload";

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

   COMAPANY_ROUTES.GET_MY_COMPANY,
 
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  companyController.getMyCompany.bind(companyController),
);
router.get(
  COMAPANY_ROUTES.GET_MY_COMPANY_DOCUMENTS,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  companyController.getMyCompanyDocuments.bind(
    companyController,
  ),
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

router.post(
  COMAPANY_ROUTES.CREATE_PROFILE_CHANGE_REQUEST,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  companyChangeRequestController.createProfileChangeRequest.bind(
    companyChangeRequestController,
  ),
);


router.post(
  COMAPANY_ROUTES.CREATE_DOCUMENT_CHANGE_REQUEST,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  documentUpload.single("document"),
  companyChangeRequestController
    .createDocumentChangeRequest
    .bind(companyChangeRequestController),
);


router.get(
  COMAPANY_ROUTES.GET_COMPANY_CHANGE_REQUESTS,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  companyChangeRequestController.getAllChangeRequests.bind(
    companyChangeRequestController,
  ),
);

router.get(
  COMAPANY_ROUTES.GET_COMPANY_CHANGE_REQUEST_BY_ID,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  companyChangeRequestController.getChangeRequestById.bind(
    companyChangeRequestController,
  ),
);


router.patch(
  COMAPANY_ROUTES.REVIEW_COMPANY_PROFILE_CHANGE_REQUEST,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  companyChangeRequestController.reviewProfileChangeRequest.bind(
    companyChangeRequestController,
  ),
);


router.patch(
  COMAPANY_ROUTES.REVIEW_COMPANY_DOCUMENT_CHANGE_REQUEST,
  authorizeRoles(AccountRole.SUPER_ADMIN),
  companyChangeRequestController.reviewDocumentChangeRequest.bind(
    companyChangeRequestController,
  ),
);
router.post(
  COMAPANY_ROUTES.SEND_COMPANY_EMAIL_CHANGE_OTP,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  companyChangeRequestController.sendCompanyEmailChangeOtp.bind(
    companyChangeRequestController,
  ),
);

router.post(
  COMAPANY_ROUTES.VERIFY_COMPANY_EMAIL_CHANGE_OTP,
  authorizeRoles(AccountRole.COMPANY_ADMIN),
  companyChangeRequestController.verifyCompanyEmailChangeOtp.bind(
    companyChangeRequestController,
  ),
);
router.get(
  COMAPANY_ROUTES.GET_BY_ID,
  
  async (req, res) => {
    console.log("paased Id")
    await companyController.GetCompany(req,res);
  }
);


export default router;