import { Router } from "express";
import { syncUser } from "../controllers/user.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/sync", requireAuth, syncUser);

export default router;