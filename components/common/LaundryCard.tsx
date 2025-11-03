import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import { Laundry } from '@/types/laundry.types'

const LaundryCard = ({ item }: { item: Laundry }) => {
    return (
        <TouchableOpacity onPress={() => router.push({ pathname: "/order/laundryDetails", params: { id: item.id } })} className="bg-white rounded-2xl p-4 mb-4 border border-gray-200">
            <View className="flex-row items-center">
                <Image
                    source={{ uri: item.image }}
                    className="w-14 h-14 rounded-lg mr-3"
                />
                <View className="flex-1">
                    <Text className="text-base font-bold text-[#1E293B]">
                        {item.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Ionicons name="star" size={14} color="#FACC15" />
                        <Text className="text-xs text-[#475569] ml-1">
                            {item.rating} · {item.distance}
                        </Text>
                    </View>
                </View>
            </View>

            <Text className="text-sm text-[#64748B] mt-2">{item.description}</Text>

            <View className="flex-row items-center justify-between mt-3">
                <Text className="text-base font-bold text-[#1E293B]">
                    {item.price}
                    <Text className="text-xs font-normal text-[#64748B]">/lbs</Text>
                </Text>
                <Text className="text-xs text-[#64748B]">
                    Turnaround: {item.turnaround}
                </Text>
            </View>

            <Text className="text-xs text-[#10B981] font-medium mt-2">
                {item.hours}
            </Text>
        </TouchableOpacity>
    )
}

export default LaundryCard