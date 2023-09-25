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

export const LoginPage = () => {
  const { login } = useAuth();

  const form = useForm({
    initialValues: {
      login: 'test',
      password: '12345',
    },
    clearInputErrorOnChange: true,
  });

  return (
    <Center h="100vh" w="100vw">
      <Paper withBorder shadow="lg" w={400} p="md">
        <Text size="xl">Sign in</Text>

        <form
          onSubmit={form.onSubmit(async (values) => {
            try {
              await login(values);
            } catch (error) {
              form.setErrors({
                form: 'Invalid login or password',
              });
            }
          })}
        >
          <Stack>
            <TextInput
              label="Login"
              placeholder="test"
              {...form.getInputProps('login')}
            />

            <PasswordInput
              label="Password"
              placeholder="12345"
              {...form.getInputProps('password')}
            />

            <Text hidden={!form.errors.form} color="red">
              {form.errors.form}
            </Text>

            <Button type="submit">Sign in</Button>
          </Stack>
        </form>
      </Paper>
    </Center>
  );
};
