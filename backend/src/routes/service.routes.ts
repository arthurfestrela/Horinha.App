import { Router } from "express";
import {
  createService,
  getServices,
  updateService,
  deleteService,
} from "../controllers/service.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", requireAuth, createService);
router.get("/", requireAuth, getServices);
router.put("/:id", requireAuth, updateService);
router.delete("/:id", requireAuth, deleteService);

export default router;