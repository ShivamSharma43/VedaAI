import { Router } from "express";
import * as ctrl from "../controllers/assignmentController";

const router = Router();

router.post("/", ctrl.create);
router.get("/", ctrl.list);
router.get("/:id", ctrl.getOne);
router.post("/:id/regenerate", ctrl.regenerate);

export default router;