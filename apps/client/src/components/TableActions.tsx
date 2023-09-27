import {
  Button,
  Center,
  Container,
  Group,
  Pagination,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { AgeRangeFilter } from './AgeRangeFilter';
import { useForm } from '@mantine/form';
import { UsersFilters, useUsers } from '../context/users.context';
import { useDisclosure } from '@mantine/hooks';
import { AddUserModal } from './AddUserModal';

export const TableActions = () => {
  const { page, count, pageSize, setPage, setPageSize, setFilters } =
    useUsers();

  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm<UsersFilters>({
    initialValues: {
      search: '',
      age: [18, 200],
      gender: null,
      isActive: null,
    },
  });

  const totalItems = Math.ceil(count / pageSize);

  return (
    <Stack>
      <AddUserModal opened={opened} onClose={close} />
      <Container miw="500px">
        <Stack>
          <form
            onSubmit={form.onSubmit((values) => {
              setFilters(values);
            })}
            onReset={form.onReset}
          >
            <Stack>
              <Text>Search:</Text>
              <TextInput {...form.getInputProps('search')} />
              <Text>Age:</Text>
              <AgeRangeFilter
                ageRange={form.values.age}
                onAgeRangeChange={(range) => {
                  form.setFieldValue('age', range);
                }}
              />
              <Text>Gender:</Text>
              <Select
                {...form.getInputProps('gender')}
                allowDeselect
                data={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />
              <Text>Is Active:</Text>
              <Select
                {...form.getInputProps('isActive')}
                allowDeselect
                data={[
                  { value: 'active', label: 'Active' },
                  { value: 'unactive', label: 'Unactive' },
                ]}
              />
              <Group grow>
                <Button type="reset">Clear</Button>
                <Button type="submit">Done</Button>
              </Group>
            </Stack>
          </form>
          <Button onClick={open}>Add user</Button>
        </Stack>
      </Container>
      <Center>
        <Group>
          <Pagination total={totalItems} value={page} onChange={setPage} />
          <Text>Page size:</Text>
          <Select
            maw="75px"
            data={[
              { value: '10', label: '10' },
              { value: '15', label: '15' },
              { value: '20', label: '20' },
              { value: '25', label: '25' },
            ]}
            value={pageSize.toString()}
            onChange={(value) => {
              setPageSize(Number.parseInt(value!));
            }}
          />
        </Group>
      </Center>
    </Stack>
  );
};
