import { logoBase64 } from "@/assets/logo";
import { orders as initialOrders } from "@/constants";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import * as Print from "expo-print";
import { router } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Modal,
    StatusBar,
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
const iconSize = isLg ? 34 : isMd ? 26 : 16;

export default function OrderScreen() {
    const [selectedTab, setSelectedTab] = useState<
        "Request" | "Active" | "Completed"
    >("Request");

    const [showPrintModal, setShowPrintModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState<any>(null);

    // Store updated orders (so weight can update)
    const [orders, setOrders] = useState(initialOrders);

    // 🔥 UPDATE WEIGHT FUNCTION
    const updateWeight = (id: string, value: string) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, weight: value } : order
            )
        );
    };

    // 🔥 PRINT RECEIPT
    const handlePrintInvoice = async () => {
        setShowPrintModal(false);

        const html = `
            <html>
                <body style="font-family: monospace; width: 260px; margin: 0 auto;">
                    <div style="text-align: center; margin-bottom: 10px; margin-top: 10px;">
                        <img src="${logoBase64}" style="width:160px; display:block; margin:0 auto;" />
                        <h2 style="margin: 4px 0 0 0;">LaundrMart</h2>
                        <p style="margin: 0;">Order ID: ${selectedOrder?.orderId}</p>
                    </div>

                    <p style="text-align:center; margin: 12px 0;">*************************************</p>
                    <h3 style="text-align:center; margin: 0;">INVOICE</h3>
                    <p style="text-align:center; margin: 12px 0;">*************************************</p>

                    <table style="width: 100%; font-size: 14px;">
                        <tr><td>Service</td><td align="right">${selectedOrder?.totalCost}</td></tr>
                    </table>

                    <hr style="margin: 10px 0;" />

                    <table style="width: 100%; font-size: 16px; font-weight: bold;">
                        <tr>
                            <td>Total</td>
                            <td align="right">${selectedOrder?.totalCost}</td>
                        </tr>
                    </table>

                    <p style="text-align:center; margin:12px 0;">*************************************</p>
                    <p style="text-align:center; margin: 12px 0;">THANK YOU!</p>
                </body>
            </html>
        `;

        await Print.printAsync({ html });
    };

    const filteredOrders = orders.filter((order) => {
        if (selectedTab === "Request") return order.status === "Request";
        if (selectedTab === "Active")
            return ["Pending", "Pickup", "Processing"].includes(order.status);
        if (selectedTab === "Completed") return order.status === "Delivered";
        return false;
    });

    const renderStatusBadge = (status: string) => {
        let color = "#E2E8F0";
        let textColor = "#475569";

        if (status === "Pending") {
            color = "#FEF3C7";
            textColor = "#B45309";
        } else if (status === "Pickup") {
            color = "#DBEAFE";
            textColor = "#1D4ED8";
        } else if (status === "Processing") {
            color = "#FDE68A";
            textColor = "#92400E";
        } else if (status === "Delivered") {
            color = "#DCFCE7";
            textColor = "#166534";
        }

        return (
            <View
                className="px-2.5 py-0.5 rounded-md"
                style={{ backgroundColor: color }}
            >
                <Text
                    className={`text-xs md:text-base lg:text-lg font-medium`}
                    style={{ color: textColor }}
                >
                    {status}
                </Text>
            </View>
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <StatusBar barStyle={"dark-content"} />

            {/* Header */}
            <View className="flex-row items-center justify-between px-5 py-3 border-b border-[#E2E8F0]">
                <Text className="text-xl md:text-3xl lg:text-4xl font-bold text-[#1E293B]">
                    Order History
                </Text>
                <Ionicons
                    name="search-outline"
                    size={isLg ? 40 : isMd ? 30 : 22}
                    color="#1E293B"
                />
            </View>

            {/* Tabs */}
            <View className="flex-row justify-around bg-[#F1F5F9] mx-5 mt-4 p-1 rounded-xl">
                {["Request", "Active", "Completed"].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedTab(tab as any)}
                        className={`flex-1 py-2 md:py-3 lg:py-4 rounded-lg ${selectedTab === tab ? "bg-primary" : "bg-transparent"
                            }`}
                    >
                        <Text
                            className={`text-center text-sm md:text-xl lg:text-2xl font-medium ${selectedTab === tab
                                    ? "text-white"
                                    : "text-[#475569]"
                                }`}
                        >
                            {tab}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Info text */}
            <View
                className="bg-primary/20 py-3 rounded-lg mx-5 mt-3 gap-2 flex-row"
                style={{ paddingHorizontal: isLg ? 40 : isMd ? 30 : 10 }}
            >
                <AntDesign name="info-circle" size={16} color="#017FC6" />
                <Text className="text-primary">
                    All orders must be processed with whites and colors
                    separated. Never mix different customer&apos;s clothes.
                </Text>
            </View>

            {/* ORDERS LIST */}
            <FlatList
                data={filteredOrders}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: isLg ? 40 : isMd ? 30 : 20,
                    paddingBottom: 100,
                }}
                renderItem={({ item }) => (
                    <View
                        className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4 mt-5 
                                   md:rounded-3xl md:p-6 lg:rounded-[32px] lg:p-8"
                    >
                        {/* Order Header */}
                        <View className="flex-row items-center justify-between mb-3">
                            <Text className="text-sm md:text-xl lg:text-2xl font-medium text-[#1E293B]">
                                Order {item.orderId}
                            </Text>
                            {renderStatusBadge(item.status)}
                        </View>

                        {/* Date */}
                        <View className="flex-row items-center mb-3">
                            <Ionicons
                                name="calendar-outline"
                                size={iconSize}
                                color="#64748B"
                            />
                            <Text className="text-sm md:text-lg lg:text-xl text-[#64748B] ml-2">
                                {item.date}
                            </Text>
                        </View>

                        {/* Customer Details */}
                        <Text className="text-base md:text-2xl lg:text-3xl font-semibold text-[#1E293B] mb-1">
                            Customer Details
                        </Text>

                        <View className="flex-row mb-3">
                            <Ionicons
                                name="person-circle-outline"
                                size={isLg ? 40 : isMd ? 28 : 20}
                                color="#0EA5E9"
                            />
                            <View className="ml-2">
                                <Text className="text-sm md:text-xl lg:text-2xl text-[#1E293B] font-medium">
                                    {item.customerName}
                                </Text>
                                <Text className="text-xs md:text-lg lg:text-xl text-[#64748B]">
                                    {item.customerPhone}
                                </Text>
                            </View>
                        </View>

                        {/* Address */}
                        <Text className="text-base md:text-2xl lg:text-3xl font-semibold text-[#1E293B] mb-1">
                            Addresses
                        </Text>
                        <View className="flex-row items-center mb-3">
                            <Ionicons
                                name="location-outline"
                                size={isLg ? 40 : isMd ? 28 : 18}
                                color="#2563EB"
                            />
                            <Text className="text-sm md:text-xl lg:text-2xl text-[#1E293B] ml-2">
                                {item.address}
                            </Text>
                        </View>

                        {/* WEIGHT INPUT */}
                        {item.status === "Processing" && (
                            <View className="mt-3">
                                <Text className="text-sm md:text-xl lg:text-2xl font-semibold text-[#1E293B] mb-1">
                                    Enter Total Weight
                                </Text>

                                <View className="flex-row items-center bg-white border border-[#CBD5E1] rounded-xl px-3 py-2 md:px-4 md:py-3 lg:px-5 lg:py-4">
                                    <TextInput
                                        placeholder="0.0"
                                        keyboardType="numeric"
                                        value={item.weight}
                                        onChangeText={(val) =>
                                            updateWeight(item.id, val)
                                        }
                                        className="flex-1 text-sm md:text-xl lg:text-2xl text-[#1E293B]"
                                    />
                                    <Text className="text-sm md:text-xl lg:text-2xl text-[#475569] ml-2">
                                        kg
                                    </Text>
                                </View>
                            </View>
                        )}

                        {/* DETAILS */}
                        <Text className="text-base md:text-2xl lg:text-3xl font-semibold text-[#1E293B] mb-2">
                            Order Details
                        </Text>

                        {[
                            ["Bag Size", item.bagSize],
                            ["Can clothes be mixed?", item.canMix],
                            ["Service", item.service],
                        ].map(([label, value], i) => (
                            <View
                                key={i}
                                className="flex-row justify-between mb-1"
                            >
                                <Text className="text-sm md:text-xl lg:text-2xl text-[#475569]">
                                    {label}
                                </Text>
                                <Text className="text-sm md:text-xl lg:text-2xl text-[#1E293B]">
                                    {value}
                                </Text>
                            </View>
                        ))}

                        {/* Estimated cost */}
                        <View className="flex-row justify-between mb-3">
                            <Text className="text-sm md:text-xl lg:text-2xl text-[#475569]">
                                Estimated Cost
                            </Text>
                            <Text className="text-sm md:text-2xl lg:text-3xl font-semibold text-primary">
                                {item.totalCost}
                            </Text>
                        </View>

                        {/* Notes */}
                        <View className="bg-white border border-[#E2E8F0] rounded-xl p-3 mb-3 md:p-5 lg:p-6">
                            <Text className="text-xs md:text-lg lg:text-xl text-[#475569]">
                                <Text className="font-semibold text-[#1E293B]">
                                    Notes:{` `}
                                </Text>
                                {item.notes}
                            </Text>
                        </View>

                        {/* REQUEST STATUS BUTTONS */}
                        {item.status === "Request" && (
                            <View className="flex-row justify-between mt-2">
                                <TouchableOpacity className="flex-1 border border-[#CBD5E1] rounded-lg py-2 md:py-3 lg:py-4 items-center mr-2">
                                    <Text className="text-sm md:text-xl lg:text-2xl font-medium text-[#1E293B]">
                                        Reject
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex-1 bg-primary rounded-lg py-2 md:py-3 lg:py-4 items-center">
                                    <Text className="text-sm md:text-xl lg:text-2xl font-medium text-white">
                                        Accept
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* PROCESSING STATUS BUTTONS */}
                        {item.status === "Processing" && (
                            <View className="gap-3 mt-2">
                                <TouchableOpacity className="flex-1 bg-primary rounded-lg py-2 md:py-3 lg:py-4 items-center mr-2">
                                    <Text className="text-sm md:text-xl lg:text-2xl font-medium text-white">
                                        Mark as Ready for Pickup
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity className="flex-1 border border-[#CBD5E1] rounded-lg py-2 md:py-3 lg:py-4 items-center mr-2">
                                    <Text className="text-sm md:text-xl lg:text-2xl font-medium text-[#1E293B]">
                                        Mark as Picked Up
                                    </Text>
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() =>
                                        router.push({
                                            pathname:
                                                "/(mart)/report/reportDamage",
                                            params: { id: item.id },
                                        })
                                    }
                                    className="flex-1 bg-primary/10 rounded-lg py-2 md:py-3 lg:py-4 items-center"
                                >
                                    <Text className="text-sm md:text-xl lg:text-2xl font-medium text-primary">
                                        Report Damage / Stain
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        )}

                        {/* PRINT BUTTON */}
                        {item.status !== "Request" && (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedOrder(item);
                                    setShowPrintModal(true);
                                }}
                                className="w-full bg-primary rounded-lg py-3 md:py-4 lg:py-5 items-center mt-3"
                            >
                                <Text className="text-sm md:text-xl lg:text-2xl font-medium text-white">
                                    Print Invoice
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />

            {/* PRINT MODAL */}
            <Modal visible={showPrintModal} transparent animationType="fade">
                <View className="flex-1 justify-center items-center bg-black/50">
                    <View className="bg-white w-80 p-6 rounded-2xl md:p-10 md:w-[500px] lg:w-[600px] lg:p-12">
                        <Text className="text-lg md:text-3xl lg:text-4xl font-semibold text-center mb-4">
                            Print Invoice?
                        </Text>

                        <View className="flex-row justify-between mt-2">
                            <TouchableOpacity
                                onPress={() => setShowPrintModal(false)}
                                className="flex-1 border border-[#CBD5E1] rounded-lg py-2 md:py-4 lg:py-5 items-center mr-2"
                            >
                                <Text className="text-sm md:text-xl lg:text-2xl font-medium text-[#1E293B]">
                                    Cancel
                                </Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={handlePrintInvoice}
                                className="flex-1 bg-primary rounded-lg py-2 md:py-4 lg:py-5 items-center"
                            >
                                <Text className="text-sm md:text-xl lg:text-2xl font-medium text-white">
                                    Print
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}
