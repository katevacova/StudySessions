// controller.ts
import { Request, Response } from "express";
import BanRepository from "./repository";
import { prisma } from "../client";
import {
  BanCreateInputSchema,
  BanUpdateInputSchema,
  BanIdSchema,
} from "./validationSchema";
import { BanUpdateInput } from "./types";

const banRepository = new BanRepository(prisma);

export async function addBan(req: Request, res: Response) {
  const validation = BanCreateInputSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ error: "Invalid syntax" });
  }
  const { userId } = req.cookies;

  const result = await banRepository.add(validation.data, userId);
  if (result.isOk) {
    return res.status(201).json(result.value);
  }
  return res.status(500).json({ error: "Internal Server Error" });
}

export async function getBanByUserId(req: Request, res: Response) {
  const validation = BanIdSchema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: "Invalid syntax" });
  }

  const result = await banRepository.findByUserId(validation.data.id);
  if (result.isOk) {
    if (result.value) {
      return res.status(200).json(result.value);
    }
    return res.status(404).json({
      message: "User is not banned",
    });
  }
  return res.status(404).json({ error: "Internal Server Error" });
}

export async function updateBan(req: Request, res: Response) {
  const paramsValidation = BanIdSchema.safeParse(req.params);
  if (!paramsValidation.success) {
    return res.status(400).json({ error: "Invalid syntax" });
  }

  const bodyValidation = BanUpdateInputSchema.safeParse(req.body);
  if (!bodyValidation.success) {
    return res.status(400).json({ error: "Invalid syntax" });
  }

  const result = await banRepository.update(
    paramsValidation.data.id,
    bodyValidation.data as BanUpdateInput
  );
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(500).json({ error: "Internal Server Error" });
}

export async function deleteBan(req: Request, res: Response) {
  const validation = BanIdSchema.safeParse(req.params);
  if (!validation.success) {
    return res.status(400).json({ error: "Invalid syntax" });
  }

  const result = await banRepository.delete(validation.data.id);
  if (result.isOk) {
    return res.status(200).json(result.value);
  }
  return res.status(500).json({ error: "Internal Server Error" });
}
