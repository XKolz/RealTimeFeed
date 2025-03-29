import React from "react";
import { StatusBar } from "react-native";
import Feed from "../../screens/FeedScreen";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
        <StatusBar barStyle="dark-content" />
        <Feed />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

export default App;
