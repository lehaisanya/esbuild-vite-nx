import { z } from 'zod';
import { Errors } from '../types/errors';
import { Response, Sorting } from '../types/crud';

export type UserSortingField = z.infer<typeof sortingFieldsSchema>;
const sortingFieldsSchema = z.enum([
  'name',
  'gender',
  'age',
  'company',
  'isActive',
]);

const sortingDirectionSchema = z.enum(['ASC', 'DESC']);

export type UsersSorting = Sorting<UserSortingField>;

export type UsersQueryInput = z.infer<typeof usersQuerySchema>;
export const usersQuerySchema = z.object({
  offset: z.number().optional(),
  limit: z.number().optional(),
  sorting: z
    .object({
      column: sortingFieldsSchema,
      direction: sortingDirectionSchema,
    })
    .optional(),
  search: z.string().optional(),
  gender: z.enum(['male', 'female']).optional(),
  isActive: z.boolean().optional(),
  ageFrom: z.number().optional(),
  ageTo: z.number().optional(),
});

export type GetUserByIdInput = z.infer<typeof getUserByIdSchema>;
export const getUserByIdSchema = z.object({
  id: z.number(),
});

export type UserCreateInput = z.infer<typeof userCreateSchema>;
export const userCreateSchema = z.object({
  name: z.string(),
  age: z.number(),
  gender: z.enum(['male', 'female']),
  company: z.string(),
});

export type UserCreateValidation = Errors<UserCreateInput>;

export type UserCreateResponse = Response<UserCreateInput, undefined>;

export type UserUpdateData = z.infer<typeof userUpdateDataSchema>;
export const userUpdateDataSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
  gender: z.enum(['male', 'female']).optional(),
  company: z.string().optional(),
  isActive: z.boolean().optional(),
});

export type UserUpdateInput = z.infer<typeof userUpdateSchema>;
export const userUpdateSchema = z.object({
  id: z.number(),
  update: userUpdateDataSchema,
});

export type UserUpdateValidation = Errors<UserUpdateData>;

export type UserUpdateResponse = Response<UserUpdateData, undefined>;

export type UserDeleteInput = z.infer<typeof userDeleteSchema>;
export const userDeleteSchema = z.object({
  id: z.number(),
});
