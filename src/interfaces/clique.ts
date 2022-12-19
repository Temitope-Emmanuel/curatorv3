import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { IUser } from './auth';

export interface ICliqueMember extends Pick<IUser, 'displayName' | 'email' | 'photoURL' | 'uid'> {
  status: 'owner' | 'member';
}

export type IClique = {
  id: string;
  name: string;
  createdAt?: FirebaseFirestoreTypes.FieldValue;
  members: ICliqueMember[];
  type: 'Personal' | 'Public' | 'Secret';
};

export const defaultClique: IClique = {
	id: '',
	members: [],
	name: '',
	type: 'Secret',
};
