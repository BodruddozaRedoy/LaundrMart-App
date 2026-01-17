import LaundryCard from "@/components/common/LaundryCard";
import { api } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SORT_OPTIONS = [
  { label: "Rating", value: "-average_rating" },
  { label: "Distance", value: "distance" },
  { label: "Price", value: "price_per_pound" },
];

export default function ChooseLaundryMartScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-average_rating");

  // ⭐ NEW: mode state
  const [mode, setMode] = useState<"all" | "choose">("all");

  /* ---------------- ALL VENDORS ---------------- */
  const {
    data: vendorsData,
    isLoading: vendorsLoading,
  } = useQuery({
    queryKey: ["vendors", search, ordering, params.latitude, params.longitude],
    enabled: mode === "all",
    queryFn: async () => {
      const res = await api.get("/customers/api/vendors", {
        params: {
          lat: params.latitude,
          lng: params.longitude,
          ordering,
          search,
          page_size: 10,
        },
      });
      return res.data;
    },
  });

  /* ---------------- CHOOSE FOR ME ---------------- */
  const {
    data: chooseData,
    isLoading: chooseLoading,
  } = useQuery({
    queryKey: ["choose-for-me"],
    enabled: mode === "choose",
    queryFn: async () => {
      const res = await api.get("/customers/api/choose-for-customer");
      return res.data ?? [];
    },
  });

  const listData =
    mode === "choose" ? chooseData ?? [] : vendorsData?.results ?? [];

  const isLoading = mode === "choose" ? chooseLoading : vendorsLoading;

  useEffect(() => {
    const loadOrderDetails = async () => {
      await AsyncStorage.getItem("order-details");
    };
    loadOrderDetails();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* Search */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-4 mt-2">
        <Ionicons name="search" size={20} color="#64748b" />
        <TextInput
          placeholder="Search for laundry marts..."
          className="flex-1 ml-2 text-sm text-[#1E293B]"
          value={search}
          onChangeText={setSearch}
          editable={mode === "all"} // 🔒 disable search in choose mode
        />
      </View>

      {/* Header Row */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-sm font-bold text-[#1E293B]">
          {mode === "choose"
            ? "Recommended for you"
            : `Results (${vendorsData?.count || 0})`}
        </Text>

        {mode === "all" && (
          <TouchableOpacity
            className="flex-row items-center bg-[#F8FAFC] border border-gray-200 px-3 py-2 rounded-lg"
            onPress={() => {
              const currentIndex = SORT_OPTIONS.findIndex(
                (opt) => opt.value === ordering
              );
              const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length;
              setOrdering(SORT_OPTIONS[nextIndex].value);
            }}
          >
            <Text className="text-sm font-medium text-[#1E293B] mr-1">
              {SORT_OPTIONS.find((opt) => opt.value === ordering)?.label}
            </Text>
            <Ionicons name="swap-vertical" size={14} color="#475569" />
          </TouchableOpacity>
        )}
      </View>

      {/* List */}
      {isLoading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
            data={listData}
            keyExtractor={(item, index) =>
              item.store_id?.toString() || item.id?.toString() || index.toString()
            }
            renderItem={({ item }) => <LaundryCard item={item} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 90 }}
            ListEmptyComponent={
            <View className="mt-20 items-center">
              <Text className="text-gray-400">No vendors available.</Text>
            </View>
          }
        />
      )}

      {/* ⭐ BOTTOM TOGGLE BUTTON */}
      <View className="absolute bottom-5 left-5 right-5">
        <TouchableOpacity
          onPress={() =>
            setMode((prev) => (prev === "all" ? "choose" : "all"))
          }
          className={`h-12 rounded-xl items-center justify-center ${mode === "choose" ? "bg-gray-200" : "bg-[#017FC6]"
            }`}
        >
          <Text
            className={`font-semibold ${mode === "choose" ? "text-gray-800" : "text-white"
              }`}
          >
            {mode === "choose" ? "Show All Vendors" : "Choose For Me"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
