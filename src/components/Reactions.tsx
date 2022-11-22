import React from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { TEXT_PRIMARY } from '../constants/colors';
import { IReaction, ReactionType } from '../interfaces/reaction';
import IconButton from './IconButton';

interface ReactionProps {
  reactions: IReaction;
  currentUser: string;
  style?: StyleProp<ViewStyle>;
  handleReaction: (reaction: ReactionType) => void;
}

const Reactions: React.FC<ReactionProps> = ({ reactions, style, handleReaction, currentUser }) => (
  <View style={[{ flexDirection: 'row' }, style]}>
    {Object.entries(reactions).map(([reaction, item]) => (
      <View key={reaction} style={[styles.reactionContainer]}>
        <IconButton
          style={{
            marginRight: 5,
            opacity: item.includes(currentUser) ? 1 : 0.5,
            transform: [{ scale: item.includes(currentUser) ? 1.3 : 1 }],
          }}
          onPress={() => handleReaction(reaction as ReactionType)}
          name={reaction as ReactionType}
          size={20}
        />
        {/* {item.length ? <Text style={styles.reactionAmt}>{item.length}</Text> : undefined} */}
      </View>
    ))}
  </View>
);

const styles = StyleSheet.create({
  reactionContainer: { flexDirection: 'row', position: 'relative' },
  reactionAmt: { color: TEXT_PRIMARY, fontSize: 10, position: 'absolute', bottom: -7, right: 1 },
});

export default Reactions;
