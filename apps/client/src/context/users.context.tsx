import {
  FC,
  PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDebouncedState } from '@mantine/hooks';
import type { User } from '@app/routes';
import { UserCreateInput, UserUpdateData, UsersQueryInput } from '@app/schemas';
import { api } from '../api/api';

type Sorting = {
  column: string;
  direction: 'asc' | 'desc';
};

interface UsersContextState {
  loadingUsers: boolean;
  loadingEditableUser: boolean;
  users: User[];
  editableUser: User | null;
  page: number;
  pageSize: number;
  count: number;
  sorting: Sorting | null;
  genderFilter: 'male' | 'female' | null;
  ageFrom: number;
  ageTo: number;
  isActiveFilter: 'active' | 'unactive' | null;
}

interface UsersContextValue extends UsersContextState {
  search: string;
  createUser: (user: UserCreateInput) => Promise<void>;
  updateUser: (id: number, update: UserUpdateData) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
  setEditingUser: (id: number) => Promise<void>;
  setPage: (newPage: number) => void;
  setPageSize: (pageSize: number) => void;
  setSorting: (sorting: Sorting) => void;
  setSearch: (search: string) => void;
  setGenderFilter: (gender: 'male' | 'female' | null) => void;
  setIsActiveFilter: (isActive: 'active' | 'unactive' | null) => void;
  setAgeFrom: (age: number) => void;
  setAgeTo: (age: number) => void;
  setAgeRange: (range: [number, number]) => void;
  clearAgeFilters: () => void;
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
  genderFilter: null,
  ageFrom: 18,
  ageTo: 200,
  isActiveFilter: null,
};

export const UsersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, setState] = useState<UsersContextState>(defaultContextState);
  const [search, setSearch] = useDebouncedState('', 300);
  // const [ageFrom, setAgeFrom] = useState(18);
  // const [ageTo, setAgeTo] = useState(200);

  const fetchUsers = useCallback(async () => {
    setState((prev) => ({ ...prev, loadingUsers: true }));

    const query: UsersQueryInput = {
      limit: state.pageSize,
    };

    if (state.page !== 1) {
      query.offset = (state.page - 1) * state.pageSize;
    }

    if (search) {
      query.search = search;
    }

    if (state.sorting) {
      query.sorting = {
        column: state.sorting.column,
        direction: state.sorting.direction,
      };
    }

    if (state.genderFilter) {
      query.gender = state.genderFilter;
    }

    if (state.isActiveFilter) {
      query.isActive = state.isActiveFilter === 'active';
    }

    if (state.ageFrom !== 18) {
      query.ageFrom = state.ageFrom;
    }

    if (state.ageTo !== 200) {
      query.ageTo = state.ageTo;
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
    search,
    state.genderFilter,
    state.isActiveFilter,
    state.ageFrom,
    state.ageTo,
  ]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

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

  const setSorting = useCallback((sorting: Sorting) => {
    setState((prev) => ({ ...prev, sorting }));
  }, []);

  const setGenderFilter = useCallback(
    (genderFilter: 'male' | 'female' | null) => {
      setState((prev) => ({ ...prev, genderFilter }));
    },
    []
  );

  const setIsActiveFilter = useCallback(
    (isActiveFilter: 'active' | 'unactive' | null) => {
      setState((prev) => ({ ...prev, isActiveFilter }));
    },
    []
  );

  const setAgeFrom = useCallback((ageFrom: number) => {
    setState((prev) => ({ ...prev, ageFrom }));
  }, []);

  const setAgeTo = useCallback((ageTo: number) => {
    setState((prev) => ({ ...prev, ageTo }));
  }, []);

  const setAgeRange = useCallback(([ageFrom, ageTo]: [number, number]) => {
    setState((prev) => ({ ...prev, ageFrom, ageTo }));
  }, []);

  const clearAgeFilters = useCallback(() => {
    setState((prev) => ({ ...prev, ageFrom: 18, ageTo: 200 }));
  }, []);

  const context: UsersContextValue = {
    ...state,
    search,
    createUser,
    updateUser,
    deleteUser,
    setPage,
    setPageSize,
    setEditingUser,
    setSorting,
    setSearch,
    setGenderFilter,
    setIsActiveFilter,
    setAgeFrom,
    setAgeTo,
    setAgeRange,
    clearAgeFilters,
  };

  return (
    <UsersContext.Provider value={context}>{children}</UsersContext.Provider>
  );
};

export function useUsers() {
  return useContext(UsersContext);
}
