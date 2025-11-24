import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PrinterManageScreen() {
  return (
    <SafeAreaView className="flex-1 bg-background dark:bg-backgroundDark px-6 pt-10">
      <Text className="text-2xl text-center border-b border-gray-200 pb-5 font-bold text-text dark:text-textDark mb-6">
        Printer Management
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* ---------------- WIFI PRINTER SECTION ---------------- */}
        <View className="mb-6">
          <Text className="text-subtitle font-semibold text-text dark:text-textDark mb-3">
            Add Printer (Wi-Fi)
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow">
            <View className="flex-row items-center">
              <Ionicons name="wifi-outline" size={22} color="#4B5563" />
              <Text className="ml-3 text-body font-medium text-text dark:text-textDark">
                Search Wi-Fi Printers
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        </View>

        {/* ---------------- MANUAL IP SECTION ---------------- */}
        <View className="mb-6">
          <Text className="text-subtitle font-semibold text-text dark:text-textDark mb-3">
            Add Printer (Manual IP)
          </Text>

          <View className="bg-white p-4 rounded-2xl shadow">
            <Text className="text-small text-secondary dark:text-secondaryDark mb-2">
              Enter Printer IP Address
            </Text>

            <TextInput
              placeholder="e.g. 192.168.0.50"
              placeholderTextColor="#9CA3AF"
              className="bg-white/10 dark:bg-black/10 px-4 py-3 rounded-xl text-text dark:text-textDark"
            />

            <TouchableOpacity onPress={() => router.push("/(mart)/more/PrinterTestScreen")} className="bg-primary px-4 py-3 rounded-xl mt-3 items-center">
              <Text className="text-white font-semibold">Add Printer</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ---------------- WIRED / USB SECTION ---------------- */}
        <View className="mb-6">
          <Text className="text-subtitle font-semibold text-text dark:text-textDark mb-3">
            Add Printer (Wired / USB-C)
          </Text>

          <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 rounded-2xl shadow">
            <View className="flex-row items-center">
              <MaterialIcons name="usb" size={22} color="#4B5563" />
              <Text className="ml-3 text-body font-medium text-text dark:text-textDark">
                Detect Wired Printers
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
          </TouchableOpacity>

          <Text className="text-caption text-secondary dark:text-secondaryDark mt-2">
            * iPad USB-C models support certain Epson wired printers.
          </Text>
        </View>

        {/* ---------------- CONNECTED PRINTERS ---------------- */}
        <View className="mb-12">
          <Text className="text-subtitle font-semibold text-text dark:text-textDark mb-3">
            Connected Printers
          </Text>

          {/* Sample printer card */}
          <View className="bg-white p-4 rounded-2xl shadow mb-4">
            <View className="flex-row justify-between mb-2">
              <Text className="text-body font-bold text-text dark:text-textDark">
                Epson TM-m30II
              </Text>

              <View className="px-3 py-1 bg-green-500/20 rounded-full">
                <Text className="text-small text-green-600">Online</Text>
              </View>
            </View>

            <Text className="text-small text-secondary dark:text-secondaryDark">
              IP: 192.168.0.52
            </Text>

            <View className="flex-row justify-between mt-4">
              <TouchableOpacity className="px-4 py-2 rounded-xl bg-primary">
                <Text className="text-white font-semibold text-small">Set Default</Text>
              </TouchableOpacity>

              <TouchableOpacity className="px-4 py-2 rounded-xl bg-red-500/20">
                <Text className="text-red-600 font-semibold text-small">Remove</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Offline Card */}
          <View className="bg-white p-4 rounded-2xl shadow mb-20">
            <View className="flex-row justify-between mb-2">
              <Text className="text-body font-bold text-text dark:text-textDark">
                Epson TM-m30II (Kitchen)
              </Text>

              <View className="px-3 py-1 bg-red-500/20 rounded-full">
                <Text className="text-small text-red-600">Offline</Text>
              </View>
            </View>

            <Text className="text-small text-secondary dark:text-secondaryDark">
              IP: 192.168.0.60
            </Text>

            <TouchableOpacity className="mt-4 px-4 py-2 rounded-xl bg-yellow-500/20">
              <Text className="text-yellow-600 font-semibold text-small">Retry Connection</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
