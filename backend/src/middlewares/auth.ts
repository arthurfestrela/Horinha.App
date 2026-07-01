import { getAuth } from "@clerk/express";
import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (process.env.NODE_ENV !== "production") {
    req.clerkUserId = "user_test_123";
    return next();
  }

  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      message: "Não autorizado.",
    });
  }

  req.clerkUserId = userId;

  return next();
}