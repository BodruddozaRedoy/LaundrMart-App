import LaundryCard from "@/components/common/LaundryCard";
import { api } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
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

// Define the ordering options based on your API
const SORT_OPTIONS = [
  { label: "Rating", value: "-average_rating" },
  { label: "Distance", value: "distance" },
  { label: "Price", value: "price_per_pound" },
];

export default function ChooseLaundryMartScreen() {
  const router = useRouter();

  // 1. States for filtering and querying
  const [search, setSearch] = useState("");
  const [ordering, setOrdering] = useState("-average_rating");
  const [lat, setLat] = useState(23.797301); // Default or get from expo-location
  const [lng, setLng] = useState(90.399249);

  // 2. Fetch Data using React Query
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["vendors", search, ordering, lat, lng],
    queryFn: async () => {
      const res = await api.get(`/customers/api/vendors`, {
        params: {
          lat: lat,
          lng: lng,
          ordering: ordering,
          search: search,
          page_size: 20, // Example page size
        },
      });
      return res.data;
    },
  });

  // 3. Navigation handler
  const handleVendorPress = (vendor: any) => {
    router.push({
      pathname: "/(customer)/order/laundryDetails", // Update this path to your actual details route
      params: {
        vendor_id: vendor.id,
        // Passing details as params
        name: vendor.laundrymart_name || "Unknown Laundry",
        image: vendor.image,
        rating: vendor.average_rating,
        location: vendor.location,
        is_open: vendor.is_open_now ? "true" : "false"
      },
    });
  };

  useEffect(() => {
    const loadAddresses = async () => {
      const orderDetails = await AsyncStorage.getItem("order-details");
      console.log("orderdetails", orderDetails)

    };
    loadAddresses();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white px-5">
      {/* Search Bar */}
      <View className="flex-row items-center bg-gray-100 rounded-xl px-4 py-2 mb-4 mt-2">
        <Ionicons name="search" size={20} color="#64748b" />
        <TextInput
          placeholder="Search for laundry marts..."
          className="flex-1 ml-2 text-sm text-[#1E293B]"
          value={search}
          onChangeText={setSearch}
        />
      </View>

      {/* Sort by section */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-sm font-bold text-[#1E293B]">
          Results ({data?.count || 0})
        </Text>

        <View className="flex-row items-center">
          <Text className="text-xs text-gray-500 mr-2">Sort by:</Text>
          <TouchableOpacity
            className="flex-row items-center bg-[#F8FAFC] border border-gray-200 px-3 py-2 rounded-lg"
            onPress={() => {
              // Logic to cycle through sorts or open a bottom sheet
              const currentIndex = SORT_OPTIONS.findIndex(opt => opt.value === ordering);
              const nextIndex = (currentIndex + 1) % SORT_OPTIONS.length;
              setOrdering(SORT_OPTIONS[nextIndex].value);
            }}
          >
            <Text className="text-sm font-medium text-[#1E293B] mr-1">
              {SORT_OPTIONS.find(opt => opt.value === ordering)?.label}
            </Text>
            <Ionicons name="swap-vertical" size={14} color="#475569" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Loading & List */}
      {isLoading ? (
        <View className="flex-1 justify-center">
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <FlatList
            data={data?.results || []}
            // FIX: Use store_id, fallback to id, fallback to index to guarantee uniqueness
            keyExtractor={(item, index) => {
              return item.store_id?.toString() || item.id?.toString() || index.toString();
            }}
            renderItem={({ item }) => <LaundryCard item={item} />}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              !isLoading && (
                <View className="mt-20 items-center">
                  <Text className="text-gray-400">No vendors available.</Text>
                </View>
            )
          }
        />
      )}
    </SafeAreaView>
  );
}