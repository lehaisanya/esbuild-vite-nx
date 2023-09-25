/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { and, asc, desc, eq, gt, like, lt, or, sql } from 'drizzle-orm';
import { db } from '../db/db';
import {
  GetUserByIdInput,
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
  UsersQueryInput
} from '@app/schemas';
import { isSortableField, usersTable } from '../db/user.table';

export const getManyUsers = async (query: UsersQueryInput) => {
  console.log(query);

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
      const dir = query.sorting.direction === 'desc' ? desc : asc;
      usersRequest = usersRequest.orderBy(dir(usersTable[field]));
    }
  }

  const [count, users] = await Promise.all([countRequest, usersRequest]);

  return { count: count[0].count, users };
};

export const getUserById = async ({ id }: GetUserByIdInput) => {
  return await db.select().from(usersTable).where(eq(usersTable.id, id));
};

export const createUser = async (data: UserCreateInput) => {
  await db.insert(usersTable).values({ ...data, isActive: true });
};

export const updateUser = async ({ id, update }: UserUpdateInput) => {
  await db.update(usersTable).set(update).where(eq(usersTable.id, id));
};

export const deleteUser = async ({ id }: UserDeleteInput) => {
  await db.delete(usersTable).where(eq(usersTable.id, id));
};
