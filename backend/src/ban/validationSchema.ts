import { z } from "zod";

export const BanCreateInputSchema = z.object({
  expiration: z.string().datetime(),
  reason: z.string().min(1),
  userId: z.string().uuid(),
});

export const BanUpdateInputSchema = z.object({
  expiration: z.string().datetime().optional(),
  issuedById: z.string().uuid().optional(),
  reason: z.string().min(1).optional(),
  userId: z.string().uuid().optional(),
});

export const BanIdSchema = z.object({
  id: z.string().uuid(),
});
