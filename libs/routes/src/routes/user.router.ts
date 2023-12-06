import { protectedProcedure, router } from '../trpc/trpc';
import {
  getUserByIdSchema,
  userCreateSchema,
  userDeleteSchema,
  userUpdateSchema,
  usersQuerySchema,
} from '../schemas/user.schema';
import {
  createUserHandler,
  deleteUserHandler,
  getUserByIdHandler,
  getUsersHandler,
  updateUserHandler,
} from '../controllers/user.controller';

export const userRouter = router({
  getUsers: protectedProcedure.input(usersQuerySchema).query(getUsersHandler),
  getUserById: protectedProcedure
    .input(getUserByIdSchema)
    .query(getUserByIdHandler),
  createUser: protectedProcedure
    .input(userCreateSchema)
    .mutation(createUserHandler),
  updateUser: protectedProcedure
    .input(userUpdateSchema)
    .mutation(updateUserHandler),
  deleteUser: protectedProcedure
    .input(userDeleteSchema)
    .mutation(deleteUserHandler),
});

export type UsersRouter = typeof userRouter;
