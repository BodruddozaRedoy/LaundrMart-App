import SlideToOrder from "@/components/common/SlideToOrder";
import { images } from "@/constants";
import { useUser } from "@/hooks/useUser";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const fullService = images.FullService;
  const dropOff = images.DropOff;
  const parcel = images.ReceiveParcel;
  const banners = [images.CarBannerOne, images.CarBannerOne, images.CarBannerOne]; // add more if available

  const [activeIndex, setActiveIndex] = useState(0);


  const { customerProfile } = useUser()
  useEffect(() => {
    console.log(customerProfile)
  }, [])


  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar className="#fff" barStyle={"dark-content"} />
      <ScrollView
        className="flex-1 bg-white px-5 mb-14"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row justify-between items-center mt-7 mb-6">
          <View>
            <Text className="text-2xl font-bold text-[#1E293B]">
              Hello, {customerProfile?.full_name || "there"} 👋
            </Text>
            <Text className="text-[#64748B] text-md mt-1">
              Ready for laundry?
            </Text>
          </View>

          <TouchableOpacity onPress={() => router.push("/notification")}>
            <Ionicons name="notifications-outline" size={28} color="black" />
          </TouchableOpacity>
        </View>

        {/* Banner Carousel */}
        <View className="w-full mb-4">
          <Carousel
            loop
            width={width - 40}
            height={160}
            autoPlay
            autoPlayInterval={3500}
            data={banners}
            scrollAnimationDuration={800}
            onSnapToItem={(index) => setActiveIndex(index)}
            renderItem={({ item }) => (
              <View className="rounded-2xl overflow-hidden">
                <Image
                  source={item}
                  className="w-full h-40"
                  resizeMode="cover"
                />
              </View>
            )}
          />

          {/* Pagination Dots */}
          <View className="flex-row justify-center mt-3">
            {banners.map((_, index) => (
              <View
                key={index}
                className={`h-2.5 rounded-full mx-1 ${index === activeIndex ? "w-6 bg-[#2563EB]" : "w-2.5 bg-[#CBD5E1]"
                  }`}
              />
            ))}
          </View>
        </View>

        {/* Services Title */}
        <Text className="text-2xl font-bold text-[#1E293B] mb-4">
          Our Services
        </Text>

        {/* Services Cards */}
        <View className="gap-4 mb-8">
          {/* Full Service */}
          <TouchableOpacity className="flex-row items-center p-4 rounded-2xl border border-[#B0D7ED] bg-white">
            <View className="size-20 items-center justify-center mr-4">
              <Image
                source={fullService}
                className="size-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-[#1E293B] mb-1">
                Full Service
              </Text>
              <Text className="text-[#64748B] text-md leading-5">
                We pick up your laundry, clean it, and deliver it back to you.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Drop-Off */}
          <TouchableOpacity className="flex-row items-center p-4 rounded-2xl border border-[#B0D7ED] bg-white">
            <View className="size-20 items-center justify-center mr-4">
              <Image
                source={dropOff}
                className="size-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-[#1E293B] mb-1">
                Drop-Off
              </Text>
              <Text className="text-[#64748B] text-md leading-5">
                Drop your laundry at your chosen LaundrMart, we clean it, and
                deliver it back to you.
              </Text>
            </View>
          </TouchableOpacity>

          {/* Receive Parcel */}
          <TouchableOpacity className="flex-row items-center p-4 rounded-2xl border border-[#B0D7ED] bg-white">
            <View className="size-20 items-center justify-center mr-4">
              <Image
                source={parcel}
                className="size-full"
                resizeMode="contain"
              />
            </View>
            <View className="flex-1">
              <Text className="text-base font-bold text-[#1E293B] mb-1">
                Receive Parcel
              </Text>
              <Text className="text-[#64748B] text-md leading-5">
                We collect your laundry and deliver it to your door.
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <SlideToOrder />
    </SafeAreaView>
  );
}
