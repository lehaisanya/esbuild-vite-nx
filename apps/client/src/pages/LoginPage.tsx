import {
  Button,
  Center,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useAuth } from '../context/auth.context';

const initialValues = {
  login: 'test',
  password: '12345',
};

export const LoginPage = () => {
  const { loginLoading, login } = useAuth();

  const form = useForm({
    initialValues,
    clearInputErrorOnChange: true,
  });

  const onSubmit = form.onSubmit(async (values) => {
    try {
      const res = await login(values);
      if (!res) throw res;
    } catch (err) {
      form.setErrors({
        form: 'Invalid login or password',
      });
    }
  });

  return (
    <Center h="100vh" w="100vw">
      <Paper withBorder shadow="lg" w={400} p="md">
        <Text size="xl">Sign in</Text>

        <form onSubmit={onSubmit}>
          <Stack>
            <TextInput
              label="Login"
              placeholder="test"
              {...form.getInputProps('login')}
              error={!!form.errors.form}
            />

            <PasswordInput
              label="Password"
              placeholder="12345"
              {...form.getInputProps('password')}
              error={!!form.errors.form}
            />

            <Text hidden={!form.errors.form} color="red">
              {form.errors.form}
            </Text>

            <Button type="submit" loading={loginLoading}>
              Sign in
            </Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
};
