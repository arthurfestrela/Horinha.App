import { Router } from "express";
import {
  createScheduleBlock,
  getScheduleBlocks,
} from "../controllers/schedule-block.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post(
  "/professionals/:professionalId/schedule-blocks",
  requireAuth,
  createScheduleBlock
);

router.get(
  "/professionals/:professionalId/schedule-blocks",
  requireAuth,
  getScheduleBlocks
);

export default router;