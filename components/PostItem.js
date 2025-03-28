// import React, { useRef } from "react";
// import { View, Text, Image, Dimensions } from "react-native";
// import { Video } from "expo-av";
// import { useVisible } from "../hooks/useVisible";
// import { StyleSheet } from "react-native";
// import socket from "../utils/socket";
// import useFeedStore from "../store/useFeedStore";

// import Animated, { FadeIn } from "react-native-reanimated";

// const { height } = Dimensions.get("window");

// const PostItem = ({ post, isVisible }) => {
//   const { updatePostView } = useFeedStore();
//   const videoRef = useRef(null);

//   useVisible(isVisible, () => {
//     socket.emit("view_post", post.id);
//     updatePostView(post.id);
//   });

//   return (
//     <Animated.View entering={FadeIn.duration(500)} style={{ padding: 10 }}>
//       <Text>{post.text}</Text>
//       {post.image && (
//         <Image source={{ uri: post.image }} style={{ height: 200 }} />
//       )}

//       {post.video && isVisible && (
//         <Video
//           ref={videoRef}
//           source={{ uri: post.video }}
//           style={styles.video}
//           resizeMode="cover"
//           isLooping
//           shouldPlay={isVisible}
//           useNativeControls={false}
//         />
//       )}
//       <Text>Views: {post.views}</Text>
//     </Animated.View>
//   );
// };

// export default PostItem;

// const styles = StyleSheet.create({
//   video: {
//     width: "100%",
//     height: 300,
//     borderRadius: 8,
//   },
// });
import React, { useRef, useState } from "react";
import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import { Video } from "expo-av";
import { useVisible } from "../hooks/useVisible";
import socket from "../utils/socket";
import useFeedStore from "../store/useFeedStore";
import Animated, { FadeIn } from "react-native-reanimated";

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
    <Animated.View entering={FadeIn.duration(500)} style={{ padding: 10 }}>
      <Text>{post.text}</Text>

      {post.image && (
        <Image source={{ uri: post.image }} style={{ height: 200 }} />
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

      <Text>Views: {post.views}</Text>
    </Animated.View>
  );
};

export default PostItem;

const styles = StyleSheet.create({
  video: {
    width: "100%",
    height: 300,
    borderRadius: 8,
    backgroundColor: "black",
  },
});
