import { RedirectionProvider } from "@/context/RedirectionContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import React from "react";
import {
    ActivityIndicator,
    StatusBar,
    Text,
    useColorScheme,
    View,
} from "react-native";

export default function Index() {
    const theme = useColorScheme();
    const [isLoggedIn, setIsLoggedIn] = React.useState<boolean | null>(null);

    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem("accessToken");
      return token !== null;
  };

    React.useEffect(() => {
        const checkStatus = async () => {
            const loggedIn = await checkLoginStatus();
            setIsLoggedIn(loggedIn);
        };

      checkStatus();
  }, []);

    // ✅ Loading screen while checking auth
    if (isLoggedIn === null) {
    return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#017FC6" />
                <Text className="mt-3 text-gray-600 text-sm">
                    Checking session...
                </Text>
                <StatusBar
                    backgroundColor="#fff"
                    barStyle={theme === "dark" ? "light-content" : "dark-content"}
                />
            </View>
        );
    }

    return (
        <RedirectionProvider>
          <StatusBar
              translucent={false}
              backgroundColor={theme === "dark" ? "#000" : "#fff"}
              barStyle={theme === "dark" ? "light-content" : "dark-content"}
          />

          {isLoggedIn ? (
              <Redirect href="/(customer)/(tab)" />
          ) : (
              <Redirect href="/(auth)/welcome" />
          )}
      </RedirectionProvider>
  );
}
