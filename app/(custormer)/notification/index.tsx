import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const notifications = [
    {
        id: "1",
        message:
            "Your laundry has been delivered. Thank you for using LaundrMart!",
        time: "2 min ago",
    },
    {
        id: "2",
        message: "A driver is picking up your order for delivery.",
        time: "2 min ago",
    },
    {
        id: "3",
        message: "AJ LaundryMart has finished your laundry.",
        time: "2 min ago",
    },
    {
        id: "4",
        message: "Your laundry has been received by AJ LaundryMart.",
        time: "2 min ago",
    },
    {
        id: "5",
        message: "A driver is on the way to pick up your laundry.",
        time: "2 min ago",
    },
    {
        id: "6",
        message:
            "AJ LaundryMart accepted your order. Pickup is scheduled for 10th October 10AM.",
        time: "2 min ago",
    },
    {
        id: "7",
        message: "Your order has been submitted to AJ LaundryMart for review.",
        time: "2 min ago",
    },
];

export default function NotificationScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 bg-white">
                {/* ✅ Header */}
                <View className="flex-row items-center justify-between px-5 pt-5 pb-3 border-b border-[#E2E8F0]">
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back-outline" size={22} color="#1E293B" />
                    </TouchableOpacity>
                    <Text className="text-lg font-semibold text-[#1E293B]">
                        Notifications
                    </Text>
                    <View className="w-5" /> {/* spacer for symmetry */}
                </View>

                {/* ✅ Notifications List */}
                <ScrollView
                    className="px-5 pt-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 40, paddingTop: 10 }}
                >
                    {notifications.map((item) => (
                        <View key={item.id} className="flex-row items-start mb-5">
                            {/* Notification Icon */}
                            <View className="w-8 h-8 bg-[#EFF6FF] rounded-full items-center justify-center mt-0.5 mr-3">
                                <Ionicons
                                    name="notifications-outline"
                                    size={18}
                                    color="#2563EB"
                                />
                            </View>

                            {/* Message + Time */}
                            <View className="flex-1">
                                <Text className="text-[#1E293B] text-md leading-5">
                                    {item.message}
                                </Text>
                                <Text className="text-xs text-[#94A3B8] mt-1">{item.time}</Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </SafeAreaView>
    );
}
