import PrimaryButton from "@/components/shared/PrimaryButton";
import { laundries } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

export default function ReviewOrderScreen() {
  const { id } = useLocalSearchParams();
  const laundry = laundries.find((item) => item.id === id) || laundries[0];

  const pricePerLb = 1.75;
  const serviceFee = 3.5;
  const estimatedWeight = 3.3; // Example estimate
  const estimatedCost = pricePerLb * estimatedWeight + serviceFee;

  return (
    <View className="flex-1 bg-white">
      <ScrollView
        className="px-5 pt-4"
        contentContainerStyle={{ paddingBottom: 120 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Laundry Info */}
        <View className="flex-row items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mb-5">
          <Image
            source={{ uri: laundry.image }}
            className="w-16 h-16 rounded-lg mr-3"
          />
          <View>
            <Text className="text-base font-semibold text-[#1E293B]">
              {laundry.name}
            </Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="star" size={14} color="#FACC15" />
              <Text className="text-sm text-[#475569] ml-1">
                {laundry.rating} (234)
              </Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="time-outline" size={14} color="#64748B" />
              <Text className="text-sm text-[#64748B] ml-1">
                Turnaround: 5 hours
              </Text>
            </View>
          </View>
        </View>

        {/* Address Section */}
        <View className="mb-5">
          <Text className="text-base font-semibold text-[#1E293B] mb-1">
            Addresses
          </Text>
          <Text className="text-sm text-[#475569] mb-1">Pickup Address</Text>
          <View className="flex-row items-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-3">
            <Ionicons name="location-outline" size={18} color="#2563EB" />
            <Text className="text-sm text-[#1E293B] ml-2">
              Amberkhana, Sylhet
            </Text>
          </View>
        </View>

        {/* Order Details */}
        <View className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mb-5">
          <Text className="text-base font-semibold text-[#1E293B] mb-3">
            Order Details
          </Text>

          {/* Bag Size */}
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#475569]">Bag Size</Text>
            <Text className="text-sm text-[#1E293B]">Small (~5 lbs)</Text>
          </View>

          {/* Service */}
          <View className="flex-row justify-between mb-4">
            <Text className="text-sm text-[#475569]">Service</Text>
            <Text className="text-sm text-[#1E293B]">Full Service</Text>
          </View>

          {/* Notes */}
          <View className="bg-white border border-[#E2E8F0] rounded-xl p-3 mb-4">
            <Text className="text-xs text-[#475569]">
              <Text className="font-semibold text-[#1E293B]">Notes: </Text>
              Please separate delicates. Cold wash preferred.
            </Text>
          </View>

          {/* Price Breakdown */}
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#475569]">Price/lbs</Text>
            <Text className="text-sm text-[#1E293B]">${pricePerLb.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mb-2">
            <Text className="text-sm text-[#475569]">Service Fee</Text>
            <Text className="text-sm text-[#1E293B]">${serviceFee.toFixed(2)}</Text>
          </View>

          {/* Total */}
          <View className="flex-row justify-between items-center border-t border-[#E2E8F0] mt-3 pt-3">
            <Text className="text-base font-semibold text-[#1E293B]">
              Total Estimated Cost
            </Text>
            <Text className="text-xl font-bold text-[#0F172A]">
              ${estimatedCost.toFixed(2)}
            </Text>
          </View>

          <Text className="text-xs text-[#64748B] mt-1">
            Final price will be confirmed after laundry is weighed
          </Text>
        </View>
          <Text className="text-md text-center text-[#64748B] mt-1">
            Laundry Protection Included — Free coverage up to $25/item, $200/order
          </Text>
      </ScrollView>

      {/* Continue Button */}
      <View className="absolute bottom-10 left-5 right-5">
              <TouchableOpacity onPress={() => router.push({ pathname: "/order/orderConfirm" })} className="w-full">
          <PrimaryButton text="Confirm Order"/>
        </TouchableOpacity>
      </View>
    </View>
  );
}
