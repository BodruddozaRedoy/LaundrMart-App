import LaundryCard from "@/components/common/LaundryCard";
import { laundries } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";



export default function ChooseLaundryMartScreen() {
  
  return (
    <View className="flex-1 bg-white px-5 pt-3">
      {/* Sort by section */}
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-sm font-medium text-[#1E293B]">Sort by:</Text>
        <TouchableOpacity className="flex-row items-center bg-[#F8FAFC] border border-gray-200 px-3 py-2 rounded-lg">
          <Text className="text-sm text-[#1E293B] mr-1">Rating</Text>
          <Ionicons name="chevron-down" size={16} color="#475569" />
        </TouchableOpacity>
      </View>

      {/* List */}
      <FlatList
        data={laundries}
        renderItem={({item}) => <LaundryCard item={item}/>}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
