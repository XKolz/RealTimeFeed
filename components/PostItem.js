import React, { memo, useRef, useState } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { useVisible } from "../hooks/useVisible";
import socket from "../utils/socket";
import useFeedStore from "../store/useFeedStore";
import Animated, { FadeIn } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";

const PostItem = ({ post, isVisible }) => {
  const { updatePostView } = useFeedStore();
  const videoRef = useRef(null);
  const [isReady, setIsReady] = useState(false);

  useVisible({
    isVisible,
    onVisibleLongEnough: () => {
      socket.emit("view_post", post.id);
      updatePostView(post.id);
    },
  });

  return (
    <Animated.View entering={FadeIn.duration(500)} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: `https://i.pravatar.cc/150?u=${post.id}` }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.username}>User {post.id}</Text>
          <Text style={styles.timestamp}>Just now</Text>
        </View>
      </View>

      {/* Content */}
      <Text style={styles.text}>{post.text}</Text>

      {post.image && (
        <Image source={{ uri: post.image }} style={styles.image} />
      )}

      {post.video && (
        <Video
          key={post.id}
          ref={videoRef}
          source={{ uri: post.video }}
          style={styles.video}
          resizeMode="cover"
          isLooping
          shouldPlay={isVisible && isReady}
          useNativeControls={false}
          onReadyForDisplay={() => setIsReady(true)}
          isMuted={false}
        />
      )}

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.iconRow}>
          <Ionicons name="heart-outline" size={20} color="#555" />
          <Ionicons name="chatbubble-outline" size={20} color="#555" />
          <Ionicons name="share-outline" size={20} color="#555" />
        </View>
        <Text style={styles.views}>{post.views} views</Text>
      </View>
    </Animated.View>
  );
};

export default memo(PostItem);

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 12,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },
  timestamp: {
    fontSize: 12,
    color: "#888",
  },
  text: {
    fontSize: 15,
    marginBottom: 8,
    color: "#444",
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 10,
    marginBottom: 8,
  },
  video: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    backgroundColor: "#000",
    marginBottom: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  iconRow: {
    flexDirection: "row",
    gap: 16,
  },
  views: {
    fontSize: 13,
    color: "#666",
  },
});
