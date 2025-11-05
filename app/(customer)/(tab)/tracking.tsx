import { orders } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";



export default function TrackingScreen() {
  const [selectedTab, setSelectedTab] = useState<"All" | "Active" | "Completed">(
    "All"
  );

  const filteredOrders = orders.filter((order) => {
    if (selectedTab === "All") return true;
    if (selectedTab === "Active")
      return ["Pending", "Pickup", "Processing"].includes(order.status);
    if (selectedTab === "Completed") return order.status === "Delivered";
    return false;
  });

  const renderStatusBadge = (status: string) => {
    let color = "#E2E8F0";
    let textColor = "#475569";

    if (status === "Pending") {
      color = "#FEF3C7";
      textColor = "#B45309";
    } else if (status === "Pickup") {
      color = "#DBEAFE";
      textColor = "#1D4ED8";
    } else if (status === "Processing") {
      color = "#FDE68A";
      textColor = "#92400E";
    } else if (status === "Delivered") {
      color = "#DCFCE7";
      textColor = "#166534";
    }

    return (
      <View
        className="px-2.5 py-0.5 rounded-md"
        style={{ backgroundColor: color }}
      >
        <Text className="text-xs font-medium" style={{ color: textColor }}>
          {status}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle={"dark-content"} />
      {/* ✅ Header */}
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-[#E2E8F0]">
        <Text className="text-xl font-bold text-[#1E293B]">
          Order History
        </Text>
        <Ionicons name="search-outline" size={22} color="#1E293B" />
      </View>

      {/* ✅ Tabs */}
      <View className="flex-row justify-around bg-[#F1F5F9] mx-5 mt-4 p-1 rounded-xl">
        {["All", "Active", "Completed"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setSelectedTab(tab as any)}
            className={`flex-1 py-2 rounded-lg ${selectedTab === tab ? "bg-[#017FC6]" : "bg-transparent"
              }`}
          >
            <Text
              className={`text-center text-sm font-medium ${selectedTab === tab ? "text-white" : "text-[#475569]"
                }`}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ✅ Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
        renderItem={({ item }) => (
          <View className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mt-5">
            {/* Order Header */}
            <View className="flex-row items-center justify-between mb-3">
              <Text className="text-sm font-medium text-[#1E293B]">
                Order {item.orderId}
              </Text>
              {renderStatusBadge(item.status)}
            </View>

            {/* Date */}
            <View className="flex-row items-center mb-3">
              <Ionicons name="calendar-outline" size={16} color="#64748B" />
              <Text className="text-sm text-[#64748B] ml-2">{item.date}</Text>
            </View>

            {/* Address */}
            <Text className="text-base font-semibold text-[#1E293B] mb-1">
              Addresses
            </Text>
            <View className="flex-row items-center mb-3">
              <Ionicons name="location-outline" size={18} color="#2563EB" />
              <Text className="text-sm text-[#1E293B] ml-2">{item.address}</Text>
            </View>

            {/* Order Details */}
            <Text className="text-base font-semibold text-[#1E293B] mb-2">
              Order Details
            </Text>
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-[#475569]">Bag Size</Text>
              <Text className="text-sm text-[#1E293B]">{item.bagSize}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-[#475569]">Can clothes be mixed?</Text>
              <Text className="text-sm text-[#1E293B]">{item.canMix}</Text>
            </View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-sm text-[#475569]">Service</Text>
              <Text className="text-sm text-[#1E293B]">{item.service}</Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-sm text-[#475569]">Estimated Cost</Text>
              <Text className="text-sm font-semibold text-[#2563EB]">
                {item.totalCost}
              </Text>
            </View>

            {/* Notes */}
            <View className="bg-white border border-[#E2E8F0] rounded-xl p-3 mb-3">
              <Text className="text-xs text-[#475569]">
                <Text className="font-semibold text-[#1E293B]">Notes: </Text>
                {item.notes}
              </Text>
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between mt-2">
              <TouchableOpacity className="flex-1 border border-[#CBD5E1] rounded-xl py-2 items-center mr-2">
                <Text className="text-sm font-medium text-[#1E293B]">
                  Report
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => router.push({ pathname: "/tracking/trackOrder", params: { id: item.id } })} className="flex-1 bg-[#017FC6] rounded-xl py-2 items-center">
                <Text className="text-sm font-medium text-white">
                  Track Order
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}
