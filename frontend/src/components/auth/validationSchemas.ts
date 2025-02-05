import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Email is required" }).email(),
  password: z.string(),
});

export const registrationSchema = z
  .object({
    username: z.string().min(1, { message: "Username is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(new RegExp(".*[A-Z].*"))
      .regex(new RegExp(".*[a-z].*"))
      .regex(new RegExp(".*[0-9].*"), {
        message:
          "Password must contain at least one lowercase letter, one uppercase letter, and one number",
      }),
    repeatPassword: z.string(),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: "Passwords do not match",
    path: ["repeatPassword"],
  });

export type LoginFormProps = z.infer<typeof loginSchema>;

export type RegisterFormProps = z.infer<typeof registrationSchema>;
