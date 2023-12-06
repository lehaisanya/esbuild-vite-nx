import { ReactNode, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconCheck, IconEdit, IconX, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import {
  Table,
  Group,
  ActionIcon,
  Pagination,
  Select,
  Loader,
  Stack,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { User } from '@app/routes';
import {
  useDeleteUserMutation,
  useUsers,
} from '../../../context/users.context';
import { EditUserModal } from '../EditUserModal';
import { HeadCeil } from './HeadCeil';

const { Thead, Tbody, Tr, Th, Td } = Table;

type Columns<TRecord extends {}> = {
  [TField in keyof TRecord]: {
    label: string;
    width?: string;
    render?: (value: TRecord[TField]) => ReactNode;
  };
};

export const UsersTable = () => {
  const { t } = useTranslation();
  const [opened, { open, close }] = useDisclosure(false);
  const [editingUser, setEditingUser] = useState<number | null>(null);

  const {
    loading,
    users,
    count,
    page,
    pageSize,
    selectedColumns,
    setPage,
    setPageSize,
  } = useUsers();

  const deleteUser = useDeleteUserMutation();

  const columns: Columns<Omit<User, 'id'>> = {
    name: {
      label: t('NAME_FIELD'),
    },
    age: {
      label: t('AGE_FIELD'),
    },
    gender: {
      label: t('GENDER_FIELD'),
      render: (gender) => (gender === 'male' ? t('MALE') : t('FEMALE')),
    },
    company: {
      label: t('COMPANY_FIELD'),
    },
    isActive: {
      label: t('IS_ACTIVE_FIELD'),
      width: '1%',
      render: (isActive) =>
        isActive ? <IconCheck color="green" /> : <IconX color="red" />,
    },
  };

  return (
    <Stack>
      <Table
        withTableBorder
        withColumnBorders
        withRowBorders
        style={{ textAlign: 'center' }}
        striped
        highlightOnHover
        layout="auto"
      >
        <EditUserModal
          editingUser={editingUser}
          opened={opened}
          close={close}
        />
        <Thead>
          <Tr bg="lightgray">
            <Th w="1%" />
            <Th w="1%">Id</Th>
            {selectedColumns.map((column) => (
              <HeadCeil
                key={column}
                column={column}
                width={columns[column].width}
                label={columns[column].label}
              />
            ))}
          </Tr>
        </Thead>

        <Tbody>
          {users.map((user) => {
            return (
              <Tr key={user.id}>
                <Td w="min-content">
                  <Group wrap="nowrap" gap="xs" justify="right">
                    <ActionIcon
                      color="yellow"
                      onClick={() => {
                        setEditingUser(user.id);
                        open();
                      }}
                    >
                      <IconEdit />
                    </ActionIcon>
                    <ActionIcon
                      color="red"
                      loading={deleteUser.isLoading}
                      onClick={async () => {
                        try {
                          await deleteUser.mutateAsync({ id: user.id });
                        } catch (err) {
                          notifications.show({
                            color: 'red',
                            title: 'Error',
                            message: 'Server Error',
                          });
                        }
                      }}
                    >
                      <IconTrash />
                    </ActionIcon>
                  </Group>
                </Td>
                <Td>{user.id}</Td>
                {selectedColumns.map((column) => {
                  const config = columns[column];
                  const value = user[column];

                  const render = config.render as any;
                  const rendered = render ? render(value) : value;

                  return <Td key={column}>{rendered}</Td>;
                })}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <Group justify="flex-end">
        {loading && <Loader />}
        <Pagination
          withEdges
          total={Math.ceil(count / pageSize)}
          value={page}
          onChange={setPage}
        />
        <Select
          allowDeselect={false}
          data={['10', '15', '20', '30']}
          value={pageSize.toString()}
          onChange={(value) => {
            if (value) {
              setPageSize(Number.parseInt(value));
            } else {
              setPageSize(10);
            }
          }}
        />
      </Group>
    </Stack>
  );
};
