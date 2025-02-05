import { z } from 'zod';

export const UserIdSchema = z.object({
  id: z.string().uuid(),
});
