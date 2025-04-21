import { z } from 'zod';

export type Thread = {
  id: number;
  title: string;
  user_id: number;
  username: string;
  category_id: number;
  like: number;
  dislike: number;
  created_at: Date;
  user_reaction: 'like' | 'dislike' | null;
}

export type Comment = {
  id: number;
  user_id: number;
  username: string;
  thread_id: number;
  content: string;
  like: number;
  dislike: number;
  created_at: Date;
  user_reaction: 'like' | 'dislike' | null;
}

export type Category = {
  id: number;
  name: string;
}

export type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  created_at: Date;
}

export const signupSchema = z.object({
  username: z.string().min(1, "Username is required."),
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
  password: z.string()
    .min(1, "Password is required.")
    .min(8, "Password must be 8-24 characters long.")
    .max(24, "Password must be 8-24 characters long.")
    .regex(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).*$/, "Password must include at least 1 lowercase character, uppercase character, symbol and number."),
  passwordConfirm: z.string().min(1, "Password confirmation is required."),
  licenseKeyFile: z.instanceof(File, { message: "License key is required." })
    .refine((file) => file.size <= 256, `File size should be less than 0.25KB.`)
    .refine(
      (file) => ['text/plain'].includes(file.type),
      "Please upload a .txt file."
    ),
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords do not match.",
  path: ["passwordConfirm"],
});

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required.").email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormData = z.infer<typeof loginSchema>;