import { RedirectionProvider } from "@/context/RedirectionContext";
import AsyncStorage from "@react-native-async-storage/async-storage"; // To check if the user is logged in
import { Redirect } from "expo-router";
import React from "react";
import { StatusBar, useColorScheme } from "react-native";

export default function Index() {
    const theme = useColorScheme();

    const checkLoginStatus = async () => {
        // Check if access token is stored (this assumes you're saving the token in AsyncStorage)
        const token = await AsyncStorage.getItem('accessToken');
        return token !== null;
    };

    const [isLoggedIn, setIsLoggedIn] = React.useState(false);

    React.useEffect(() => {
        const checkStatus = async () => {
            const loggedIn = await checkLoginStatus();
            setIsLoggedIn(loggedIn);
        };

        checkStatus();
    }, []);

    return (
        <>
            <RedirectionProvider>
                {/* Status bar ALWAYS renders */}
                <StatusBar
                    translucent={false}
                    backgroundColor={theme === "dark" ? "#000" : "#fff"}
                    barStyle={theme === "dark" ? "light-content" : "dark-content"}
                />

                {/* Redirect based on login status */}
                {!isLoggedIn ? (
                    <Redirect href="/(auth)/welcome" /> // Redirect to welcome if not logged in
                ) : (
                    <Redirect href="/(customer)/(tab)" /> // Redirect to customer tab if logged in
                )}
            </RedirectionProvider>
        </>
    );
}
