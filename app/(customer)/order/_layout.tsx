import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Stack, useRouter, useSegments } from "expo-router";
import React from "react";

export default function OrderLayout() {
    const router = useRouter();
    const segments = useSegments(); // e.g. ["order", "bookNow"]

    // Map last segment to readable title
    const titleMap: Record<string, string> = {
        pickupTime: "Pickup Time",
        pickupAddress: "Pickup Address",
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
                    <HeaderBackButton onPress={() => router.back()} />
                ),
            }}
        >
        </Stack>
    );
}
