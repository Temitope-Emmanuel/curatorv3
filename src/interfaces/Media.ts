import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

export interface IMedia {
  id: string;
  url: string;
  title: string;
  author: string;
  owner: {
    id: string;
    name: string;
  };
  description: string;
  createdAt: string;
  tags?: string[];
  // For HomeScreen
  availableRemote?: boolean;
  availableLocal?: boolean;
  isOwner: boolean;

  updatedAt?: string;
  uploadedAt?: FirebaseFirestoreTypes.FieldValue;
  // For Media & Play feature
  position?: number;
  duration?: number;
  formattedDuration?: string;
}

export const defaultAudio: IMedia = {
  id: '',
  url: '',
  author: '',
  title: '',
  isOwner: false,
  owner: {
    id: '',
    name: '',
  },
  description: '',
  tags: [],
  createdAt: '',
};
