import { FC } from 'react';
import { Box, Center, Loader, Modal, Notification } from '@mantine/core';
import { EditUserForm } from './EditUserForm';
import { trpc } from '../../api/trpc';
import { notifications } from '@mantine/notifications';
import { useTranslation } from 'react-i18next';

type EditUserModalProps = {
  opened: boolean;
  close: () => void;
  editingUser: number | null;
};

export const EditUserModal: FC<EditUserModalProps> = ({
  editingUser,
  opened,
  close,
}) => {
  const { t } = useTranslation();

  const editingUserQuery = trpc.user.getUserById.useQuery(
    { id: editingUser! },
    { enabled: editingUser !== null }
  );

  return (
    <Modal
      centered
      keepMounted={false}
      opened={opened}
      onClose={close}
      title={t('EDIT_USER')}
    >
      {editingUserQuery.isLoading ? (
        <Center>
          <Loader />
        </Center>
      ) : editingUserQuery.isError ? (
        <Notification withBorder color="red" withCloseButton={false}>
          {t('USER_HAS_BEEN_DELETED')}
        </Notification>
      ) : (
        <EditUserForm editableUser={editingUserQuery.data} close={close} />
      )}
    </Modal>
  );
};
