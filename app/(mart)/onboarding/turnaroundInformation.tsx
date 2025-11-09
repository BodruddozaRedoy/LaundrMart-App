import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TurnaroundInformationScreen() {
    const [minOrderWeight, setMinOrderWeight] = useState("");
    const [dailyCapacity, setDailyCapacity] = useState("");

    // Weekdays array
    const days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];

    // Each day has min & max hour
    const [hours, setHours] = useState(
        days.map(() => ({ min: 0, max: 0 }))
    );

    // Update hour function
    const updateHour = (index: number, type: "min" | "max", delta: number) => {
        setHours((prev) =>
            prev.map((day, i) =>
                i === index
                    ? {
                        ...day,
                        [type]:
                            (day[type] + delta + 24) % 24, // wrap around 0–23
                    }
                    : day
            )
        );
    };

    const onBack = () => router.back();

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView
                className="px-5 pt-6"
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <Text className="text-2xl font-bold text-gray-900 mb-6">
                    Setup Your LaundryMart
                </Text>

                {/* Step Indicator (Step 3 of 3) */}
                <View className="flex-row items-center mb-8">
                    <View className="flex-1 h-1 bg-primary rounded-full" />
                    <View className="flex-1 h-1 bg-primary rounded-full ml-1" />
                    <View className="flex-1 h-1 bg-primary rounded-full ml-1" />
                    <View className="flex-1 h-1 bg-gray-200 rounded-full ml-1" />
                </View>

                {/* Operational Info Section */}
                <View className="flex-row items-center mb-4">
                    <Ionicons name="settings-outline" size={20} color="#111827" />
                    <Text className="ml-2 text-md font-bold text-gray-800">
                        Operational Information
                    </Text>
                </View>

                {/* Minimum Order Weight */}
                <Text className="text-sm text-gray-600 mb-1">
                    Minimum Order Weight (lbs, optional)
                </Text>
                <TextInput
                    value={minOrderWeight}
                    onChangeText={setMinOrderWeight}
                    placeholder="e.g., 15"
                    keyboardType="decimal-pad"
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-900"
                    placeholderTextColor="#A1A1AA"
                />

                {/* Daily Capacity Limit */}
                <Text className="text-sm text-gray-600 mb-1">
                    Daily Capacity Limit (lbs, optional)
                </Text>
                <TextInput
                    value={dailyCapacity}
                    onChangeText={setDailyCapacity}
                    placeholder="e.g., 200"
                    keyboardType="decimal-pad"
                    className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-gray-900"
                    placeholderTextColor="#A1A1AA"
                />
                <Text className="text-xs text-gray-400 mb-6">For load balancing</Text>

                {/* Turnaround Options */}
                <View className="flex-row items-center mb-4">
                    <Ionicons name="time-outline" size={20} color="#111827" />
                    <Text className="ml-2 text-md font-bold text-gray-800">
                        Turnaround Options <Text className="text-red-500">*</Text>
                    </Text>
                </View>

                {/* Weekly Hour Selectors */}
                {days.map((day, index) => (
                    <View key={day} className="mb-4 border border-gray-300 rounded-xl py-3 px-3">
                        <Text className="text-md font-semibold text-gray-800 mb-2">
                            {day}
                        </Text>

                        <View className="flex-row items-center justify-between">
                            {/* Minimum Hour */}
                            <View className="flex-1   mr-2">
                                <Text className="text-sm text-gray-500 font-semibold mb-1">Minimum Hour</Text>
                                <View className="flex-row justify-between items-center border border-gray-300 rounded-xl py-1 px-4">
                                    <Text className="text-lg font-semibold text-gray-800">
                                        {hours[index].min.toString().padStart(2, "0")} Hour
                                    </Text>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => updateHour(index, "min", 1)}
                                            className="items-center mb-1"
                                        >
                                            <Ionicons
                                                name="chevron-up-outline"
                                                size={17}
                                                color="#9ca3af"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => updateHour(index, "min", -1)}
                                            className="items-center"
                                        >
                                            <Ionicons
                                                name="chevron-down-outline"
                                                size={17}
                                                color="#017FC6"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View className="w-4 mt-5 h-0.5 rounded-lg bg-black" />
                            {/* Maximum Hour */}
                            <View className="flex-1 ml-2">
                                <Text className="text-sm text-gray-500 font-semibold mb-1">Maximum Hour</Text>
                                <View className="flex-row justify-between items-center border border-gray-300 rounded-xl py-1 px-4">
                                    <Text className="text-lg font-semibold text-gray-800">
                                        {hours[index].max.toString().padStart(2, "0")} Hour
                                    </Text>
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => updateHour(index, "max", 1)}
                                            className="items-center mb-1"
                                        >
                                            <Ionicons
                                                name="chevron-up-outline"
                                                size={17}
                                                color="#9ca3af"
                                            />
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => updateHour(index, "max", -1)}
                                            className="items-center"
                                        >
                                            <Ionicons
                                                name="chevron-down-outline"
                                                size={17}
                                                color="#017FC6"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                ))}
            </ScrollView>

            {/* Fixed bottom buttons */}
            <View className="flex-row fixed bottom-10 mx-7 items-center">
                <TouchableOpacity
                    onPress={onBack}
                    className="flex-1 border border-gray-300 bg-white rounded-lg py-3 mr-3"
                    activeOpacity={0.8}
                >
                    <Text className="text-center text-gray-700  font-semibold">Back</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => router.push("/(mart)/onboarding/timingInformation")}
                    className="flex-1 bg-primary rounded-lg py-3"
                    activeOpacity={0.8}
                >
                    <Text className="text-center text-white font-semibold">Continue</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}
