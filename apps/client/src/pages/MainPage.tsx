import { UsersTable } from '../components/UsersTable';
import { UsersProvider } from '../context/users.context';

export const MainPage = () => {
  return (
    <UsersProvider>
      <UsersTable />
    </UsersProvider>
  );
};
