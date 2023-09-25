import { Table, Group, ActionIcon } from '@mantine/core';
import { useUsers } from '../context/users.context';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';

const { Thead, Tbody, Tr, Th, Td } = Table;

export const DataTable = () => {
  const { users, setEditingUser, deleteUser } = useUsers();

  return (
    <Table withColumnBorders withTableBorder highlightOnHover layout="auto">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Age</Th>
          <Th>Gender</Th>
          <Th>Company</Th>
          <Th>Is Active</Th>
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
                      // openEdit();
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
