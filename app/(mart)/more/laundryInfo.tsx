import HeaderBackButton from "@/components/common/HeaderBackButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 📌 Tablet detection
const { width } = Dimensions.get("window");
const isMd = width >= 768;
const isLg = width >= 1024;

// 📌 Icon scaling
const iconSize = isLg ? 40 : isMd ? 28 : 20;

const LaundryInfoScreen = () => {
    const [showTooltip, setShowTooltip] = useState(true);

    return (
        <SafeAreaView className="flex-1 bg-white">
            <TouchableWithoutFeedback onPress={() => setShowTooltip(false)}>
                <KeyboardAvoidingView
                    behavior="padding"
                    className="flex-1 bg-white px-5 pt-5 md:px-10 lg:px-16 md:pt-10 lg:pt-14"
                >
                    {/* Header */}
                    <View className="flex-row items-center mb-6 md:mb-10 lg:mb-12">
                        <HeaderBackButton onPress={() => router.push("/(mart)/(tab)/more")} />
                        <Text className="flex-1 text-center text-lg md:text-3xl lg:text-4xl font-semibold text-gray-800">
                            Laundry Info
                        </Text>
                    </View>

                    {/* Profile Image */}
                    <View className="items-center mb-6 md:mb-10 lg:mb-12">
                        <View className="relative">
                            <Image
                                source={{
                                    uri: "https://t4.ftcdn.net/jpg/00/91/13/83/360_F_91138343_2rGUY65Ew7OAkYZ12sltkN0e1ngO9Vx2.jpg",
                                }}
                                style={{
                                    width: isLg ? 130 : isMd ? 110 : 96,
                                    height: isLg ? 130 : isMd ? 110 : 96,
                                }}
                                className="rounded-full"
                            />

                            <TouchableOpacity
                                className="absolute bottom-0 right-0 bg-gray-100 rounded-full"
                                style={{
                                    padding: isLg ? 10 : isMd ? 8 : 6,
                                }}
                            >
                                <Ionicons
                                    name="camera"
                                    size={isLg ? 26 : isMd ? 22 : 16}
                                    color="black"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Name */}
                    <View className="mb-7 md:mb-10 lg:mb-12">
                        <Text className="text-sm md:text-xl lg:text-2xl text-gray-700 mb-1 md:mb-2">
                            Name
                        </Text>
                        <TextInput
                            placeholder="Type here..."
                            className="
                                border border-gray-200 rounded-xl px-4 py-3 
                                text-base md:text-2xl lg:text-3xl
                                md:py-5 lg:py-6
                            "
                            onFocus={() => setShowTooltip(false)}
                        />
                    </View>

                    {/* Phone Number */}
                    <View className="mb-7 md:mb-10 lg:mb-12">
                        <Text className="text-sm md:text-xl lg:text-2xl text-gray-700 mb-1 md:mb-2">
                            Phone number
                        </Text>

                        <View
                            className="
                                flex-row items-center border border-gray-200 rounded-xl 
                                px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6
                            "
                        >
                            <Text className="text-gray-700 flex-1 text-base md:text-2xl lg:text-3xl">
                                +880 1757976790
                            </Text>

                            <MaterialIcons
                                name="verified"
                                size={isLg ? 34 : isMd ? 26 : 20}
                                color="green"
                            />
                        </View>
                    </View>

                    {/* Email */}
                    <View className="mb-7 md:mb-10 lg:mb-12 relative">
                        <Text className="text-sm md:text-xl lg:text-2xl text-gray-700 mb-1 md:mb-2">
                            Email
                        </Text>

                        <View
                            className="
                                flex-row items-center border border-red-300 bg-red-50 
                                rounded-xl px-4 py-3 
                                md:px-6 md:py-5 lg:px-8 lg:py-6
                            "
                        >
                            <Text className="text-gray-700 flex-1 text-base md:text-2xl lg:text-3xl">
                                bodruddozaredoy@gmail.com
                            </Text>

                            <TouchableOpacity onPress={() => router.push("/more/verification")}>
                                <Octicons
                                    name="verified"
                                    size={isLg ? 32 : isMd ? 24 : 18}
                                    color="red"
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* Location */}
                    <View className="mb-8 md:mb-12 lg:mb-14">
                        <Text className="text-sm md:text-xl lg:text-2xl text-gray-700 mb-1 md:mb-2">
                            Location
                        </Text>

                        <View
                            className="
                                flex-row items-center border border-gray-200 rounded-xl 
                                px-4 py-3 md:px-6 md:py-5 lg:px-8 lg:py-6
                            "
                        >
                            <Text className="flex-1 text-gray-700 text-base md:text-2xl lg:text-3xl">
                                Amberkhana, Sylhet, Bangladesh
                            </Text>
                            <Ionicons
                                name="location-outline"
                                size={isLg ? 34 : isMd ? 26 : 18}
                                color="#007AFF"
                            />
                        </View>
                    </View>

                    {/* Update Button */}
                    <TouchableOpacity className="w-full mb-10 md:mb-14 lg:mb-16">
                        <PrimaryButton text="Update Profile" />
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
};

export default LaundryInfoScreen;
