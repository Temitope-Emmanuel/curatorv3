import { IOwner } from './auth';
import { INote } from './note';
import { ISnippet } from './snippet';

export interface RemoteData<K> {
  id: string;
  user: IOwner;
  data: {
    [key: string]: K
  };
}

export type RemoteSnippet = RemoteData<ISnippet>;
export type RemoteNote = RemoteData<INote>;