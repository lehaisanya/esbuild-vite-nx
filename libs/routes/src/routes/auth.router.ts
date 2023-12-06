import { publicProcedure, router } from '../trpc/trpc';
import { authSchema } from '../schemas/auth.schema';
import { loginHandler, meHandler } from '../controllers/auth.controller';

export const authRouter = router({
  me: publicProcedure.query(meHandler),
  login: publicProcedure.input(authSchema).mutation(loginHandler),
});
