import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MoreScreen = () => {
    const menuItems = [
        { id: 1, icon: "person-outline", title: "Personal Info", link: "/more/profileInfo" },
        { id: 2, icon: "settings-outline", title: "Settings", link: "/more/settings" },
        { id: 3, icon: "chatbubble-outline", title: "Support chat", link: "/more/supportChat" },
        { id: 4, icon: "information-circle-outline", title: "Privacy & Policy", link: "/more/privacyPolicy" },
        { id: 5, icon: "information-circle-outline", title: "Terms & Conditions", link: "/more/termsConditions" },
        { id: 6, icon: "information-circle-outline", title: "Laundry Protection", link: "/more/laundryProtection" },
        { id: 7, icon: "help-circle-outline", title: "FAQ", link: "/more/faq" },
        { id: 8, icon: "log-out-outline", title: "Log Out", link: "/welcome" },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} />
            {/* Header Section */}
            <View className="items-center mt-10 mb-4">
                <View className="w-11/12 bg-white shadow-sm border border-primary rounded-2xl p-4 flex-row items-center">
                    <Image
                        source={{ uri: "https://t4.ftcdn.net/jpg/00/91/13/83/360_F_91138343_2rGUY65Ew7OAkYZ12sltkN0e1ngO9Vx2.jpg" }}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-800">
                            Bodruddoza Redoy
                        </Text>
                        <Text className="text-sm text-gray-500">
                            bodruddozaredoy@gmail.com
                        </Text>
                    </View>
                </View>
            </View>

            {/* Menu Section */}
            <ScrollView className="flex-1 w-11/12 mx-auto">
                {menuItems.map((item) => (
                    <TouchableOpacity
                        onPress={() => router.push(item.link)}
                        key={item.id}
                        className="flex-row items-center justify-between py-4 border-b border-gray-100"
                    >
                        <View className="flex-row items-center">
                            <Ionicons name={item.icon} size={22} color="#444" />
                            <Text className="ml-3 text-base text-gray-800">{item.title}</Text>
                        </View>
                        <Ionicons name="chevron-forward-outline" size={18} color="#999" />
                    </TouchableOpacity>
                ))}
            </ScrollView>

            {/* Referral Section */}
            <TouchableOpacity onPress={() => router.push("/more/inviteFriends")} className="bg-[#EAF6FF] p-4 rounded-xl mx-4 my-4 flex-row items-center justify-center">
                <Ionicons name="gift-outline" size={20} color="#007AFF" />
                <Text className="ml-2 text-primary font-medium">
                    Share LaundrMart: Give $20, Get $20
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default MoreScreen;
