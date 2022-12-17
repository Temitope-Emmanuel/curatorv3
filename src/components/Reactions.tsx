import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { IReaction, ReactionType } from '../interfaces/reaction';
import IconButton from './IconButton';

interface ReactionProps {
  reactions: IReaction;
  currentUser: string;
  reset: () => void;
  style?: StyleProp<ViewStyle>;
  handleReaction: (reaction: ReactionType) => void;
}

const Reactions: React.FC<ReactionProps> = ({
  reactions,
  style,
  handleReaction,
  currentUser,
  reset,
}) => (
  <View style={[{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }, style]}>
    {Object.entries(reactions).map(([reaction, item]) => (
      <IconButton
        key={reaction}
        size={25}
        style={{
          opacity: item.includes(currentUser) ? 1 : 0.5,
          transform: [{ scale: item.includes(currentUser) ? 1.3 : 1 }],
        }}
        onPress={() => {
          handleReaction(reaction as ReactionType);
          reset();
        }}
        width={20}
        name={reaction as ReactionType}
      />
    ))}
  </View>
);

export default Reactions;
