import { TrackPlayerClass } from '../providers/TrackPlayer';
import { ActiveDataType } from '../store/Temp';
import { IUser } from './auth';
import { ReactionType } from './reaction';

export interface BaseTabProps {
  currentUser: IUser | null;
  activeData: ActiveDataType;
  shouldShowEmoji: boolean;
  reset: () => void;
  toggleShowMore: (arg: ActiveDataType) => void;
  playlist: TrackPlayerClass | null;
  handleReactions: (arg: { id: string; reaction: ReactionType; userId: string }) => void;
}
