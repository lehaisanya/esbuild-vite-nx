import { Button, Group, Stack } from '@mantine/core';
import { UsersProvider } from '../../context/users.context';
import { UsersTable } from './UsersTable/UsersTable';
import { UsersFiltersForm } from './UsersFiltersForm';
import { UserCreator } from './UserCreator';

export const MainPage = () => {
  return (
    <UsersProvider>
      <Stack p="20px">
        <UsersFiltersForm />
        <UserCreator />
        <UsersTable />
      </Stack>
    </UsersProvider>
  );
};
