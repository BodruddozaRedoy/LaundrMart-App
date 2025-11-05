import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const VerificationScreen = () => {
  return (
      <SafeAreaView className="flex-1 bg-white px-5 pt-5">
      {/* Header */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity onPress={() => router.push("/more/profileInfo")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
          Verification
        </Text>
      </View>

      {/* Title */}
      <View className="mb-3">
        <Text className="text-xl font-semibold text-gray-800 mb-1">
          Email Verification
        </Text>
        <Text className="text-sm text-gray-500">
          Please enter the Email we will send the OTP in this Email.
        </Text>
      </View>

      {/* Input */}
      <View className="mt-5 mb-6">
        <Text className="text-sm text-gray-700 mb-1">
          Enter Email/Phone Number
        </Text>
        <TextInput
          placeholder="ahmadjubayerr@gmail.com"
          className="border border-gray-200 rounded-xl px-4 py-3 text-base text-gray-700"
        />
      </View>

      {/* Button */}
          <TouchableOpacity className="w-full">
              <PrimaryButton text="Send OTP" />
      </TouchableOpacity>
      </SafeAreaView>
  );
};

export default VerificationScreen;
