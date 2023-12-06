import { FC, PropsWithChildren, createContext, useContext } from 'react';
import { AuthUser, AuthInput } from '@app/routes';
import { trpc } from '../api/trpc';
import { setToken } from '../api/tokenStorage';

interface AuthContextValue {
  loading: boolean;
  loginLoading: boolean;
  user: AuthUser | null;
  login: (values: AuthInput) => Promise<string | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const meQuery = trpc.auth.me.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const utils = trpc.useUtils();

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      setToken(data);
      if (data) {
        utils.auth.me.invalidate();
      }
    },
  });

  const logout = () => {
    setToken(null);
    utils.auth.me.invalidate();
  };

  const value: AuthContextValue = {
    loading: meQuery.isFetching,
    loginLoading: loginMutation.isLoading,
    user: meQuery.data ?? null,
    login: loginMutation.mutateAsync,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  return useContext(AuthContext);
}
