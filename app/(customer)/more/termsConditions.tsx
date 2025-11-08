import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const TermsConditionsScreen = () => {
  return (
    <SafeAreaView className="flex-1 bg-white mt-5">
      <View className="flex-row items-center px-5 mb-4">
        <HeaderBackButton onPress={() => router.push("/(customer)/(tab)/more")} />
        <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
          Terms & Conditions
        </Text>
      </View>

      <ScrollView className="px-5 pt-5">
        <Text className="text-xs text-gray-500 mb-2">
          last Update: 10 Jun 2025
        </Text>
        <Text className="text-md text-gray-700 leading-6 mb-6">
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
