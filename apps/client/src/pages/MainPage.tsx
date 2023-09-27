import { Stack } from '@mantine/core';
import { UsersProvider } from '../context/users.context';
import { TableActions } from '../components/TableActions';
import { UsersTable } from '../components/UsersTable';

export const MainPage = () => {
  return (
    <UsersProvider>
      <Stack p="sm">
        <TableActions />
        <UsersTable />
      </Stack>
    </UsersProvider>
  );
};
