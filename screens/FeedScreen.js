import React, { useEffect, useRef, useCallback } from "react";
import { FlatList, Text } from "react-native";
import axios from "axios";
import PostItem from "../components/PostItem";
import useFeedStore from "../store/useFeedStore";

const videoList = [
  "https://www.w3schools.com/html/movie.mp4",
  "https://www.w3schools.com/html/mov_bbb.mp4",
];

const renderPostItem =
  (viewableItemsRef) =>
  ({ item }) => {
    const isItemVisible = !!viewableItemsRef.current?.find(
      (i) => i?.item?.id === item.id
    );
    return <PostItem post={item} isVisible={isItemVisible} />;
  };

const FeedScreen = () => {
  const { posts, setPosts } = useFeedStore();
  const page = useRef(1);
  const viewableItems = useRef([]);

  const fetchData = async (append = false) => {
    try {
      const res = await axios.get(
        `https://dummyjson.com/posts?limit=5&skip=${(page.current - 1) * 5}`
      );

      let videoIndex = 0;
      const formatted = res.data.posts.map((p, i) => {
        const isVideo = i % 2 !== 0;
        const video = isVideo
          ? videoList[videoIndex++ % videoList.length]
          : null;

        return {
          id: p.id,
          text: p.body,
          image: !isVideo ? `https://picsum.photos/seed/${p.id}/400/300` : null,
          video,
          views: 0,
        };
      });

      setPosts((prev) => (append ? [...prev, ...formatted] : formatted));
    } catch (err) {
      console.error("Failed to fetch posts:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleLoadMore = () => {
    page.current += 1;
    fetchData(true);
  };

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
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.5}
      showsVerticalScrollIndicator={false}
      decelerationRate="normal" // smoother, natural scroll
      bounces={true}
    />
  );
};

export default FeedScreen;
