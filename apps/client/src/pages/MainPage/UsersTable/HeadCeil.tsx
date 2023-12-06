import { FC } from 'react';
import { UserSortingField } from '@app/routes';
import { useUsers } from '../../../context/users.context';
import { Group, Table } from '@mantine/core';
import { SortingIcon } from './SortingIcon';

interface TableHeadCeilProps {
  label: string;
  column: UserSortingField;
  width?: string;
}

export const HeadCeil: FC<TableHeadCeilProps> = ({ label, column, width }) => {
  const { sorting, setSorting } = useUsers();

  const isSorted = column === sorting?.column;

  const updateSorting = () => {
    if (!isSorted) {
      setSorting({
        column,
        direction: 'ASC',
      });
      return;
    }

    const direction = sorting.direction === 'ASC' ? 'DESC' : 'ASC';

    setSorting({
      column,
      direction,
    });
  };

  return (
    <Table.Th
      style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
      w={width}
      onClick={updateSorting}
    >
      <Group justify="space-between" wrap="nowrap">
        {label}
        {isSorted && <SortingIcon direction={sorting.direction} />}
      </Group>
    </Table.Th>
  );
};
