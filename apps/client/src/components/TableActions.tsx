import { Group, Select, TextInput } from '@mantine/core';
import { AgeRangeFilter } from './AgeRangeFilter';

export const TableActions = () => {
  return (
    <Group>
      <TextInput />
      <AgeRangeFilter />
      <Select />
      <Select />
    </Group>
  );
};
