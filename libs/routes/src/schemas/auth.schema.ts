import { z } from 'zod';

export type AuthUser = {
  name: string;
};

export type AuthInput = z.infer<typeof authSchema>;
export const authSchema = z.object({
  login: z.string(),
  password: z.string()
});
