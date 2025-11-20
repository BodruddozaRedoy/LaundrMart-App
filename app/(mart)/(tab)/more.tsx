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
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 📌 Tablet detection
const { width } = Dimensions.get("window");
const isMd = width >= 768;
const isLg = width >= 1024;

// 📌 Icon scaling
const iconSize = isLg ? 40 : isMd ? 30 : 22;

type MenuItem = {
    id: number;
    icon: ComponentProps<typeof Ionicons>["name"];
    title: string;
    link: Href;
};

const MoreScreen = () => {
    const [showLegal, setShowLegal] = useState(false);

    const menuItems: MenuItem[] = [
        { id: 1, icon: "person-outline", title: "Laundry Info", link: "/(mart)/more/laundryInfo" },
        { id: 2, icon: "settings-outline", title: "Settings", link: "/(mart)/more/settings" },
        { id: 6, icon: "help-circle-outline", title: "Support Chat", link: "/(mart)/more/supportChat" },
        { id: 7, icon: "help-circle-outline", title: "FAQ", link: "/(mart)/more/faq" },
    ];

    const legalItems: MenuItem[] = [
        { id: 3, icon: "document-text-outline", title: "Privacy & Policy", link: "/(mart)/more/privacyPolicy" },
        { id: 4, icon: "document-outline", title: "Terms & Conditions", link: "/(mart)/more/termsConditions" },
        { id: 5, icon: "shield-checkmark-outline", title: "Laundry Protection", link: "/(mart)/more/laundryProtection" },
    ];

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} />

            {/* Header */}
            <View className="items-center mt-10 md:mt-16 lg:mt-20 mb-4">
                <View
                    className="
                        w-11/12 bg-white shadow-sm border border-primary rounded-2xl p-4 
                        md:p-6 lg:p-8 md:rounded-3xl lg:rounded-[32px] 
                        flex-row items-center
                    "
                >
                    <Image
                        source={{
                            uri: "https://t4.ftcdn.net/jpg/00/91/13/83/360_F_91138343_2rGUY65Ew7OAkYZ12sltkN0e1ngO9Vx2.jpg",
                        }}
                        style={{
                            width: isLg ? 90 : isMd ? 70 : 64,
                            height: isLg ? 90 : isMd ? 70 : 64,
                        }}
                        className="rounded-full mr-4"
                    />
                    <View className="flex-1">
                        <Text className="text-xl md:text-3xl lg:text-4xl font-bold text-gray-800">
                            Mart User
                        </Text>
                        <Text className="text-sm md:text-xl lg:text-2xl text-gray-500">
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
                        className="flex-row items-center justify-between py-4 md:py-6 lg:py-8 border-b border-gray-100"
                    >
                        <View className="flex-row items-center">
                            <Ionicons name={item.icon} size={iconSize} color="#444" />
                            <Text className="ml-3 text-base md:text-2xl lg:text-3xl text-gray-800">
                                {item.title}
                            </Text>
                        </View>

                        <Ionicons
                            name="chevron-forward-outline"
                            size={isLg ? 34 : isMd ? 26 : 18}
                            color="#999"
                        />
                    </TouchableOpacity>
                ))}

                {/* Legal Accordion */}
                <TouchableOpacity
                    onPress={() => setShowLegal(!showLegal)}
                    className="flex-row items-center justify-between py-4 md:py-6 lg:py-8 border-b border-gray-100"
                >
                    <View className="flex-row items-center">
                        <Ionicons name="library-outline" size={iconSize} color="#444" />
                        <Text className="ml-3 text-base md:text-2xl lg:text-3xl text-gray-800">
                            Legal
                        </Text>
                    </View>

                    <Ionicons
                        name={showLegal ? "chevron-up-outline" : "chevron-down-outline"}
                        size={isLg ? 34 : isMd ? 26 : 18}
                        color="#999"
                    />
                </TouchableOpacity>

                {/* Nested Legal Items */}
                {showLegal &&
                    legalItems.map((sub) => (
                        <TouchableOpacity
                            key={sub.id}
                            onPress={() => router.push(sub.link)}
                            className="flex-row items-center justify-between py-3 md:py-5 lg:py-6"
                        >
                            <View className="flex-row items-center">
                                <Ionicons
                                    name={sub.icon}
                                    size={isLg ? 34 : isMd ? 26 : 20}
                                    color="#666"
                                />
                                <Text className="ml-3 text-sm md:text-xl lg:text-2xl text-gray-700">
                                    {sub.title}
                                </Text>
                            </View>
                            <Ionicons
                                name="chevron-forward-outline"
                                size={isLg ? 30 : isMd ? 22 : 16}
                                color="#aaa"
                            />
                        </TouchableOpacity>
                    ))}

                {/* Log Out */}
                <TouchableOpacity
                    onPress={() => router.push("/(auth)/welcome")}
                    className="flex-row items-center justify-between py-4 md:py-6 lg:py-8 border-b border-gray-100 mt-2"
                >
                    <View className="flex-row items-center">
                        <Ionicons name="log-out-outline" size={iconSize} color="#444" />
                        <Text className="ml-3 text-base md:text-2xl lg:text-3xl text-gray-800">
                            Log Out
                        </Text>
                    </View>
                    <Ionicons
                        name="chevron-forward-outline"
                        size={isLg ? 34 : isMd ? 26 : 18}
                        color="#999"
                    />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

export default MoreScreen;
