import { Router } from "express";
import { companyRequestController } from "../../container/container";
import { documentUpload } from "../../Infrastructure/http/multer/documentUpload";

const router = Router();

router.post("/", async (req, res) => {
  await companyRequestController.create(req, res);
});
router.patch("/submit", async (req, res) => {
  await companyRequestController.submit(req, res);
});
router.get("/company-types",async(req,res)=>{
  await companyRequestController.getCompanyTypes(req,res)
})
router.get("/employee-range",async(req,res)=>{
  await companyRequestController.getEmployeeRange(req,res)
})

router.patch("/:id", async (req, res) => {
  await companyRequestController.update(req, res);
});

router.patch("/:id/approve", async (req, res) => {
  await companyRequestController.approve(req, res);
});

router.patch("/:id/reject", async (req, res) => {
  await companyRequestController.reject(req, res);
});

router.patch("/:id/more-info", async (req, res) => {
  await companyRequestController.moreInfo(req, res);
});

router.patch("/:id/resubmit", async (req, res) => {
  await companyRequestController.resubmit(req, res);
});
router.patch("/:id/location", async (req, res) => {
  await companyRequestController.updateLocation(req, res);
});
// router.patch("/:id/documents", async (req, res) => {
//   await companyRequestController.updateDocuments(req, res);
// });
router.get("/:id", async (req, res) => {
  await companyRequestController.getById(req, res);
});

router.patch(
  "/:companyRequestId/documents",

  documentUpload.single("document"),

  async (req, res) => {
    await companyRequestController.updateDocuments(req, res);
  }
);
router.patch(
  "/:companyRequestId/documents/submit",
  async (req, res) => {
    await companyRequestController.submitDocuments(req, res);
  }
);

export default router;