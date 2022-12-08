import { BaseEffect } from './baseEffect';

export interface ISnippet extends BaseEffect {
  time: {
    start: number;
    end: number;
  };
  formatTime: {
    start: string;
    end: string;
  };
  status?: 'new'
}

export interface NewSnippet {
  description: string;
  position: number;
  startTime: {
    Hour: string;
    Minute: string;
    Second: string;
  };
  endTime: {
    Hour: string;
    Minute: string;
    Second: string;
  };
}

export interface ICurrentSnippet {
  mediaId: string;
  snippets: {
    [snippetId: string]: ISnippet;
  };
}

export const defaultSnippet: ISnippet = {
	description: '',
	formatTime: {
		end: '',
		start: '',
	},
	id: '',
	owner: {
		displayName: '',
		email: '',
		id: '',
		photoURL: '',
	},
	time: {
		end: 0,
		start: 0,
	},
	reactions: {},
};
