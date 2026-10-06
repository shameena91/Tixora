import { Router } from "express";

import { authMiddleware } from "../../../auth/container/container";
import { timelineController } from "../../containers/container";



const router = Router();

// ------------------------------------
// Authentication
// ------------------------------------
router.use(
  authMiddleware.authenticate.bind(authMiddleware)
);

// ------------------------------------
// Company Request Timeline
// ------------------------------------
router.get(
  "/:id/timeline",
  timelineController.getTimelineByEntity.bind(
    timelineController
  )
);

export default router;