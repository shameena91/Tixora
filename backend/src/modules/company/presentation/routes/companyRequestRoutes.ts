
import { Router } from "express";

import { companyRequestController } from "../../container/container";

import { documentUpload } from "../../Infrastructure/http/multer/documentUpload";

import { COMPANY_REQUEST_ROUTES } from "../../../../shared/constants/route";

import { authMiddleware } from "../../../auth/container/container";

const router = Router();


// =====================================================
// PUBLIC REGISTRATION ROUTES
// Authentication is NOT required
// =====================================================

// Create company request
router.post(
  COMPANY_REQUEST_ROUTES.CREATE,
  
  async (req, res) => {
    await companyRequestController.create(req, res);
  }
);

// Submit company registration
router.patch(
  COMPANY_REQUEST_ROUTES.SUBMIT,
  async (req, res) => {
    await companyRequestController.submit(req, res);
  }
);

// Get company types
router.get(
  COMPANY_REQUEST_ROUTES.COMPANY_TYPES,
  async (req, res) => {
    await companyRequestController.getCompanyTypes(req, res);
  }
);

// Get employee range
router.get(
  COMPANY_REQUEST_ROUTES.EMPLOYEE_RANGE,
  async (req, res) => {
    await companyRequestController.getEmployeeRange(req, res);
  }
);
router.patch(
  COMPANY_REQUEST_ROUTES.UPDATE_LOGO,
   documentUpload.single("logo"),
  async (req, res) => {
    await companyRequestController.updateLogo(req, res);
  }
);
// Update company details


// Update company location
router.patch(
  COMPANY_REQUEST_ROUTES.UPDATE_LOCATION,
  async (req, res) => {
    await companyRequestController.updateLocation(req, res);
  }
);

// Upload company document
router.patch(
  COMPANY_REQUEST_ROUTES.UPDATE_DOCUMENT,
  documentUpload.single("document"),
  async (req, res) => {
    await companyRequestController.updateDocuments(req, res);
  }
);

router.patch(
  COMPANY_REQUEST_ROUTES.UPDATE,
  async (req, res) => {
    await companyRequestController.update(req, res);
  }
);
// Submit documents
router.patch(
  COMPANY_REQUEST_ROUTES.SUBMIT_DOCUMENTS,
  async (req, res) => {
    await companyRequestController.submitDocuments(req, res);
  }
);

router.get(
  COMPANY_REQUEST_ROUTES.GET_REGISTRATION_BY_ID,
  async (req, res) => {
    await companyRequestController.getById(req, res);
  }
);
// =====================================================
// PROTECTED ROUTES
// Authentication starts here
// =====================================================

router.use(
  authMiddleware.authenticate.bind(authMiddleware)
);


// Get all company requests
router.get(
  COMPANY_REQUEST_ROUTES.GET_ALL,
  async (req, res) => {
    await companyRequestController.getAll(req, res);
  }
);
router.get(COMPANY_REQUEST_ROUTES.GET_MY_REQUEST,
  async(req,res)=>{
     await companyRequestController.getMyRequest(req, res);
     console.log("MY REQUEST ROUTE HIT");
  }

)

// Get company request by ID
router.get(
  COMPANY_REQUEST_ROUTES.GET_SUPER_ADMIN_BY_ID,
  async (req, res) => {
    await companyRequestController.getById(req, res);
  }
);

// Approve company request
router.patch(
  COMPANY_REQUEST_ROUTES.APPROVE,
  async (req, res) => {
    await companyRequestController.approve(req, res);
  }
);

// Reject company request
router.patch(
  COMPANY_REQUEST_ROUTES.REJECT,
  async (req, res) => {
    await companyRequestController.reject(req, res);
  }
);

// Request more information
router.patch(
  COMPANY_REQUEST_ROUTES.MORE_INFO,
  async (req, res) => {
    await companyRequestController.moreInfo(req, res);
  }
);

// Resubmit company request
router.patch(
  COMPANY_REQUEST_ROUTES.RESUBMIT,
  async (req, res) => {
    await companyRequestController.resubmit(req, res);
  }
);
router.get(
   COMPANY_REQUEST_ROUTES.VIEW_COMPANY_dOCUMENTS,
  companyRequestController.getCompanyDocumentViewUrl.bind(
    companyRequestController
  )
);
router.get(
   COMPANY_REQUEST_ROUTES.DOWNLOAD_COMPANY_dOCUMENTS,
  companyRequestController.getCompanyDocumentDownloadUrl.bind(
    companyRequestController
  )
);

router.patch(
COMPANY_REQUEST_ROUTES.DOCUMENT_VARIFIED,
  companyRequestController.verifyCompanyDocument.bind(
    companyRequestController,
  ),
);
router.patch(
COMPANY_REQUEST_ROUTES.DOCUMENT_REJECTED,
  companyRequestController.rejectCompanyDocument.bind(
    companyRequestController,
  ),
);
export default router;

