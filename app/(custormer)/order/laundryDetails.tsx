import PrimaryButton from "@/components/shared/PrimaryButton";
import { laundries } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export default function LaundryDetailsScreen() {
    const { id } = useLocalSearchParams();
    const laundry = laundries.find((item) => item.id === id) || laundries[0];

    const [showHoursModal, setShowHoursModal] = useState(false);
    const [showInfoAlert, setShowInfoAlert] = useState(false);

    const handleCloseInfoAlert = () => setShowInfoAlert(false);

  return (
      <View className="flex-1 bg-white">
          <ScrollView
              contentContainerStyle={{ paddingBottom: 100 }}
              showsVerticalScrollIndicator={false}
              className="px-5 pt-4"
          >
              {/* Laundry Image */}
              <Image
                  source={{ uri: laundry.image }}
                  className="w-full h-48 rounded-2xl mb-4"
              />

              {/* Name, Location, Rating */}
              <View className="mb-2">
                  <Text className="text-lg font-semibold text-[#1E293B]">
                      {laundry.name}
                  </Text>
                  <View className="flex-row items-center mt-1">
                      <Text className="text-sm text-[#64748B] mr-2">
                          {laundry.location || "Cisarua, Bandung"}
                      </Text>
                      <Ionicons name="star" size={14} color="#FACC15" />
                      <Text className="text-sm text-[#64748B] ml-1">
                          {laundry.rating}
                      </Text>
                  </View>
              </View>

              {/* Turnaround Time + Info */}
              <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row">
                      <Text className="text-[#64748B] text-sm">Turnaround Time: </Text>
                      <Text className="text-[#1E293B] font-semibold text-sm">
                          {laundry.turnaround}
                      </Text>
                  </View>

                  {/* Info Icon */}
                  <TouchableOpacity
                      className="ml-2 relative"
                      onPress={() => setShowInfoAlert(!showInfoAlert)}
                  >
                      <Ionicons
                          name="information-circle-outline"
                          size={18}
                          color="#2563EB"
                      />
                  </TouchableOpacity>
              </View>

              {/* Description */}
              <Text className="text-[#475569] text-sm leading-5 mb-3">
                  {laundry.description}
              </Text>

              {/* Store Hours Link */}
              <TouchableOpacity
                  className="flex-row items-center mb-5"
                  onPress={() => setShowHoursModal(true)}
              >
                  <Ionicons name="time-outline" size={18} color="#2563EB" />
                  <Text className="text-[#2563EB] text-sm font-medium ml-1">
                      See Store Hours
                  </Text>
              </TouchableOpacity>

              {/* Price */}
              <Text className="text-lg font-bold text-[#1E293B] mb-5">
                  {laundry.price}
                  <Text className="text-sm font-normal text-[#64748B]"> /lbs</Text>
              </Text>

              {/* Our Services */}
              <Text className="text-base font-semibold text-[#1E293B] mb-3">
                  Our Services
              </Text>

              <FlatList
                  data={laundry.services}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(item) => item.name}
                  renderItem={({ item }) => (
                      <View className="mr-4 bg-white border border-gray-200 rounded-xl p-3 w-40">
                          <Image
                              source={{ uri: item.image }}
                              className="w-full h-24 rounded-lg mb-2"
                          />
                          <Text className="text-sm font-semibold text-[#1E293B]">
                              {item.name}
                          </Text>
                          <Text className="text-xs text-[#64748B] mt-1">{item.price}</Text>
                      </View>
                  )}
              />
          </ScrollView>

          {/* Continue Button */}
          <View className="absolute bottom-10 left-5 right-5">
              <TouchableOpacity onPress={() => router.push({ pathname: "/order/bookNow", params: { id: laundry?.id } })} className="w-full">
                  <PrimaryButton text="Book Now" />
              </TouchableOpacity>
          </View>

          {/* ✅ Info Alert Overlay */}
          {showInfoAlert && (
              <Modal
                  visible={showInfoAlert}
                  transparent
                  animationType="fade"
                  onRequestClose={handleCloseInfoAlert}
              >
                  <TouchableWithoutFeedback onPress={handleCloseInfoAlert}>
                      <View className="flex-1 bg-black/40 justify-center items-center">
                          {/* Empty background to catch clicks */}
                      </View>
                  </TouchableWithoutFeedback>

                  {/* Tooltip positioned absolutely */}
                  <View className="absolute top-[330px] right-10 bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg px-4 py-2 w-64 shadow-md z-50">
                      <View className="flex-row items-start">
                          <Ionicons
                              name="information-circle-outline"
                              size={16}
                              color="#2563EB"
                              style={{ marginTop: 2 }}
                          />
                          <Text className="text-xs text-[#475569] ml-2">
                              {laundry.infoAlert}
                          </Text>
                      </View>
                  </View>
              </Modal>
          )}

          {/* Store Hours Modal */}
          <Modal
              visible={showHoursModal}
              transparent
              animationType="fade"
              onRequestClose={() => setShowHoursModal(false)}
          >
              <View className="flex-1 bg-black/40 justify-center items-center">
                  <View className="bg-white rounded-2xl w-80 p-5 shadow-xl">
                      <View className="flex-row items-center justify-between mb-4">
                          <View className="flex-row items-center">
                              <View className="p-1 rounded-full bg-primary/10"><Ionicons name="time-outline" size={18} color="#2563EB" /></View>
                              <Text className="text-lg font-bold text-[#1E293B] ml-1">
                                  Store Hours
                              </Text>
                          </View>
                          <TouchableOpacity className="bg-red-100 p-1 rounded-lg" onPress={() => setShowHoursModal(false)}>
                              <Ionicons name="close" size={20} color="#EF4444" />
                          </TouchableOpacity>
                      </View>

                      {laundry.storeHours.map((hour) => (
                          <View
                              key={hour.weekday}
                              className="flex-row items-center justify-between mb-5"
                          >
                              <View className="flex-row items-center">
                                  <Ionicons
                                      name="calendar-outline"
                                      size={16}
                                      color="#64748B"
                                  />
                                  <Text className="text-sm text-[#475569] ml-2 w-28">
                                      {hour.weekday}
                                  </Text>
                              </View>
                              <Text
                                  className={`text-sm ${hour.time === "Closed"
                                      ? "text-gray-400 italic"
                                      : "text-[#1E293B]"
                                      }`}
                              >
                                  {hour.time}
                              </Text>
                          </View>
                      ))}
                  </View>
              </View>
          </Modal>
    </View>
  );
}
