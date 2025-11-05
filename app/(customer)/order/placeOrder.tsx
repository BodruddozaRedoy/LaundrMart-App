import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Platform,
    ScrollView,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function PlaceOrderScreen() {
    const [selectedOption, setSelectedOption] = useState<"now" | "later" | null>("now");
    const [date, setDate] = useState<Date>(new Date());
    const [time, setTime] = useState<Date>(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const onChangeDate = (event: DateTimePickerEvent, selected?: Date) => {
        if (selected) setDate(selected);
        if (Platform.OS === "android") setShowDatePicker(false);
    };

    const onChangeTime = (event: DateTimePickerEvent, selected?: Date) => {
        if (selected) setTime(selected);
        if (Platform.OS === "android") setShowTimePicker(false);
    };

    return (
        <View className="flex-1 bg-white pt-5">
            <StatusBar className="#fff" barStyle={"dark-content"} />

            {/* Scrollable content */}
            <ScrollView
                contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Title */}
                <Text className="text-xl font-bold text-[#1E293B] mb-1">
                    When do you need pickup?
                </Text>
                <Text className="text-[#64748B] mb-6">
                    Schedule your pickup time
                </Text>

                {/* Option: Pickup Now */}
                <TouchableOpacity
                    onPress={() => setSelectedOption("now")}
                    className={`flex-row items-center p-4 rounded-2xl border mb-4 ${selectedOption === "now"
                        ? "border-primary bg-[#EFF6FF]"
                        : "border-[#E2E8F0] bg-white"
                        }`}
                >
                    <View className="w-10 h-10 rounded-xl items-center justify-center mr-4 bg-white border border-[#E2E8F0]">
                        <Ionicons
                            name="time-outline"
                            size={22}
                            color={selectedOption === "now" ? "#2563EB" : "#94A3B8"}
                        />
                    </View>
                    <View>
                        <Text
                            className={`text-base font-semibold ${selectedOption === "now"
                                ? "text-primary"
                                : "text-[#1E293B]"
                                }`}
                        >
                            Pickup Now
                        </Text>
                        <Text className="text-[#64748B] text-sm">
                            Driver arrives within 30 min
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Option: Schedule for Later */}
                <TouchableOpacity
                    onPress={() => setSelectedOption("later")}
                    className={`flex-row items-center p-4 rounded-2xl border ${selectedOption === "later"
                        ? "border-primary bg-[#EFF6FF]"
                        : "border-[#E2E8F0] bg-white"
                        }`}
                >
                    <View className="w-10 h-10 rounded-xl items-center justify-center mr-4 bg-white border border-[#E2E8F0]">
                        <Ionicons
                            name="calendar-outline"
                            size={22}
                            color={selectedOption === "later" ? "#2563EB" : "#94A3B8"}
                        />
                    </View>
                    <View>
                        <Text
                            className={`text-base font-semibold ${selectedOption === "later"
                                ? "text-primary"
                                : "text-[#1E293B]"
                                }`}
                        >
                            Schedule for Later
                        </Text>
                        <Text className="text-[#64748B] text-sm">
                            Choose date and time
                        </Text>
                    </View>
                </TouchableOpacity>

                {/* Show inputs if "later" is selected */}
                {selectedOption === "later" && (
                    <View className="mt-6">
                        {/* Date Picker Field */}
                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            className="flex-row items-center justify-between border border-[#E2E8F0] rounded-xl p-4 mb-4"
                        >
                            <Text className="text-[#475569]">
                                {date.toLocaleDateString()}
                            </Text>
                            <Ionicons name="calendar-outline" size={22} color="#94A3B8" />
                        </TouchableOpacity>

                        {/* Time Picker Field */}
                        <TouchableOpacity
                            onPress={() => setShowTimePicker(true)}
                            className="flex-row items-center justify-between border border-[#E2E8F0] rounded-xl p-4"
                        >
                            <Text className="text-[#475569]">
                                {time.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Text>
                            <Ionicons name="time-outline" size={22} color="#94A3B8" />
                        </TouchableOpacity>
                    </View>
                )}

                {/* Date Picker Modal */}
                {showDatePicker && (
                    <DateTimePicker
                        value={date}
                        mode="date"
                        display={Platform.OS === "ios" ? "inline" : "default"}
                        onChange={onChangeDate}
                        minimumDate={new Date()}
                    />
                )}

                {/* Time Picker Modal */}
                {showTimePicker && (
                    <DateTimePicker
                        value={time}
                        mode="time"
                        is24Hour={false}
                        display={Platform.OS === "ios" ? "spinner" : "clock"}
                        onChange={onChangeTime}
                    />
                )}
            </ScrollView>

            {/* Fixed Continue Button at Bottom */}
            <TouchableOpacity onPress={() => router.push("/order/pickupAddress")} className="absolute bottom-10 left-5 right-5">
                <PrimaryButton text="Continue" />
            </TouchableOpacity>
        </View>
    );
}
