export type ReactionType = 'recommend' | 'favorite' | 'local-fire-department' | 'add-reaction';
export type IReaction = {
  [key in ReactionType]: string[];
};
