import { z } from "zod";

export const banSchema = z.object({
  reason: z.string().min(1, { message: "Reason is required" }),
  expiration: z.date(),
  userId: z.string(),
});

export const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1, { message: "Name is required" }),
  id: z.string().uuid(),
  isOwner: z.boolean(),
});
