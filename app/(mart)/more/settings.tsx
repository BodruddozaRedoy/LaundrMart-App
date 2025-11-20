import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Switch,
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
const iconSize = isLg ? 36 : isMd ? 28 : 18;

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white px-5 md:px-10 lg:px-16">
      {/* Header */}
      <View className="flex-row items-center mb-5 mt-2 md:mb-10 lg:mb-12">
        <HeaderBackButton onPress={() => router.push("/(mart)/(tab)/more")} />

        <Text className="flex-1 text-center text-lg md:text-3xl lg:text-4xl font-semibold text-gray-800">
          Settings
        </Text>
      </View>

      {/* Change Password */}
      <TouchableOpacity className="py-3 md:py-5 lg:py-6 flex-row items-center justify-between border-b border-gray-100">
        <Text className="text-gray-800 text-base md:text-2xl lg:text-3xl font-bold">
          Change Password
        </Text>
        <Ionicons name="chevron-forward-outline" size={iconSize} color="#888" />
      </TouchableOpacity>

      {/* Preferences */}
      <TouchableOpacity className="py-3 md:py-5 lg:py-6 flex-row items-center justify-between border-b border-gray-100">
        <Text className="text-gray-800 text-base md:text-2xl lg:text-3xl font-bold">
          Preferences
        </Text>
        <Ionicons name="chevron-forward-outline" size={iconSize} color="#888" />
      </TouchableOpacity>

      {/* Notification Settings */}
      <View className="py-3 md:py-5 lg:py-6 border-b border-gray-100">
        <Text className="text-gray-800 text-base md:text-2xl lg:text-3xl mb-2 font-bold">
          Notification Settings
        </Text>

        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600 text-sm md:text-xl lg:text-2xl">
            General Notification
          </Text>

          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? "#007AFF" : "#f4f3f4"}
            trackColor={{ false: "#d1d5db", true: "#a5d8ff" }}
            style={{
              transform: [
                { scale: isLg ? 1.4 : isMd ? 1.2 : 1 },
              ],
            }}
          />
        </View>
      </View>

      {/* Delete Account */}
      <View className="mt-8 md:mt-12 lg:mt-16 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-800 text-base md:text-2xl lg:text-3xl mb-2 font-bold">
            Delete Account
          </Text>
          <Text className="text-gray-500 text-sm md:text-xl lg:text-2xl mb-3">
            Delete your account permanently?
          </Text>
        </View>

        <TouchableOpacity
          className="
            border border-red-500 rounded-lg px-5 py-2 
            md:px-8 md:py-3 lg:px-10 lg:py-4 w-24 md:w-36 lg:w-44
          "
        >
          <Text className="text-red-500 text-center font-medium text-sm md:text-xl lg:text-2xl">
            Delete
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
