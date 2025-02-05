/* eslint-disable linebreak-style */
import { z } from "zod";

export const SessionCreateInputSchema = z.object({
  subject: z.string().min(1),
  groupId: z.string().uuid(),
  repeatPeriod: z.string().min(1),
  duration: z.number().int().min(1),
  start: z.string().datetime(),
  repetitionEnd: z.string().datetime().optional(),
});

export const SessionUpdateInputSchema = z.object({
  subject: z.string().optional(),
  groupId: z.string().uuid().optional(),
  duration: z.number().int().optional(),
  realDuration: z.number().int().optional(),
  start: z.string().datetime().optional(),
});

export const SessionIdSchema = z.object({
  id: z.string().uuid(),
});
