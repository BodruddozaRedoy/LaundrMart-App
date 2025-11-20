import { Ionicons } from "@expo/vector-icons";
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

// 📌 Icon scaling
const iconSize = isLg ? 38 : isMd ? 28 : 18;

const ChatScreen = () => {
    const [search, setSearch] = useState("");

    const messages = [
        {
            id: "1",
            name: "Shirts Laundry",
            message: "You are available?",
            time: "19:45",
            unread: true,
            avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
        },
        {
            id: "2",
            name: "Shirts Laundry",
            message: "You are available?",
            time: "19:45",
            unread: false,
            avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
        },
        {
            id: "3",
            name: "Shirts Laundry",
            message: "You are available?",
            time: "19:45",
            unread: true,
            avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
        },
        {
            id: "4",
            name: "Shirts Laundry",
            message: "You are available?",
            time: "19:45",
            unread: false,
            avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
        },
        {
            id: "5",
            name: "Shirts Laundry",
            message: "You are available?",
            time: "19:45",
            unread: false,
            avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
        },
        {
            id: "6",
            name: "Shirts Laundry",
            message: "You are available?",
            time: "19:45",
            unread: true,
            avatar:
                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRubA-y1eivjuhQZPJ12kTZ8eKqiu2CXPEWDg&s",
        },
    ];

    const filtered = messages.filter((msg) =>
        msg.name.toLowerCase().includes(search.toLowerCase())
    );

    const renderItem = ({ item }: any) => (
        <TouchableOpacity
            onPress={() => router.push("/(mart)/chat/inbox")}
            className="flex-row items-center justify-between py-3 md:py-5 lg:py-6 border-b border-gray-100"
        >
            {/* Left Section */}
            <View className="flex-row items-center">
                <Image
                    source={{ uri: item.avatar }}
                    className="rounded-full"
                    style={{
                        width: isLg ? 70 : isMd ? 55 : 48,
                        height: isLg ? 70 : isMd ? 55 : 48,
                    }}
                />
                <View className="ml-3 md:ml-4">
                    <Text className="text-gray-800 font-semibold text-base md:text-2xl lg:text-3xl">
                        {item.name}
                    </Text>
                    <Text className="text-gray-500 text-sm md:text-xl lg:text-2xl">
                        {item.message}
                    </Text>
                </View>
            </View>

            {/* Right Section */}
            <View className="items-end">
                <Text className="text-gray-500 text-xs md:text-lg lg:text-xl mb-1">
                    {item.time}
                </Text>

                {item.unread && (
                    <View
                        className="rounded-full bg-[#007AFF]"
                        style={{
                            width: isLg ? 18 : isMd ? 14 : 10,
                            height: isLg ? 18 : isMd ? 14 : 10,
                        }}
                    />
                )}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView className="flex-1 bg-white px-5 md:px-10 lg:px-16">

            {/* Header */}
            <View className="flex-row items-center mb-4 mt-2">
                <Text className="text-xl md:text-3xl lg:text-4xl font-bold text-[#1E293B]">
                    Messages
                </Text>
            </View>

            {/* Search Bar */}
            <View className="flex-row items-center bg-gray-100 rounded-xl px-3 py-2 md:px-5 md:py-4 mb-3">
                <Ionicons name="search-outline" size={iconSize} color="#888" />
                <TextInput
                    placeholder="Search"
                    placeholderTextColor="#999"
                    value={search}
                    onChangeText={setSearch}
                    className="ml-2 flex-1 text-gray-700 text-base md:text-2xl lg:text-3xl"
                />
            </View>

            {/* Messages List */}
            <FlatList
                data={filtered}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    );
};

export default ChatScreen;
