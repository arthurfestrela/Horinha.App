import { Router } from "express";
import {
  createEstablishment,
  getMyEstablishment,
  updateEstablishment,
  deleteEstablishment,
} from "../controllers/establishment.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/", requireAuth, createEstablishment);
router.get("/", requireAuth, getMyEstablishment);
router.put("/", requireAuth, updateEstablishment);
router.delete("/", requireAuth, deleteEstablishment);

export default router;