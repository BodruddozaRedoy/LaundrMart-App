import InfoAlert from "@/components/shared/InfoAlert";
import PrimaryButton from "@/components/shared/PrimaryButton";
import { laundries } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
    Image,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function BookNowScreen() {
    const { id } = useLocalSearchParams();
    const laundry = laundries.find((item) => item.id === id) || laundries[0];

    const [bagCounts, setBagCounts] = useState({ small: 0, medium: 0, large: 0 });
    const [selectedService, setSelectedService] = useState<
        "fullService" | "dropOff" | "pickup"
    >("fullService");

    // Tooltip visibility
    const [showInfoAlert, setShowInfoAlert] = useState(false);
    const [fullServiceInfoAlert, setFullServiceInfoAlert] = useState(false);
    const [dropOffInfoAlert, setDropOffInfoAlert] = useState(false);
    const [pickupInfoAlert, setPickupInfoAlert] = useState(false);

    const updateBagCount = (type: "small" | "medium" | "large", delta: number) => {
        setBagCounts((prev) => ({
            ...prev,
            [type]: Math.max(0, prev[type] + delta),
        }));
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView
                contentContainerStyle={{ paddingBottom: 120 }}
                showsVerticalScrollIndicator={false}
                className="px-5 pt-4"
            >
                {/* Laundry Card */}
                <View className="bg-primary/10 border border-[#E2E8F0] rounded-2xl p-4 flex-row items-center mb-5">
                    <Image
                        source={{ uri: laundry.image }}
                        className="w-16 h-16 rounded-lg mr-3"
                    />
                    <View>
                        <Text className="text-lg font-bold text-[#1E293B]">
                            {laundry.name}
                        </Text>
                        <View className="flex-row items-center mt-1">
                            <Ionicons name="star" size={14} color="#FACC15" />
                            <Text className="text-sm text-[#475569] ml-1">
                                {laundry.rating}
                            </Text>
                            <Text className="text-sm text-[#64748B] ml-2">
                                {laundry.distance}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Bag Size Section */}
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-base font-semibold text-[#1E293B]">
                        How large is your bag?
                        <Text className="text-sm text-[#475569]"> (your best guess)</Text>
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowInfoAlert(true)}
                        className="ml-2"
                    >
                        <Ionicons
                            name="information-circle-outline"
                            size={18}
                            color="#2563EB"
                        />
                    </TouchableOpacity>
                </View>

                {[
                    { label: "Small", range: "0–5 lbs", key: "small" },
                    { label: "Medium", range: "5–10 lbs", key: "medium" },
                    { label: "Large", range: "10–20 lbs", key: "large" },
                ].map((bag) => (
                    <View
                        key={bag.key}
                        className="flex-row items-center justify-between border border-[#E2E8F0] rounded-2xl p-3 mb-3"
                    >
                        <View className="flex-row items-center">
                            <Image
                                source={{
                                    uri: "https://img.freepik.com/free-photo/white-cloth-bag_1203-7657.jpg?semt=ais_hybrid",
                                }}
                                className={`${bag.label == "Small" && "size-12"} ${bag.label == "Medium" && "size-16"
                                    } ${bag.label == "Large" && "size-20"} rounded-lg mr-3`}
                            />
                            <View>
                                <Text className="text-base font-semibold text-[#1E293B]">
                                    {bag.label}
                                </Text>
                                <Text className="text-xs text-[#64748B]">{bag.range}</Text>
                            </View>
                        </View>

                        {/* Qty Controls */}
                        <View className="flex-row items-center">
                            <Text className="text-sm text-[#64748B] mr-2">Qty:</Text>
                            <TouchableOpacity
                                onPress={() => updateBagCount(bag.key as any, -1)}
                                className="w-6 h-6 rounded-full border border-[#CBD5E1] items-center justify-center"
                            >
                                <Ionicons name="remove" size={14} color="#475569" />
                            </TouchableOpacity>
                            <Text className="mx-3 text-[#1E293B] font-semibold">
                                {bagCounts[bag.key as "small" | "medium" | "large"]}
                            </Text>
                            <TouchableOpacity
                                onPress={() => updateBagCount(bag.key as any, 1)}
                                className="w-6 h-6 rounded-full border border-[#CBD5E1] items-center justify-center"
                            >
                                <Ionicons name="add" size={14} color="#2563EB" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}

                {/* Choose Services */}
                <Text className="text-base font-semibold text-[#1E293B] mb-3 mt-2">
                    Choose Services
                </Text>

                {Object.entries(laundry.serviceOptions).map(([key, enabled]) => {
                    if (!enabled) return null;
                    const label =
                        key === "fullService"
                            ? "Full Service"
                            : key === "dropOff"
                                ? "Drop-Off"
                                : "Pickup";

                    return (
                        <TouchableOpacity
                            key={key}
                            onPress={() =>
                                setSelectedService(key as "fullService" | "dropOff" | "pickup")
                            }
                            className="flex-row items-center justify-between border border-[#E2E8F0] rounded-xl p-4 mb-2"
                        >
                            <View className="flex-row gap-2 items-center">
                                <View
                                    className={`w-5 h-5 rounded-full border-2 ${selectedService === key
                                        ? "border-[#2563EB] items-center justify-center"
                                        : "border-[#CBD5E1]"
                                        }`}
                                >
                                    {selectedService === key && (
                                        <View className="w-2.5 h-2.5 bg-[#2563EB] rounded-full" />
                                    )}
                                </View>
                                <Text className="text-[#1E293B] font-medium">{label}</Text>
                            </View>

                            {/* Info icons for each */}
                            {label === "Full Service" && (
                                <TouchableOpacity
                                    onPress={() => setFullServiceInfoAlert(true)}
                                    className="ml-2"
                                >
                                    <Ionicons
                                        name="information-circle-outline"
                                        size={18}
                                        color="#2563EB"
                                    />
                                </TouchableOpacity>
                            )}
                            {label === "Drop-Off" && (
                                <TouchableOpacity
                                    onPress={() => setDropOffInfoAlert(true)}
                                    className="ml-2"
                                >
                                    <Ionicons
                                        name="information-circle-outline"
                                        size={18}
                                        color="#2563EB"
                                    />
                                </TouchableOpacity>
                            )}
                            {label === "Pickup" && (
                                <TouchableOpacity
                                    onPress={() => setPickupInfoAlert(true)}
                                    className="ml-2"
                                >
                                    <Ionicons
                                        name="information-circle-outline"
                                        size={18}
                                        color="#2563EB"
                                    />
                                </TouchableOpacity>
                            )}
                        </TouchableOpacity>
                    );
                })}

                {/* Special instructions  */}
                <Text className="text-base font-semibold text-[#1E293B] mb-3 mt-2">
                    Special Instructions (Optional)
                </Text>
                <TextInput
                    placeholder="Any special request or instructions for your laundry..."
                    className="py-4 px-5 rounded-lg w-full border"
                    multiline
                />
                <Text className="text-primary mt-3">
                    <Text className="font-semibold">Note: </Text>
                    LaundryMarts always separate whites and colors to protect your clothes.
                </Text>

            </ScrollView>

            {/* Continue Button */}
            <View className="absolute bottom-10 left-5 right-5">
                <TouchableOpacity onPress={() => router.push({ pathname: "/order/reviewOrder", params: { id: laundry?.id } })} className="w-full">
                    <PrimaryButton text="Order Now" />
                </TouchableOpacity>
            </View>

            {/* Info Alerts */}
            <InfoAlert
                message="Estimate bag weight as accurately as possible to avoid recalculation during pickup."
                visible={showInfoAlert}
                onClose={() => setShowInfoAlert(false)}
            />

            <InfoAlert
                message="Full Service includes washing, drying, and folding your laundry for you."
                visible={fullServiceInfoAlert}
                onClose={() => setFullServiceInfoAlert(false)}
                position={{ bottom: 300, right: 30 }}
            />

            <InfoAlert
                message="Drop-Off allows you to drop your laundry and pick it up when ready."
                visible={dropOffInfoAlert}
                onClose={() => setDropOffInfoAlert(false)}
                position={{ bottom: 260, right: 30 }}
            />

            <InfoAlert
                message="Pickup includes a driver collecting your laundry from your doorstep."
                visible={pickupInfoAlert}
                onClose={() => setPickupInfoAlert(false)}
                position={{ bottom: 220, right: 30 }}
            />
        </View>
    );
}
