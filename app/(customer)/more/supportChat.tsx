import { api } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SupportChatScreen = () => {
  const [search, setSearch] = useState("");

  const {
    data: messages = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["supportChat"],
    queryFn: async () => {
      const res = await api.get("/message/api/room");
      return res.data.data ?? [];
    },
  });

  /** 🔍 Safe filtering */
  const filtered = useMemo(() => {
    return messages.filter((msg: any) =>
      msg?.name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [messages, search]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => router.push("/(customer)/more/chat")}
      className="flex-row items-center justify-between py-3 border-b border-gray-100"
    >
      {/* Left */}
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.avatar }}
          className="w-12 h-12 rounded-full bg-gray-200"
        />
        <View className="ml-3">
          <Text className="text-gray-800 font-semibold">{item.name}</Text>
          <Text className="text-gray-500 text-sm" numberOfLines={1}>
            {item.message}
          </Text>
        </View>
      </View>

      {/* Right */}
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
        <TouchableOpacity onPress={() => router.push("/more")}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
          Messages
        </Text>
      </View>

      {/* Search */}
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

      {/* 🔄 Loading */}
      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {/* ❌ Error */}
      {isError && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 mb-3">
            Failed to load messages
          </Text>
          <TouchableOpacity
            onPress={refetch}
            className="px-4 py-2 bg-black rounded-full"
          >
            <Text className="text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* 📭 Empty */}
      {!isLoading && !isError && filtered.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-400">No conversations found</Text>
        </View>
      )}

      {/* 📩 List */}
      {!isLoading && !isError && (
        <FlatList
          data={filtered}
          renderItem={renderItem}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
};

export default SupportChatScreen;
