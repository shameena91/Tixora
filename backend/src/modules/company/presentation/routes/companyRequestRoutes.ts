import { Router } from "express";
import { companyRequestController } from "../../container/container";
import { documentUpload } from "../../Infrastructure/http/multer/documentUpload";
import { COMPANY_REQUEST_ROUTES } from "../../../../shared/constants/route";

const router = Router();

router.post(COMPANY_REQUEST_ROUTES.CREATE, async (req, res) => {
  await companyRequestController.create(req, res);
});
router.patch(COMPANY_REQUEST_ROUTES.SUBMIT, async (req, res) => {
  await companyRequestController.submit(req, res);
});

router.get(COMPANY_REQUEST_ROUTES.COMPANY_TYPES, async (req, res) => {
  await companyRequestController.getCompanyTypes(req, res);
});

router.get(COMPANY_REQUEST_ROUTES.EMPLOYEE_RANGE, async (req, res) => {
  await companyRequestController.getEmployeeRange(req, res);
});

// after more info update details
router.patch(COMPANY_REQUEST_ROUTES.UPDATE, async (req, res) => {
  await companyRequestController.update(req, res);
});

// Update location
router.patch(COMPANY_REQUEST_ROUTES.UPDATE_LOCATION, async (req, res) => {
  await companyRequestController.updateLocation(req, res);
});
// Review details
router.get(COMPANY_REQUEST_ROUTES.GET_BY_ID, async (req, res) => {
  await companyRequestController.getById(req, res);
});

// upload each document
router.patch(
  COMPANY_REQUEST_ROUTES.UPDATE_DOCUMENT,
  documentUpload.single("document"),
  async (req, res) => {
    await companyRequestController.updateDocuments(req, res);
  },
);
router.get(
  COMPANY_REQUEST_ROUTES.GET_ALL,
  async (req, res) => {
    await companyRequestController.getAll(req, res);
  }
);
// After uploading 3 document  submit

router.patch(COMPANY_REQUEST_ROUTES.SUBMIT_DOCUMENTS, async (req, res) => {
  await companyRequestController.submitDocuments(req, res);
});

router.patch(COMPANY_REQUEST_ROUTES.APPROVE, async (req, res) => {
  await companyRequestController.approve(req, res);
});

router.patch(COMPANY_REQUEST_ROUTES.REJECT, async (req, res) => {
  await companyRequestController.reject(req, res);
});

router.patch(COMPANY_REQUEST_ROUTES.MORE_INFO, async (req, res) => {
  await companyRequestController.moreInfo(req, res);
});

router.patch(COMPANY_REQUEST_ROUTES.RESUBMIT, async (req, res) => {
  await companyRequestController.resubmit(req, res);
});
export default router;
