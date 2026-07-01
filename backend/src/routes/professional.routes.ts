import { Router } from "express";
import {
  createProfessional,
  getProfessionals,
  updateProfessional,
  deleteProfessional,
} from "../controllers/professional.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", requireAuth, createProfessional);
router.get("/", requireAuth, getProfessionals);
router.put("/:id", requireAuth, updateProfessional);
router.delete("/:id", requireAuth, deleteProfessional);

export default router;