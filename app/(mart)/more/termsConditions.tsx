import HeaderBackButton from "@/components/common/HeaderBackButton";
import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 📌 Tablet breakpoints
const { width } = Dimensions.get("window");
const isMd = width >= 768;     // iPad
const isLg = width >= 1024;    // iPad Pro or large tablet

// 📌 Dynamic sizes
const headerText = isLg ? "text-4xl" : isMd ? "text-3xl" : "text-lg";
const subText = isLg ? "text-xl" : isMd ? "text-lg" : "text-xs";
const bodyText = isLg ? "text-3xl" : isMd ? "text-2xl" : "text-md";

const TermsConditionsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white mt-5 md:mt-10 lg:mt-12">
      {/* Header */}
      <View className="flex-row items-center px-5 mb-4 md:mb-8 lg:mb-10">
        <HeaderBackButton onPress={() => router.push("/(mart)/(tab)/more")} />
        <Text
          className={`flex-1 text-center font-semibold text-gray-800 ${headerText}`}
        >
          Terms & Conditions
        </Text>
      </View>

      {/* Body */}
      <ScrollView className="px-5 pt-5 md:px-10 lg:px-16 md:pt-8 lg:pt-10">
        <Text className={`text-gray-500 mb-2 ${subText}`}>
          Last Update: 10 Jun 2025
        </Text>

        <Text
          className={`text-gray-700 mb-6 ${isLg ? "leading-10" : isMd ? "leading-8" : "leading-6"
            } ${bodyText}`}
        >
          Lorem ipsum dolor sit amet consectetur. Ultrices id feugiat venenatis
          habitant mattis viverra elementum purus volutpat. Lacus eu molestie
          pulvinar rhoncus integer proin elementum. Pretium sit fringilla massa
          tristique aenean commodo leo. Aliquet viverra amet sit porta elementum
          et pellentesque posuere. Ullamcorper viverra tortor lobortis viverra
          auctor egestas. Nulla condimentum ac mattis quam turpis gravida ut
          velit. Porta justo lacus consequat sed platea. Ut duis massa quam elit
          faucibus consectetur sapien aenean auctor. Felis ipsum amet justo in.
          Netus amet in egestas sed auctor lorem. Justo ullamcorper velit
          habitasse lorem eu arcu. Non enim a elit urna eget nibh quisque donec
          condimentum. Elit ut pellentesque neque in quis at viverra. Nisl etiam
          tristique odio eget convallis.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TermsConditionsScreen;
