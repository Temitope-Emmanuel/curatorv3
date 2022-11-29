import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { BG_TERTIARY, TEXT_PRIMARY } from '../constants/colors';
import { FONT_TEXT_BODY_3 } from '../constants/fonts';
import { IMedia } from '../interfaces/Media';
import IconButton from './IconButton';
import ProgressBarDef from './ProgressBarDef';

const AudioDisplay: React.FC<{
  audio: IMedia;
  showProgressBar?: boolean;
  onPress: () => void;
  showDetails?: boolean;
  showActions?: boolean;
  onPressMoreIcon?: () => void;
  showExtraDetails?: boolean;
  handleDownload?: () => void;
  displayImage: string;
}> = ({
  showDetails,
  showActions,
  showExtraDetails,
  showProgressBar,
  onPress,
  onPressMoreIcon,
  audio,
  handleDownload,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  displayImage,
}) => {
  const { duration, position } = audio;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.frow}>
        <View style={styles.detailContainer}>
          <Text style={styles.detailHeader}>{audio.author}</Text>
          <Text style={styles.detailDescription}>{`${formatDistanceToNow(
            new Date(audio.createdAt)
          )} ago`}</Text>
        </View>
        {onPressMoreIcon && <IconButton onPress={onPressMoreIcon} name="more" size={30} />}
      </View>
      <View style={styles.mv10}>
        {showDetails && (
          <Text numberOfLines={1} style={styles.infoHeader}>
            {audio.title.split(".mp3")[0]}
          </Text>
        )}
        {showExtraDetails && <Text numberOfLines={5} style={styles.infoDescription}>{audio.description}</Text>}
      </View>
      {showProgressBar && duration && position ? (
        <ProgressBarDef
          style={{ marginBottom: 10 }}
          addRadius
          duration={duration}
          progress={position}
        />
      ) : undefined}
      {showActions && (
        <View style={[styles.playActionContainer]}>
          {audio.formattedDuration && (
            <View style={styles.playAction}>
              <Text style={styles.playActionText}>{audio.formattedDuration}</Text>
            </View>
          )}
          {/* <IconButton
						name='library-add'
						size={20}
					/> */}
          {!audio.availableLocal && audio.availableRemote && (
            <IconButton name="download" size={20} onPress={handleDownload} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingVertical: 15,
    paddingHorizontal: 14,
    backgroundColor: BG_TERTIARY,
    marginBottom: 15,
  },
  frow: {
    flexDirection: 'row',
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 5,
  },
  detailContainer: {
    marginRight: 'auto',
    marginLeft: 10,
  },
  detailHeader: {
    color: TEXT_PRIMARY,
    fontSize: FONT_TEXT_BODY_3,
  },
  detailDescription: {
    color: TEXT_PRIMARY,
    fontWeight: '300',
  },
  mv10: {
    marginVertical: 10,
  },
  infoHeader: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  infoDescription: {
    color: TEXT_PRIMARY,
    fontSize: FONT_TEXT_BODY_3,
  },
  playActionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playAction: {
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderRadius: 3,
    alignItems: 'center',
    borderColor: TEXT_PRIMARY,
    paddingHorizontal: 5,
    flexDirection: 'row',
    marginRight: 25,
    height: 30,
  },
  playActionText: {
    marginLeft: 8,
    fontSize: FONT_TEXT_BODY_3,
    color: TEXT_PRIMARY,
  },
});

export default AudioDisplay;
