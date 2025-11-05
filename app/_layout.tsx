import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import "../global.css";

export default function RootLayout() {
    // 🔹 Temporary toggle for design mode
    const role = "mart"; // change to "mart" to preview mart screens

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
          <Stack screenOptions={{ headerShown: false }}>
              {role === "mart" ? (
                  <Stack.Screen name="(mart)" />
              ) : (
                  <Stack.Screen name="(customer)" />
              )}
          </Stack>
      </GestureHandlerRootView>
  );
}
