import { Router } from "express";
import {
  createProfessionalSchedule,
  getProfessionalSchedules,
} from "../controllers/professional-schedule.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post(
  "/professionals/:professionalId/schedules",
  requireAuth,
  createProfessionalSchedule
);

router.get(
  "/professionals/:professionalId/schedules",
  requireAuth,
  getProfessionalSchedules
);

export default router;