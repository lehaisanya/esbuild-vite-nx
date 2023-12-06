import { FC } from 'react';
import { IconSortAscending, IconSortDescending } from '@tabler/icons-react';
import { SortingDirection } from '@app/routes';

interface SortingIconProps {
  direction: SortingDirection;
}

export const SortingIcon: FC<SortingIconProps> = ({ direction }) => {
  return direction === 'ASC' ? <IconSortAscending /> : <IconSortDescending />;
};
