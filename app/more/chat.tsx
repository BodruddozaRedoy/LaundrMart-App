import { Ionicons } from "@expo/vector-icons";
import Entypo from '@expo/vector-icons/Entypo';
import React, { useState } from "react";
import {
    FlatList,
    Image,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatScreen = () => {
  const [message, setMessage] = useState("");

  const messages = [
    {
      id: "1",
      sender: "other",
      type: "text",
      text: "Hi, are you available?",
      time: "9:41 AM",
    },
    {
      id: "2",
      sender: "me",
      type: "text",
      text: "Yes, I am Available",
      time: "9:42 AM",
    },
    {
      id: "3",
      sender: "date",
      text: "Thursday 24, 2025",
    },
    {
      id: "4",
      sender: "other",
      type: "text",
      text: "Hi, Did you heard?",
      time: "9:44 AM",
    },
    {
      id: "5",
      sender: "other",
      type: "audio",
      time: "9:45 AM",
    },
    {
      id: "6",
      sender: "other",
      type: "text",
      text: "Ok!",
      time: "9:46 AM",
    },
    {
      id: "7",
      sender: "me",
      type: "audio",
      time: "9:47 AM",
    },
  ];

  const renderMessage = ({ item }: any) => {
    if (item.sender === "date") {
      return (
        <View className="items-center my-3">
          <Text className="text-xs text-gray-400">{item.text}</Text>
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
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s" }}
            className="w-8 h-8 rounded-full mr-2 self-end"
          />
        )}

        <View
          className={`max-w-[75%] p-3 rounded-2xl ${
            isMe ? "bg-primary" : "bg-gray-100"
          }`}
        >
          {item.type === "text" && (
            <Text
              className={`${
                isMe ? "text-white" : "text-gray-800"
              } text-sm leading-5`}
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
                size={20}
                color={isMe ? "white" : "#007AFF"}
              />
              <Text
                className={`mx-2 text-xs ${
                  isMe ? "text-white" : "text-gray-700"
                }`}
              >
                ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓
              </Text>
              <Ionicons
                name="volume-high-outline"
                size={16}
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
      {/* Header */}
      <View className="flex-row items-center px-4 py-3 border-b border-gray-100">
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View className="flex-row items-center ml-3 flex-1">
          <Image
            source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s" }}
            className="w-9 h-9 rounded-full"
          />
          <View className="ml-2">
            <Text className="text-gray-800 font-semibold">Shirts Laundry</Text>
            <View className="flex-row items-center">
              <View className="w-2 h-2 bg-green-500 rounded-full mr-1" />
              <Text className="text-xs text-gray-500">Active Now</Text>
            </View>
          </View>
        </View>

        <View className="flex-row gap-2">
            <TouchableOpacity className="">
          <Entypo name="phone" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity className="ml-2">
          <Ionicons name="ellipsis-vertical" size={20} color="#444" />
        </TouchableOpacity>
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={renderMessage}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />

      {/* Message Input */}
      <View className="flex-row items-center border-t border-gray-100 px-5 py-4">
        <TextInput
          placeholder="Send Message"
          placeholderTextColor="#999"
          value={message}
          onChangeText={setMessage}
          className="flex-1 bg-gray-100 rounded-full px-4 py-4 text-sm text-gray-700"
        />

        <TouchableOpacity className="ml-2">
          <Ionicons name="image-outline" size={22} color="#007AFF" />
        </TouchableOpacity>

        <TouchableOpacity className="ml-3 p-2 rounded-full bg-primary">
          <Ionicons name="mic-outline" size={22} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
