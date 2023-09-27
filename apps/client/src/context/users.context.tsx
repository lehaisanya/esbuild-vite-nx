import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import type { User } from '@app/routes';
import { UserCreateInput, UserUpdateData, UsersQueryInput } from '@app/schemas';
import { api } from '../api/api';

export interface Sorting {
  column: string;
  direction: 'asc' | 'desc';
}

export interface UsersFilters {
  search: string;
  gender: 'male' | 'female' | null;
  isActive: 'active' | 'unactive' | null;
  age: [number, number];
}

interface UsersContextState {
  loadingUsers: boolean;
  loadingEditableUser: boolean;
  users: User[];
  count: number;
  editableUser: User | null;
  page: number;
  pageSize: number;
  filters: UsersFilters;
  sorting: Sorting | null;
}

interface UsersContextValue extends UsersContextState {
  createUser: (user: UserCreateInput) => Promise<void>;
  updateUser: (id: number, update: UserUpdateData) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setEditingUser: (id: number) => Promise<void>;
  setPage: (newPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setFilters: (filters: UsersFilters) => void;
  triggerSorting: (column: string) => void;
}

const UsersContext = createContext<UsersContextValue>(null!);

const defaultContextState: UsersContextState = {
  loadingUsers: true,
  loadingEditableUser: false,
  users: [],
  editableUser: null,
  page: 1,
  pageSize: 15,
  count: 0,
  sorting: null,
  filters: {
    search: '',
    age: [18, 200],
    gender: null,
    isActive: null,
  },
};

export const UsersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<UsersContextState>(defaultContextState);

  const fetchUsers = useCallback(async () => {
    setState((prev) => ({ ...prev, loadingUsers: true }));

    const query: UsersQueryInput = {
      limit: state.pageSize,
    };

    if (state.page !== 1) {
      query.offset = (state.page - 1) * state.pageSize;
    }

    if (state.filters.search) {
      query.search = state.filters.search;
    }

    if (state.sorting) {
      query.sorting = {
        column: state.sorting.column,
        direction: state.sorting.direction,
      };
    }

    if (state.filters.gender) {
      query.gender = state.filters.gender;
    }

    if (state.filters.isActive) {
      query.isActive = state.filters.isActive === 'active';
    }

    const [ageFrom, ageTo] = state.filters.age;
    if (ageFrom !== 18) {
      query.ageFrom = ageFrom;
    }

    if (ageTo !== 200) {
      query.ageTo = ageTo;
    }

    const { count, users } = await api.user.getUsers.query(query);

    setState((prev) => ({
      ...prev,
      count,
      users,
      loadingUsers: false,
    }));
  }, [
    state.page,
    state.pageSize,
    state.sorting,
    state.filters.search,
    state.filters.gender,
    state.filters.isActive,
    state.filters.age[0],
    state.filters.age[1],
  ]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const setFilters = useCallback((filters: UsersFilters) => {
    setState((prev) => {
      return { ...prev, filters };
    });
  }, []);

  const triggerSorting = useCallback((column: string) => {
    setState((prev) => {
      if (!prev.sorting) {
        return { ...prev, sorting: { column: column, direction: 'asc' } };
      }

      if (prev.sorting.column === column) {
        if (prev.sorting.direction === 'asc') {
          return { ...prev, sorting: { column, direction: 'desc' } };
        }

        return { ...prev, sorting: null };
      }

      return { ...prev, sorting: { column, direction: 'asc' } };
    });
  }, []);

  const createUser = useCallback(
    async (user: UserCreateInput) => {
      await api.user.createUser.mutate(user);
      await fetchUsers();
    },
    [fetchUsers]
  );

  const updateUser = useCallback(
    async (id: number, update: UserUpdateData) => {
      await api.user.updateUser.mutate({ id, update });
      await fetchUsers();
    },
    [fetchUsers]
  );

  const deleteUser = useCallback(
    async (id: number) => {
      await api.user.deleteUser.mutate({ id });
      await fetchUsers();
    },
    [fetchUsers]
  );

  const setEditingUser = useCallback(async (id: number) => {
    setState((prev) => ({
      ...prev,
      loadingEditableUser: true,
    }));
    const editableUser = await api.user.getUserById.query({ id });
    setState((prev) => ({
      ...prev,
      loadingEditableUser: false,
      editableUser,
    }));
  }, []);

  const setPage = useCallback((page: number) => {
    setState((prev) => ({ ...prev, page }));
  }, []);

  const setPageSize = useCallback((pageSize: number) => {
    setState((prev) => ({ ...prev, pageSize }));
  }, []);

  const context: UsersContextValue = {
    ...state,
    createUser,
    updateUser,
    deleteUser,
    setPage,
    setPageSize,
    setEditingUser,
    setFilters,
    triggerSorting,
  };

  return (
    <UsersContext.Provider value={context}>{children}</UsersContext.Provider>
  );
};

export function useUsers() {
  return useContext(UsersContext);
}
