import { Router } from "express";
import { jobStatus } from "../controllers/assignmentController";

const router = Router();
router.get("/:id/status", jobStatus);
export default router;