import React, { useRef, useCallback } from "react";
import { FlatList } from "react-native";
import PostItem from "../components/PostItem";
import useFeed from "../hooks/useFeed";

const renderPostItem =
  (viewableItemsRef) =>
  ({ item }) => {
    const isItemVisible = !!viewableItemsRef.current?.find(
      (i) => i?.item?.id === item.id
    );
    return <PostItem post={item} isVisible={isItemVisible} />;
  };

const FeedScreen = () => {
  const viewableItems = useRef([]);
  const { posts, loadMore } = useFeed();

  const onViewableItemsChanged = useCallback(
    ({ viewableItems: visibleItems }) => {
      viewableItems.current = visibleItems.filter(
        (i) => i?.item?.id !== undefined
      );
    },
    []
  );

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPostItem(viewableItems)}
      onViewableItemsChanged={onViewableItemsChanged}
      viewabilityConfig={{ itemVisiblePercentThreshold: 80 }}
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      decelerationRate="normal" // smoother, natural scroll
      bounces={true}
    />
  );
};

export default FeedScreen;
