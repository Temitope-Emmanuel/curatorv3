import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import toast from '../hooks/useToast';
import { setUser } from '../store/Auth';
import { useAppDispatch } from '../hooks/redux';
import { useFirestore } from './firestore';

GoogleSignin.configure({
  webClientId: '240606234737-r9p3uri4ihh34n5klth5b4t19pd4sqbh.apps.googleusercontent.com',
});

export const useFirebaseAuth = () => {
  const { createNewUser, findUser } = useFirestore();
  const dispatch = useAppDispatch();
  const handleSignup = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // First sign in with gmail details
      const { idToken, user } = await GoogleSignin.signIn();
      // Link newly signed in user with the google provider on firebase
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const foundUser = await findUser(user.email);
      if (foundUser?.length) {
        // Login user
        auth()
          .signInWithCredential(googleCredential)
          .then(async (signedInUser) => {
            toast({
              text2: `successfully logged in ${signedInUser.additionalUserInfo?.profile?.name}`,
              type: 'success',
            });
          })
          .catch((err) => {
            toast({
              type: 'error',
              text2: `error occurred while login, ${err.message}`,
            });
          });
      } else {
        // Link with the currently signed in anonymous user
        auth()
          .currentUser?.linkWithCredential(googleCredential)
          .then(async (newUser) => {
            const {
              user: { providerData, uid, metadata },
            } = newUser;
            const newCurrentUser = {
              displayName: providerData[0]?.displayName || '',
              email: providerData[0]?.email || '',
              emailVerified: true,
              metadata,
              phoneNumber: providerData[0]?.phoneNumber || '',
              photoURL: providerData[0]?.photoURL || '',
              providerData,
              uid,
            };
            await createNewUser(newCurrentUser);
            dispatch(setUser(newCurrentUser));
            toast({
              text2: `successfully logged in ${newCurrentUser.displayName}`,
              type: 'success',
            });
          })
          .catch((err) => {
            toast({
              type: 'error',
              text2: `error occurred while login, ${err.message}`,
            });
          });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.code === statusCodes.SIGN_IN_CANCELLED) return undefined;
      if (err.code === statusCodes.IN_PROGRESS) {
        await GoogleSignin.signOut();
        await handleSignup();
      } else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) return undefined;
    }
    return undefined;
  };

  const handleSignout = (cb: Function) =>
    auth()
      .signOut()
      .then(() => {
        if (cb) {
          cb();
        }
      });
  return {
    handleSignup,
    handleSignout,
  };
};

export default useFirebaseAuth;
