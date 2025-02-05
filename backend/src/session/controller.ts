/* eslint-disable linebreak-style */
import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import SessionRepository from "./repository";
import UserRepository from "../user/repository";
import GroupRepository from "../group/repository";
import { prisma } from "../client";
import {
  SessionCreateInputSchema,
  SessionUpdateInputSchema,
  SessionIdSchema,
} from "./validationSchema";
import { SessionCreateManyInput, SessionCreateRequestInput } from "./types";

const sessionRepository = new SessionRepository(prisma);
const userRepository = new UserRepository(prisma);
const groupRepository = new GroupRepository(prisma);

export function generateRepeatingSessions(
  sessionData: SessionCreateRequestInput
) {
  const sessions: SessionCreateManyInput[] = [];
  const { subject, groupId, duration, start, repetitionEnd, repeatPeriod } =
    sessionData;
  const startDate = new Date(start);
  const endDate = new Date(repetitionEnd!);
  const repeatSeriesId = uuidv4();
  while (startDate <= endDate) {
    sessions.push({
      subject,
      groupId,
      repeatSeriesId,
      repeatPeriod,
      duration,
      realDuration: duration,
      start: startDate.toISOString(),
    });

    switch (repeatPeriod) {
      case "Every day":
        startDate.setDate(startDate.getDate() + 1);
        break;
      case "Every week":
        startDate.setDate(startDate.getDate() + 7);
        break;
      case "Every month":
        startDate.setMonth(startDate.getMonth() + 1);
        break;
      default:
        startDate.setDate(endDate.getDate()); // No repetition, end loop
    }
  }

  return sessions;
}

export async function addSession(req: Request, res: Response) {
  const validation = SessionCreateInputSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  if (
    validation.data.repeatPeriod === "Every day" ||
    validation.data.repeatPeriod === "Every week" ||
    validation.data.repeatPeriod === "Every month"
  ) {
    const result = await sessionRepository.addMany(
      generateRepeatingSessions(validation.data)
    );
    if (result.isOk) {
      return res.status(201).json(result.value);
    }
    return res.status(500).json({ error: result.error.message });
  }

  const result = await sessionRepository.add({
    subject: validation.data.subject,
    groupId: validation.data.groupId,
    repeatPeriod: validation.data.repeatPeriod,
    duration: validation.data.duration,
    realDuration: validation.data.duration,
    start: validation.data.start,
  });
  if (result.isOk) {
    return res.status(201).json(result.value);
  }
  return res.status(500).json({ error: result.error.message });
}

export async function getSessionById(req: Request, res: Response) {
  const validation = SessionIdSchema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }
  const result = await sessionRepository.findById(validation.data.id);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(404).json({ error: result.error.message });
}

export async function updateSession(req: Request, res: Response) {
  const paramsValidation = SessionIdSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return res.status(400).json({ error: paramsValidation.error.errors });
  }

  const bodyValidation = SessionUpdateInputSchema.safeParse(req.body);
  if (!bodyValidation.success) {
    return res.status(400).json({ error: bodyValidation.error.errors });
  }

  const { userId } = req.cookies;
  const [userResult, sessionResult] = await Promise.all([
    userRepository.findById(userId),
    sessionRepository.findById(paramsValidation.data.id),
  ]);

  // failed to get user or session
  if (userResult.isErr || sessionResult.isErr) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  const user = userResult.unwrap();
  const session = sessionResult.unwrap();
  // user or session doesn't exist, shouldn't happen
  if (!user || !session) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  const groupResult = await groupRepository.findById(session.groupId);
  if (groupResult.isErr) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  const group = groupResult.unwrap();

  // we do custom check instead of auth() to permit users to manage themselves
  if (
    !user.isOwner &&
    group &&
    !group.members.some((member) => member.id === user.id)
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const result = await sessionRepository.update(
    paramsValidation.data.id,
    bodyValidation.data
  );
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(500).json({ error: result.error.message });
}

export async function deleteSession(req: Request, res: Response) {
  const validation = SessionIdSchema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: validation.error.errors });
  }

  const { userId } = req.cookies;
  const [userResult, sessionResult] = await Promise.all([
    userRepository.findById(userId),
    sessionRepository.findById(validation.data.id),
  ]);

  // failed to get user
  if (userResult.isErr || sessionResult.isErr) {
    return res.status(500).json({ error: "Internal Server Error" });
  }

  const user = userResult.unwrap();
  const session = sessionResult.unwrap();
  // user or session doesn't exist, shouldn't happen, 500 feels correct
  if (!user || !session) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  const groupResult = await groupRepository.findById(session.groupId);
  if (groupResult.isErr) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
  const group = groupResult.unwrap();

  // we do custom check instead of auth() to permit users to manage themselves
  if (
    !user.isOwner &&
    group &&
    !group.members.some((member) => member.id === user.id)
  ) {
    return res.status(403).json({ error: "Forbidden" });
  }

  const result = await sessionRepository.delete(validation.data.id);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(500).json({ error: result.error.message });
}

export async function getAll(req: Request, res: Response) {
  const { userId } = req.cookies;

  const result = await sessionRepository.getAll(userId);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res
    .status(500)
    .json({ error: "Internal System Error", errors: result.error.message });
}

export async function getAllPast(req: Request, res: Response) {
  const { userId } = req.cookies;

  const result = await sessionRepository.getAllPast(userId);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res
    .status(500)
    .json({ error: "Internal System Error", errors: result.error.message });
}
