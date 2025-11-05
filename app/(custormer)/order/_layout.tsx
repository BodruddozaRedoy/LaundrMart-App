import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter, useSegments } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

export default function OrderLayout() {
    const router = useRouter();
    const segments = useSegments(); // e.g. ["order", "bookNow"]

    // Map last segment to readable title
    const titleMap: Record<string, string> = {
        placeOrder: "Place Order",
        pickupAddress: "Pickup Now",
        addNewAddress: "Add Location",
        chooseLaundryMart: "Choose Laundry Mart",
        laundryDetails: "Laundry Details",
        bookNow: "Book Now",
        reviewOrder: "Review Order",
        orderConfirm: "Order Confirmed",
        notifications: "Notification",
    };

    const currentSegment = segments[segments.length - 1];
    const dynamicTitle = titleMap[currentSegment] || "Order";

    // ❌ Hide header only for the main /order route
    const hideHeader =
        currentSegment === "orderConfirm"

    return (
        <Stack
            screenOptions={{
                headerShown: !hideHeader, // 👈 hides header at /order root
                headerTitle: dynamicTitle,
                headerTitleAlign: "center",
                headerShadowVisible: false,
                headerStyle: { backgroundColor: "#fff" },
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
        >
            {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
            {/* <Stack.Screen name="placeOrder" /> */}
            {/* <Stack.Screen name="pickupAddress" /> */}
            {/* <Stack.Screen name="addNewAddress" /> */}
            {/* <Stack.Screen name="chooseLaundryMart" /> */}
            {/* <Stack.Screen name="laundryDetails" /> */}
            {/* <Stack.Screen name="bookNow" /> */}
            {/* <Stack.Screen name="reviewOrder" /> */}
            {/* <Stack.Screen name="orderConfirm" /> */}
            {/* <Stack.Screen name="notifications" /> */}
        </Stack>
    );
}
