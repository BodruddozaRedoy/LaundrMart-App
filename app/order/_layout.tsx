import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, useSegments } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function OrderLayout() {
    const router = useRouter();
    const segments = useSegments(); // gives ["order", "add-location"], etc.

    // Derive a human-readable title
    const titleMap: Record<string, string> = {
        "placeOrder": "Place Order",
        "pickupAddress": "Pickup Now",
        "addNewAddress": "Add Location",
        "chooseLaundryMart": "Choose Laundry Mart",
        "chooseLaundryMart": "Choose Laundry Mart",
    };

    const currentSegment = segments[segments.length - 1];
    const dynamicTitle = titleMap[currentSegment] || "Order";

    return (
        <Stack
            screenOptions={{
                headerTitle: dynamicTitle,
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
