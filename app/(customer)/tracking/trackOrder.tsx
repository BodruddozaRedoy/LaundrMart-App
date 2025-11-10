import HeaderBackButton from "@/components/common/HeaderBackButton";
import { orders } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import AntDesign from '@expo/vector-icons/AntDesign';
import { useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import {
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// ✅ Sample orders (comes from shared array in real app)


export default function TrackOrderScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const order = orders.find((item) => item.id === id) || orders[0];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle={"dark-content"} />
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 py-3 border-b border-[#E2E8F0]">
        <HeaderBackButton onPress={() => router.back()} />
        <Text className="text-lg font-semibold text-[#1E293B]">Track Order</Text>
        <View className="w-5" />
      </View>

      <ScrollView
        className="px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Report Details */}
        <View className="bg-primary/10 border-primary border rounded-2xl p-4 mt-5">
          <Text className="text-base font-semibold text-[#1E293B] mb-1">
            {order.report.title}
          </Text>
          <Text className="text-sm text-[#475569] mb-3">
            {order.report.description}
          </Text>
          <View className="flex-row justify-between">
            {order.report.images.map((img, index) => (
              <Image
                key={index}
                source={{ uri: img }}
                className="w-[30%] h-20 rounded-lg"
              />
            ))}
          </View>
        </View>

        {/* Order Card */}
        <View className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mt-5">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-3">
            <Text className="text-sm font-medium text-[#1E293B]">
              Order {order.orderId}
            </Text>
            <View className="bg-[#FEF3C7] px-2.5 py-0.5 rounded-md">
              <Text className="text-xs font-medium text-[#B45309]">
                {order.status}
              </Text>
            </View>
          </View>

          {/* Date */}
          <View className="flex-row items-center mb-3">
            <Ionicons name="calendar-outline" size={16} color="#64748B" />
            <Text className="text-sm text-[#64748B] ml-2">{order.date}</Text>
          </View>

          {/* Address */}
          <Text className="text-base font-semibold text-[#1E293B] mb-1">
            Addresses
          </Text>
          <View className="flex-row items-center mb-3">
            <Ionicons name="location-outline" size={18} color="#2563EB" />
            <Text className="text-sm text-[#1E293B] ml-2">{order.address}</Text>
          </View>

          {/* Details */}
          <Text className="text-base font-semibold text-[#1E293B] mb-2">
            Order Details
          </Text>
          <View className="flex-row justify-between mb-1">
            <Text className="text-sm text-[#475569]">Weight</Text>
            <Text className="text-sm text-[#1E293B]">{order.weight}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-sm text-[#475569]">Delivery Method</Text>
            <Text className="text-sm text-[#1E293B]">
              {order.deliveryMethod}
            </Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-sm text-[#475569]">Bag Size</Text>
            <Text className="text-sm text-[#1E293B]">{order.bagSize}</Text>
          </View>
          <View className="flex-row justify-between mb-1">
            <Text className="text-sm text-[#475569]">Total Cost</Text>
            <Text className="text-sm font-semibold text-primary">
              {order.totalCost}
            </Text>
          </View>
        </View>

        {/* Order Progress */}
        <View className="mt-6 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
          {order.messages.map((step, index) => {
            const isCompleted = index === 0; // highlight first one
            return (
              <View key={step.id} className="flex-row mb-6">
                {/* Icon + line */}
                <View className="items-center">
                  <View
                    className={`w-8 h-8 rounded-full items-center justify-center ${
                      isCompleted ? "bg-[#E0F2FE]" : "bg-[#F1F5F9]"
                    }`}
                  >
                    <Ionicons
                      name={step.icon as any}
                      size={18}
                      color={isCompleted ? "#2563EB" : "#94A3B8"}
                    />
                  </View>
                  {index < order.messages.length - 1 && (
                    <View
                      className={`w-[2px] flex-1 h-8 ${
                        isCompleted ? "bg-primary" : "bg-[#CBD5E1]"
                      }`}
                    />
                  )}
                </View>

                {/* Text */}
                <View className="ml-4 mt-1">
                  <Text
                    className={`text-sm font-medium ${
                      isCompleted ? "text-primary" : "text-[#94A3B8]"
                    }`}
                  >
                    {step.title}
                  </Text>
                  <Text
                    className={`text-xs ${
                      isCompleted ? "text-[#475569]" : "text-[#CBD5E1]"
                    }`}
                  >
                    {step.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Driver Details */}
        {/* <View className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mt-3">
          <Text className="text-base font-semibold text-[#1E293B] mb-3">
            Driver Details
          </Text>
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: order.driver.image }}
              className="w-12 h-12 rounded-full mr-3"
            />
            <View>
              <Text className="text-[#1E293B] font-semibold">
                {order.driver.name}
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#FACC15" />
                <Text className="text-xs text-[#475569] ml-1">
                  {order.driver.rating} ({order.driver.deliveries} deliveries)
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="bg-[#E0F2FE] py-2 rounded-xl items-center">
            <Text className="text-[#2563EB] font-medium text-sm">
              <Ionicons name="call-outline" size={14} color="#2563EB" /> Call
            </Text>
          </TouchableOpacity>
        </View> */}

        {/* LaundryMart Details */}
        <View className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mt-3 mb-5">
          <Text className="text-base font-semibold text-[#1E293B] mb-3">
            LaundryMart Details
          </Text>
          <View className="flex-row items-center mb-3">
            <Image
              source={{ uri: order.laundryMart.image }}
              className="w-12 h-12 rounded-lg mr-3"
            />
            <View>
              <Text className="text-[#1E293B] font-semibold">
                {order.laundryMart.name}
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="star" size={14} color="#FACC15" />
                <Text className="text-xs text-[#475569] ml-1">
                  {order.laundryMart.rating} (
                  {order.laundryMart.reviews} reviews)
                </Text>
              </View>
            </View>
          </View>
          <View className="flex-row gap-2 items-center ">
            <TouchableOpacity className="bg-[#E0F2FE] w-1/2 py-3 rounded-xl items-center">
            <Text className="text-primary font-medium text-sm">
              <AntDesign name="message" size={14} color="#017FC6" /> Message
            </Text>
          </TouchableOpacity>
            <TouchableOpacity className="bg-[#E0F2FE] py-3 w-1/2 rounded-xl items-center">
              <Text className="text-primary font-medium text-sm">
                <Ionicons name="call-outline" size={14} color="#017FC6" /> Call
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
