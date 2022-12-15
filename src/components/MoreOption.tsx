import { View } from 'react-native';
import { BG_SECONDARY, DROPDOWN_TEXT_2 } from '../constants/colors';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { addData, getData, getShowReaction, showEmoji, toggleShowMore } from '../store/App';
import IconButton from './IconButton';

export const MoreOption: React.FC<{
    handleDelete: () => void;
}> = ({handleDelete}) => {
    const dispatch = useAppDispatch();
    const activeData = useAppSelector(getData);
    const shouldShowEmoji = useAppSelector(getShowReaction);
    const handleToggleShowMore = () => {
        dispatch(toggleShowMore({ show: undefined }))
        dispatch(addData({ id: '', type: '',isOwner: false }))
    }
    const toggleShowEmoji = () => {
        dispatch(showEmoji(!shouldShowEmoji))
    }
    return (
        <View style={{
            backgroundColor: BG_SECONDARY,
            borderRadius: 30,
            flexDirection: 'row',
            width: activeData.isOwner ? '60%' : '50%',
            justifyContent: 'space-around',
            height: '100%'
        }}>
            <IconButton name='close' iconColor={DROPDOWN_TEXT_2} size={30} onPress={handleToggleShowMore} />
            {/* <IconButton name='edit' iconColor={DROPDOWN_TEXT_2} size={30} /> */}
            <IconButton name='alternate-email' iconColor={DROPDOWN_TEXT_2} size={30} />
            <IconButton name='add-reaction' onPress={toggleShowEmoji} iconColor={DROPDOWN_TEXT_2} size={30} />
            {
              activeData.isOwner &&  
            <IconButton name='delete' onPress={handleDelete} iconColor={DROPDOWN_TEXT_2} size={30} />
            }
        </View>
    )
}

export default MoreOption;