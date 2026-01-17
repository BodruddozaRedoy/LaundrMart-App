import HeaderBackButton from "@/components/common/HeaderBackButton";
import ScreenWrapper from "@/components/common/ScreenWrapper";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { useToast } from "@/components/ui/toast/ToastContext";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const PersonalInfoScreen = () => {
    const {
        customerProfile,
        updateProfile,
        updateProfileState,
        refetchProfile,
        isProfileFetching,
    } = useUser();

    const { success, error } = useToast();

    // ---------------- STATES ----------------
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [location, setLocation] = useState("");


    const [image, setImage] = useState<null | {
        uri: string;
        name: string;
        type: string;
    }>(null);

    // ---------------- PREFILL ----------------
    useEffect(() => {
        if (customerProfile) {
            setFullName(customerProfile.full_name || "");
            setEmail(customerProfile.email || "");
            setPhone(customerProfile.phone_number || "");
            const parsed = JSON.parse(customerProfile.location!);
            const updatedLocation = `${parsed.street_address}, ${parsed.city}, ${parsed.state}, ${parsed.country}`
            setLocation(updatedLocation || "");
        }
    }, [customerProfile]);

    console.log("customerProfile", customerProfile)

    // ---------------- IMAGE PICKER ----------------
    const pickImage = async (fromCamera = false) => {
        try {
            const permission = fromCamera
                ? await ImagePicker.requestCameraPermissionsAsync()
                : await ImagePicker.requestMediaLibraryPermissionsAsync();

            if (!permission.granted) {
                error("Permission denied", "Please allow access");
                return;
            }

            const result = fromCamera
                ? await ImagePicker.launchCameraAsync({ quality: 0.7 })
                : await ImagePicker.launchImageLibraryAsync({ quality: 0.7 });

            if (!result.canceled) {
                const asset = result.assets[0];
                setImage({
                    uri: asset.uri,
                    name: `profile_${Date.now()}.jpg`,
                    type: "image/jpeg",
                });
            }
        } catch (err) {
            error("Image Error", "Failed to pick image");
        }
    };

    // ---------------- UPDATE PROFILE ----------------
    const handleUpdate = async () => {
        try {
            const formData = new FormData();

            if (fullName.trim()) formData.append("full_name", fullName);
            if (email.trim()) formData.append("email", email);
            if (phone.trim()) formData.append("phone_number", phone);
            if (location.trim()) formData.append("location", location);

            if (image) {
                formData.append(
                    "image",
                    {
                        uri: image.uri,
                        name: image.name,
                        type: image.type,
                    } as any
                );
            }

            await updateProfile(formData);
            success("Profile Updated", "Your profile has been updated successfully");
        } catch (err) {
            error("Update Failed", "Profile update failed");
        }
    };


    const onRefresh = useCallback(async () => {
        try {
            await refetchProfile();
            success("Updated", "Latest profile data loaded");
        } catch (e) {
            error("Refresh failed", "Could not fetch latest data");
        }
    }, []);

    return (
        <ScreenWrapper
            scrollable
            keyboardAvoiding
            loading={updateProfileState.isPending}
            refreshing={isProfileFetching}
            onRefresh={onRefresh}
        >
            {/* Header */}
            <View className="flex-row items-center mb-6 mt-4">
                <HeaderBackButton
                    onPress={() => router.push("/(customer)/(tab)/more")}
                />
                <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
                    Personal Info
                </Text>
            </View>

            {/* Profile Image */}
            <View className="items-center mb-6">
                <View className="relative">
                    <Image
                        source={{
                            uri:
                                image?.uri ||
                                customerProfile?.image ||
                                "https://img.icons8.com/?size=100&id=7819&format=png",
                        }}
                        className="w-24 h-24 rounded-full"
                    />
                    <TouchableOpacity
                        onPress={() => pickImage(false)}
                        onLongPress={() => pickImage(true)}
                        className="absolute bottom-0 right-0 bg-gray-100 p-1.5 rounded-full"
                    >
                        <Ionicons name="camera" size={16} color="black" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Name */}
            <View className="mb-7">
                <Text className="text-sm text-gray-700 mb-1">Name</Text>
                <TextInput
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder="Type here..."
                    className="border border-gray-200 rounded-xl px-4 py-3 text-base"
                />
            </View>

            {/* Phone */}
            <View className="mb-7">
                <Text className="text-sm text-gray-700 mb-1">Phone number</Text>
                <TextInput
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                    className="border border-gray-200 rounded-xl px-4 py-3"
                />
            </View>

            {/* Email */}
            <View className="mb-7">
                <Text className="text-sm text-gray-700 mb-1">Email</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        readOnly
                        autoCapitalize="none"
                        keyboardType="email-address"
                        className="flex-1"
                    />
                    {customerProfile?.is_verified ? (
                        <MaterialIcons name="verified" size={22} color="green" />
                    ) : (
                        <Octicons name="verified" size={22} color="red" />
                    )}
                </View>
            </View>

            {/* Location */}
            <View className="mb-8">
                <Text className="text-sm text-gray-700 mb-1">Location</Text>
                <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                    <TextInput
                        value={location}
                        onChangeText={setLocation}
                        placeholder="Your location"
                        className="flex-1 text-gray-700"
                    />
                    <TouchableOpacity
                        onPress={() => router.push({ pathname: "/(customer)/order/addNewAddress", params: { type: "Home", path: "profile" } })}
                        className="bg-gray-100 px-3 py-2 rounded-lg"
                    >
                        <Ionicons name="create-outline" size={18} color="#017FC6" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Update Button */}
            <TouchableOpacity
                onPress={handleUpdate}
                disabled={updateProfileState.isPending}
            >
                <PrimaryButton
                    text={
                        updateProfileState.isPending
                            ? "Updating..."
                            : "Update Profile"
                    }
                />
            </TouchableOpacity>
        </ScreenWrapper>
    );
};

export default PersonalInfoScreen;
