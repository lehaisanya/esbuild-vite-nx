import {
  ActionIcon,
  Badge,
  Button,
  Flex,
  Group,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconEdit, IconTrash } from '@tabler/icons-react';
// import { DataTable } from 'mantine-datatable';
import { useUsers } from '../context/users.context';
import { AddUserModal } from './AddUserModal';
import { EditUserModal } from './EditUserModal';
import { AgeRangeFilter } from './AgeRangeFilter';
import { DataTable } from './DataTable';
import { TableActions } from './TableActions';

export const UsersTable = () => {
  const {
    loadingUsers,
    count,
    page,
    pageSize,
    users,
    sorting,
    search,
    genderFilter,
    isActiveFilter,
    ageFrom,
    ageTo,
    setSearch,
    setGenderFilter,
    setIsActiveFilter,
    setSorting,
    setPage,
    setPageSize,
    setEditingUser,
    deleteUser,
  } = useUsers();

  const [opened, { open, close }] = useDisclosure(false);
  const [openedEdit, { open: openEdit, close: closeEdit }] =
    useDisclosure(false);

  return (
    <Stack p="sm">
      <AddUserModal opened={opened} onClose={close} />
      <EditUserModal opened={openedEdit} onClose={closeEdit} />
      <TableActions />
      {/* <Stack>
        <Flex justify="space-between">
          <Group>
            <Text>Search:</Text>
            <TextInput
              w={300}
              defaultValue={search}
              onChange={(event) => setSearch(event.currentTarget.value)}
            />
          </Group>

          <Group>
            <Button onClick={open}>Add User</Button>
          </Group>
        </Flex>
      </Stack> */}
      {/* <DataTable
        fontSize="sm"
        withBorder
        withColumnBorders
        striped
        shadow="sm"
        idAccessor="id"
        fetching={loadingUsers}
        totalRecords={count}
        page={page}
        onPageChange={setPage}
        recordsPerPage={pageSize}
        recordsPerPageOptions={[10, 15, 20, 25, 30]}
        onRecordsPerPageChange={setPageSize}
        sortStatus={sorting!}
        onSortStatusChange={setSorting}
        records={users}
        columns={[
          {
            accessor: 'name',
            noWrap: true,
            sortable: true,
            filtering: search !== '',
            filter: (
              <TextInput
                defaultValue={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
              />
            ),
          },
          {
            accessor: 'age',
            sortable: true,
            filtering: ageFrom !== 18 || ageTo !== 200,
            filter: <AgeRangeFilter />,
          },
          {
            accessor: 'gender',
            sortable: true,
            filtering: genderFilter !== null,
            filter: (
              <Select
                allowDeselect
                value={genderFilter}
                onChange={setGenderFilter}
                data={[
                  { value: 'male', label: 'Male' },
                  { value: 'female', label: 'Female' },
                ]}
              />
            ),
          },
          {
            accessor: 'company',
            sortable: true,
            filtering: search !== '',
            filter: (
              <TextInput
                defaultValue={search}
                onChange={(event) => setSearch(event.currentTarget.value)}
              />
            ),
          },
          {
            accessor: 'isActive',
            sortable: true,
            filtering: isActiveFilter !== null,
            filter: (
              <Select
                allowDeselect
                value={isActiveFilter}
                onChange={setIsActiveFilter}
                data={[
                  { value: 'active', label: 'Active' },
                  { value: 'unactive', label: 'Unactive' },
                ]}
              />
            ),
            render(record) {
              return (
                <Badge color={record.isActive ? 'green' : 'red'}>
                  {record.isActive ? 'active' : 'unactive'}
                </Badge>
              );
            },
          },
          {
            accessor: 'actions',
            width: 100,
            textAlignment: 'right',
            render(record) {
              return (
                <Group wrap="nowrap" gap="xs" justify="right">
                  <ActionIcon
                    color="yellow"
                    onClick={() => {
                      openEdit();
                      setEditingUser(record.id);
                    }}
                  >
                    <IconEdit />
                  </ActionIcon>
                  <ActionIcon
                    color="red"
                    onClick={async () => {
                      await deleteUser(record.id);
                    }}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              );
            },
          },
        ]}
      /> */}
      <DataTable />
    </Stack>
  );
};
