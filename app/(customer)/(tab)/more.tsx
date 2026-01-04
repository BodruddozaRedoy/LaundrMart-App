import { useToast } from "@/components/ui/toast/ToastContext";
import { useUser } from "@/hooks/useUser";
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
    id: number | string;
    icon: ComponentProps<typeof Ionicons>["name"];
    title: string;
    link: Href;
};

/** ---- Main menu items ---- */
const menuItems: MenuItem[] = [
    {
        id: 1,
        icon: "person-outline",
        title: "Personal Info",
        link: "/(customer)/more/profileInfo" as Href,
    },
    {
        id: 2,
        icon: "settings-outline",
        title: "Settings",
        link: "/(customer)/more/settings" as Href,
    },
    {
        id: 3,
        icon: "chatbubble-outline",
        title: "Support Chat",
        link: "/(customer)/more/supportChat" as Href,
    },
    {
        id: 4,
        icon: "help-circle-outline",
        title: "FAQ",
        link: "/(customer)/more/faq" as Href,
    },
    {
        id: 5,
        icon: "help-circle-outline",
        title: "Payment Options",
        link: "/(customer)/more/payment" as Href,
    },
];

/** ---- Legal submenu items ---- */
const legalItems: MenuItem[] = [
    {
        id: "legal-1",
        icon: "document-text-outline",
        title: "Privacy & Policy",
        link: "/(customer)/more/privacyPolicy" as Href,
    },
    {
        id: "legal-2",
        icon: "document-outline",
        title: "Terms & Conditions",
        link: "/(customer)/more/termsConditions" as Href,
    },
    {
        id: "legal-3",
        icon: "shield-checkmark-outline",
        title: "Laundry Protection",
        link: "/(customer)/more/laundryProtection" as Href,
    },
];

const MoreScreen = () => {
    const [showLegal, setShowLegal] = useState(false);
    const { customerProfile, logout } = useUser()
    const { success } = useToast()
    const [showLogoutModal, setShowLogoutModal] = useState(false);



    const handleLogout = async () => {
        try {
            await logout()
            router.replace("/(auth)/welcome")
            success("Log out successfully!")
        } catch (err) {
            console.log(err)
        }
    }



    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} />

            {/* Header */}
            <View className="items-center mt-10 mb-4">
                <View className="w-11/12 bg-white shadow-sm border border-primary rounded-2xl p-4 flex-row items-center">
                    <Image
                        source={{
                            uri: customerProfile?.image !== null ? customerProfile?.image : "https://img.icons8.com/?size=100&id=7819&format=png&color=000000",
                        }}
                        className="w-16 h-16 rounded-full mr-4"
                    />
                    <View className="flex-1">
                        <Text className="text-xl font-bold text-gray-800">
                            {customerProfile?.full_name || "Not set yet"}
                        </Text>
                        <Text className="text-sm text-gray-500">
                            {customerProfile?.email}
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
                        key={item.id}
                        onPress={() => router.push(item.link)}
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

                {/* Log Out at bottom */}
                <TouchableOpacity
                    onPress={() => setShowLogoutModal(true)}
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
                onPress={() => router.push("/more/inviteFriends" as Href)}
                className="bg-[#EAF6FF] p-4 rounded-xl mx-4 my-4 flex-row items-center justify-center"
            >
                <Ionicons name="gift-outline" size={20} color="#007AFF" />
                <Text className="ml-2 text-primary font-medium">
                    Share LaundrMart: Give $20, Get $20
                </Text>
            </TouchableOpacity>

            {/* Logout Confirmation Modal */}
            {showLogoutModal && (
                <View className="absolute inset-0 bg-black/40 justify-center items-center">
                    <View className="w-4/5 bg-white rounded-2xl p-5">
                        <Text className="text-lg font-semibold text-gray-800 text-center mb-2">
                            Log out
                        </Text>

                        <Text className="text-sm text-gray-600 text-center mb-6">
                            Are you sure you want to log out?
                        </Text>

                        <View className="flex-row justify-between">
                            {/* Cancel */}
                            <TouchableOpacity
                                onPress={() => setShowLogoutModal(false)}
                                className="flex-1 py-3 mr-2 rounded-xl border border-gray-200"
                            >
                                <Text className="text-center text-gray-700 font-medium">
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            {/* Confirm */}
                            <TouchableOpacity
                                onPress={async () => {
                                    setShowLogoutModal(false);
                                    await handleLogout();
                                }}
                                className="flex-1 py-3 ml-2 rounded-xl bg-red-500"
                            >
                                <Text className="text-center text-white font-medium">
                                    Log Out
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            )}

        </SafeAreaView>
    );
};

export default MoreScreen;
