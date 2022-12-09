import { TrackPlayerClass } from '../providers/TrackPlayer';
import { IUser } from './auth';
import { ReactionType } from './reaction';

export interface BaseTabProps {
  currentUser: IUser | null;
  toggleShowMore: (arg: DataType) => void;
  playlist: TrackPlayerClass | null;
  handleDelete: (id: string) => void;
  handleReactions: (arg: { id: string; reaction: ReactionType; userId: string }) => void;
}

export interface DataType { id: string; type: 'note' | 'snippet' };
