import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PricingInfoScreen() {
    const [pricePerPound, setPricePerPound] = useState("");
    const [serviceFee, setServiceFee] = useState("");

    const onBack = () => router.back();
    const onContinue = () => {
        // TODO: persist to state/store
        router.push("/(mart)/onboarding/basicInfo"); // change to your next step
    };

    return (
        <SafeAreaView className="flex-1 bg-white relative">
            <ScrollView className="px-5 pt-6">
                {/* Title */}
                <Text className="text-2xl font-bold text-gray-900 mb-6">
                    Setup Your LaundryMart
                </Text>

                {/* Step indicator (Step 2 of 3) */}
                <View className="flex-row items-center mb-8">
                    <View className="flex-1 h-1 bg-primary rounded-full" />
                    <View className="flex-1 h-1 bg-primary rounded-full ml-1" />
                    <View className="flex-1 h-1 bg-gray-200 rounded-full ml-1" />
                    <View className="flex-1 h-1 bg-gray-200 rounded-full ml-1" />
                </View>

                {/* Heading w/ icon */}
                <View className="flex-row items-center mb-4">
                    <Ionicons name="cash-outline" size={20} color="#111827" />
                    <Text className="ml-2 text-md font-bold text-gray-800">
                        Pricing Information
                    </Text>
                </View>

                {/* Price per Pound */}
                <Text className="text-sm text-gray-600 mb-1">
                    Price per Pound <Text className="text-red-500">*</Text>
                </Text>
                <TextInput
                    value={pricePerPound}
                    onChangeText={setPricePerPound}
                    placeholder="e.g., $15"
                    keyboardType="decimal-pad"
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-900"
                    placeholderTextColor="#A1A1AA"
                />

                {/* Service Fee (optional) */}
                <Text className="text-sm text-gray-600 mb-1">Service Fee (optional)</Text>
                <TextInput
                    value={serviceFee}
                    onChangeText={setServiceFee}
                    placeholder="e.g., $15"
                    keyboardType="decimal-pad"
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-8 text-gray-900"
                    placeholderTextColor="#A1A1AA"
                />


            </ScrollView>
            {/* Bottom actions */}
            <View className="flex-row fixed bottom-10 mx-7 items-center">
                <TouchableOpacity
                    onPress={onBack}
                    className="flex-1 border border-gray-300 rounded-lg py-3 mr-3"
                    activeOpacity={0.8}
                >
                    <Text className="text-center text-gray-700 font-semibold">Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/(mart)/onboarding/turnaroundInformation")}
                    className="flex-1 bg-primary rounded-lg py-3"
                    activeOpacity={0.8}
                >
                    <Text className="text-center text-white font-semibold">Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
