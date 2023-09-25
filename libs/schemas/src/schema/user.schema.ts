import { z } from 'zod';

export type UsersQueryInput = z.infer<typeof usersQuerySchema>;
export const usersQuerySchema = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
  sorting: z.object({
    column: z.string(),
    direction: z.enum(['asc', 'desc'])
  }).optional(),
  search: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  isActive: z.boolean().optional(),
  ageFrom: z.number().optional(),
  ageTo: z.number().optional()
});

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
export const getUserByIdSchema = z.object({
  id: z.number()
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export const userCreateSchema = z.object({
  name: z.string().min(2).max(256),
  age: z.number().min(18),
  gender: z.enum(['male', 'female']),
  company: z.string().min(2).max(256)
});

export type UserUpdateData = z.infer<typeof userUpdateDataSchema>;
export const userUpdateDataSchema = z.object({
  name: z.string().min(2).max(256).optional(),
  age: z.number().min(18).optional(),
  gender: z.enum(['male', 'female']).optional(),
  company: z.string().min(2).max(256).optional(),
  isActive: z.boolean().optional()
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export const userUpdateSchema = z.object({
  id: z.number(),
  update: userUpdateDataSchema
});

export type UserDeleteInput = z.infer<typeof userDeleteSchema>;
export const userDeleteSchema = z.object({
  id: z.number()
});
