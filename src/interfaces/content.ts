export type Icons = 'SplashScreen1' | 'SplashScreen2' | 'SplashScreen3' | 'add'
  | 'podcast'
//   | 'search'
  | 'google'
  | 'signout'
  | 'more'
//   | 'library-add'
  | 'download'
//   | 'play-circle'
  | 'arrow-back'
  | 'dropdown'
  | 'empty-audio'
  | 'graphic-eq'
  | 'note'
//   | 'queue'
  | 'fast-rewind'
  | 'replay-10'
  | 'play'
  | 'forward-10'
  | 'fast-forward'
  | 'add-reaction'
  | 'favorite'
  | 'local-fire-department'
  | 'recommend'
//   | 'taking-note'
//   | 'add-comment'
//   | 'notifications-active'
  | 'person-add'
  | 'public'
  | 'silent'
//   | 'account'
  | 'delete-forever'
  | 'edit-border'
  | 'pause'
  | 'check'
  | 'close'
  | 'empty-snippet'
  | 'upload';

export interface IconProps {
  name: Icons;
  width: number;
  height?: number;
  color?: string;
  fill?: string;
  stroke?: string;
  onPress: () => void;
}
