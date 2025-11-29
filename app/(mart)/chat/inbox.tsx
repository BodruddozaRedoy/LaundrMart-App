import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  Modal,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { KeyboardStickyView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

// 📌 Tablet detection
const { width, height } = Dimensions.get("window");
const isMd = width >= 768;
const isLg = width >= 1024;

// 📌 Dynamic scaling
const avatarSize = isLg ? 70 : isMd ? 55 : 36;
const headerAvatarSize = isLg ? 80 : isMd ? 60 : 36;
const iconSize = isLg ? 36 : isMd ? 28 : 20;
const textMd = isLg ? "text-3xl" : isMd ? "text-2xl" : "text-base";
const textSm = isLg ? "text-2xl" : isMd ? "text-xl" : "text-sm";

const InboxScreen = () => {
  const [message, setMessage] = useState("");
  const [openOrderModal, setOpenOrderModal] = useState(false);

  // Slide animation for bottom modal
  const slideAnim = useState(new Animated.Value(height))[0];

  const openModal = () => {
    setOpenOrderModal(true);
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 280,
      useNativeDriver: true,
    }).start();
  };

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 260,
      useNativeDriver: true,
    }).start(() => setOpenOrderModal(false));
  };

  // Dummy order details (replace with real API/order object)
  const orderDetails = {
    orderId: "#LD-2025-0091",
    customer: "Shirts Laundry",
    date: "December 1, 2025",
    phone: "+880 1623-445566",
    address: "House 12, Road 4, Dhanmondi",
    service: "Wash & Iron",
    bagSize: "Large",
    mix: "No",
    weight: "3.2 kg",
    total: "$18.50",
    notes: "Handle with care, white shirts only.",
  };

  const messages = [
    { id: "1", sender: "other", type: "text", text: "Hi, are you available?", time: "9:41 AM" },
    { id: "2", sender: "me", type: "text", text: "Yes, I am Available", time: "9:42 AM" },
    { id: "3", sender: "date", text: "Thursday 24, 2025" },
    { id: "4", sender: "other", type: "text", text: "Hi, Did you heard?", time: "9:44 AM" },
    { id: "5", sender: "other", type: "audio", time: "9:45 AM" },
    { id: "6", sender: "other", type: "text", text: "Ok!", time: "9:46 AM" },
    { id: "7", sender: "me", type: "audio", time: "9:47 AM" },
  ];

  const renderMessage = ({ item }: any) => {
    if (item.sender === "date") {
      return (
        <View className="items-center my-3">
          <Text className={`text-gray-400 ${isMd ? "text-base" : "text-xs"}`}>
            {item.text}
          </Text>
        </View>
      );
    }

    const isMe = item.sender === "me";

    return (
      <View
        className={`flex-row ${isMe ? "justify-end" : "justify-start"
          } mb-3 px-2`}
      >
        {!isMe && (
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
            }}
            style={{ width: avatarSize, height: avatarSize }}
            className="rounded-full mr-2 self-end"
          />
        )}

        <View
          className={`rounded-2xl p-3 md:p-5 ${isMe ? "bg-primary" : "bg-gray-100"
            }`}
          style={{ maxWidth: isMd ? "80%" : "75%" }}
        >
          {item.type === "text" && (
            <Text
              className={`${isMe ? "text-white" : "text-gray-800"} ${textSm}`}
            >
              {item.text}
            </Text>
          )}

          {item.type === "audio" && (
            <View
              className={`flex-row items-center ${isMe ? "justify-end" : "justify-start"
                }`}
            >
              <Ionicons
                name="play-circle"
                size={iconSize}
                color={isMe ? "white" : "#007AFF"}
              />
              <Text
                className={`mx-2 ${isMe ? "text-white" : "text-gray-700"
                  } ${textSm}`}
              >
                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
              </Text>
              <Ionicons
                name="volume-high-outline"
                size={iconSize - 6}
                color={isMe ? "white" : "#007AFF"}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <KeyboardStickyView
        // behavior="position"
        // animated
        className="flex-1 bg-white pt-5"
      >
        {/* HEADER */}
        <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
          <HeaderBackButton onPress={() => router.back()} />

          <View className="flex-row items-center ml-3 flex-1">
            <Image
              source={{
                uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
              }}
              style={{ width: headerAvatarSize, height: headerAvatarSize }}
              className="rounded-full"
            />

            <View className="ml-2">
              <Text className={`font-semibold text-gray-800 ${textMd}`}>
                Shirts Laundry
              </Text>

              <View className="flex-row items-center">
                <View
                  className="bg-green-500 rounded-full mr-1"
                  style={{
                    width: isLg ? 14 : isMd ? 10 : 6,
                    height: isLg ? 14 : isMd ? 10 : 6,
                  }}
                />
                <Text className={`${textSm} text-gray-500`}>Active Now</Text>
              </View>
            </View>
          </View>

          <View className="flex-row gap-2 ml-2">
            <TouchableOpacity>
              <Entypo name="phone" size={iconSize} color="black" />
            </TouchableOpacity>

            <TouchableOpacity className="ml-2">
              <Ionicons
                name="ellipsis-vertical"
                size={iconSize - 4}
                color="#444"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* FLOATING ORDER DETAILS BUTTON */}
        <View
          // onPress={openModal}
          className="mx-4 my-3 p-3 bg-primary/10 rounded-xl flex-row justify-center gap-1 items-center"
        >
          <Text className="text-gray-400 text-base md:text-xl">
            View Customer Order Details?
          </Text>
          <TouchableOpacity onPress={openModal}>
            <Text className="text-primary font-semibold">Click here</Text>
          </TouchableOpacity>
        </View>

        {/* CHAT MESSAGES */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderMessage}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingVertical: 10,
            paddingHorizontal: isMd ? 12 : 6,
          }}
        />

        {/* BOTTOM SLIDE ORDER DETAILS MODAL */}
        <Modal transparent visible={openOrderModal} animationType="none">
          <TouchableOpacity
            onPress={closeModal}
            className="flex-1 bg-black/40"
            activeOpacity={1}
          />

          <Animated.View
            style={{ transform: [{ translateY: slideAnim }] }}
            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-6 shadow-2xl"
          >
            {/* Drag Indicator */}
            <View className="w-14 h-1 rounded-full bg-gray-300 mx-auto mb-4" />

            <View
              className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mt-5 
                 md:rounded-3xl md:p-6 lg:rounded-[32px] lg:p-8"
            >
              {/* Order Header */}
              <View className="flex-row items-center justify-between mb-3">
                <Text className="text-sm md:text-xl lg:text-2xl font-medium text-[#1E293B]">
                  Order #LD-23095
                </Text>

                {/* Static Status Badge */}
                <View className="px-2.5 py-0.5 rounded-md" style={{ backgroundColor: "#FDE68A" }}>
                  <Text className="text-xs md:text-base lg:text-lg font-medium" style={{ color: "#92400E" }}>
                    Processing
                  </Text>
                </View>
              </View>

              {/* Date */}
              <View className="flex-row items-center mb-3">
                <Ionicons name="calendar-outline" size={iconSize} color="#64748B" />
                <Text className="text-sm md:text-lg lg:text-xl text-[#64748B] ml-2">
                  Dec 4, 2025
                </Text>
              </View>

              {/* Customer Details */}
              <Text className="text-base md:text-2xl lg:text-3xl font-semibold text-[#1E293B] mb-1">
                Customer Details
              </Text>

              <View className="flex-row mb-3">
                <Ionicons
                  name="person-circle-outline"
                  size={isLg ? 40 : isMd ? 28 : 20}
                  color="#0EA5E9"
                />
                <View className="ml-2">
                  <Text className="text-sm md:text-xl lg:text-2xl text-[#1E293B] font-medium">
                    John David
                  </Text>
                  <Text className="text-xs md:text-lg lg:text-xl text-[#64748B]">
                    +880 1777-123456
                  </Text>
                </View>
              </View>

              {/* Address */}
              <Text className="text-base md:text-2xl lg:text-3xl font-semibold text-[#1E293B] mb-1">
                Addresses
              </Text>
              <View className="flex-row items-center mb-3">
                <Ionicons
                  name="location-outline"
                  size={isLg ? 40 : isMd ? 28 : 18}
                  color="#2563EB"
                />
                <Text className="text-sm md:text-xl lg:text-2xl text-[#1E293B] ml-2">
                  House 12, Road 8, Dhanmondi, Dhaka
                </Text>
              </View>

              {/* WEIGHT INPUT */}
              <View className="mt-3">
                <Text className="text-sm md:text-xl lg:text-2xl font-semibold text-[#1E293B] mb-1">
                  Enter Total Weight
                </Text>

                <View className="flex-row items-center bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4">
                  <TextInput
                    placeholder="3.2"
                    keyboardType="numeric"
                    className="flex-1 text-sm md:text-xl lg:text-2xl text-[#1E293B]"
                  />
                  <Text className="text-sm md:text-xl lg:text-2xl text-[#475569] ml-2">
                    kg
                  </Text>
                </View>
              </View>

              {/* Details */}
              <Text className="text-base md:text-2xl lg:text-3xl font-semibold text-[#1E293B] mb-2 mt-3">
                Order Details
              </Text>

              {[
                ["Bag Size", "Large"],
                ["Can clothes be mixed?", "No"],
                ["Service", "Wash & Iron"],
              ].map(([label, value], i) => (
                <View key={i} className="flex-row justify-between mb-1">
                  <Text className="text-sm md:text-xl lg:text-2xl text-[#475569]">
                    {label}
                  </Text>
                  <Text className="text-sm md:text-xl lg:text-2xl text-[#1E293B]">
                    {value}
                  </Text>
                </View>
              ))}

              {/* Estimated cost */}
              <View className="flex-row justify-between mb-3 mt-1">
                <Text className="text-sm md:text-xl lg:text-2xl text-[#475569]">
                  Estimated Cost
                </Text>
                <Text className="text-sm md:text-2xl lg:text-3xl font-semibold text-primary">
                  $18.50
                </Text>
              </View>

              {/* Notes */}
              <View className="bg-white border border-[#E2E8F0] rounded-xl p-3 mb-3 md:p-5 lg:p-6">
                <Text className="text-xs md:text-lg lg:text-xl text-[#475569]">
                  <Text className="font-semibold text-[#1E293B]">Notes: </Text>
                  White shirts only, handle with care.
                </Text>
              </View>

              {/* Buttons */}
              <View className="gap-3 mt-2">
                <TouchableOpacity className="flex-1 bg-primary rounded-lg py-2 md:py-3 lg:py-4 items-center">
                  <Text className="text-sm md:text-xl lg:text-2xl font-medium text-white">
                    Mark as Ready for Pickup
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 border border-[#CBD5E1] rounded-lg py-2 md:py-3 lg:py-4 items-center">
                  <Text className="text-sm md:text-xl lg:text-2xl font-medium text-[#1E293B]">
                    Mark as Picked Up
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-1 bg-primary/10 rounded-lg py-2 md:py-3 lg:py-4 items-center">
                  <Text className="text-sm md:text-xl lg:text-2xl font-medium text-primary">
                    Report Damage / Stain
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Print */}
              <TouchableOpacity className="w-full bg-primary rounded-lg py-3 md:py-4 lg:py-5 items-center mt-3">
                <Text className="text-sm md:text-xl lg:text-2xl font-medium text-white">
                  Print Invoice
                </Text>
              </TouchableOpacity>
            </View>

            {/* Close button */}
            <TouchableOpacity
              onPress={closeModal}
              className="bg-primary mt-6 py-3 rounded-xl"
            >
              <Text className="text-white text-center text-lg font-semibold">
                Close
              </Text>
            </TouchableOpacity>
          </Animated.View>
        </Modal>


        {/* MESSAGE INPUT */}
        <View
          className="flex-row items-center border-t border-gray-100 px-5 py-4"
          style={{
            paddingVertical: isMd ? 16 : 12,
            paddingHorizontal: isMd ? 24 : 20,
          }}
        >
          <TextInput
            placeholder="Send Message"
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            className={`
            flex-1 bg-gray-100 rounded-full px-4 text-gray-700
            ${isMd ? "py-5 text-xl" : "py-4 text-sm"}
          `}
          />

          <TouchableOpacity className="ml-2">
            <Ionicons name="image-outline" size={iconSize - 4} color="#007AFF" />
          </TouchableOpacity>

          <TouchableOpacity
            className="ml-3 rounded-full bg-primary"
            style={{ padding: isMd ? 14 : 10 }}
          >
            <Ionicons name="mic-outline" size={iconSize - 4} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardStickyView>
    </SafeAreaView>
  );
};

export default InboxScreen;
