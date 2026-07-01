import { Request, Response } from "express";
import { syncUserService } from "../services/user.service";

export async function syncUser(req: Request, res: Response) {
  const clerkUserId = req.clerkUserId!;
  const { email, name } = req.body;

  const user = await syncUserService(clerkUserId, {
    email,
    name,
  });

  return res.json(user);
}