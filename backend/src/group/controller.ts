/* eslint-disable linebreak-style */
import { Request, Response } from "express";
import GroupRepository from "./repository";
import UserRepository from "../user/repository";
import { prisma } from "../client";
import {
  GroupCreateInputSchema,
  GroupUpdateInputSchema,
  GroupIdSchema,
} from "./validationSchema";

const groupRepository = new GroupRepository(prisma);
const userRepository = new UserRepository(prisma);

export async function addGroup(req: Request, res: Response) {
  const validation = GroupCreateInputSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }
  const { userId } = req.cookies;

  const result = await groupRepository.add(validation.data, userId);
  if (result.isOk) {
    return res.status(201).json(result.value);
  }
  return res.status(500).json({ error: result.error.message });
}

export async function getGroupById(req: Request, res: Response) {
  const validation = GroupIdSchema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const result = await groupRepository.findById(validation.data.id);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(404).json({ error: result.error.message });
}

export async function updateGroup(req: Request, res: Response) {
  const paramsValidation = GroupIdSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return res.status(400).json({ error: paramsValidation.error.errors });
  }

  const bodyValidation = GroupUpdateInputSchema.safeParse(req.body);
  if (!bodyValidation.success) {
    return res.status(400).json({ error: bodyValidation.error.errors });
  }

  const { userId } = req.cookies;
  const [userResult, groupResult] = await Promise.all([
    userRepository.findById(userId),
    groupRepository.findById(paramsValidation.data.id),
  ]);

  // failed to get user or group
  if (userResult.isErr || groupResult.isErr) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const user = userResult.unwrap();
  const group = groupResult.unwrap();
  // user or group doesn't exist, shouldn't happen
  if (!user || !group) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  // we do custom check instead of auth() to permit users to manage themselves
  if (!user.isOwner && !group.members.some((member) => member.id === user.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const result = await groupRepository.update(
    paramsValidation.data.id,
    bodyValidation.data,
  );
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(500).json({ error: result.error.message });
}

export async function deleteGroup(req: Request, res: Response) {
  const validation = GroupIdSchema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { userId } = req.cookies;
  const [userResult, groupResult] = await Promise.all([
    userRepository.findById(userId),
    groupRepository.findById(validation.data.id),
  ]);

  // failed to get user or group
  if (userResult.isErr || groupResult.isErr) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  const user = userResult.unwrap();
  const group = groupResult.unwrap();
  // user or group doesn't exist, shouldn't happen
  if (!user || !group) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }

  // we do custom check instead of auth() to permit users to manage themselves
  if (!user.isOwner && !group.members.some((member) => member.id === user.id)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const result = await groupRepository.delete(validation.data.id);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(500).json({ error: result.error.message });
}

export async function getAll(_: Request, res: Response) {
  const result = await groupRepository.getAll();
  if (result.isOk) {
    return res.status(200).json(result.value);
  }

  return res.status(500).json({ error: "Internal Server Error" });
}

export async function getAllOwn(req: Request, res: Response) {
  const { userId } = req.cookies;

  const result = await groupRepository.getAllOwn(userId);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }

  return res.status(500).json({ error: "Internal Server Error" });
}
