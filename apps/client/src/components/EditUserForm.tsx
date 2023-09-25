import { FC } from 'react';
import {
  Button,
  Checkbox,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { User } from '@app/routes';
import { userUpdateDataSchema } from '@app/schemas';

interface EditUserFormProps {
  editableUser: User;
  onEditUser: (user: User) => void;
}

export const EditUserForm: FC<EditUserFormProps> = ({
  editableUser,
  onEditUser,
}) => {
  const form = useForm({
    initialValues: editableUser,
    validate: zodResolver(userUpdateDataSchema),
  });

  return (
    <form
      onSubmit={form.onSubmit((values) => {
        onEditUser(values);
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
        <Checkbox
          label="Is active"
          {...form.getInputProps('isActive', { type: 'checkbox' })}
        />
        <Button type="submit">Update</Button>
      </Stack>
    </form>
  );
};
