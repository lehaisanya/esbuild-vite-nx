import { AuthInput } from '../schemas/auth.schema';
import { DEFAULT_AUTH, DEFAULT_USER, SECRET_TOKEN } from '../utils/defaultAuth';

export const login = async (auth: AuthInput) => {
  if (
    auth.login === DEFAULT_AUTH.login &&
    auth.password === DEFAULT_AUTH.password
  ) {
    return SECRET_TOKEN;
  }
  return null;
};

export const getAuthUser = async (token: string) => {
  if (token === SECRET_TOKEN) {
    return DEFAULT_USER;
  }
  return null;
};
