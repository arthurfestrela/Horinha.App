import { Router } from "express";
import {
  getPublicEstablishment,
  createPublicAppointment,
  getAvailability,
} from "../controllers/public.controller";

const router = Router();

router.get("/:slug", getPublicEstablishment);
router.get("/:slug/availability", getAvailability);
router.post("/:slug/appointments", createPublicAppointment);

export default router;