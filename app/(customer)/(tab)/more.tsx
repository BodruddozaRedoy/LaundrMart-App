import { Ionicons } from "@expo/vector-icons";
import { Href, router } from "expo-router";
import React, { ComponentProps, useState } from "react";
import {
    Image,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type MenuItem = {
    id: number;
    icon: ComponentProps<typeof Ionicons>["name"];
    title: string;
    link: Href;
};

const MoreScreen = () => {
    const [showLegal, setShowLegal] = useState(false);

    // Main menu items (excluding legal + logout)
    const menuItems: MenuItem[] = [
        {
            id: 1,
            icon: "person-outline",
            title: "Personal Info",
            link: "/(customer)/more/profileInfo",
        },
        {
            id: 2,
            icon: "settings-outline",
            title: "Settings",
            link: "/(customer)/more/settings",
        },
        {
            id: 3,
            icon: "chatbubble-outline",
            title: "Support Chat",
            link: "/(customer)/more/supportChat",
        },
        {
            id: 7,
            icon: "help-circle-outline",
            title: "FAQ",
            link: "/(customer)/more/faq",
        },
    ];

    // Legal submenu items
    const legalItems = [
        {
            id: "legal-1",
            icon: "document-text-outline",
            title: "Privacy & Policy",
            link: "/(customer)/more/privacyPolicy",
        },
        {
            id: "legal-2",
            icon: "document-outline",
            title: "Terms & Conditions",
            link: "/(customer)/more/termsConditions",
        },
        {
            id: "legal-3",
            icon: "shield-checkmark-outline",
            title: "Laundry Protection",
            link: "/(customer)/more/laundryProtection",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} />

            {/* Header Section */}
            <View className="items-center mt-10 mb-4">
                <View className="w-11/12 bg-white shadow-sm border border-primary rounded-2xl p-4 flex-row items-center">
                    <Image
                        source={{
                            uri: "https://t4.ftcdn.net/jpg/00/91/13/83/360_F_91138343_2rGUY65Ew7OAkYZ12sltkN0e1ngO9Vx2.jpg",
                        }}
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
            <ScrollView
                className="flex-1 w-11/12 mx-auto"
                showsVerticalScrollIndicator={false}
            >
                {/* Main items */}
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
                        <Ionicons
                            name="chevron-forward-outline"
                            size={18}
                            color="#999"
                        />
                    </TouchableOpacity>
                ))}

                {/* Legal Accordion */}
                <TouchableOpacity
                    onPress={() => setShowLegal(!showLegal)}
                    className="flex-row items-center justify-between py-4 border-b border-gray-100"
                >
                    <View className="flex-row items-center">
                        <Ionicons name="library-outline" size={22} color="#444" />
                        <Text className="ml-3 text-base text-gray-800">Legal</Text>
                    </View>
                    <Ionicons
                        name={showLegal ? "chevron-up-outline" : "chevron-down-outline"}
                        size={18}
                        color="#999"
                    />
                </TouchableOpacity>

                {/* Nested Legal Items */}
                {showLegal &&
                    legalItems.map((sub) => (
                        <TouchableOpacity
                            key={sub.id}
                            onPress={() => router.push(sub.link)}
                            className="flex-row items-center justify-between py-3"
                        >
                            <View className="flex-row items-center">
                                <Ionicons name={sub.icon} size={20} color="#666" />
                                <Text className="ml-3 text-sm text-gray-700">{sub.title}</Text>
                            </View>
                            <Ionicons
                                name="chevron-forward-outline"
                                size={16}
                                color="#aaa"
                            />
                        </TouchableOpacity>
                    ))}

                {/* Log Out at very bottom */}
                <TouchableOpacity
                    onPress={() => router.push("/(auth)/welcome")}
                    className="flex-row items-center justify-between py-4 border-b border-gray-100 mt-2"
                >
                    <View className="flex-row items-center">
                        <Ionicons name="log-out-outline" size={22} color="#444" />
                        <Text className="ml-3 text-base text-gray-800">Log Out</Text>
                    </View>
                    <Ionicons
                        name="chevron-forward-outline"
                        size={18}
                        color="#999"
                    />
                </TouchableOpacity>
            </ScrollView>

            {/* Referral Section */}
            <TouchableOpacity
                onPress={() => router.push("/more/inviteFriends")}
                className="bg-[#EAF6FF] p-4 rounded-xl mx-4 my-4 flex-row items-center justify-center"
            >
                <Ionicons name="gift-outline" size={20} color="#007AFF" />
                <Text className="ml-2 text-primary font-medium">
                    Share LaundrMart: Give $20, Get $20
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default MoreScreen;
