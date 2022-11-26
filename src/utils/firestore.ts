import firestore from '@react-native-firebase/firestore';
import allSettled from 'promise.allsettled';
import { useAppSelector } from '../hooks/redux';
import { IUser } from '../interfaces/auth';
import { IMedia } from '../interfaces/Media';
import { getAuth } from '../store/Auth';
import useToast from '../hooks/useToast';
import { ISnippet } from '../interfaces/snippet';
import { INote } from '../interfaces/note';
import { RemoteNote, RemoteSnippet } from '../interfaces/remoteData';
import { IClique } from '../interfaces/clique';

const createSnippetRemote = (currentUser: IUser) => (currentMedia: IMedia) => {
  // First check if it exist
  firestore()
    .collection('media')
    .doc(currentMedia.id)
    .collection('snippets')
    .doc(currentUser?.uid)
    .get()
    .then((data) => {
      const docs = data.data();
      if (!data.exists || !docs?.user) {
        return firestore()
          .collection('media')
          .doc(currentMedia.id)
          .collection('snippets')
          .doc(currentUser?.uid)
          .set(
            {
              user: {
                id: currentUser?.uid,
                displayName: currentUser?.displayName,
                email: currentUser?.email,
                photoURL: currentUser?.photoURL,
              },
              createdAt: firestore.FieldValue.serverTimestamp(),
              data: {},
            },
            { merge: true }
          );
      }
      return undefined;
    });
};

const createNoteRemote = (currentUser: IUser) => (currentMedia: IMedia) => {
  firestore()
    .collection('media')
    .doc(currentMedia.id)
    .collection('notes')
    .doc(currentUser?.uid)
    .get()
    .then((data) => {
      const docs = data.data();
      if (!data.exists || !docs?.user) {
        return firestore()
          .collection('media')
          .doc(currentMedia.id)
          .collection('notes')
          .doc(currentUser?.uid)
          .set(
            {
              user: {
                id: currentUser?.uid,
                displayName: currentUser?.displayName,
                email: currentUser?.email,
                photoURL: currentUser?.photoURL,
              },
              createdAt: firestore.FieldValue.serverTimestamp(),
              data: {},
            },
            { merge: true }
          );
      }
      return undefined;
    });
};

const createNewUser = (currentUser: IUser) =>
  firestore()
    .collection('users')
    .doc(currentUser.uid)
    .set({
      ...currentUser,
    });

const findUser = (email: string) =>
  firestore()
    .collection('users')
    .where('email', '==', email)
    .get()
    .then((docs) => {
      if (!docs.empty) {
        return docs.docs.map((item) => {
          const data = item.data();
          return data;
        });
      }
      return null;
    });

const createCliques = (currentUser: IUser) => (currentMedia: IMedia) => {
  firestore()
    .collection('media')
    .doc(currentMedia.id)
    .collection('cliques')
    .doc(currentUser.uid)
    .get()
    .then((data) => {
      if (!data.exists) {
        return firestore()
          .collection('media')
          .doc(currentMedia.id)
          .collection('cliques')
          .doc(currentUser.uid)
          .set(
            {
              members: [
                {
                  displayName: currentUser.displayName,
                  photoURL: currentUser.photoURL,
                  email: currentUser.email,
                  uid: currentUser.uid,
                  status: 'owner',
                },
              ],
              memberEmails: [currentUser.email],
              createdAt: new Date(),
            },
            { merge: true }
          );
      }
      return undefined;
    });
};

const getMediaClique =
  (currentUser: IUser) => (currentMedia: IMedia, setCliques: (arg: IClique[]) => void) =>
    firestore()
      .collection('media')
      .doc(currentMedia.id)
      .collection('cliques')
      .onSnapshot((docs) => {
        const newCliques: IClique[] = [];
        docs.docs.forEach((item) => {
          if (item.exists) {
            const clique = item.data() as IClique;
            newCliques.push({
              id: item.id,
              members: clique.members,
              name: clique.name,
              createdAt: clique.createdAt,
              // check if the currentuser is the owner of the media
              type:
                item.id === currentMedia.owner.id
                  ? 'Public'
                  : item.id === currentUser.uid
                  ? 'Personal'
                  : 'Secret',
            });
          }
        });
        setCliques(newCliques.filter(item => item.type === 'Public'));
      });

const sendInvitationToClique =
  (currentUser: IUser) => async (arg: { email: string; currentMedia: IMedia }) => {
    const foundUser = await findUser(arg.email);
    if (foundUser?.length) {
      return firestore()
        .collection('media')
        .doc(arg.currentMedia.id)
        .collection('cliques')
        .doc(currentUser.uid)
        .set(
          {
            members: firestore.FieldValue.arrayUnion({
              displayName: foundUser[0].displayName,
              email: foundUser[0].email,
              photoURL: foundUser[0].photoURL,
              status: 'member',
              uid: foundUser[0].uid,
            }),
            memberEmails: firestore.FieldValue.arrayUnion(foundUser[0].email),
          },
          { merge: true }
        );
    }
    throw new Error('user does not exist yet');
  };

const saveFileToCollection = (arg: IUser) => (downloadUrl: string, media: IMedia) => {
  const { author, title, createdAt, description, tags, owner } = media;
  return firestore()
    .collection('media')
    .doc(media.id)
    .set({
      id: media.id,
      tags,
      title,
      createdAt,
      description,
      downloadUrl,
      author,
      owner: {
        id: owner?.id,
        name: owner?.name,
        photoURL: arg?.photoURL || '',
      },
      uploadedAt: firestore.FieldValue.serverTimestamp(),
    });
};

