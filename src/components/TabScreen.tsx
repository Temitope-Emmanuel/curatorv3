import React, { useMemo, useRef } from "react";
import { FlatList, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, ViewToken } from "react-native";

interface TabScreenProps<K> {
  slideRef: React.RefObject<FlatList<K>>;
  data: K[];
  renderItem: ListRenderItem<K>;
  setCurrentTab?: (label: any) => void;
  setOnScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

export const TabScreen = <K extends { id: string }>({ setCurrentTab, slideRef, renderItem, data, setOnScroll }: TabScreenProps<K>) => {
  const playerScreenContent = useMemo(
    () => data,
    [data]
  );
  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;
  const viewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0] !== null) {
      if (setCurrentTab) {
        setCurrentTab(viewableItems[0].item.type);
      }
    }
  }).current;

  return (
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
      onScroll={setOnScroll}
    />
  )
}

export default TabScreen;