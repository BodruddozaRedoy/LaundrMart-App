import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

// 📌 Tablet detection
const { width } = Dimensions.get("window");
const isMd = width >= 768;
const isLg = width >= 1024;

// 📌 Dynamic sizes
const iconSize = isLg ? 40 : isMd ? 28 : 20;
const avatarSize = isLg ? 80 : isMd ? 60 : 48;
const textLg = isLg ? "text-3xl" : isMd ? "text-2xl" : "text-lg";
const textMd = isLg ? "text-2xl" : isMd ? "text-xl" : "text-base";
const textSm = isLg ? "text-xl" : isMd ? "text-lg" : "text-sm";

const SupportChatScreen = () => {
  const [search, setSearch] = useState("");

  const messages = [
    {
      id: "1",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: true,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
    {
      id: "2",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: false,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
    {
      id: "3",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: true,
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
  ];

  const filtered = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push("/(mart)/more/chat")}
      className="flex-row items-center justify-between py-3 md:py-5 lg:py-6 border-b border-gray-100"
    >
      {/* Left */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.avatar }}
          style={{ width: avatarSize, height: avatarSize }}
          className="rounded-full"
        />
        <View className="ml-3">
          <Text className={`text-gray-800 font-semibold ${textMd}`}>
            {item.name}
          </Text>
          <Text className={`text-gray-500 ${textSm}`}>{item.message}</Text>
        </View>
      </View>

      {/* Right */}
      <View className="items-end">
        <Text className={`text-gray-500 ${isMd ? "text-sm md:text-base lg:text-lg" : "text-xs"}`}>
          {item.time}
        </Text>
        {item.unread && (
          <View
            style={{
              width: isLg ? 16 : isMd ? 12 : 8,
              height: isLg ? 16 : isMd ? 12 : 8,
            }}
            className="rounded-full bg-[#007AFF] mt-1"
          />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-5 md:px-10 lg:px-16">
      {/* Header */}
      <View className="flex-row items-center mb-4 mt-2 md:mb-8 lg:mb-10">
        <TouchableOpacity onPress={() => router.push("/(mart)/(tab)/more")}>
          <Ionicons name="arrow-back" size={iconSize} color="black" />
        </TouchableOpacity>

        <Text
          className={`flex-1 text-center font-semibold text-gray-800 ${textLg}`}
        >
          Messages
        </Text>
      </View>

      {/* Search Bar */}
      <View
        className="
          flex-row items-center bg-gray-100 rounded-xl 
          px-3 py-2 mb-3
          md:px-5 md:py-4 lg:px-6 lg:py-5
        "
      >
        <Ionicons name="search-outline" size={iconSize - 6} color="#888" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          className={`ml-3 flex-1 text-gray-700 ${textMd}`}
        />
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default SupportChatScreen;
