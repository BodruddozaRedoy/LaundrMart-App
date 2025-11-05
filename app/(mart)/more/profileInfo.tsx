import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Octicons from '@expo/vector-icons/Octicons';
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const PersonalInfoScreen = () => {
    const [showTooltip, setShowTooltip] = useState(true);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <TouchableWithoutFeedback onPress={() => setShowTooltip(false)}>
            <KeyboardAvoidingView behavior="padding" className="flex-1 bg-white px-5 pt-5">
                {/* Header */}
                <View className="flex-row items-center mb-6">
                    <TouchableOpacity onPress={() => router.push("/(tab)/more")}>
                        <Ionicons name="arrow-back" size={24} color="black" />
                    </TouchableOpacity>
                    <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
                        Personal Info
                    </Text>
                </View>

                {/* Profile Image */}
                <View className="items-center mb-6">
                    <View className="relative">
                        <Image
                                source={{ uri: "https://t4.ftcdn.net/jpg/00/91/13/83/360_F_91138343_2rGUY65Ew7OAkYZ12sltkN0e1ngO9Vx2.jpg" }}
                            className="w-24 h-24 rounded-full"
                        />
                        <TouchableOpacity className="absolute bottom-0 right-0 bg-gray-100 p-1.5 rounded-full">
                            <Ionicons name="camera" size={16} color="black" />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Name */}
                <View className="mb-7">
                    <Text className="text-sm text-gray-700 mb-1">Name</Text>
                    <TextInput
                        placeholder="Type here..."
                        className="border border-gray-200 rounded-xl px-4 py-3 text-base"
                        onFocus={() => setShowTooltip(false)}
                    />
                </View>

                {/* Phone Number */}
                <View className="mb-7">
                    <Text className="text-sm text-gray-700 mb-1">
                        Phone number 
                    </Text>
                    <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                        <Text className="text-gray-700 flex-1">+880 1757976790</Text>
                        {/* <Ionicons name="checkmark-circle" size={20} color="#22C55E" /> */}
                        <MaterialIcons name="verified" size={24} color="green" />
                    </View>
                </View>

                {/* Email */}
                <View className="mb-7 relative">
                    <Text className="text-sm text-gray-700 mb-1">
                        Email 
                    </Text>
                    <View className="flex-row items-center border border-red-300 bg-red-50 rounded-xl px-4 py-3">
                        <Text className="text-gray-700 flex-1">bodruddozaredoy@gmail.com</Text>
                        {/* <Ionicons name="close-circle-outline" size={20} color="#EF4444" /> */}
                        <TouchableOpacity onPress={() => router.push("/more/verification")}>
                            <Octicons name="verified" size={22} color="red" />
                        </TouchableOpacity>
                    </View>

                    {/* Tooltip */}
                    {/* {showTooltip && (
                        <View className="absolute left-0 right-0 top-[68px] bg-red-100 border border-red-300 rounded-lg px-3 py-2 flex-row items-center">
                            <Ionicons name="warning-outline" size={16} color="#EF4444" />
                            <Text className="ml-2 text-xs text-red-600">
                                Your email is not verified
                            </Text>
                        </View>
                    )} */}
                </View>

                {/* Location */}
                <View className="mb-8">
                    <Text className="text-sm text-gray-700 mb-1">Location</Text>
                    <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                        <Text className="flex-1 text-gray-700">
                            Amberkhana, Sylhet, Bangladesh
                        </Text>
                        <Ionicons name="location-outline" size={18} color="#007AFF" />
                    </View>
                </View>

                {/* Button */}
                <TouchableOpacity className="w-full">
                    <PrimaryButton text="Update Profile"/>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default PersonalInfoScreen;
