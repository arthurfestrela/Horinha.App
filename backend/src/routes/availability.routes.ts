import { Router } from "express";
import { getAvailableSlots } from "../controllers/availability.controller";

const router = Router();

router.get(
  "/public/professionals/:professionalId/available-slots",
  getAvailableSlots
);

export default router;