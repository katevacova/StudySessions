/* eslint-disable linebreak-style */
import { Request, Response } from "express";
import UserRepository from "./repository";
import { prisma } from "../client";
import {
  UserIdSchema,
} from "./validationSchema";

const userRepository = new UserRepository(prisma);

export async function deleteUser(req: Request, res: Response) {
  const validation = UserIdSchema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { userId } = req.cookies;
  const userResult = await userRepository.findById(userId);

  // failed to get user
  if (userResult.isErr) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const user = userResult.unwrap();
  // user doesn't exist, shouldn't happen, 500 feels correct
  if (!user) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  // we do custom check instead of auth() to permit users to delete themselves
  if (!user.isOwner && user.id !== validation.data.id) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const result = await userRepository.delete(validation.data.id);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(500).json({ error: result.error.message });
}

export async function getSelf(req: Request, res: Response) {
  const { userId } = req.cookies;

  if (!userId) {
    return res.status(400).json({ error: "No user ID in cookie" });
  }

  const result = await userRepository.findById(userId);
  if (result.isOk) {
    const user = result.unwrap();
    if (!user) {
      return res
        .status(401)
        .json({ error: "User with given id does not exist" });
    }

    return res.status(200).json(user);
  }
  return res.status(404).json({ error: result.error.message });
}

export async function getAll(_: Request, res: Response) {
  const result = await userRepository.getAll();
  if (result.isErr) {
    return res.status(500).json({ error: "Internal Server Error " });
  }
  return res.status(200).json(result.value);
}
