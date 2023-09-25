import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { api, setToken } from '../api/api';
import type { AuthUser } from '@app/schemas';

type AuthData = {
  login: string;
  password: string;
};

interface AuthContextState {
  loading: boolean;
  user: AuthUser | null;
}

interface AuthContextValue extends AuthContextState {
  loadUser: () => void;
  login: (values: AuthData) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue>(null!);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<AuthContextState>({
    loading: true,
    user: null,
  });

  const loadUser = useCallback(async () => {
    const user = await api.auth.me.query();

    setState({ user, loading: false });
  }, []);

  const login = async (values: AuthData) => {
    const token = await api.auth.login.mutate(values);
    setToken(token);
    loadUser();
  };

  const logout = () => {
    setToken(null);
    setState({ user: null, loading: false });
  };

  const contextValue: AuthContextValue = {
    ...state,
    loadUser,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
