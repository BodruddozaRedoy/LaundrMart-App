import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Switch, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingsScreen = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* Header */}
      <View className="flex-row items-center mb-5 mt-2">
        <HeaderBackButton onPress={() => router.push("/(customer)/(tab)/more")} />
        <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
          Settings
        </Text>
      </View>

      {/* Change Password */}
      <TouchableOpacity className="py-3 flex-row items-center justify-between border-b border-gray-100">
        <Text className="text-gray-800 text-base font-bold">Change Password</Text>
        <Ionicons name="chevron-forward-outline" size={18} color="#888" />
      </TouchableOpacity>

      {/* Preferences */}
      <TouchableOpacity className="py-3 flex-row items-center justify-between border-b border-gray-100">
        <Text className="text-gray-800 text-base font-bold">Preferences</Text>
        <Ionicons name="chevron-forward-outline" size={18} color="#888" />
      </TouchableOpacity>

      {/* Notification Settings */}
      <View className="py-3 border-b border-gray-100">
        <Text className="text-gray-800 text-base mb-2 font-bold">Notification Settings</Text>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">General Notification</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? "#007AFF" : "#f4f3f4"}
            trackColor={{ false: "#d1d5db", true: "#a5d8ff" }}
          />
        </View>
      </View>

      {/* Delete Account */}
      <View className="mt-8 flex-row justify-between items-center">
        <View>
            <Text className="text-gray-800 text-base mb-2 font-bold">Delete Account</Text>
        <Text className="text-gray-500 text-sm mb-3">
          Delete your account permanently?
        </Text>
        </View>
        <TouchableOpacity className="border border-red-500 rounded-lg px-5 py-2 w-24">
          <Text className="text-red-500 text-center font-medium">Delete</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SettingsScreen;
