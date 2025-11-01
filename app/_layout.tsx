import { Redirect, Slot } from "expo-router";
import '../global.css';

export default function RootLayout() {
  const isAuthenticated = false;
  if (isAuthenticated) {
    return <Slot screenOptions={{ headerShown: false }} />
  } else {
    <Redirect href={"/(auth)/welcome"} />
  }
}
