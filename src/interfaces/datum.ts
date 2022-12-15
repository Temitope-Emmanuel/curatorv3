import { BaseTabProps } from './tab';

export interface BaseDatum extends Pick<BaseTabProps, 'handleReactions'> {
  toggleShowMore: () => void;
  isActive: boolean;
  isTheActive: boolean;
  isAuthor: boolean;
  currentUser: string;
}
