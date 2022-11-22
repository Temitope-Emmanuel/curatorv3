import { IUser } from './auth';
import { ReactionType } from './reaction';

export interface BaseTabProps {
  currentUser: IUser | null;
  handleReactions: (arg: { id: string; reaction: ReactionType; userId: string }) => void;
}
