/* eslint-disable linebreak-style */
import { z } from "zod";

export const GroupCreateInputSchema = z.object({
  name: z.string().min(1),
  members: z.array(z.string()).min(1),
});

export const GroupUpdateInputSchema = z.object({
  name: z.string().min(1).optional(),
  ownerId: z.string().uuid().optional(),
  members: z.array(z.string()).optional(),
});

export const GroupIdSchema = z.object({
  id: z.string().uuid(),
});
