import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function OrderConfirmedScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="px-5 pt-20"
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        {/* ✅ Success Header */}
        <View className="bg-[#D1FAE5] border border-[#86EFAC] rounded-2xl p-10 mb-6 items-center">
          <View className="size-20 bg-[#34D399] rounded-full items-center justify-center mb-2">
            <Ionicons name="checkmark" size={35} color="#fff" />
          </View>
          <Text className="text-2xl font-bold text-[#065F46] mb-1">
            Order Confirmed!
          </Text>
          <Text className="text-md text-[#065F46] text-center">
            Thank you for your order from{" "}
            <Text className="font-semibold text-primary">LaundrMart</Text>.
            {"\n"}We have received your order successfully.
          </Text>
        </View>

        {/* ✅ Order Summary */}
        <View className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-5 mb-5">
          {/* Order ID and Status */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-medium text-[#1E293B]">
              Order #4253668c
            </Text>
            <View className="bg-[#FEF3C7] px-2.5 py-0.5 rounded-md">
              <Text className="text-xs text-[#B45309] font-medium">Pending</Text>
            </View>
          </View>

          {/* Date */}
          <View className="flex-row items-center mb-4">
            <Ionicons name="calendar-outline" size={16} color="#64748B" />
            <Text className="text-sm text-[#64748B] ml-2">Oct 11, 2025</Text>
          </View>

          {/* Addresses */}
          <View className="mb-4">
            <Text className="text-base font-semibold text-[#1E293B] mb-1">
              Addresses
            </Text>
            <Text className="text-sm text-[#475569] mb-1">Pickup Address</Text>
            <View className="flex-row items-center bg-white border border-[#E2E8F0] rounded-xl p-3">
              <Ionicons name="location-outline" size={18} color="#2563EB" />
              <Text className="text-sm text-[#1E293B] ml-2">
                Amberkhana, Sylhet
              </Text>
            </View>
          </View>

          {/* Order Details */}
          <Text className="text-base font-semibold text-[#1E293B] mb-3">
            Order Details
          </Text>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#475569]">Bag Size</Text>
            <Text className="text-sm text-[#1E293B]">Small (~5 lbs)</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#475569]">Can clothes be mixed?</Text>
            <Text className="text-sm text-[#1E293B]">Yes</Text>
          </View>

          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#475569]">Service</Text>
            <Text className="text-sm text-[#1E293B]">Full Service</Text>
          </View>

          <View className="flex-row justify-between mb-4">
            <Text className="text-sm text-[#475569]">Estimated Cost</Text>
            <Text className="text-sm font-semibold text-[#2563EB]">$35.25</Text>
          </View>

          {/* Notes */}
          <View className="bg-white border border-[#E2E8F0] rounded-xl p-3 mb-3">
            <Text className="text-xs text-[#475569]">
              <Text className="font-semibold text-[#1E293B]">Notes: </Text>
              Please separate delicates. Cold wash preferred.
            </Text>
          </View>
        </View>

        {/* Buttons */}
        <TouchableOpacity onPress={() => router.push("/(tab)/tracking")} className="bg-primary/10 h-16 rounded-xl items-center justify-center mb-3">
          <Text className="text-primary font-semibold text-lg">
            Track Order
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/")}
          className="w-full"
        >
          <PrimaryButton text="Go to Home"/>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
