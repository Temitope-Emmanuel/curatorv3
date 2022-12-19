import { StyleSheet, View } from 'react-native';
import { BG_SECONDARY, DROPDOWN_TEXT_2 } from '../constants/colors';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { getData, getShowReaction, addData, showEmoji } from '../store/Temp';
import IconButton from './IconButton';

export const MoreOption: React.FC<{
  handleDelete: () => void;
  toggleShowMention: () => void;
}> = ({ handleDelete, toggleShowMention }) => {
  const dispatch = useAppDispatch();
  const activeData = useAppSelector(getData);
  const shouldShowEmoji = useAppSelector(getShowReaction);
  const handleToggleShowMore = () => {
    dispatch(addData({ id: '', type: '', isOwner: false }));
  };
  const toggleShowEmoji = () => {
    dispatch(showEmoji(!shouldShowEmoji));
  };
  return (
    <View
      style={[styles.moreOptionContainer, {
        width: activeData.isOwner ? '70%' : '60%',
      }]}
    >
      <IconButton
        name="close"
        iconColor={DROPDOWN_TEXT_2}
        size={30}
        onPress={handleToggleShowMore}
      />
      {/* <IconButton name='edit' iconColor={DROPDOWN_TEXT_2} size={30} /> */}
      <IconButton name="alternate-email" onPress={toggleShowMention} iconColor={DROPDOWN_TEXT_2} size={30} />
      <IconButton
        name="add-reaction"
        onPress={toggleShowEmoji}
        iconColor={DROPDOWN_TEXT_2}
        size={30}
      />
      {activeData.isOwner && (
        <IconButton name="delete" onPress={handleDelete} iconColor={DROPDOWN_TEXT_2} size={30} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  moreOptionContainer: {
    backgroundColor: BG_SECONDARY,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '100%',
    marginLeft: 'auto'
  }
})

export default MoreOption;
