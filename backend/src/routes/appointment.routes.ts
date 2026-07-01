import { Router } from "express";
import {
  cancelAppointment,
  createAppointment,
  getAppointments,
  updateAppointmentStatus,
} from "../controllers/appointment.controller";

const router = Router();

router.post("/", createAppointment);
router.get("/", getAppointments);
router.patch("/:id/status", updateAppointmentStatus);
router.patch("/:id/cancel", cancelAppointment);

export default router;