import { Router } from "express";
import { companyRequestController } from "../../container/container";

const router = Router();

router.post("/", async (req, res) => {
  await companyRequestController.create(req, res);
});

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

export default router;