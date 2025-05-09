import { z } from 'zod';

export type Thread = {
  id: number;
  title: string;
  user_id: string;
  username: string;
  category_id: number;
  like: number;
  dislike: number;
  created_at: Date;
  user_reaction: 'like' | 'dislike' | null;
};

export type Comment = {
  id: number;
  user_id: string;
  username: string;
  thread_id: number;
  content: string;
  like: number;
  dislike: number;
  created_at: Date;
  user_reaction: 'like' | 'dislike' | null;
};

export type Category = {
  id: number;
  name: string;
};

export type User = {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: Date;
};

export const signupSchema = z
  .object({
    username: z.string().min(1, 'Username is required.'),
    email: z.string().email('Please enter a valid email address.'),
    password: z
      .string()
      .min(8, 'Password must be 8-24 characters long.')
      .max(24, 'Password must be 8-24 characters long.')
      .regex(
        /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).*$/,
        'Include lowercase, uppercase, symbol, and number.',
      ),
    passwordConfirm: z.string().min(1, 'Password confirmation is required.'),
    licenseKeyFile: z.any(),
  })
  .superRefine((data, ctx) => {
    // 1) File required
    if (!(data.licenseKeyFile instanceof File)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'License key is required.',
        path: ['licenseKeyFile'],
      });
    } else {
      if (data.licenseKeyFile.size > 256) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'File size should be less than 0.25KB.',
          path: ['licenseKeyFile'],
        });
      }
      if (!['text/plain'].includes(data.licenseKeyFile.type)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'Please upload a .txt file.',
          path: ['licenseKeyFile'],
        });
      }
    }

    if (data.password !== data.passwordConfirm) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match.',
        path: ['passwordConfirm'],
      });
    }
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required.')
    .email('Please enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
