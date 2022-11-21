import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export type IUser = Pick<
  FirebaseAuthTypes.User,
  | 'email'
  | 'displayName'
  | 'emailVerified'
  | 'phoneNumber'
  | 'photoURL'
  | 'providerData'
  | 'metadata'
  | 'uid'
>;

export interface IOwner {
  id: string;
  displayName: string;
  email: string;
  photoURL: string;
}

export const defaultUser: IOwner = {
	displayName: '',
	email: '',
	id: '',
	photoURL: ''
};