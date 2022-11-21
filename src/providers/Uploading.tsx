import React, { useEffect, useRef, useState } from 'react';
import storage, { FirebaseStorageTypes } from '@react-native-firebase/storage';
import createGenericContext from '../hooks/useGenericContext';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getAuth } from '../store/Auth';
import { completeUploading, startUploading } from '../store/Upload';
import { defaultAudio, IMedia } from '../interfaces/Media';
import UploadModal, { UploadModalRef } from '../components/modal/Upload';
import toast from '../hooks/useToast';
import { useFirestore } from '../utils/firestore';

const [useUploadService, UploadServiceContextProvider] = createGenericContext<{
    uploadProgress: {
        totalBytes: number;
        uploadBytes: number;
    };
    handleFileUpload: () => Promise<void>;
    toggleShowUploadModal: () => void;
    currentUploadingMedia: IMedia;
    handleSetUploadingMedia: (arg: IMedia) => void;
}>();


export const UploadServiceProvider = <P extends object>(Component: React.ComponentType<P>) =>
    function Provider({ ...props }) {
        const dispatch = useAppDispatch();
        const { currentUser } = useAppSelector(getAuth);
        const [uploadProgress, setUploadProgress] = useState({
            totalBytes: 0,
            uploadBytes: 0,
        });
        const uploadModalRef = useRef<UploadModalRef>(null);
        const [currentUploadingMedia, setCurrentUploadingMedia] = useState<IMedia>(defaultAudio);
        const { saveFileToCollection, createSnippetRemote, createNoteRemote, createCliques } =
            useFirestore();

            useEffect(() => {
                uploadModalRef.current?.setUploadMedia(currentUploadingMedia);
            }, [currentUploadingMedia])
        const toggleShowUploadModal = () => {
            uploadModalRef.current?.toggle();
        }

        const handleCompleteUpload = async (ref: FirebaseStorageTypes.Reference) => {
            const downloadUrl = await ref.getDownloadURL();
            saveFileToCollection(downloadUrl, currentUploadingMedia).then(() => {
                createSnippetRemote(currentUploadingMedia);
                createNoteRemote(currentUploadingMedia);
                createCliques(currentUploadingMedia);
                dispatch(completeUploading(currentUploadingMedia));
                setUploadProgress({
                    totalBytes: 0,
                    uploadBytes: 0,
                });
                toast({
                    text2: 'Completed Upload',
                    type: 'success',
                });
                toggleShowUploadModal();
            });
        };

        const handleFileUpload = async () => {
            try {
                dispatch(startUploading(currentUploadingMedia));
                if (currentUploadingMedia) {
                    const ref = storage().ref(`${currentUser?.uid}/${currentUploadingMedia.id}`);
                    const task = ref.putFile(currentUploadingMedia.url);
                    let downloadComplete = false;
                    console.log('this is the task')
                    task.on('state_changed', async (taskSnapshot) => {
                        if (taskSnapshot.state === 'success') {
                            if (!downloadComplete) {
                                downloadComplete = true;
                                handleCompleteUpload(ref);
                            }
                        } else {
                            setUploadProgress({
                                totalBytes: taskSnapshot.totalBytes,
                                uploadBytes: taskSnapshot.bytesTransferred,
                            });
                        }
                    });
                }
            } catch (err) {
                console.log('this is the err', err)
                toast({
                    type: 'error',
                    text2: 'something went wrong',
                });
            }
        };

        return (
            <UploadServiceContextProvider
                value={{
                    handleFileUpload,
                    uploadProgress,
                    toggleShowUploadModal,
                    handleSetUploadingMedia: setCurrentUploadingMedia,
                    currentUploadingMedia,
                }}
            >
                <Component {...(props as P)} />
                <UploadModal
                    ref={uploadModalRef}
                    duration={uploadProgress.totalBytes}
                    progress={uploadProgress.uploadBytes}
                    handleAccept={handleFileUpload}
                />
            </UploadServiceContextProvider>
        );
    }
export type UploadServiceType = ReturnType<typeof useUploadService>;
export default useUploadService;
