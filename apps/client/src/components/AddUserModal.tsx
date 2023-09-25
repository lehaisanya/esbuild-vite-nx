import { FC } from 'react';
import {
  Button,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { UserCreateInput, userCreateSchema } from '@app/schemas';
import { useUsers } from '../context/users.context';

type AddUserModalProps = {
  opened: boolean;
  onClose: () => void;
};

export const AddUserModal: FC<AddUserModalProps> = ({ opened, onClose }) => {
  const { createUser } = useUsers();

  const form = useForm<UserCreateInput>({
    initialValues: {
      name: '',
      age: 18,
      gender: 'male',
      company: '',
    },
    validate: zodResolver(userCreateSchema),
  });

  return (
    <Modal opened={opened} onClose={onClose} title="Add new user">
      <form
        onSubmit={form.onSubmit(async (values) => {
          onClose();
          await createUser(values);
        })}
      >
        <Stack>
          <TextInput label="Name" {...form.getInputProps('name')} />
          <NumberInput label="Age" {...form.getInputProps('age')} />
          <Select
            label="Gender"
            data={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
            {...form.getInputProps('gender')}
          />
          <TextInput label="Company" {...form.getInputProps('company')} />
          <Button type="submit">Add</Button>
        </Stack>
      </form>
    </Modal>
  );
};
