import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IoniconName =
  | "flame-outline"
  | "grid-outline"
  | "people-outline"
  | "pricetag-outline"
  | "videocam-outline"
  | "location-outline";

const features: { key: string; title: string; icon: IoniconName }[] = [
  { key: "1", title: "Trending Posts", icon: "flame-outline" },
  { key: "2", title: "Categories", icon: "grid-outline" },
  { key: "3", title: "Top Creators", icon: "people-outline" },
  { key: "4", title: "Hashtags", icon: "pricetag-outline" },
  { key: "5", title: "Videos", icon: "videocam-outline" },
  { key: "6", title: "Nearby", icon: "location-outline" },
];

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <Text style={styles.heading}>Explore</Text>

        <FlatList
          data={features}
          numColumns={2}
          contentContainerStyle={styles.grid}
          columnWrapperStyle={styles.row}
          keyExtractor={(item) => item.key}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.card}>
              <Ionicons
                name={item.icon}
                size={28}
                color="#444"
                style={styles.icon}
              />
              <Text style={styles.cardText}>{item.title}</Text>
            </TouchableOpacity>
          )}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
  },
  grid: {
    paddingBottom: 20,
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    backgroundColor: "#F5F5F5",
    flex: 1,
    marginHorizontal: 8,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },
  icon: {
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },
});
