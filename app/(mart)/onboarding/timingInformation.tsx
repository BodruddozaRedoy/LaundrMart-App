import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Platform,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TimingInformationScreen() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [hours, setHours] = useState(
    days.map(() => ({
      open: new Date(0, 0, 0, 0, 0), // default 12:00 AM
      close: new Date(0, 0, 0, 0, 0),
      closed: false,
    }))
  );

  const [picker, setPicker] = useState({
    show: false,
    mode: "open" as "open" | "close",
    dayIndex: 0,
  });

  const showTimePicker = (index: number, mode: "open" | "close") => {
    setPicker({ show: true, mode, dayIndex: index });
  };

  const onTimeChange = (event: any, selectedTime?: Date) => {
    if (Platform.OS === "android") {
      setPicker((prev) => ({ ...prev, show: false }));
    }

    if (selectedTime) {
      setHours((prev) =>
        prev.map((day, i) =>
          i === picker.dayIndex ? { ...day, [picker.mode]: selectedTime } : day
        )
      );
    }
  };

  const formatTime = (date: Date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const suffix = hours >= 12 ? "PM" : "AM";
    const hour12 = hours % 12 === 0 ? 12 : hours % 12;
    const minStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${hour12}:${minStr} ${suffix}`;
  };

  const toggleClosed = (index: number, value: boolean) => {
    setHours((prev) =>
      prev.map((day, i) =>
        i === index ? { ...day, closed: value } : day
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

        {/* Step Indicator (Step 4) */}
        <View className="flex-row items-center mb-8">
          <View className="flex-1 h-1 bg-primary rounded-full" />
          <View className="flex-1 h-1 bg-primary rounded-full ml-1" />
          <View className="flex-1 h-1 bg-primary rounded-full ml-1" />
          <View className="flex-1 h-1 bg-primary rounded-full ml-1" />
        </View>

        {/* Section Title */}
        <View className="flex-row items-center mb-4">
          <Ionicons name="time-outline" size={20} color="#111827" />
          <Text className="ml-2 text-md font-bold text-gray-800">
            Operating Hours
          </Text>
        </View>

        {/* Day blocks */}
        {days.map((day, index) => (
          <View
            key={day}
            className="border border-gray-200 rounded-xl p-4 mb-4 bg-gray-50"
          >
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-base font-semibold text-gray-800">
                {day}
              </Text>

              <View className="flex-row items-center">
                <Text className="text-sm text-gray-700 mr-2">Closed</Text>
                <Switch
                  value={hours[index].closed}
                  onValueChange={(val) => toggleClosed(index, val)}
                  trackColor={{ false: "#D1D5DB", true: "#60A5FA" }}
                  thumbColor={hours[index].closed ? "#2563EB" : "#F9FAFB"}
                />
              </View>
            </View>

            {/* Time Inputs */}
            {!hours[index].closed && (
              <View className="flex-row justify-between">
                {/* Open */}
                <TouchableOpacity
                  onPress={() => showTimePicker(index, "open")}
                  className="flex-1 border border-gray-300 rounded-xl py-3 px-3 mr-2 bg-white"
                  activeOpacity={0.8}
                >
                  <Text className="text-xs text-gray-500 mb-1">Open</Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-gray-800">
                      {formatTime(hours[index].open)}
                    </Text>
                    <Ionicons name="time-outline" size={19} color="#017FC6" />
                  </View>
                </TouchableOpacity>

                {/* Close */}
                <TouchableOpacity
                  onPress={() => showTimePicker(index, "close")}
                  className="flex-1 border border-gray-300 rounded-xl py-3 px-3 ml-2 bg-white"
                  activeOpacity={0.8}
                >
                  <Text className="text-xs text-gray-500 mb-1">Close</Text>
                  <View className="flex-row justify-between items-center">
                    <Text className="text-base font-semibold text-gray-800">
                      {formatTime(hours[index].close)}
                    </Text>
                    <Ionicons name="time-outline" size={19} color="#017FC6" />
                  </View>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      {/* Bottom buttons */}
      <View className="flex-row fixed bottom-10 mx-7 items-center">
        <TouchableOpacity
          onPress={onBack}
          className="flex-1 border border-gray-300 bg-white rounded-lg py-3 mr-3"
          activeOpacity={0.8}
        >
          <Text className="text-center text-gray-700 font-semibold">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/")}
          className="flex-1 bg-primary rounded-lg py-3"
          activeOpacity={0.8}
        >
          <Text className="text-center text-white font-semibold">Complete Setup</Text>
        </TouchableOpacity>
      </View>

      {/* DateTime Picker */}
      {picker.show && (
        <DateTimePicker
          value={
            hours[picker.dayIndex][picker.mode] ||
            new Date(0, 0, 0, 0, 0)
          }
          mode="time"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={onTimeChange}
        />
      )}
    </SafeAreaView>
  );
}
