import React, { useMemo, useRef } from "react";
import { FlatList, ListRenderItem, useWindowDimensions, View, ViewToken } from "react-native";
import { PlayerScreenType, PlayerTab } from "../screens/PlayerScreen";

export const TabScreen: React.FC<{
    slideRef: React.RefObject<FlatList<PlayerTab>>;
    renderItem: ListRenderItem<PlayerTab>;
    setCurrentTab: (label: PlayerScreenType) => void;
  }> = ({ setCurrentTab, slideRef, renderItem }) => {
    const { width } = useWindowDimensions();
    const playerScreenContent: PlayerTab[] = useMemo(
        () => [
          { type: 'Snippet', id: '2' },
          { type: 'Note', id: '1' },
        ],
        []
      );
      const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0] !== null) {
      setCurrentTab(viewableItems[0].item.type);
    }
  }).current;
  
    return(
        <FlatList
            showsHorizontalScrollIndicator={false}
            data={playerScreenContent}
            renderItem={renderItem}
              horizontal
              pagingEnabled
              bounces={false}
              keyExtractor={item => `${item.id}`}
              scrollEventThrottle={30}
              viewabilityConfig={viewConfig}
              onViewableItemsChanged={viewableItemsChanged}
              ref={slideRef}
        />
    )
  }  

  export default TabScreen;