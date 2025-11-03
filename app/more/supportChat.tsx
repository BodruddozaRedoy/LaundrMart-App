import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

const SupportChatScreen = () => {
  const [search, setSearch] = useState("");

  const messages = [
    {
      id: "1",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: true,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
    {
      id: "2",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: false,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
    {
      id: "3",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: true,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
    {
      id: "4",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: false,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
    {
      id: "5",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: false,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
    {
      id: "6",
      name: "Shirts Laundry",
      message: "You are available?",
      time: "19:45",
      unread: true,
      avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
    },
  ];

  const filtered = messages.filter((msg) =>
    msg.name.toLowerCase().includes(search.toLowerCase())
  );

  const renderItem = ({ item }: any) => (
    <TouchableOpacity onPress={() => router.push("/more/chat")} className="flex-row items-center justify-between py-3 border-b border-gray-100">
      {/* Left Section */}
      <View className="flex-row items-center">
        <Image source={{ uri: item.avatar }} className="w-12 h-12 rounded-full" />
        <View className="ml-3">
          <Text className="text-gray-800 font-semibold">{item.name}</Text>
          <Text className="text-gray-500 text-sm">{item.message}</Text>
        </View>
      </View>

      {/* Right Section */}
      <View className="items-end">
        <Text className="text-gray-500 text-xs mb-1">{item.time}</Text>
        {item.unread && (
          <View className="w-3 h-3 rounded-full bg-[#007AFF]" />
        )}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* Header */}
      <View className="flex-row items-center mb-4 mt-2">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
          Messages
        </Text>
      </View>

      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2 mb-3">
        <Ionicons name="search-outline" size={18} color="#888" />
        <TextInput
          placeholder="Search"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          className="ml-2 flex-1 text-gray-700"
        />
      </View>

      {/* Messages List */}
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
