import { Stack } from "expo-router";

export default function MartLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tab)" />
      <Stack.Screen name="notification/index" />
    </Stack>
  );
}
