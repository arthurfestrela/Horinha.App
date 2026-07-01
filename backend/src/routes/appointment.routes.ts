import { Router } from "express";
import {
  createAppointment,
  getAppointments,
  updateAppointment,
  deleteAppointment,
} from "../controllers/appointment.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", requireAuth, createAppointment);
router.get("/", requireAuth, getAppointments);
router.put("/:id", requireAuth, updateAppointment);
router.delete("/:id", requireAuth, deleteAppointment);

export default router;