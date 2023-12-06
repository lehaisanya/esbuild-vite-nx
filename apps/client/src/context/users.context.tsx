import {
  FC,
  PropsWithChildren,
  createContext,
  useContext,
  useState,
} from 'react';
import {
  User,
  UserSortingField,
  UsersQueryInput,
  UsersSorting,
} from '@app/routes';
import { trpc } from '../api/trpc';

export interface UsersFilters {
  search: string;
  gender: 'male' | 'female' | null;
  isActive: 'active' | 'unactive' | null;
  ageFrom: number;
  ageTo: number;
}

export const defaultFilters: UsersFilters = {
  search: '',
  ageFrom: 18,
  ageTo: 200,
  gender: null,
  isActive: null,
};

interface UsersContextValue {
  loading: boolean;
  users: User[];
  count: number;
  page: number;
  pageSize: number;
  filters: UsersFilters;
  sorting: UsersSorting | null;
  selectedColumns: UserSortingField[];
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  setFilters: (filters: UsersFilters) => void;
  setSorting: (sorting: UsersSorting | null) => void;
  setSelectedColumns: (columns: UserSortingField[]) => void;
}

const UsersContext = createContext<UsersContextValue>(null!);

export const UsersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [filters, setFilters] = useState<UsersFilters>(defaultFilters);
  const [sorting, setSorting] = useState<UsersSorting | null>(null);
  const [selectedColumns, setSelectedColumns] = useState<UserSortingField[]>([
    'name',
    'age',
    'gender',
    'company',
    'isActive',
  ]);

  const queryParams: UsersQueryInput = {
    limit: pageSize,
    offset: (page - 1) * pageSize,
  };

  if (sorting) {
    queryParams.sorting = sorting;
  }

  if (filters.search) {
    queryParams.search = filters.search;
  }

  if (filters.gender) {
    queryParams.gender = filters.gender;
  }

  if (filters.isActive) {
    queryParams.isActive = filters.isActive === 'active';
  }

  if (filters.ageFrom !== 18) {
    queryParams.ageFrom = filters.ageFrom;
  }

  if (filters.ageTo !== 200) {
    queryParams.ageTo = filters.ageTo;
  }

  const usersQuery = trpc.user.getUsers.useQuery(queryParams, {
    keepPreviousData: true,
  });

  const contextValue: UsersContextValue = {
    loading: usersQuery.isFetching,
    users: usersQuery.data?.users ?? [],
    count: usersQuery.data?.count ?? 0,
    page,
    pageSize,
    filters,
    sorting,
    selectedColumns,
    setPage,
    setSorting,
    setPageSize: (pageSize: number) => {
      setPage(1);
      setPageSize(pageSize);
    },
    setFilters: (filters) => {
      setPage(1);
      setFilters(filters);
    },
    setSelectedColumns,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};

export function useUsers() {
  return useContext(UsersContext);
}

export function useCreateUserMutation() {
  const utils = trpc.useUtils();

  return trpc.user.createUser.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        utils.user.getUsers.invalidate();
      }
    },
  });
}

export function useUpdateUserMutation() {
  const utils = trpc.useUtils();

  return trpc.user.updateUser.useMutation({
    onSuccess: (result) => {
      if (result.success) {
        utils.user.getUsers.invalidate();
      }
    },
  });
}

export function useDeleteUserMutation() {
  const utils = trpc.useUtils();

  return trpc.user.deleteUser.useMutation({
    onSuccess: (result) => {
      utils.user.getUsers.invalidate();
    },
  });
}
