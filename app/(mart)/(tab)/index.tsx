import { Ionicons } from "@expo/vector-icons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { router } from "expo-router";
import React from "react";
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function DashboardScreen() {
  const orders = [
    { id: "ORD-1233", customer: "Mike Chen", time: "1 hour ago", price: "$30.00", status: "In Progress" },
    { id: "ORD-1241", customer: "Sophia Lee", time: "2 hours ago", price: "$25.00", status: "Drying" },
    { id: "ORD-1250", customer: "Daniel Kim", time: "3 hours ago", price: "$42.00", status: "Out for Delivery" },
    { id: "ORD-1262", customer: "Emma Davis", time: "Yesterday", price: "$37.00", status: "Ready for Delivery" },
  ];

  const { width } = Dimensions.get("window");
  const isMd = width >= 768;     // Small tablet
  const isLg = width >= 1024;    // Large tablet

  const iconSize = isLg ? 42 : isMd ? 34 : 22;

  const getStatusBg = (status: string) => {
    switch (status) {
      case "In Progress": return "bg-orange-100";
      case "Drying": return "bg-blue-100";
      case "Out for Delivery": return "bg-purple-100";
      case "Ready for Delivery": return "bg-green-100";
      default: return "bg-gray-100";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "In Progress": return "text-orange-600";
      case "Drying": return "text-blue-600";
      case "Out for Delivery": return "text-purple-600";
      case "Ready for Delivery": return "text-green-600";
      default: return "text-gray-600";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView
        className="px-5 pb-10 pt-6 md:px-10 md:pt-10 lg:px-16 lg:pt-14"
        showsVerticalScrollIndicator={false}
      >

        {/* Header */}
        <View className="flex-row justify-between items-center mb-6 md:mb-10 lg:mb-14">
          <View>
            <Text className="text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Hello, Bodruddoza Redoy
            </Text>
            <Text className="text-gray-500 text-md md:text-xl lg:text-2xl mt-1">
              Ready for laundry?
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.push("/(mart)/notification")}>
            <Ionicons name="notifications-outline" size={iconSize} color="#111827" />
          </TouchableOpacity>
        </View>

        {/* Order Summary */}
        <View className="flex-row flex-wrap justify-between mb-6 md:mb-10 lg:mb-14">

          {/* Total Orders */}
          <View className="w-[48%] bg-orange-50 rounded-2xl md:rounded-3xl lg:rounded-[30px] p-4 md:p-6 lg:p-8 mb-3 flex-row items-center gap-3">
            <View className="h-full bg-orange-600 w-1 rounded-lg" />
            <View>
              <View className="flex-row gap-2 items-center">
                <FontAwesome6 name="clock-rotate-left" size={isLg ? 26 : isMd ? 20 : 12} color="#ea580c" />
                <Text className="text-orange-600 text-md md:text-xl lg:text-2xl font-semibold">
                  Total Orders
                </Text>
              </View>
              <Text className="text-3xl md:text-5xl lg:text-6xl font-bold text-orange-600">12</Text>
              <Text className="text-sm md:text-lg lg:text-xl text-orange-600 mt-1">Pending</Text>
            </View>
          </View>

          {/* Completed Orders */}
          <View className="w-[48%] bg-green-50 rounded-2xl md:rounded-3xl lg:rounded-[30px] p-4 md:p-6 lg:p-8 mb-3 flex-row items-center gap-3">
            <View className="h-full bg-green-600 w-1 rounded-lg" />
            <View>
              <View className="flex-row gap-2 items-center">
                <Ionicons name="checkmark-done-circle-outline" size={iconSize} color="#16a34a" />
                <Text className="text-green-600 text-md md:text-xl lg:text-2xl font-semibold">
                  This Month
                </Text>
              </View>
              <Text className="text-3xl md:text-5xl lg:text-6xl font-bold text-green-600">06</Text>
              <Text className="text-sm md:text-lg lg:text-xl text-green-600 mt-1">Completed</Text>
            </View>
          </View>

          {/* Accepted Orders */}
          <View className="w-[48%] bg-blue-50 rounded-2xl md:rounded-3xl lg:rounded-[30px] p-4 md:p-6 lg:p-8 mb-3 flex-row items-center gap-3">
            <View className="h-full bg-blue-600 w-1 rounded-lg" />
            <View>
              <View className="flex-row gap-2 items-center">
                <FontAwesome5 name="handshake" size={iconSize} color="#2563eb" />
                <Text className="text-blue-600 text-md md:text-xl lg:text-2xl font-semibold">
                  This Month
                </Text>
              </View>
              <Text className="text-3xl md:text-5xl lg:text-6xl font-bold text-blue-600">05</Text>
              <Text className="text-sm md:text-lg lg:text-xl text-blue-600 mt-1">Accepted</Text>
            </View>
          </View>

          {/* Canceled Orders */}
          <View className="w-[48%] bg-red-50 rounded-2xl md:rounded-3xl lg:rounded-[30px] p-4 md:p-6 lg:p-8 mb-3 flex-row items-center gap-3">
            <View className="h-full bg-red-600 w-1 rounded-lg" />
            <View>
              <View className="flex-row gap-2 items-center">
                <MaterialCommunityIcons name="cancel" size={iconSize} color="#dc2626" />
                <Text className="text-red-600 text-md md:text-xl lg:text-2xl font-semibold">
                  This Month
                </Text>
              </View>
              <Text className="text-3xl md:text-5xl lg:text-6xl font-bold text-red-600">04</Text>
              <Text className="text-sm md:text-lg lg:text-xl text-red-600 mt-1">Canceled</Text>
            </View>
          </View>

        </View>

        {/* Alerts */}
        <View className="border border-gray-200 rounded-2xl md:rounded-3xl lg:rounded-[30px] p-4 md:p-6 lg:p-8 mb-6">

          <Text className="text-base md:text-2xl lg:text-3xl font-semibold text-gray-900 mb-3 md:mb-5">
            Alerts / Notifications
          </Text>

          <View className="bg-yellow-50 border border-yellow-100 rounded-xl md:rounded-2xl lg:rounded-3xl px-3 py-3 md:px-5 md:py-5 flex-row items-center mb-3">
            <Ionicons name="warning-outline" size={iconSize} color="#F59E0B" />
            <View className="ml-3">
              <Text className="text-sm md:text-lg lg:text-xl text-gray-800 font-medium">
                2 orders are overdue
              </Text>
              <Text className="text-xs md:text-base lg:text-lg text-gray-500">
                Past turnaround time
              </Text>
            </View>
          </View>

          <View className="bg-blue-50 border border-blue-100 rounded-xl md:rounded-2xl lg:rounded-3xl px-3 py-3 md:px-5 md:py-5 flex-row items-center">
            <Ionicons name="warning-outline" size={iconSize} color="#3B82F6" />
            <View className="ml-3">
              <Text className="text-sm md:text-lg lg:text-xl text-gray-800 font-medium">
                Tomorrow is a holiday
              </Text>
              <Text className="text-xs md:text-base lg:text-lg text-gray-500">
                Update hours?
              </Text>
            </View>
          </View>

        </View>

        {/* Recent Orders */}
        <View className="border border-gray-200 rounded-2xl md:rounded-3xl lg:rounded-[30px] p-4 md:p-6 lg:p-8 mb-10">
          <Text className="text-lg md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 md:mb-5">
            Recent Orders
          </Text>

          {orders.map((order, index) => (
            <View
              key={index}
              className={`border-b border-gray-100 pb-3 mb-3 ${index === orders.length - 1 ? "border-b-0 mb-0 pb-0" : ""
                }`}
            >
              <View className="flex-row justify-between items-center mb-1">
                <Text className="text-sm md:text-xl lg:text-2xl font-semibold text-gray-900">
                  #{order.id}
                </Text>

                <View className={`px-2.5 py-1 rounded-full ${getStatusBg(order.status)}`}>
                  <Text className={`text-[11px] md:text-base lg:text-lg font-semibold ${getStatusText(order.status)}`}>
                    {order.status}
                  </Text>
                </View>
              </View>

              <Text className="text-sm md:text-xl lg:text-2xl text-gray-800">
                {order.customer}
              </Text>

              <View className="flex-row justify-between items-center mt-1">
                <Text className="text-xs md:text-lg lg:text-xl text-gray-400">
                  {order.time}
                </Text>

                <Text className="text-base md:text-3xl lg:text-4xl font-semibold text-gray-900">
                  {order.price}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
