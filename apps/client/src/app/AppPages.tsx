import { AppShell, Button, Group, SegmentedControl, Text } from '@mantine/core';
import { useAuth } from '../context/auth.context';
import { LoadingPage } from '../pages/LoadingPage';
import { LoginPage } from '../pages/LoginPage';
import { MainPage } from '../pages/MainPage/MainPage';
import { useTranslation } from 'react-i18next';

export const AppPages = () => {
  const { loading, user, logout } = useAuth();
  const { i18n } = useTranslation();

  if (loading) {
    return <LoadingPage />;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <AppShell header={{ height: 60 }}>
      <AppShell.Header p="sm">
        <Group justify="space-between" gap="lg">
          <SegmentedControl
            value={i18n.language}
            onChange={(value) => i18n.changeLanguage(value)}
            data={[
              { label: 'EN', value: 'en' },
              { label: 'UK', value: 'uk' },
            ]}
          />

          <Group>
            <Text>{user.name}</Text>

            <Button color="red.4" onClick={logout}>
              Logout
            </Button>
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <MainPage />
      </AppShell.Main>
    </AppShell>
  );
};
