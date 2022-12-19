import { PlayerScreenType } from "../interfaces/PlayerScreenType";

export const splashScreenContent = [
  {
    id: '1',
    images: 'SplashScreen1',
    title: 'Welcome to Curator',
    description: 'Create and add notes to audio and share with your friends',
  },
  {
    id: '2',
    images: 'SplashScreen2',
    title: 'Create Snippets',
    description: 'Create and add notes to audio and share with your friends',
  },
  {
    id: '3',
    images: 'SplashScreen3',
    title: 'Add Notes ',
    description: 'Add notes to part of the timestamp created',
  },
];

export const playerScreenContent = [
  { type: 'Snippet' as PlayerScreenType, id: '2' },
  { type: 'Note' as PlayerScreenType, id: '1' },
]

export default splashScreenContent;
