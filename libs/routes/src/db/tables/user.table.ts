import {
  int,
  mysqlEnum,
  mysqlTable,
  serial,
  varchar,
  boolean
} from 'drizzle-orm/mysql-core';

export const usersTable = mysqlTable('users', {
  id: serial('id').primaryKey().autoincrement().notNull(),
  name: varchar('name', { length: 256 }).notNull(),
  age: int('age').notNull(),
  gender: mysqlEnum('gender', ['male', 'female']).notNull(),
  company: varchar('company', { length: 256 }).notNull(),
  isActive: boolean('isActive').notNull()
});

export function isSortableField(field: string): field is SortableFields {
  return ['name', 'age', 'gender', 'company', 'isActive'].includes(field);
}

export type User = typeof usersTable.$inferSelect;
export type SortableFields = keyof Omit<User, 'id'>;
export type NewUser = typeof usersTable.$inferInsert;
