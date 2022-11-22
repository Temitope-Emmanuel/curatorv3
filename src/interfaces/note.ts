import { BaseEffect } from './baseEffect';

export interface INote extends BaseEffect {
  time: number;
  timestamp: string;
}

export interface NewNote {
  description: string;
  position: number;
  time: {
    Hour: string;
    Minute: string;
    Second: string;
  };
}

export interface ICurrentNote {
  mediaId: string;
  notes: {
    [noteId: string]: INote;
  };
}

