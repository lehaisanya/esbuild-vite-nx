import {
  Button,
  Container,
  Group,
  MultiSelect,
  NumberInput,
  RangeSlider,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { defaultFilters, useUsers } from '../../context/users.context';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

export const UsersFiltersForm = () => {
  const { filters, selectedColumns, setSelectedColumns, setFilters } =
    useUsers();

  const { t } = useTranslation();

  const form = useForm({
    initialValues: filters,
  });

  const onSubmit = form.onSubmit((values) => {
    form.setInitialValues(values);
    setFilters(values);
  });

  const onReset = (event: any) => {
    form.onReset(event);
    form.setInitialValues(defaultFilters);
    setFilters(defaultFilters);
  };

  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <Group>
        <TextInput
          variant={form.isDirty('search') ? 'filled' : 'default'}
          label={t('SEARCH_FIELD')}
          {...form.getInputProps('search')}
        />
        <Group grow>
          <NumberInput
            label={t('AGE_FROM_FIELD')}
            variant={form.isDirty('ageFrom') ? 'filled' : 'default'}
            min={18}
            max={form.values.ageTo}
            {...form.getInputProps('ageFrom')}
          />
          <NumberInput
            label={t('AGE_TO_FIELD')}
            variant={form.isDirty('ageTo') ? 'filled' : 'default'}
            min={form.values.ageFrom}
            max={200}
            {...form.getInputProps('ageTo')}
          />
        </Group>
        {/* <RangeSlider
          w="350px"
          min={18}
          max={200}
          minRange={0}
          marks={[
            { value: 18, label: '18' },
            { value: 50, label: '50' },
            { value: 100, label: '100' },
            { value: 150, label: '150' },
            { value: 200, label: '200' },
          ]}
          value={[form.values.ageFrom, form.values.ageTo]}
          onChange={([ageFrom, ageTo]) => {
            form.setValues({
              ageFrom,
              ageTo,
            });
          }}
        /> */}
        <Select
          label={t('GENDER_FIELD')}
          variant={form.isDirty('gender') ? 'filled' : 'default'}
          data={[
            { label: t('MALE'), value: 'male' },
            { label: t('FEMALE'), value: 'female' },
          ]}
          {...form.getInputProps('gender')}
        />
        <Select
          label={t('IS_ACTIVE_FIELD')}
          variant={form.isDirty('isActive') ? 'filled' : 'default'}
          data={[
            { label: t('ACTIVE'), value: 'active' },
            { label: t('INACTIVE'), value: 'inactive' },
          ]}
          {...form.getInputProps('isActive')}
        />
        <MultiSelect
          label={t('COLUMNS_FIELD')}
          miw="200px"
          value={selectedColumns}
          onChange={(values) => {
            setSelectedColumns(values);
          }}
          data={[
            { label: t('NAME_FIELD'), value: 'name' },
            { label: t('AGE_FIELD'), value: 'age' },
            { label: t('GENDER_FIELD'), value: 'gender' },
            { label: t('COMPANY_FIELD'), value: 'company' },
            { label: t('IS_ACTIVE_FIELD'), value: 'isActive' },
          ]}
        />
        <Group grow>
          <Button type="reset" color="yellow">
            {t('RESET_FILTERS')}
          </Button>
          <Button type="submit">{t('APPLY_FILTERS')}</Button>
        </Group>
      </Group>
    </form>
  );
};
