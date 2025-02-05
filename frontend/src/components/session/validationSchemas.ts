import { z } from "zod";

export const sessionSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Subject name is required" })
    .max(50, { message: "Group name must be less than 50 characters" }),
  duration: z
    .number()
    .min(1, { message: "Duration is required" })
    .max(360, { message: "Duration must be less than 360 minutes" }),
  date: z.date().refine((val) => val !== null, {
    message: "Date is required",
  }),
  time: z
    .string()
    .regex(/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/, {
      message: "Time must be in the format HH:mm",
    })
    .refine((val) => val !== null, {
      message: "Time is required",
    }),
  repeatPeriod: z.string().optional(),
  repetitionEnd: z
    .date()
    .optional()
    .refine((val) => val !== null, {
      message: "Repetition end date is required",
    }),
  groupId: z.string(),
});

export const adhocSessionSchema = z.object({
  subject: z
    .string()
    .min(1, { message: "Subject name is required" })
    .max(50, { message: "Group name must be less than 50 characters" }),
  groupId: z.string().uuid(),
  repeatPeriod: z.string(),
  duration: z
    .number()
    .min(1, { message: "Duration is required" })
    .max(360, { message: "Duration must be less than 360 minutes" }),
  start: z.date(),
  repetitionEnd: z.date(),
});

export type SessionFormProps = z.infer<typeof sessionSchema>;
export type AdhocSessionFormProps = z.infer<typeof adhocSessionSchema>;
