import { Request, Response, NextFunction } from "express";
import LoginRepository from "./repository";
import UserRepository from "../user/repository";
import { prisma } from "../client";

const loginRepository = new LoginRepository(prisma);
const userRepository = new UserRepository(prisma);

export default function auth(checkAdmin: boolean = false) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { session, userId } = req.cookies;

    // No cookie
    if (!session) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const sessionResult = await loginRepository.readBySessionId(session);

    // DB failed
    if (sessionResult.isErr) {
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }

    const sessionUnwrapped = sessionResult.unwrap();

    // Session doesn't exist (invalid session token)
    if (sessionUnwrapped == null) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Validate that user ID in session entry in DB matches userID from cookie
    if (sessionUnwrapped.userId !== userId) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    // Session is expired
    if (sessionUnwrapped.expiration < new Date()) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (checkAdmin) {
      const userResult = await userRepository.findById(sessionUnwrapped.userId);
      // DB failed
      if (userResult.isErr) {
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      const user = userResult.unwrap();
      // User lacks admin perms
      if (user && !user.isOwner) {
        res.status(403).json({ error: "Forbidden" });
        return;
      }
    }

    next();
  };
}
