import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const PickupNowScreen = () => {
    return (
        <View className="flex-1 bg-white px-5 pt-5">
            {/* Section Title */}
            <Text className="text-2xl font-bold text-black">Your Location</Text>
            <Text className="text-md text-gray-500 mt-1 mb-5">
                Where should we pick up your laundry?
            </Text>

            {/* Address Card */}
            <View className="flex-row justify-between items-center border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                {/* Left Side */}
                <View className=" flex-1 space-x-3">
                    <View className="flex-row">
                        <Ionicons name="location-outline" size={22} color="#017FC6" />
                        <View className="flex-1 ml-2">
                            <Text className="text-lg font-semibold text-black">
                                Home Address
                            </Text>

                        </View>
                        {/* Badge */}
                        <View className="bg-[#E5F3FF] rounded-full px-3 py-1">
                            <Text className="text-[#017FC6] text-xs font-semibold">
                                Current Location
                            </Text>
                        </View>
                    </View>
                    <Text className="text-md text-gray-600 mt-1">
                        123 Main St, San Francisco, CA 94102
                    </Text>
                </View>


            </View>

            {/* Add New Address */}
            <TouchableOpacity className="flex-row items-center justify-center mt-6 h-12 bg-gray-50 rounded-xl border border-gray-200">
                <Ionicons name="add-circle-outline" size={20} color="#017FC6" />
                <Text className="text-[#017FC6] font-medium text-sm ml-2">
                    Add New Address
                </Text>
            </TouchableOpacity>

            {/* Continue Button */}
            <TouchableOpacity className="w-full absolute bottom-10 right-5 left-5">
                <PrimaryButton text="Continue" />
            </TouchableOpacity>
        </View>
    );
};

export default PickupNowScreen;
