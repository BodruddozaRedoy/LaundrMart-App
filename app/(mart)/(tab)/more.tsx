import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import type { ComponentProps } from "react";
import React, { useState } from "react";
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

    const menuItems: MenuItem[] = [
        {
            id: 1,
            icon: "person-outline",
            title: "Laundry Info",
            link: "/(mart)/more/laundryInfo",
        },
        {
            id: 2,
            icon: "settings-outline",
            title: "Settings",
            link: "/(mart)/more/settings",
        },
        {
            id: 6,
            icon: "help-circle-outline",
            title: "FAQ",
            link: "/(mart)/more/faq",
        },
    ];

    const legalItems: MenuItem[] = [
        {
            id: 3,
            icon: "document-text-outline",
            title: "Privacy & Policy",
            link: "/(mart)/more/privacyPolicy",
        },
        {
            id: 4,
            icon: "document-outline",
            title: "Terms & Conditions",
            link: "/(mart)/more/termsConditions",
        },
        {
            id: 5,
            icon: "shield-checkmark-outline",
            title: "Laundry Protection",
            link: "/(mart)/more/laundryProtection",
        },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} />

            {/* Header */}
            <View className="items-center mt-10 mb-4">
                <View className="w-11/12 bg-white shadow-sm border border-primary rounded-2xl p-4 flex-row items-center">
                    <Image
                        source={{
                            uri: "https://t4.ftcdn.net/jpg/00/91/13/83/360_F_91138343_2rGUY65Ew7OAkYZ12sltkN0e1ngO9Vx2.jpg",
                        }}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-800">Mart User</Text>
                        <Text className="text-sm text-gray-500">
                            bodruddozaredoy@gmail.com
                        </Text>
                    </View>
                </View>
            </View>

            {/* Menu */}
            <ScrollView
                className="flex-1 w-11/12 mx-auto"
                showsVerticalScrollIndicator={false}
            >
                {/* Main menu items */}
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
        </SafeAreaView>
    );
};

export default MoreScreen;
