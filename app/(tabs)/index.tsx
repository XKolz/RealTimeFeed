import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Feed from "../../screens/FeedScreen";

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" />
      <Feed />
    </SafeAreaView>
  );
};

export default App;
