import { FC } from 'react';
import { Table, Group, ActionIcon } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconArrowDown, IconArrowUp, IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import { Sorting, useUsers } from '../context/users.context';
import { EditUserModal } from './EditUserModal';

const { Thead, Tbody, Tr, Th, Td } = Table;

interface SortingIconProps {
  column: string;
  sorting: Sorting | null;
}

const SortingIcon: FC<SortingIconProps> = ({ column, sorting }) => {
  if (sorting?.column === column) {
    if (sorting.direction === 'asc') {
      return <IconArrowUp />;
    }

    return <IconArrowDown />;
  }

  return null;
};

interface TableHeadCeilProps {
  label: string;
  column: string;
}

const TableHeadCeil: FC<TableHeadCeilProps> = ({ label, column }) => {
  const { sorting, triggerSorting } = useUsers();

  return (
    <Th style={{ cursor: 'pointer' }} onClick={() => triggerSorting(column)}>
      <Group>
        {label}
        <SortingIcon column={column} sorting={sorting} />
      </Group>
    </Th>
  );
};

export const UsersTable = () => {
  const { users, setEditingUser, deleteUser } = useUsers();
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  return (
    <Table withColumnBorders withTableBorder highlightOnHover layout="auto">
      <EditUserModal opened={openedEdit} onClose={closeEdit} />
      <Thead>
        <Tr>
          <TableHeadCeil label="Name" column="name" />
          <TableHeadCeil label="Age" column="age" />
          <TableHeadCeil label="Gender" column="gender" />
          <TableHeadCeil label="Company" column="company" />
          <TableHeadCeil label="Is Active" column="isActive" />
          <Th />
        </Tr>
      </Thead>

      <Tbody>
        {users.map((user) => {
          return (
            <Tr key={user.id}>
              <Td>{user.name}</Td>
              <Td>{user.age}</Td>
              <Td>{user.gender}</Td>
              <Td>{user.company}</Td>
              <Td>{user.isActive ? 'Active' : 'Inactive'}</Td>
              <Td w="min-content">
                <Group wrap="nowrap" gap="xs" justify="right">
                  <ActionIcon
                    color="yellow"
                    onClick={() => {
                      openEdit();
                      setEditingUser(user.id);
                    }}
                  >
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={async () => {
                      await deleteUser(user.id);
                    }}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};
