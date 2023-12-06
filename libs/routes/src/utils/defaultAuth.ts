import { AuthUser } from '../schemas/auth.schema';

export const DEFAULT_AUTH = {
  login: 'test',
  password: '12345',
};

export const SECRET_TOKEN = 'my_secret_token';

export const DEFAULT_USER: AuthUser = {
  name: 'Test User',
};
