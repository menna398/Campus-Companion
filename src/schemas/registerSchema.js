import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email"),

  studentId: z.string().min(1, "Student ID is required"),

  university: z.string().min(1, "Please select your university"),

  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be at least 6 characters"),

  agree: z.boolean().refine((value) => value === true, {
    message: "You must agree to the terms",
  }),
});
