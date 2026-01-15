import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useMemo, useState } from "react";
import {
    FlatList,
    Image,
    Modal,
    ScrollView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";

export default function LaundryDetailsScreen() {
    // 1. Get all data from params
    const params = useLocalSearchParams();

    // 2. Parse the services array (since it was passed as a string)
    const services = useMemo(() => {
        try {
            return params.vendor_services ? JSON.parse(params.vendor_services as string) : [];
        } catch (e) {
            return [];
        }
    }, [params.vendor_services]);

    // 3. Format Operating Hours from individual API params
    const storeHours = useMemo(() => {
        const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
        return days.map(day => {
            const isClosed = params[`is_closed_${day}`] === 'true';
            const start = params[`operating_hours_start_${day}`];
            const end = params[`operating_hours_end_${day}`];

            return {
                weekday: day.charAt(0).toUpperCase() + day.slice(1),
                time: isClosed || !start ? "Closed" : `${String(start).slice(0, 5)} - ${String(end).slice(0, 5)}`
            };
        });
    }, [params]);

    const [showHoursModal, setShowHoursModal] = useState(false);
    const [showInfoAlert, setShowInfoAlert] = useState(false);

    const handleBookNow = async () => {
        try {
            const prev = await AsyncStorage.getItem("order-details");
            const parsedPrev = prev ? JSON.parse(prev) : {};


            const updatedOrderDetails = {
                ...parsedPrev,          // keep pickup_time
                dropoff_address: params.location  // add address
            };
            await AsyncStorage.setItem(
                "order-details",
                JSON.stringify(updatedOrderDetails)
            );

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
                className="px-5 pt-4"
            >
                {/* Image */}
                <Image
                    source={{ uri: (params.image as string) || 'https://via.placeholder.com/300' }}
                    className="w-full h-52 rounded-3xl mb-4 bg-gray-100"
                />

                {/* Name & Rating */}
                <View className="mb-2">
                    <Text className="text-2xl font-bold text-[#1E293B]">
                        {params.laundrymart_name || "Laundry Mart"}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Text className="text-sm text-[#64748B] mr-2">
                            {params.location || "Location not provided"}
                        </Text>
                        <Ionicons name="star" size={14} color="#FACC15" />
                        <Text className="text-sm font-bold text-[#1E293B] ml-1">
                            {params.average_rating || "0.0"}
                        </Text>
                    </View>
                </View>

                {/* Turnaround Time */}
                <View className="flex-row items-center justify-between mb-4 bg-gray-50 p-4 rounded-2xl">
                    <View className="flex-row items-center">
                        <Text className="text-[#64748B] text-sm">Turnaround: </Text>
                        <Text className="text-[#1E293B] font-bold text-sm">
                            {params.get_turnaround_time || "Standard"}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => setShowInfoAlert(!showInfoAlert)}>
                        <Ionicons name="information-circle-outline" size={20} color="#2563EB" />
                    </TouchableOpacity>
                </View>

                {/* Description */}
                <Text className="text-[#475569] text-sm leading-6 mb-5">
                    {params.vendor_description || "No description provided for this laundry mart."}
                </Text>

                {/* Store Hours Toggle */}
                <TouchableOpacity
                    className="flex-row items-center justify-between border border-gray-100 p-4 rounded-2xl mb-6"
                    onPress={() => setShowHoursModal(true)}
                >
                    <View className="flex-row items-center">
                        <Ionicons name="time-outline" size={20} color="#2563EB" />
                        <Text className="text-[#2563EB] text-sm font-bold ml-2">Check Store Hours</Text>
                    </View>
                    <Ionicons name="chevron-forward" size={18} color="#2563EB" />
                </TouchableOpacity>

                {/* Price */}
                <View className="mb-8">
                    <Text className="text-xs text-gray-400 uppercase font-bold tracking-widest mb-1">Starting Price</Text>
                    <Text className="text-2xl font-black text-[#1E293B]">
                        ${params.price_per_pound || "0.00"}
                        <Text className="text-sm font-normal text-[#64748B]"> /lbs</Text>
                    </Text>
                </View>

                {/* Our Services Section */}
                <Text className="text-lg font-bold text-[#1E293B] mb-4">Our Services</Text>
                <FlatList
                    data={services}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(_, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View className="mr-4 bg-white border border-gray-100 rounded-3xl p-3 w-40 shadow-sm">
                            <Image
                                source={{ uri: item.image || 'https://via.placeholder.com/100' }}
                                className="w-full h-24 rounded-2xl mb-2 bg-gray-50"
                            />
                            <Text className="text-sm font-bold text-[#1E293B]" numberOfLines={1}>
                                {item.service_name || "Service"}
                            </Text>
                            <Text className="text-xs text-blue-600 font-bold mt-1">${item.price_per_pound}</Text>
                        </View>
                    )}
                    ListEmptyComponent={<Text className="text-gray-400 italic">No additional services listed.</Text>}
                />
            </ScrollView>

            {/* Sticky Book Now Button */}
            <View className="absolute bottom-0 left-0 right-0 bg-white p-5 border-t border-gray-100">
                <TouchableOpacity
                    onPress={() => { router.push({ pathname: "/order/bookNow", params: { id: params.store_id } }); handleBookNow() }}
                    activeOpacity={0.8}
                >
                    <PrimaryButton text="Book Now" />
                </TouchableOpacity>
            </View>

            {/* Information Tooltip */}
            {showInfoAlert && (
                <Modal visible={showInfoAlert} transparent animationType="fade">
                    <TouchableWithoutFeedback onPress={() => setShowInfoAlert(false)}>
                        <View className="flex-1 bg-black/20 justify-center items-center px-10">
                            <View className="bg-white p-6 rounded-3xl shadow-2xl">
                                <Text className="text-sm text-[#475569] text-center">
                                    Estimation based on average loads. Final turnaround depends on the quantity and type of items.
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                </Modal>
            )}

            {/* Store Hours Modal (Modern Style) */}
            <Modal
                visible={showHoursModal}
                transparent
                animationType="slide"
                onRequestClose={() => setShowHoursModal(false)}
            >
                <View className="flex-1 bg-black/50 justify-end">
                    <View className="bg-white rounded-t-[40px] p-8 h-3/4">
                        <View className="flex-row items-center justify-between mb-8">
                            <Text className="text-2xl font-bold text-[#1E293B]">Store Hours</Text>
                            <TouchableOpacity onPress={() => setShowHoursModal(false)} className="bg-gray-100 p-2 rounded-full">
                                <Ionicons name="close" size={24} color="#000" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>
                            {storeHours.map((hour) => (
                                <View key={hour.weekday} className="flex-row items-center justify-between py-4 border-b border-gray-50">
                                    <Text className="text-base font-medium text-gray-600">{hour.weekday}</Text>
                                    <Text className={`text-base font-bold ${hour.time === "Closed" ? "text-red-400" : "text-[#1E293B]"}`}>
                                        {hour.time}
                                    </Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}