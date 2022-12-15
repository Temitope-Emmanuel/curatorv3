export type ReactionType = 'recommend' | 'favorite' | 'local-fire-department' | 'star';
export type IReaction = {
  [key in ReactionType]: string[];
};
