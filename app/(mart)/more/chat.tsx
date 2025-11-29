import HeaderBackButton from "@/components/common/HeaderBackButton";
import { Ionicons } from "@expo/vector-icons";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// 📌 Tablet detection
const { width } = Dimensions.get("window");
const isMd = width >= 768;
const isLg = width >= 1024;

// 📌 Dynamic scaling
const avatarSize = isLg ? 70 : isMd ? 55 : 36;
const headerAvatarSize = isLg ? 80 : isMd ? 60 : 36;
const iconSize = isLg ? 36 : isMd ? 28 : 20;
const textMd = isLg ? "text-3xl" : isMd ? "text-2xl" : "text-base";
const textSm = isLg ? "text-2xl" : isMd ? "text-xl" : "text-sm";

const ChatScreen = () => {
  const [message, setMessage] = useState("");

  const messages = [
    { id: "1", sender: "other", type: "text", text: "Hi, are you available?", time: "9:41 AM" },
    { id: "2", sender: "me", type: "text", text: "Yes, I am Available", time: "9:42 AM" },
    { id: "3", sender: "date", text: "Thursday 24, 2025" },
    { id: "4", sender: "other", type: "text", text: "Hi, Did you heard?", time: "9:44 AM" },
    { id: "5", sender: "other", type: "audio", time: "9:45 AM" },
    { id: "6", sender: "other", type: "text", text: "Ok!", time: "9:46 AM" },
    { id: "7", sender: "me", type: "audio", time: "9:47 AM" },
  ];

  const renderMessage = ({ item }: any) => {
    if (item.sender === "date") {
      return (
        <View className="items-center my-3">
          <Text className={`text-gray-400 ${isMd ? "text-base" : "text-xs"}`}>
            {item.text}
          </Text>
        </View>
      );
    }

    const isMe = item.sender === "me";

    return (
      <View
        className={`flex-row ${
          isMe ? "justify-end" : "justify-start"
        } mb-3 px-2`}
      >
        {!isMe && (
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
            }}
            style={{ width: avatarSize, height: avatarSize }}
            className="rounded-full mr-2 self-end"
          />
        )}

        <View
          className={`rounded-2xl p-3 md:p-5 ${
            isMe ? "bg-primary" : "bg-gray-100"
          }`}
          style={{ maxWidth: isMd ? "80%" : "75%" }}
        >
          {item.type === "text" && (
            <Text
              className={`${isMe ? "text-white" : "text-gray-800"} ${textSm}`}
            >
              {item.text}
            </Text>
          )}

          {item.type === "audio" && (
            <View
              className={`flex-row items-center ${
                isMe ? "justify-end" : "justify-start"
              }`}
            >
              <Ionicons
                name="play-circle"
                size={iconSize}
                color={isMe ? "white" : "#007AFF"}
              />
              <Text
                className={`mx-2 ${
                  isMe ? "text-white" : "text-gray-700"
                  } ${textSm}`}
              >
                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
              </Text>
              <Ionicons
                name="volume-high-outline"
                size={iconSize - 6}
                color={isMe ? "white" : "#007AFF"}
              />
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white pt-5">
      {/* HEADER */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <HeaderBackButton
          onPress={() => router.back()}
        />

        <View className="flex-row items-center ml-3 flex-1">
          <Image
            source={{
              uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
            }}
            style={{ width: headerAvatarSize, height: headerAvatarSize }}
            className="rounded-full"
          />

          <View className="ml-2">
            <Text className={`font-semibold text-gray-800 ${textMd}`}>
              Shirts Laundry
            </Text>

            <View className="flex-row items-center">
              <View
                className="bg-green-500 rounded-full mr-1"
                style={{
                  width: isLg ? 14 : isMd ? 10 : 6,
                  height: isLg ? 14 : isMd ? 10 : 6,
                }}
              />
              <Text className={`${textSm} text-gray-500`}>Active Now</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2 ml-2">
          <TouchableOpacity>
            <Entypo name="phone" size={iconSize} color="black" />
          </TouchableOpacity>

          <TouchableOpacity className="ml-2">
            <Ionicons
              name="ellipsis-vertical"
              size={iconSize - 4}
              color="#444"
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* MESSAGES */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingVertical: 10,
          paddingHorizontal: isMd ? 12 : 6,
        }}
      />

      {/* MESSAGE INPUT */}
      <View
        className="flex-row items-center border-t border-gray-100 px-5 py-4"
        style={{
          paddingVertical: isMd ? 16 : 12,
          paddingHorizontal: isMd ? 24 : 20,
        }}
      >
        <TextInput
          placeholder="Send Message"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          className={`
            flex-1 bg-gray-100 rounded-full px-4 text-gray-700
            ${isMd ? "py-5 text-xl" : "py-4 text-sm"}
          `}
        />

        <TouchableOpacity className="ml-2">
          <Ionicons name="image-outline" size={iconSize - 4} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity
          className="ml-3 rounded-full bg-primary"
          style={{ padding: isMd ? 14 : 10 }}
        >
          <Ionicons name="mic-outline" size={iconSize - 4} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
