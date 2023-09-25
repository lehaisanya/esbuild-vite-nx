import { useEffect } from 'react';
import { AppShell, Button, Group, Text } from '@mantine/core';
import { useAuth } from '../context/auth.context';
import { MainPage } from '../pages/MainPage';
import { LoginPage } from '../pages/LoginPage';
import { LoadingPage } from '../pages/LoadingPage';

export function App() {
  const { loading, user, loadUser, logout } = useAuth();

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header p="sm">
        <Group justify="right" gap="lg">
          <Text>{user.name}</Text>

          <Button color="red.4" onClick={logout}>
            Logout
          </Button>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <MainPage />
      </AppShell.Main>
    </AppShell>
  );
}
