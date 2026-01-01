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

/* =======================
   TYPES
======================= */
export interface SupportChatRoom {
  id: number;
  name: string;
  order: number;

  order_id: string;
  participants: number[];

  other_user: string;
  other_user_image: string | null;

  last_message: string | null;
  unseen_count: number;

  created_at: string;
  updated_at: string;
}

interface ChatRoomResponse {
  data: SupportChatRoom[];
}

/* =======================
   COMPONENT
======================= */
const SupportChatScreen = () => {
  const [search, setSearch] = useState("");

  const {
    data: messages = [],
    isLoading,
    isError,
    refetch,
  } = useQuery<SupportChatRoom[]>({
    queryKey: ["supportChat"],
    queryFn: async () => {
      const res = await api.get<ChatRoomResponse>("/message/api/room");
      return res.data.data;
    },
  });

  /* 🔍 Filtered list */
  const filtered = useMemo(() => {
    return messages.filter((msg) =>
      msg.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [messages, search]);

  /* =======================
     RENDER ITEM
  ======================= */
  const renderItem = ({ item }: { item: SupportChatRoom }) => (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/(customer)/more/chat",
          params: { roomId: String(item.id) },
        })
      }
      className="flex-row items-center justify-between py-3 border-b border-gray-100"
    >
      {/* Left */}
      <View className="flex-row items-center">
        <Image
          source={{
            uri:
              item.other_user_image ??
              "https://via.placeholder.com/150",
          }}
          className="w-12 h-12 rounded-full bg-gray-200"
        />
        <View className="ml-3">
          <Text className="text-gray-800 font-semibold">
            {item.other_user}
          </Text>
          <Text className="text-gray-500 text-sm" numberOfLines={1}>
            {item.last_message ?? "No messages yet"}
          </Text>
        </View>
      </View>

      {/* Right */}
      <View className="items-end">
        <Text className="text-gray-400 text-xs mb-1">
          {new Date(item.updated_at).toLocaleTimeString()}
        </Text>
        {item.unseen_count > 0 && (
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

      {/* Loading */}
      {isLoading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}

      {/* Error */}
      {isError && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-500 mb-3">
            Failed to load messages
          </Text>
          <TouchableOpacity
            onPress={() => refetch()}
            className="px-4 py-2 bg-black rounded-full"
          >
            <Text className="text-white">Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Empty */}
      {!isLoading && !isError && filtered.length === 0 && (
        <View className="flex-1 justify-center items-center">
          <Text className="text-gray-400">No conversations found</Text>
        </View>
      )}

      {/* List */}
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
