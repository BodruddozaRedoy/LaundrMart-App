import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const faqs = [
  {
    id: 1,
    question: "Do you have delicate clothes?",
    answer: "Please make sure to separate delicate clothes.",
  },
  { id: 2, question: "Can clothes be mixed?", answer: "We recommend separating colors and fabrics." },
  { id: 3, question: "What is this platform used for?", answer: "LaundrMart helps you manage laundry pickup and delivery easily." },
  { id: 4, question: "Is the platform easy to use?", answer: "Yes, the platform is designed for a simple and smooth experience." },
  { id: 5, question: "Do I need to create an account to use the platform?", answer: "Yes, creating an account ensures better order tracking and service." },
];

const FAQScreen = () => {
  const [expanded, setExpanded] = useState<number | null>(1);

  const toggle = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      <View className="flex-row items-center px-5 mb-4">
        <HeaderBackButton onPress={() => router.push("/(customer)/(tab)/more")} />
        <Text className="flex-1 text-center text-lg font-semibold text-gray-800">
          FAQ
        </Text>
      </View>

      <ScrollView className="px-4 pt-5">
        {faqs.map((faq) => (
          <View key={faq.id} className="bg-white border border-gray-200 rounded-xl mb-3">
            <TouchableOpacity
              onPress={() => toggle(faq.id)}
              className="flex-row justify-between items-center p-4"
            >
              <Text className="text-gray-800 font-medium flex-1">{faq.question}</Text>
              <Ionicons
                name={expanded === faq.id ? "chevron-up-outline" : "chevron-down-outline"}
                size={18}
                color="#444"
              />
            </TouchableOpacity>
            {expanded === faq.id && (
              <View className="px-4 pb-3">
                <Text className="text-sm text-gray-500">{faq.answer}</Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;
