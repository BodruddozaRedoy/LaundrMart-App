import { Redirect } from "expo-router";
import { StatusBar, useColorScheme } from "react-native";

const role: "customer" | "mart" | null = "mart";

export default function Index() {
    const theme = useColorScheme();

    return (
        <>
            {/* Status bar ALWAYS renders */}
            <StatusBar
                translucent={false}
                backgroundColor={theme === "dark" ? "#000" : "#fff"}
                barStyle={theme === "dark" ? "light-content" : "dark-content"}
            />

            {/* Redirect logic */}
            {!role ? (
                <Redirect href="/(auth)/welcome" />
            ) : role === "mart" ? (
                <Redirect href="/(mart)/(tab)" />
            ) : (
                <Redirect href="/(customer)/(tab)" />
            )}
        </>
    );
}
