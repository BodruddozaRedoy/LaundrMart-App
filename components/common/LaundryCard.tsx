import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const LaundryCard = ({ item }: { item: any }) => {

    // 1. SAFE DATA MAPPING (Prevents crashes if API fields are null)
    const name = item.laundrymart_name || "Unnamed Mart";

    // Safe check for rating
    const rating = typeof item.average_rating === 'number'
        ? item.average_rating.toFixed(1)
        : "0.0";

    // FIX: Safe check for distance (solves your toFixed error)
    const distance = (item.distance !== null && typeof item.distance === 'number')
        ? `${item.distance.toFixed(1)} km`
        : "Nearby";

    const price = item.price_per_pound ? `$${item.price_per_pound}` : "N/A";
    const turnaround = item.get_turnaround_time || "Standard";
    const description = item.vendor_description || "Quality laundry services provided.";
    const isOpen = item.is_open_now;

    // Inside your LaundryCard or ChooseMartScreen
    const handlePress = () => {
        router.push({
            pathname: "/order/laundryDetails",
            params: {
                ...item, // Passes all strings/numbers (name, id, image, etc.)
                // Arrays/Objects must be stringified
                vendor_services: JSON.stringify(item.vendor_services || []),
            },
        });
    };

    return (
        <TouchableOpacity
            onPress={handlePress}
            activeOpacity={0.7}
            className="bg-white rounded-3xl p-4 mb-4 border border-gray-100 shadow-sm"
        >
            <View className="flex-row items-center">
                {/* Image with fallback */}
                <View className='bg-gray-100 mr-3 p-3 rounded-lg'>
                    <Image
                        source={{ uri: item.laundrymart_logo || 'https://via.placeholder.com/150' }}
                        className="w-12 h-12 rounded-2xl"
                    />
                </View>

                <View className="flex-1">
                    <View className="flex-row justify-between items-center">
                        <Text className="text-base font-bold text-[#1E293B] flex-1 mr-2" numberOfLines={1}>
                            {name}
                        </Text>
                        {/* Status Badge */}
                        <View className={`px-2 py-0.5 rounded-full ${isOpen ? 'bg-emerald-50' : 'bg-red-50'}`}>
                            <Text className={`text-[10px] font-bold ${isOpen ? 'text-emerald-600' : 'text-red-600'}`}>
                                {isOpen ? "OPEN" : "CLOSED"}
                            </Text>
                        </View>
                    </View>

                    <View className="flex-row items-center mt-1">
                        <Ionicons name="star" size={14} color="#FACC15" />
                        <Text className="text-xs font-bold text-[#475569] ml-1">
                            {rating}
                        </Text>
                        <Text className="text-xs text-[#94A3B8] ml-1">
                            • {distance} away
                        </Text>
                    </View>
                </View>
            </View>

            {/* Description */}
            <Text className="text-sm text-[#64748B] mt-3 leading-5" numberOfLines={2}>
                {description}
            </Text>

            {/* Footer Details */}
            <View className="flex-row items-center justify-between mt-4 pt-3 border-t border-gray-50">
                <View>
                    <Text className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Price</Text>
                    <Text className="text-base font-black text-[#1E293B]">
                        {price}
                        <Text className="text-xs font-normal text-gray-500">/lbs</Text>
                    </Text>
                </View>

                <View className="items-end">
                    <Text className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Turnaround</Text>
                    <Text className="text-sm font-bold text-[#475569]">
                        {turnaround} Days
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

export default LaundryCard;