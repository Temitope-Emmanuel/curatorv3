import React, { memo, useCallback, useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BG_SECONDARY, TEXT_PRIMARY, TEXT_SECONDARY } from '../constants/colors';
import { BaseDatum } from '../interfaces/datum';
import { ReactionType } from '../interfaces/reaction';
import { ISnippet } from '../interfaces/snippet';
import { utilStyles } from '../utils/styles';
import IconButton from './IconButton';
import ProgressBar from './ProgressBarDef';
import Reactions from './Reactions';

interface SnippetProps extends ISnippet, BaseDatum {
  active: boolean;
  duration?: number;
  disabled: boolean;
  progress?: number;
  togglePause?: () => void;
  handlePlaySnippet: (arg: ISnippet) => void;
}

const Snippet: React.FC<SnippetProps> = ({
  id,
  isAuthor,
  description,
  reactions,
  formatTime,
  owner,
  time,
  handleReactions: handleAddReaction,
  handlePlaySnippet,
  disabled,
  active,
  duration = 100,
  progress = 100,
  handleDelete,
  currentUser,
}) => {
  const mappedReaction = useMemo(
    () =>
      Object.entries(reactions).reduce(
        (acc, [userId, reaction]) => {
          acc[reaction] = [...acc[reaction], userId];
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
  const handleReaction = useCallback(
    ({ snippetId, userId }: { snippetId: string; userId: string }) =>
      (reaction: ReactionType) => {
        handleAddReaction({ id: snippetId, reaction, userId });
      },
    [handleAddReaction]
  );

  return (
    <TouchableOpacity
      onLongPress={isAuthor ? () => handleDelete(id) : undefined}
      style={[styles.container, { flexDirection: isAuthor ? 'row' : 'row-reverse' }]}
    >
      {owner.photoURL && (
        <Image
          style={[utilStyles.img, isAuthor ? utilStyles.mr13 : utilStyles.ml13]}
          source={{ uri: owner.photoURL }}
        />
      )}
      <View
        style={{
          flex: 1,
        }}
      >
        <View
          style={[
            styles.detailContainer,
            {
              borderTopLeftRadius: isAuthor ? 0 : undefined,
              flexDirection: isAuthor ? 'row' : 'row-reverse',
              borderTopRightRadius: !isAuthor ? 0 : undefined,
            },
          ]}
        >
          <View style={{ width: '80%' }}>
            <ProgressBar addRadius {...{ progress, duration }} />
            {/* <ProgressBar isAuthor={isAuthor} /> */}
            <Text style={{ color: TEXT_PRIMARY, fontWeight: '300' }}>{description}</Text>
          </View>
          <IconButton
            style={styles.playIcon}
            name={active ? 'pause' : 'play'}
            disabled={disabled && !active}
            onPress={() =>
              handlePlaySnippet({
                description,
                formatTime,
                id,
                owner,
                reactions,
                time,
              })
            }
            size={20}
            width={30}
          />
        </View>
        <Reactions
          style={utilStyles.mrAuto}
          handleReaction={handleReaction({ snippetId: id, userId: owner.id })}
          reactions={mappedReaction}
          currentUser={currentUser}
        />
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailContainer: {
    flexDirection: 'row',
    borderStyle: 'solid',
    borderWidth: 0.75,
    borderRadius: 15,
    borderColor: TEXT_SECONDARY,
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  playIcon: {
    marginLeft: 'auto',
    borderRadius: 15,
    backgroundColor: BG_SECONDARY,
  },
});

export default memo(Snippet);
