import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegistrationSchema = z.object({
  email: z.string().email(),
  name: z.string(),
  password: z.string(),
});
