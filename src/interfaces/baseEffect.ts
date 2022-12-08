import { IOwner } from './auth';
import { ReactionType } from './reaction';

export interface BaseEffect {
  id: string;
  description: string;
  owner: IOwner;
  type?: 'remote' | 'local';
  reactions: {
    [userId: string]: ReactionType;
  };
  status?: 'new';
}
