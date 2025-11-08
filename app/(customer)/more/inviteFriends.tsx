import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const InviteFriendsScreen = () => {
    const referralLink = "www.laundrmart.com/?ref=8AFXKk";

    const copyToClipboard = () => {
        console.log("Copied to clipboard:", referralLink);
        // Optionally: await Clipboard.setStringAsync(referralLink);
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center mb-4 mt-2 ml-5">
                <HeaderBackButton onPress={() => router.push("/(customer)/(tab)/more")} />
                <Text className="flex-1 ml-32 text-lg font-semibold text-gray-800">
                    Invite Friends
                </Text>
            </View>
            <ScrollView className="px-5 mt-5">
                {/* Title */}
                <Text className="text-base text-gray-800 font-medium mb-2">
                    Invite your friends to LaundrMart App
                </Text>

                {/* Image */}
                <Image
                    source={{
                        uri: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=60",
                    }}
                    className="w-full h-40 rounded-xl mb-5"
                />

                {/* Share Section */}
                <Text className="text-base font-semibold text-gray-800 mb-1">
                    Share your link
                </Text>
                <Text className="text-sm text-gray-500 mb-4">
                    Use your referral link below to give your friends $20 in free
                    LaundrMart credit just for signing up.
                </Text>

                {/* Blue Info Card */}
                <View className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                    <Text className="text-blue-600 font-bold text-md">
                        You’ll get $20 in credit
                    </Text>
                    <Text className="text-gray-600 text-xs mt-1">
                        for each friend you refer when they complete their first order!
                    </Text>
                </View>

                {/* Referral Link */}
                <View className="flex-row items-center border border-gray-200 rounded-lg px-3 py-2 mb-4">
                    <TextInput
                        value={referralLink}
                        editable={false}
                        className="flex-1 text-gray-700 text-sm"
                    />
                    <TouchableOpacity
                        onPress={copyToClipboard}
                        className="w-10 h-10 bg-[#007AFF] rounded-full items-center justify-center ml-2"
                    >
                        <Ionicons name="copy-outline" size={20} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Share Button */}
                <TouchableOpacity className="border border-gray-300 rounded-xl py-3 flex-row justify-center items-center mb-6">
                    <Ionicons name="share-social-outline" size={18} color="#444" />
                    <Text className="ml-2 text-gray-700 font-medium">Share Link</Text>
                </TouchableOpacity>

                {/* Email Invite Section */}
                <Text className="text-sm text-gray-700 mb-2">
                    Invite friends via email
                </Text>

                <TextInput
                    placeholder="Email Addresses"
                    className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700 mb-4"
                />

                <TouchableOpacity className="bg-[#EAF6FF] rounded-xl py-3 flex-row justify-center items-center mb-8">
                    <Ionicons name="send-outline" size={18} color="#007AFF" />
                    <Text className="ml-2 text-[#007AFF] font-medium">Send Invites</Text>
                </TouchableOpacity>

                {/* Steps Section */}
                <View className="space-y-8 mb-10">
                    {/* Step 1 */}
                    <View className="flex-row items-start">
                        <View className="items-center mr-3">
                            <View className="w-9 h-9 rounded-full bg-[#EAF6FF] items-center justify-center">
                                <Ionicons name="mail-outline" size={18} color="#007AFF" />
                            </View>
                            <View className="w-px h-16 bg-[#EAF6FF]" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-semibold text-gray-800">
                                1. You invite friends.
                            </Text>
                            <Text className="text-sm text-gray-500 mt-1">
                                Send your link to friends to give them $20 in free LaundrMart
                                credit just for signing up!
                            </Text>
                        </View>
                    </View>

                    {/* Step 2 */}
                    <View className="flex-row items-start">
                        <View className="items-center mr-3">
                            <View className="w-9 h-9 rounded-full bg-[#EAF6FF] items-center justify-center">
                                <Ionicons name="gift-outline" size={18} color="#007AFF" />
                            </View>
                            <View className="w-px h-16 bg-[#EAF6FF]" />
                        </View>
                        <View className="flex-1">
                            <Text className="font-semibold text-gray-800">
                                2. They try LaundrMart.
                            </Text>
                            <Text className="text-sm text-gray-500 mt-1">
                                Each of your friends enjoys $20 off their first order and can
                                thank you for choosing dry cleaning and laundry off their
                                to-do list.
                            </Text>
                        </View>
                    </View>

                    {/* Step 3 */}
                    <View className="flex-row items-start">
                        <View className="items-center mr-3">
                            <View className="w-9 h-9 rounded-full bg-[#EAF6FF] items-center justify-center">
                                <Ionicons name="cash-outline" size={18} color="#007AFF" />
                            </View>
                        </View>
                        <View className="flex-1">
                            <Text className="font-semibold text-gray-800">
                                3. You enjoy free credit!
                            </Text>
                            <Text className="text-sm text-gray-500 mt-1">
                                You get $20 in LaundrMart credit for each friend you refer when
                                they complete their first order!
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default InviteFriendsScreen;
