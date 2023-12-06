import { FC, useState } from 'react';
import {
  Button,
  Checkbox,
  Group,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { User, UserUpdateValidation } from '@app/routes';
import { useUpdateUserMutation } from '../../context/users.context';
import { useTranslation } from 'react-i18next';

interface EditUserFormProps {
  editableUser: User;
  close: () => void;
}

export const EditUserForm: FC<EditUserFormProps> = ({
  editableUser,
  close,
}) => {
  const { t } = useTranslation();
  const updateUser = useUpdateUserMutation();

  const [errors, setErrors] = useState<UserUpdateValidation | null>(null);

  const form = useForm({ initialValues: editableUser });

  const onSubmit = form.onSubmit(async (values) => {
    const result = await updateUser.mutateAsync({
      id: editableUser.id,
      update: values,
    });

    if (result.success) {
      setErrors(null);
      close();
      return;
    }

    setErrors(result.errors);
  });

  const onReset = () => {
    form.reset();
    setErrors(null);
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <Stack>
        <TextInput
          label={t('NAME_FIELD')}
          variant={form.isDirty('name') ? 'filled' : 'default'}
          {...form.getInputProps('name')}
          error={errors?.name?.key && t(errors.name.key, { ...errors.name })}
        />
        <NumberInput
          label={t('AGE_FIELD')}
          variant={form.isDirty('age') ? 'filled' : 'default'}
          min={18}
          max={200}
          {...form.getInputProps('age')}
          error={errors?.age?.key && t(errors.age.key, { ...errors.age })}
        />
        <Select
          allowDeselect={false}
          label={t('GENDER_FIELD')}
          variant={form.isDirty('gender') ? 'filled' : 'default'}
          data={[
            { value: 'male', label: t('MALE') },
            { value: 'female', label: t('FEMALE') },
          ]}
          {...form.getInputProps('gender')}
          error={
            errors?.gender?.key && t(errors.gender.key, { ...errors.gender })
          }
        />
        <TextInput
          label={t('COMPANY_FIELD')}
          variant={form.isDirty('company') ? 'filled' : 'default'}
          {...form.getInputProps('company')}
          error={
            errors?.company?.key && t(errors.company.key, { ...errors.company })
          }
        />
        <Checkbox
          label={t('IS_ACTIVE_FIELD')}
          {...form.getInputProps('isActive', { type: 'checkbox' })}
          error={
            errors?.isActive?.key &&
            t(errors.isActive.key, { ...errors.isActive })
          }
        />
        <Group grow>
          <Button type="reset" color="yellow">
            {t('RESET')}
          </Button>
          <Button type="submit" loading={updateUser.isLoading}>
            {t('UPDATE')}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};
