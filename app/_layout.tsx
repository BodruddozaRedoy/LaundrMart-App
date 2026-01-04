import { ToastProvider } from "@/components/ui/toast/ToastContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { KeyboardProvider } from "react-native-keyboard-controller";

import { StripeProvider } from "@stripe/stripe-react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import "../global.css";

const client = new QueryClient()

export default function RootLayout() {
  const STRIPE_PUBLISHABLE_KEY = "pk_test_51QcTCKEtwoKGirqkDlycfQSrr8pgvGWXhdc1rULxIwVH5Y1TYiTaySIoK1ZWTIVt7bNqvvUf4JWVyknB1Ow6BgKb00hTjnei32"
  return (
    <SafeAreaProvider>
      <KeyboardProvider>
        <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
          <ToastProvider>
            <QueryClientProvider client={client}>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Stack screenOptions={{ headerShown: false, animation: "fade" }}>
                  <Stack.Screen name="index" />
                  <Stack.Screen name="(auth)" />
                  <Stack.Screen name="(customer)" />
                  <Stack.Screen name="(mart)" />
                </Stack>
              </GestureHandlerRootView>
            </QueryClientProvider>
          </ToastProvider>
        </StripeProvider>
      </KeyboardProvider>
    </SafeAreaProvider>
  );
}
