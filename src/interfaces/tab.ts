import { TrackPlayerClass } from '../providers/TrackPlayer';
import { IUser } from './auth';
import { ReactionType } from './reaction';

export interface BaseTabProps {
  currentUser: IUser | null;
  playlist: TrackPlayerClass | null;
  handleReactions: (arg: { id: string; reaction: ReactionType; userId: string }) => void;
}
