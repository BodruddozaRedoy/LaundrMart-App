import InfoAlert from "@/components/shared/InfoAlert";
import { laundries } from "@/constants";
import { api } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

export default function BookNowScreen() {
    const { id } = useLocalSearchParams();

    // Memoize the laundry lookup to prevent re-calculations during render
    const laundry = useMemo(() => {
        return laundries.find((item) => item.id === id) || laundries[0];
    }, [id]);

    const [bagCounts, setBagCounts] = useState({ small: 0, medium: 0, large: 0 });
    const [selectedService, setSelectedService] = useState<"full_service" | "drop_off" | "pickup">("full_service");
    const [selectedInsurance, setSelectedInsurance] = useState<"basic" | "protection">("basic");
    const [instructions, setInstructions] = useState("");
    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({
        street_address: "",
        state: "",
        city: "",
        zip_code: "",
        country: ""
    })

    // Tooltip visibility
    const [activeAlert, setActiveAlert] = useState<string | null>(null);
    useEffect(() => {
        const loadOrder = async () => {
            try {
                const orderDetails = await AsyncStorage.getItem("order-details");
                console.log(JSON.stringify(orderDetails, null, 2))
            } catch (error) {
                console.log(error)
            }
        }
        loadOrder()
    }, [])


    const updateBagCount = (type: keyof typeof bagCounts, delta: number) => {
        setBagCounts((prev) => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta),
        }));
    };

    const handleOrder = async () => {
        const totalBags = bagCounts.small + bagCounts.medium + bagCounts.large;
        if (totalBags === 0) {
            Alert.alert("Selection Required", "Please add at least one bag to your order.");
            return;
        }

        const orderData = {
            laundryId: laundry.id,
            bags: bagCounts,
            service: selectedService,
            insurance: selectedInsurance,
            specialInstructions: instructions,
            timestamp: new Date().toISOString(),
        };

        const payload = {
            service_type: selectedService,

            pickup_address: {
                street_address: ["20 W 34th St", "Floor 2"],
                state: "NY",
                city: "New York",
                zip_code: "10001",
                country: "US",
            },

            dropoff_address: {
                street_address: ["285 Fulton St", ""],
                state: "NY",
                city: "New York",
                zip_code: "10006",
                country: "US",
            },

            pickup_latitude: 40.74865,
            pickup_longitude: -73.9853,

            dropoff_latitude: 40.71274,
            dropoff_longitude: -74.01338,

            insurance_amount: 0,

            customer_note: "string",
            pickup_phone_number: "+8801853958635",
            dropoff_phone_number: "+8801853958636",

            manifest_total_value: 1000,
            external_store_id: "ed339532-acf4-4f49-85b4-2040da57a047",
        };


        const res = await api.post("/customers/api/get-quote", payload)

        setLoading(true);
        try {
            // Simulate API Call - Replace with your fetch/axios logic
            console.log("Submitting Order:", orderData);
            await new Promise(resolve => setTimeout(resolve, 1000));

            await AsyncStorage.setItem("pending-order", JSON.stringify(orderData));
            router.push({ pathname: "/order/reviewOrder", params: { id: laundry?.id } });
        } catch (error) {
            Alert.alert("Error", "Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Helper for bag images sizes to keep class strings clean
    const getBagSizeClass = (label: string) => {
        if (label === "Small") return "w-10 h-12";
        if (label === "Medium") return "w-14 h-16";
        return "w-16 h-20";
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 140 }}
                showsVerticalScrollIndicator={false}
                className="px-5 pt-4"
            >
                {/* Laundry Card */}
                <View className="bg-[#F0F7FF] border border-[#E2E8F0] rounded-2xl p-4 flex-row items-center mb-5">
                    <Image source={{ uri: laundry.image }} className="w-16 h-16 rounded-xl mr-3" />
                    <View className="flex-1">
                        <Text className="text-lg font-bold text-[#1E293B]">{laundry.name}</Text>
                        <View className="flex-row items-center mt-1">
                            <Ionicons name="star" size={14} color="#FACC15" />
                            <Text className="text-sm font-semibold text-[#1E293B] ml-1">{laundry.rating}</Text>
                            <Text className="text-sm text-[#64748B] ml-1">(234)</Text>
                            <View className="flex-row items-center ml-3">
                                <Ionicons name="location-outline" size={14} color="#64748B" />
                                <Text className="text-sm text-[#64748B] ml-1">{laundry.distance} away</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Bag Size Section */}
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-[15px] font-bold text-[#1E293B]">
                        How large is your bag?<Text className="font-normal text-[#64748B]"> (your best guess)</Text>
                    </Text>
                    <TouchableOpacity onPress={() => setActiveAlert('general')}>
                        <Ionicons name="information-circle-outline" size={20} color="#2563EB" />
                    </TouchableOpacity>
                </View>

                {[
                    { label: "Small", range: "0–5 lbs", key: "small" },
                    { label: "Medium", range: "0–10 lbs", key: "medium" },
                    { label: "Large", range: "0–15 lbs", key: "large" },
                ].map((bag) => (
                    <View key={bag.key} className="flex-row items-center justify-between border border-[#E2E8F0] rounded-2xl p-3 mb-3">
                        <View className="flex-row items-center">
                            <View className="w-20 items-center justify-center">
                                <Image
                                    source={{ uri: "https://img.freepik.com/free-photo/white-cloth-bag_1203-7657.jpg" }}
                                    className={`${getBagSizeClass(bag.label)} rounded-md`}
                                />
                            </View>
                            <View className="ml-2">
                                <Text className="text-base font-bold text-[#1E293B]">{bag.label}</Text>
                                <Text className="text-xs text-[#94A3B8]">{bag.range}</Text>
                            </View>
                        </View>

                        <View className="flex-row items-center">
                            <Text className="text-xs font-medium text-[#64748B] mr-2">Qty:</Text>
                            <View className="flex-row items-center bg-[#F1F5F9] rounded-lg p-1 px-2 border border-[#E2E8F0]">
                                <TouchableOpacity onPress={() => updateBagCount(bag.key as any, -1)}>
                                    <View className="w-7 h-7 bg-white rounded-md items-center justify-center border border-[#E2E8F0]">
                                        <Ionicons name="remove" size={16} color="#2563EB" />
                                    </View>
                                </TouchableOpacity>
                                <Text className="mx-4 text-[#1E293B] font-bold text-base">{bagCounts[bag.key as keyof typeof bagCounts]}</Text>
                                <TouchableOpacity onPress={() => updateBagCount(bag.key as any, 1)}>
                                    <View className="w-7 h-7 bg-white rounded-md items-center justify-center border border-[#E2E8F0]">
                                        <Ionicons name="add" size={16} color="#2563EB" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))}

                {/* Choose Services */}
                <Text className="text-base font-bold text-[#1E293B] mb-3 mt-4">Choose Services</Text>
                {["full_service", "drop_off", "pickup"].map((key) => {
                    const label = key === "full_service" ? "Full Service" : key === "drop_off" ? "Drop-Off" : "Pickup";
                    const isSelected = selectedService === key;
                    return (
                        <TouchableOpacity
                            key={key}
                            onPress={() => setSelectedService(key as any)}
                            className={`flex-row items-center justify-between border rounded-xl p-4 mb-2 ${isSelected ? 'border-[#2563EB] bg-[#F8FAFC]' : 'border-[#E2E8F0]'}`}
                        >
                            <View className="flex-row gap-3 items-center">
                                <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${isSelected ? "border-[#2563EB]" : "border-[#CBD5E1]"}`}>
                                    {isSelected && <View className="w-2.5 h-2.5 bg-[#2563EB] rounded-full" />}
                                </View>
                                <Text className={`font-semibold ${isSelected ? 'text-[#1E293B]' : 'text-[#64748B]'}`}>{label}</Text>
                            </View>
                            <TouchableOpacity onPress={() => setActiveAlert(key)}>
                                <Ionicons name="information-circle-outline" size={20} color="#2563EB" />
                            </TouchableOpacity>
                        </TouchableOpacity>
                    );
                })}

                {/* Insurance Section */}
                <Text className="text-base font-bold text-[#1E293B] mb-1 mt-4">Insurance</Text>
                <Text className="text-xs text-[#64748B] mb-3">Insurance covers you in the rare case of damage or loss</Text>

                {/* Insurance Options */}
                {[
                    { id: 'basic', title: 'Basic', desc: 'Covers $25/garment\nUp to $200 per order', price: 'Free', priceColor: 'text-[#64748B]', priceBg: 'bg-[#E2E8F0]' },
                    { id: 'protection', title: 'Laundrmart Protection', desc: 'Covers $50/garment\nUp to $450 per order', price: '$2.99', priceColor: 'text-[#2563EB]', priceBg: 'bg-[#DBEAFE]' }
                ].map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        onPress={() => setSelectedInsurance(item.id as any)}
                        className={`border rounded-xl p-4 mb-2 ${selectedInsurance === item.id ? 'bg-[#F0F7FF] border-[#2563EB]' : 'border-[#E2E8F0]'}`}
                    >
                        <View className="flex-row justify-between items-start">
                            <View className="flex-row gap-3">
                                <View className={`w-5 h-5 mt-1 rounded-full border-2 items-center justify-center ${selectedInsurance === item.id ? "border-[#2563EB]" : "border-[#CBD5E1]"}`}>
                                    {selectedInsurance === item.id && <View className="w-2.5 h-2.5 bg-[#2563EB] rounded-full" />}
                                </View>
                                <View>
                                    <Text className="font-bold text-[#1E293B]">{item.title}</Text>
                                    <Text className="text-xs text-[#64748B] mt-1">{item.desc}</Text>
                                </View>
                            </View>
                            <View className={`${item.priceBg} px-3 py-1 rounded-full`}>
                                <Text className={`text-[10px] font-bold ${item.priceColor}`}>{item.price}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                ))}

                {/* Special instructions  */}
                <Text className="text-base font-bold text-[#1E293B] mb-3 mt-4">Special Instructions (Optional)</Text>
                <TextInput
                    placeholder="Any special request or instructions for your laundry..."
                    className="py-4 px-4 rounded-xl w-full border border-[#E2E8F0] min-h-[100px] text-[#1E293B]"
                    multiline
                    textAlignVertical="top"
                    value={instructions}
                    onChangeText={setInstructions}
                />

                <Text className="text-[#2563EB] text-[13px] mt-4 leading-5">
                    <Text className="font-bold">Note: </Text>
                    LaundryMarts always separate whites and colors to protect your clothes.
                </Text>
            </ScrollView>

            {/* Fixed Footer Button */}
            <View className="absolute bottom-8 left-0 right-0 px-5 bg-white/90 pt-2">
                <TouchableOpacity onPress={handleOrder} disabled={loading}>
                    <View className="bg-[#0081C9] py-4 rounded-xl items-center justify-center">
                        {loading ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-lg">Go to checkout</Text>}
                    </View>
                </TouchableOpacity>
            </View>

            {/* Alert Modals */}
            <InfoAlert visible={activeAlert === 'general'} message="Estimate weight as accurately as possible." onClose={() => setActiveAlert(null)} />
            <InfoAlert visible={activeAlert === 'fullService'} message="Includes washing, drying, and folding." onClose={() => setActiveAlert(null)} />
            <InfoAlert visible={activeAlert === 'dropOff'} message="You drop it off, we do the work." onClose={() => setActiveAlert(null)} />
            <InfoAlert visible={activeAlert === 'pickup'} message="We collect from your door." onClose={() => setActiveAlert(null)} />
        </View>
    );
}