import { TRPCError, initTRPC } from '@trpc/server';
import { Context } from './context';

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware((opts) => {
  const { ctx } = opts;
  if (!ctx.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED' });
  }
  return opts.next({ ctx });
});

const logger = t.middleware((opts) => {
  const { ctx, path, rawInput, type } = opts;

  console.log(`[${type}] ${path}`);
  console.log(JSON.stringify(ctx, null, 2));
  console.log(JSON.stringify(rawInput, null, 2));

  return opts.next({ ctx });
});

export const router = t.router;
export const publicProcedure = t.procedure.use(logger);
export const protectedProcedure = t.procedure.use(logger).use(isAuthed);
