import { z } from "zod";

export const groupSchema = z.object({
  name: z
    .string()
    .min(1, { message: "Group name is required" })
    .max(50, { message: "Group name must be less than 50 characters" }),
  members: z.array(z.string().email()),
});

export const inviteMemberSchema = z.object({
  email: z.string().min(1, { message: "Incorrect email format" }).email(),
});

export type GroupFormProps = z.infer<typeof groupSchema>;
export type InviteMemberFormProps = z.infer<typeof inviteMemberSchema>;
