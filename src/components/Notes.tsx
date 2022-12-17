import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import Animated, { SlideInLeft, SlideOutRight } from 'react-native-reanimated';
import { TEXT_PRIMARY } from '../constants/colors';
import { BaseDatum } from '../interfaces/datum';
import { INote } from '../interfaces/note';
import { ReactionType } from '../interfaces/reaction';
import { utilStyles } from '../utils/styles';
import Reactions from './Reactions';

interface NoteProps extends INote, BaseDatum {
  handlePress: (arg: { time: number }) => void;
}

const Notes: React.FC<NoteProps> = ({
  owner,
  reactions,
  timestamp,
  handleReactions: handleAddReaction,
  description,
  handlePress,
  time,
  isAuthor,
  currentUser,
  status,
  toggleShowMore,
  id,
  isActive,
  isTheActive,
  shouldShowEmoji,
  reset,
}) => {
  const showActive = useMemo(() => isActive && !isTheActive, [isActive, isTheActive]);
  const mappedReaction = useMemo(
    () =>
      Object.entries(reactions).reduce(
        (acc, [userId, reaction]) => {
          acc[reaction] = acc[reaction].concat(userId);
          return acc;
        },
        {
          star: [],
          'local-fire-department': [],
          favorite: [],
          recommend: [],
        } as {
          [key in ReactionType]: string[];
        }
      ),
    [reactions]
  );

  const handleReaction =
    ({ noteId, userId }: { noteId: string; userId: string }) =>
    (reaction: ReactionType) => {
      handleAddReaction({ id: noteId, userId, reaction });
    };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        { flexDirection: isAuthor ? 'row' : 'row-reverse', opacity: !showActive ? 1 : 0.3 },
      ]}
      onPress={() => handlePress({ time })}
      onLongPress={toggleShowMore}
    >
      {owner.photoURL && owner.id !== currentUser && (
        <Image
          source={{ uri: owner.photoURL }}
          style={[utilStyles.img, isAuthor ? utilStyles.mr13 : utilStyles.ml13]}
        />
      )}
      <View style={styles.reactionContainer}>
        {isTheActive && shouldShowEmoji ? (
          <Animated.View
            style={{ width: '80%' }}
            key="1"
            entering={SlideInLeft.duration(400)}
            exiting={SlideOutRight.duration(400)}
          >
            <Reactions
              style={utilStyles.mrAuto}
              handleReaction={handleReaction({ noteId: id, userId: owner.id })}
              reactions={mappedReaction}
              {...{ currentUser, reset }}
            />
          </Animated.View>
        ) : (
          <Animated.View
            key="2"
            entering={SlideInLeft.duration(400)}
            exiting={SlideOutRight.duration(400)}
          >
            <Text style={styles.notesDescription}>{description}</Text>
          </Animated.View>
        )}
        <View style={{ flexDirection: 'row' }}>
          <Animatable.View
            animation={status ? 'rubberBand' : ''}
            duration={1200}
            style={utilStyles.timestamp}
            iterationCount={10}
          >
            <Text style={utilStyles.timestamp}>{timestamp}</Text>
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    marginVertical: 2,
    justifyContent: 'flex-start',
  },
  reactionContainer: {
    marginBottom: 15,
    flex: 1,
  },
  notesDescription: {
    color: TEXT_PRIMARY,
    fontSize: 14,
  },
});

export default memo(Notes);
