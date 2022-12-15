import { TrackPlayerClass } from '../providers/TrackPlayer';
import { ActiveDataType } from '../store/App';
import { IUser } from './auth';
import { ReactionType } from './reaction';

export interface BaseTabProps {
  currentUser: IUser | null;
  activeData: ActiveDataType;
  toggleShowMore: (arg: ActiveDataType) => void;
  playlist: TrackPlayerClass | null;
  handleReactions: (arg: { id: string; reaction: ReactionType; userId: string }) => void;
}
