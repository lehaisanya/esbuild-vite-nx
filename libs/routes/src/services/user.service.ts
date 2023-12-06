import { and, asc, desc, eq, gt, like, lt, or, sql } from 'drizzle-orm';
import { db } from '../db/db';
import {
  GetUserByIdInput,
  UserCreateInput,
  UserCreateResponse,
  UserCreateValidation,
  UserDeleteInput,
  UserUpdateData,
  UserUpdateInput,
  UserUpdateResponse,
  UserUpdateValidation,
  UsersQueryInput,
} from '../schemas/user.schema';
import { isSortableField, usersTable } from '../db/tables/user.table';
import { ErrorsBuilder } from '../types/errors';

export const getManyUsers = async (query: UsersQueryInput) => {
  const AND = [];

  if (query.search) {
    const pattern = `%${query.search}%`;
    AND.push(
      or(like(usersTable.name, pattern), like(usersTable.company, pattern))
    );
  }

  if (query.gender) {
    AND.push(eq(usersTable.gender, query.gender));
  }

  if ('isActive' in query) {
    AND.push(eq(usersTable.isActive, query.isActive!));
  }

  if (query.ageFrom) {
    AND.push(gt(usersTable.age, query.ageFrom));
  }

  if (query.ageTo) {
    AND.push(lt(usersTable.age, query.ageTo));
  }

  const where = and(...AND);

  const countRequest = db
    .select({ count: sql<number>`count(*)` })
    .from(usersTable)
    .where(where);
  let usersRequest = db
    .select()
    .from(usersTable)
    .offset(query.offset ?? 0)
    .limit(query.limit ?? 15)
    .where(where);

  if (query.sorting) {
    const field = query.sorting.column;
    if (isSortableField(field)) {
      const dir = query.sorting.direction === 'DESC' ? desc : asc;
      usersRequest = usersRequest.orderBy(dir(usersTable[field]));
    }
  }

  const [count, users] = await Promise.all([countRequest, usersRequest]);

  return { count: count[0].count, users };
};

export const getUserById = async ({ id }: GetUserByIdInput) => {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
};

export const validateUserCreate = (
  input: UserCreateInput
): UserCreateValidation | null => {
  const errors = new ErrorsBuilder<UserCreateInput>();

  if (input.name === '') {
    errors.add('name', { key: 'FIELD_IS_EMPTY' });
  }

  if (input.name.length > 100) {
    errors.add('name', { key: 'FIELD_IS_TOO_LONG', maxLength: 100 });
  }

  if (input.company === '') {
    errors.add('company', { key: 'FIELD_IS_EMPTY' });
  }

  if (input.company.length > 150) {
    errors.add('company', { key: 'FIELD_IS_TOO_LONG', maxLength: 150 });
  }

  if (input.age < 18 || input.age > 200) {
    errors.add('age', {
      key: 'FIELD_IS_OUT_OF_RANGE',
      from: 18,
      to: 200,
    });
  }

  return errors.build();
};

export const createUser = async (
  data: UserCreateInput
): Promise<UserCreateResponse> => {
  const errors = validateUserCreate(data);

  if (errors)
    return {
      success: false,
      errors,
    };

  await db.insert(usersTable).values({ ...data, isActive: true });

  return { success: true, result: undefined };
};

export const validateUserUpdate = (
  data: UserUpdateData
): UserUpdateValidation | null => {
  const errors = new ErrorsBuilder<UserUpdateData>();

  if (data.name !== undefined) {
    if (data.name === '') {
      errors.add('name', { key: 'FIELD_IS_EMPTY' });
    }
    if (data.name.length > 100) {
      errors.add('name', { key: 'FIELD_IS_TOO_LONG', maxLength: 100 });
    }
  }

  if (data.company !== undefined) {
    if (data.company === '') {
      errors.add('company', { key: 'FIELD_IS_EMPTY' });
    }
    if (data.company.length > 150) {
      errors.add('company', { key: 'FIELD_IS_TOO_LONG', maxLength: 150 });
    }
  }

  if (data.age !== undefined) {
    if (data.age < 18 || data.age > 200) {
      errors.add('age', { key: 'FIELD_IS_OUT_OF_RANGE', from: 18, to: 200 });
    }
  }

  return errors.build();
};

export const updateUser = async ({
  id,
  update,
}: UserUpdateInput): Promise<UserUpdateResponse> => {
  const errors = validateUserUpdate(update);

  if (errors) {
    return {
      success: false,
      errors,
    };
  }

  await db.update(usersTable).set(update).where(eq(usersTable.id, id));

  return {
    success: true,
    result: undefined,
  };
};

export const deleteUser = async ({ id }: UserDeleteInput) => {
  await db.delete(usersTable).where(eq(usersTable.id, id));
};
