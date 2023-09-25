import { MySql2Database, drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2/promise';

export let db: MySql2Database<Record<string, never>>;

export async function connectToDb() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'testing_user',
    password: 'hello_world',
    database: 'testing_stack'
  });

  db = drizzle(connection);
}
