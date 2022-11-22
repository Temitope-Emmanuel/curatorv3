import { BaseTabProps } from './tab';

export interface BaseDatum extends Pick<BaseTabProps, 'handleReactions'> {
  handleDelete: (arg: string) => void;
  isAuthor: boolean;
  currentUser: string;
}
