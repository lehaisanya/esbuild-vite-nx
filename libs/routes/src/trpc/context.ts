import { inferAsyncReturnType } from '@trpc/server';
import { CreateExpressContextOptions } from '@trpc/server/adapters/express';
import { AuthUser } from '@app/schemas';
import { getAuthUser } from '../services/auth.service';

async function getUser(
  authorization: string | undefined
): Promise<AuthUser | null> {
  if (authorization) {
    const token = authorization.split(' ')[1];
    if (token) {
      return await getAuthUser(token);
    }
  }
  return null;
}

export async function createContext({ req }: CreateExpressContextOptions) {
  const user = await getUser(req.headers.authorization);

  return { user };
}

export type Context = inferAsyncReturnType<typeof createContext>;
