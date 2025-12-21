import HeaderBackButton from "@/components/common/HeaderBackButton";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Octicons from "@expo/vector-icons/Octicons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/hooks/useUser";
import { useToast } from "@/components/ui/toast/ToastContext";

const PersonalInfoScreen = () => {
    const { customerProfile, updateProfile, updateProfileState } = useUser();
    const { success, error } = useToast();

    const [fullName, setFullName] = useState("");
    const [location, setLocation] = useState("");
    const [image, setImage] = useState("");

    /* -------------------- PREFILL DATA -------------------- */
    useEffect(() => {
        if (customerProfile) {
            setFullName(customerProfile.full_name || "");
            setLocation(customerProfile.location || "");
            setImage(
                customerProfile.image ||
                "https://t4.ftcdn.net/jpg/00/91/13/83/360_F_91138343_2rGUY65Ew7OAkYZ12sltkN0e1ngO9Vx2.jpg"
            );
        }
    }, [customerProfile]);

    /* -------------------- UPDATE HANDLER -------------------- */
    const handleUpdate = async () => {
        try {
            await updateProfile({
                full_name: fullName,
                location,
                image,
            });

            success("Profile Updated", "Your profile has been updated successfully");
        } catch (err: any) {
            error(
                "Update Failed",
                err?.response?.data?.message || "Something went wrong"
            );
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <KeyboardAvoidingView behavior="padding" className="flex-1 px-5 pt-5">
                  {/* Header */}
                  <View className="flex-row items-center mb-6">
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
                              source={{ uri: image }}
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
                          value={fullName}
                          onChangeText={setFullName}
                          placeholder="Type here..."
                          className="border border-gray-200 rounded-xl px-4 py-3 text-base"
                      />
                  </View>

                  {/* Phone Number (read-only) */}
                  <View className="mb-7">
                      <Text className="text-sm text-gray-700 mb-1">Phone number</Text>
                      <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                          <Text className="text-gray-700 flex-1">
                              {customerProfile?.phone_number || "—"}
                          </Text>
                          <MaterialIcons name="verified" size={24} color="green" />
                      </View>
                  </View>

                  {/* Email (read-only) */}
                  <View className="mb-7">
                      <Text className="text-sm text-gray-700 mb-1">Email</Text>
                      <View className="flex-row items-center border border-gray-200 rounded-xl px-4 py-3">
                          <Text className="text-gray-700 flex-1">
                              {customerProfile?.email || "—"}
                          </Text>
                          {customerProfile?.is_verified ? (
                              <MaterialIcons name="verified" size={22} color="green" />
                          ) : (
                              <TouchableOpacity
                                  onPress={() => router.push("/more/verification")}
                              >
                                  <Octicons name="verified" size={22} color="red" />
                              </TouchableOpacity>
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
                          <Ionicons name="location-outline" size={18} color="#007AFF" />
                      </View>
                  </View>

                  {/* Update Button */}
                  <TouchableOpacity
                      onPress={handleUpdate}
                      disabled={updateProfileState.isPending}
                      className="w-full"
                  >
                      <PrimaryButton
                          text={
                              updateProfileState.isPending
                                  ? "Updating..."
                                  : "Update Profile"
                          }
                      />
                  </TouchableOpacity>
              </KeyboardAvoidingView>
          </TouchableWithoutFeedback>
      </SafeAreaView>
  );
};

export default PersonalInfoScreen;