const handleSaveSnippetRemote =
  (currentUser: IUser) =>
    (
      { description, formatTime, id, reactions, time }: Omit<ISnippet, 'owner'>,
      currentMedia: IMedia
    ) =>
      firestore()
        .collection('media')
        .doc(currentMedia.id)
        .collection('snippets')
        .doc(currentUser?.uid)
        .set(
          {
            data: {
              [id]: {
                description,
                formatTime,
                id,
                reactions,
                time,
              },
            },
          },
          { merge: true }
        );

const handleSaveNoteRemote =
  (currentUser: IUser) =>
    ({ description, id, reactions, time, timestamp }: Omit<INote, 'owner'>, currentMedia: IMedia) =>
      firestore()
        .collection('media')
        .doc(currentMedia.id)
        .collection('notes')
        .doc(currentUser?.uid)
        .set(
          {
            data: {
              [id]: {
                description,
                id,
                reactions,
                time,
                timestamp,
              },
            },
          },
          { merge: true }
        );

const getRemoteAudioFilesByEmail =
  (currentUser: IUser) => async (setMedia: (arg: IMedia[]) => void) =>
    firestore()
      .collectionGroup('cliques')
      // Check document that has currentUser in their memberEmails
      .where('memberEmails', 'array-contains', currentUser.email)
      .onSnapshot(async (snapDocs) => {
        const promisesArr = snapDocs?.docs.map(async (item) => {
          if (item.ref.parent.parent) {
            return item.ref.parent.parent?.get();
          }
          return undefined;
        });
        allSettled(promisesArr.filter((item) => !!item))
          .then((data) => {
            const remoteFiles: IMedia[] = [];
            data.forEach((parentData) => {
              if (parentData.status === 'fulfilled' && parentData.value?.exists) {
                const doc = parentData.value.data();
                if (doc) {
                  const newMedia: IMedia = {
                    id: doc.id,
                    isOwner: currentUser.uid === doc.author.id,
                    author: doc.author,
                    url: doc.downloadUrl,
                    title: doc.title,
                    owner: doc.owner,
                    createdAt: doc.createdAt,
                    description: doc.description,
                    tags: doc.tags || [],
                  };
                  remoteFiles.push(newMedia);
                }
              }
            });
            setMedia(remoteFiles);
          })
          .catch((err) => {
            useToast({
              type: 'error',
              text2: `this is the error ${err}`,
            });
          });
      });

const getAllMediaNote = ({
  currentMedia,
  setNote,
}: {
  usersIds: string[];
  currentMedia: IMedia['id'];
  setNote: (arg: RemoteNote[]) => void;
}) =>
  firestore()
    .collection('media')
    .doc(currentMedia)
    .collection('notes')
    .onSnapshot((data) => {
      if (!data.empty) {
        const remoteUserNotes = data.docs.map((item) => {
          const doc = item.data();
          return {
            id: item.id,
            data: Object.entries(doc.data).reduce(
              (acc, [, value]) => ({
                ...acc,
                [(value as INote).id]: {
                  ...(value as INote),
                  owner: doc.user,
                },
              }),
              {}
            ),
            user: doc.user,
          };
        });
        setNote(remoteUserNotes);
      }
    });

const getAllMediaSnippet = ({
  currentMedia,
  setSnippet,
}: {
  currentMedia: IMedia['id'];
  usersIds: string[];
  setSnippet: (arg: RemoteSnippet[]) => void;
}) =>
  firestore()
    .collection('media')
    .doc(currentMedia)
    .collection('snippets')
    .onSnapshot((data) => {
      if (!data.empty) {
        const remoteUserSnippets = data.docs.map((item) => {
          const doc = item.data();
          return {
            id: item.id,
            data: Object.entries(doc.data).reduce(
              (acc, [, value]) => ({
                ...acc,
                [(value as ISnippet).id]: {
                  ...(value as ISnippet),
                  owner: doc.user,
                },
              }),
              {}
            ),
            user: doc.user,
          };
        });
        setSnippet(remoteUserSnippets);
      }
    });

const updateNoteReactions = ({
  mediaId,
  note,
  userId,
}: {
  mediaId: string;
  userId: string;
  note: Omit<INote, 'owner'>;
}) => {
  const updateKey = `data.${note.id}`;
  return firestore()
    .collection('media')
    .doc(mediaId)
    .collection('notes')
    .doc(userId)
    .update({
      [updateKey]: note,
    });
};

const updateSnippetReactions = ({
  mediaId,
  snippet,
  userId,
}: {
  mediaId: string;
  userId: string;
  snippet: Omit<ISnippet, 'owner'>;
}) => {
  const updateKey = `data.${snippet.id}`;
  return firestore()
    .collection('media')
    .doc(mediaId)
    .collection('snippets')
    .doc(userId)
    .update({
      [updateKey]: snippet,
    });
};

export const useFirestore = () => {
  const { currentUser } = useAppSelector(getAuth);
  return {
    handleSaveSnippetRemote: handleSaveSnippetRemote(currentUser as IUser),
    saveFileToCollection: saveFileToCollection(currentUser as IUser),
    handleSaveNoteRemote: handleSaveNoteRemote(currentUser as IUser),
    getRemoteAudioFiles: getRemoteAudioFilesByEmail(currentUser as IUser),
    createSnippetRemote: createSnippetRemote(currentUser as IUser),
    createNoteRemote: createNoteRemote(currentUser as IUser),
    getMediaClique: getMediaClique(currentUser as IUser),
    createCliques: createCliques(currentUser as IUser),
    sendInvitationToClique: sendInvitationToClique(currentUser as IUser),
    getAllMediaSnippet,
    getAllMediaNote,
    createNewUser,
    findUser,
    updateNoteReactions,
    updateSnippetReactions,
  };
};

export default useFirestore;
