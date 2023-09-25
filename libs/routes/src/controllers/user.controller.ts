import { TRPCError } from '@trpc/server';
import {
  GetUserByIdInput,
  UserCreateInput,
  UserDeleteInput,
  UserUpdateInput,
  UsersQueryInput
} from '@app/schemas';
import {
  createUser,
  deleteUser,
  getManyUsers,
  getUserById,
  updateUser
} from '../services/user.service';

export const getUsersHandler = async ({
  input
}: {
  input: UsersQueryInput;
}) => {
  try {
    return await getManyUsers(input);
  } catch (error) {
    console.log(error);
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const getUserByIdHandler = async ({
  input
}: {
  input: GetUserByIdInput;
}) => {
  try {
    const users = await getUserById(input);
    if (users.length !== 1) {
      throw new TRPCError({ code: 'NOT_FOUND' });
    }
    return users[0];
  } catch (error) {
    if (error instanceof TRPCError) throw error;
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const createUserHandler = async ({
  input
}: {
  input: UserCreateInput;
}) => {
  try {
    await createUser(input);
  } catch (error) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const updateUserHandler = async ({
  input
}: {
  input: UserUpdateInput;
}) => {
  try {
    await updateUser(input);
  } catch (error) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};

export const deleteUserHandler = async ({
  input
}: {
  input: UserDeleteInput;
}) => {
  try {
    await deleteUser(input);
  } catch (error) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
  }
};
