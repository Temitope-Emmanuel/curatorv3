import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TEXT_PRIMARY } from '../constants/colors';
import { BaseDatum } from '../interfaces/datum';
import { INote } from '../interfaces/note';
import { ReactionType } from '../interfaces/reaction';
import { utilStyles } from '../utils/styles';
import * as Animatable from 'react-native-animatable';

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
  isActive,
  isTheActive
}) => {
  const mappedReaction = useMemo(
    () =>
      Object.entries(reactions).reduce(
        (acc, [userId, reaction]) => {
          acc[reaction] = acc[reaction].concat(userId);
          return acc;
        },
        {
          'star': [],
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

    const showActive = useMemo(() => isActive && !isTheActive, [isActive, isTheActive])

  return (
    <TouchableOpacity
      style={[styles.container, { flexDirection: isAuthor ? 'row' : 'row-reverse', opacity: !showActive ? 1 : .3 }]}
      onPress={() => handlePress({ time })}
      onLongPress={toggleShowMore}
      // onLongPress={isAuthor ? () => handleDelete(id) : undefined}
    >
      {owner.photoURL && owner.id !== currentUser && (
        <Image
          source={{ uri: owner.photoURL }}
          style={[utilStyles.img, isAuthor ? utilStyles.mr13 : utilStyles.ml13]}
        />
      )}
      <View style={styles.reactionContainer}>
        <View
          style={{
            marginBottom: 5,
          }}
        >
          {description.length ? (
            <Text style={styles.notesDescription}>{description}</Text>
          ) : undefined}
        </View>
        <View style={{flexDirection: 'row'}}>
          <Animatable.View animation={status ? 'rubberBand': ''} duration={1200} style={utilStyles.timestamp} iterationCount={10}>
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
    marginBottom: 10,
    flex: 1,
  },
  notesDescription: {
    color: TEXT_PRIMARY,
    fontSize: 14,
  },
});

export default memo(Notes);
