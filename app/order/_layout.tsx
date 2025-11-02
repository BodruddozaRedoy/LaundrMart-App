import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function OrderLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitle: "Place order",
        headerTitleAlign: "center",
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: "#fff",
        },
        headerTitleStyle: {
          fontSize: 18,
          fontWeight: "600",
          color: "#1E293B",
        },
        headerLeft: () => (
          <TouchableOpacity
            onPress={() => router.back()}
            style={{ paddingHorizontal: 15 }}
          >
            <Ionicons name="arrow-back-outline" size={22} color="#1E293B" />
          </TouchableOpacity>
        ),
      }}
    />
  );
}
