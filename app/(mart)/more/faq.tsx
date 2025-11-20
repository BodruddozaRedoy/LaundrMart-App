import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 📌 Tablet breakpoints
const { width } = Dimensions.get("window");
const isMd = width >= 768;
const isLg = width >= 1024;

// 📌 Dynamic sizes
const iconSize = isLg ? 36 : isMd ? 26 : 18;
const questionText = isLg ? "text-3xl" : isMd ? "text-2xl" : "text-base";
const answerText = isLg ? "text-2xl" : isMd ? "text-xl" : "text-sm";
const headerText = isLg ? "text-4xl" : isMd ? "text-3xl" : "text-lg";

const faqs = [
  {
    id: 1,
    question: "Do you have delicate clothes?",
    answer: "Please make sure to separate delicate clothes.",
  },
  {
    id: 2,
    question: "Can clothes be mixed?",
    answer: "We recommend separating colors and fabrics.",
  },
  {
    id: 3,
    question: "What is this platform used for?",
    answer:
      "LaundrMart helps you manage laundry pickup and delivery easily.",
  },
  {
    id: 4,
    question: "Is the platform easy to use?",
    answer: "Yes, the platform is designed for a simple and smooth experience.",
  },
  {
    id: 5,
    question: "Do I need to create an account to use the platform?",
    answer:
      "Yes, creating an account ensures better order tracking and service.",
  },
];

const FAQScreen = () => {
  const [expanded, setExpanded] = useState<number | null>(1);

  const toggle = (id: number) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-5 md:pt-10 lg:pt-12">
      {/* Header */}
      <View className="flex-row items-center px-5 mb-4 md:mb-8 lg:mb-10">
        <HeaderBackButton onPress={() => router.push("/(mart)/(tab)/more")} />
        <Text
          className={`flex-1 text-center font-semibold text-gray-800 ${headerText}`}
        >
          FAQ
        </Text>
      </View>

      <ScrollView className="px-4 pt-5 md:px-10 lg:px-16 md:pt-8 lg:pt-10">
        {faqs.map((faq) => (
          <View
            key={faq.id}
            className="bg-white border border-gray-200 rounded-xl mb-3 md:mb-6 lg:mb-8"
          >
            <TouchableOpacity
              onPress={() => toggle(faq.id)}
              className="flex-row justify-between items-center p-4 md:p-6 lg:p-8"
            >
              <Text
                className={`text-gray-800 font-medium flex-1 ${questionText}`}
              >
                {faq.question}
              </Text>

              <Ionicons
                name={
                  expanded === faq.id
                    ? "chevron-up-outline"
                    : "chevron-down-outline"
                }
                size={iconSize}
                color="#444"
              />
            </TouchableOpacity>

            {expanded === faq.id && (
              <View className="px-4 pb-3 md:px-6 md:pb-5 lg:px-8 lg:pb-6">
                <Text className={`text-gray-500 ${answerText}`}>
                  {faq.answer}
                </Text>
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQScreen;
