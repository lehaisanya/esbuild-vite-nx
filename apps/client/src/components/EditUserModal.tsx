import { FC } from 'react';
import { Center, Loader, Modal } from '@mantine/core';
import { useUsers } from '../context/users.context';
import { EditUserForm } from './EditUserForm';

type EditUserModalProps = {
  opened: boolean;
  onClose: () => void;
};

export const EditUserModal: FC<EditUserModalProps> = ({ opened, onClose }) => {
  const { loadingEditableUser, editableUser, updateUser } = useUsers();

  return (
    <Modal opened={opened} onClose={onClose} title="Edit user">
      {loadingEditableUser ? (
        <Center>
          <Loader variant="oval" />
        </Center>
      ) : (
        <EditUserForm
          editableUser={editableUser!}
          onEditUser={({ id, ...update }) => {
            onClose();
            updateUser(id, update);
          }}
        />
      )}
    </Modal>
  );
};
