import React, { memo, useMemo } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { TEXT_PRIMARY } from '../constants/colors';
import { BaseDatum } from '../interfaces/datum';
import { INote } from '../interfaces/note';
import { ReactionType } from '../interfaces/reaction';
import { utilStyles } from '../utils/styles';
import * as Animatable from 'react-native-animatable';
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
  id,
  handlePress,
  handleDelete,
  time,
  isAuthor,
  currentUser,
  status
}) => {
  const mappedReaction = useMemo(
    () =>
      Object.entries(reactions).reduce(
        (acc, [userId, reaction]) => {
          acc[reaction] = acc[reaction].concat(userId);
          return acc;
        },
        {
          'add-reaction': [],
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
      style={[styles.container, { flexDirection: isAuthor ? 'row' : 'row-reverse' }]}
      onPress={() => handlePress({ time })}
      onLongPress={isAuthor ? () => handleDelete(id) : undefined}
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
          {/* <Reactions
            currentUser={currentUser}
            style={utilStyles.mrAuto}
            handleReaction={handleReaction({ noteId: id, userId: owner.id })}
            reactions={mappedReaction}
          /> */}
          <Animatable.View animation={status ? 'rubberBand': ''} duration={1000} style={{marginLeft: 'auto'}} iterationCount={5}>
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
