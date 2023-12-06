import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { UserCreateInput, UserCreateValidation } from '@app/routes';
import { useCreateUserMutation } from '../../context/users.context';

const initialValues: UserCreateInput = {
  name: '',
  age: 18,
  company: '',
  gender: 'male',
};

export const UserCreator = () => {
  const [opened, { open, close }] = useDisclosure();
  const [errors, setErrors] = useState<UserCreateValidation | null>(null);

  const { t, i18n } = useTranslation();

  const addUser = useCreateUserMutation();

  const form = useForm({ initialValues });

  const onSubmit = form.onSubmit(async (values) => {
    const result = await addUser.mutateAsync(values);
    if (result.success) {
      setErrors(null);
      close();
      form.reset();
      return;
    }

    setErrors(result.errors);
  });

  const onReset = () => {
    form.reset();
    setErrors(null);
  };

  return (
    <Group justify="flex-end">
      <Modal
        centered
        keepMounted={false}
        opened={opened}
        onClose={close}
        title={t('CREATE_USER')}
      >
        <form onSubmit={onSubmit} onReset={onReset}>
          <Stack>
            <Group grow>
              <Button onClick={() => i18n.changeLanguage('en')}>EN</Button>
              <Button onClick={() => i18n.changeLanguage('uk')}>UK</Button>
            </Group>
            <TextInput
              label={t('NAME_FIELD')}
              variant={form.isDirty('name') ? 'filled' : 'default'}
              {...form.getInputProps('name')}
              error={
                errors?.name?.key && t(errors.name.key, { ...errors.name })
              }
            />
            <NumberInput
              label={t('AGE_FIELD')}
              variant={form.isDirty('age') ? 'filled' : 'default'}
              {...form.getInputProps('age')}
              error={errors?.age?.key && t(errors.age.key, { ...errors.age })}
            />
            <TextInput
              label={t('COMPANY_FIELD')}
              variant={form.isDirty('company') ? 'filled' : 'default'}
              {...form.getInputProps('company')}
              error={
                errors?.company?.key &&
                t(errors.company.key, { ...errors.company })
              }
            />
            <Select
              allowDeselect={false}
              label={t('GENDER_FIELD')}
              variant={form.isDirty('gender') ? 'filled' : 'default'}
              data={[
                { label: t('MALE'), value: 'male' },
                { label: t('FEMALE'), value: 'female' },
              ]}
              {...form.getInputProps('gender')}
              error={
                errors?.gender?.key &&
                t(errors.gender.key, { ...errors.gender })
              }
            />
            <Group grow>
              <Button type="reset" color="yellow">
                {t('RESET')}
              </Button>
              <Button type="submit" loading={addUser.isLoading}>
                {t('CREATE')}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
      <Button onClick={open}>{t('ADD_USER')}</Button>
    </Group>
  );
};
