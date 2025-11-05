import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function BasicInfoScreen() {
    const [image, setImage] = useState<string | null>(null);

    const handleImagePick = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 0.8,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <ScrollView className="flex-1 bg-white px-5 pt-6">
                {/* Step Title */}
                <Text className="text-2xl font-bold text-gray-900 mb-6">Setup Your LaundryMart</Text>

                {/* Step Indicator */}
                <View className="flex-row items-center mb-8">
                    <View className="flex-1 h-1 bg-blue-500 rounded-full" />
                    <View className="flex-1 h-1 bg-gray-200 rounded-full ml-1" />
                    <View className="flex-1 h-1 bg-gray-200 rounded-full ml-1" />
                    <View className="flex-1 h-1 bg-gray-200 rounded-full ml-1" />
                </View>

                {/* Upload Section */}
                <Text className="text-base font-medium text-gray-700 mb-2">
                    Upload your laundrmart logo/Image
                </Text>

                <View className="border-2 border-dashed border-gray-300 rounded-2xl py-6 px-4 items-center justify-center bg-gray-50 mb-6">
                    {image ? (
                        <Image source={{ uri: image }} className="w-32 h-32 rounded-lg mb-3" resizeMode="cover" />
                    ) : (
                        <Ionicons name="cloud-upload-outline" size={48} color="#9CA3AF" />
                    )}

                    <Text className="text-gray-700 text-sm font-medium mb-1">Browse Image</Text>
                    <Text className="text-gray-400 text-xs mb-3">
                        Format: jpeg, png & Max file size: 25 MB
                    </Text>

                    <TouchableOpacity
                        onPress={handleImagePick}
                        className="bg-primary px-5 py-2.5 rounded-lg"
                    >
                        <Text className="text-white font-semibold text-sm">Browse</Text>
                    </TouchableOpacity>
                </View>

                {/* Basic Info */}
                <View className="mb-5">
                    <View className="flex-row gap-2 items-center 800 mb-3">
                        <AntDesign name="shop" size={20} color="black" />
                        <Text className="text-lg font-semibold text-gray-">Basic Information</Text>
                    </View>

                    {/* LaundryMart Name */}
                    <Text className="text-sm text-gray-600 mb-1">LaundryMart Name<Text className="text-red-500">*</Text></Text>
                    <TextInput
                        placeholder="e.g., Downtown Laundry"
                        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
                        placeholderTextColor="#A1A1AA"
                    />

                    {/* Full Address */}
                    <Text className="text-sm text-gray-600 mb-1">Full Address<Text className="text-red-500">*</Text></Text>
                    <TextInput
                        placeholder="123 Main St, City, State 12345"
                        className="border border-gray-300 rounded-xl px-4 py-3 mb-4 text-gray-800"
                        placeholderTextColor="#A1A1AA"
                    />

                    {/* Phone Number */}
                    <Text className="text-sm text-gray-600 mb-1">Phone number<Text className="text-red-500">*</Text></Text>
                    <View className="relative mb-4">
                        <TextInput
                            placeholder="+880 1757976790"
                            keyboardType="phone-pad"
                            className="border border-gray-300 rounded-xl px-4 py-3 pr-10 text-gray-800"
                            placeholderTextColor="#A1A1AA"
                        />
                        <MaterialIcons name="verified" size={20} color="green" className="absolute right-3 top-3.5" />
                    </View>

                    {/* Email */}
                    <Text className="text-sm text-gray-600 mb-1">Email<Text className="text-red-500">*</Text></Text>
                    <TextInput
                        placeholder="example@email.com"
                        keyboardType="email-address"
                        className="border border-gray-300 rounded-xl px-4 py-3 mb-6 text-gray-800"
                        placeholderTextColor="#A1A1AA"
                    />
                </View>

                {/* Continue Button */}
                <TouchableOpacity className="w-full mb-10">
                    <PrimaryButton text="Continue" />
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}
