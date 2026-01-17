import InfoAlert from "@/components/shared/InfoAlert";
import { api } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
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
    const params = useLocalSearchParams();
    const martData = params as any;
    // console.log("params", martData);



    const [bagCounts, setBagCounts] = useState({ small: 0, medium: 0, big: 0 });
    const [selectedService, setSelectedService] = useState<"full_service" | "drop_off" | "pickup">("full_service");
    const [selectedInsurance, setSelectedInsurance] = useState<"basic" | "protection">("basic");
    const [instructions, setInstructions] = useState("");
    const [activeAlert, setActiveAlert] = useState<string | null>(null);
    const [shopDetails, setshopDetails] = useState<any>(null)
    const [bagPrice, setBagPrice] = useState<any>()
    const [bags, setBags] = useState<any[]>([]);

    const [loading, setLoading] = useState(false);
    const [order, setOrder] = useState({
        street_address: "",
        state: "",
        city: "",
        zip_code: "",
        country: ""
    })




    // Tooltip visibility

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const raw = await AsyncStorage.getItem("order-details");
                if (!raw) return;

                const parsed = JSON.parse(raw);
                setshopDetails(parsed)

                const normalize = (val: any) =>
                    typeof val === "string" ? JSON.parse(val) : val;

                setOrder({
                    ...normalize(parsed.pickup_address),
                });

                console.log("ORDER DETAILS →", parsed);
            } catch (error) {
                console.log("Order parse error:", error);
            }
        };

        loadOrder();
    }, []);
    // console.log(JSON.stringify(order))

    const getBagPrice = (type: "small" | "medium" | "big") => {
        if (!shopDetails) return 0;

        const pricePerLb = Number(shopDetails.price) || 0;
        const weight = bagWeight[type];
        const qty = bagCounts[type];

        return pricePerLb * weight * qty;
    };


    const bagWeight = {
        small: 5,
        medium: 10,
        big: 15
    }

    const bagConfig = {
        small: { weight: 5 },
        medium: { weight: 10 },
        big: { weight: 15 },
    };


    const updateBagCount = (size: "small" | "medium" | "big", delta: number) => {
        setBagCounts(prev => {
            const newQty = Math.max(0, prev[size] + delta);

            setBags(prevBags => {
                const existingIndex = prevBags.findIndex(b => b.size === size);

                // If quantity becomes 0 → remove bag
                if (newQty === 0) {
                    return prevBags.filter(b => b.size !== size);
                }

                const pricePerLb = Number(shopDetails?.price || 0);
                const weight = bagConfig[size].weight;
                const price = pricePerLb * weight * newQty;

                const bagObject = {
                    name: "bag",
                    quantity: newQty,
                    size,
                    dimensions: {
                        length: 1,
                        height: 1,
                        depth: 1,
                    },
                    price,
                    weight,
                    vat_percentage: 0,
                };

                // Update existing
                if (existingIndex !== -1) {
                    const updated = [...prevBags];
                    updated[existingIndex] = bagObject;
                    return updated;
                }

                // Add new
                return [...prevBags, bagObject];
            });

            return {
                ...prev,
                [size]: newQty,
            };
        });
    };


    const getGrandTotalBagPrice = () => {
        if (!shopDetails) return 0;

        const pricePerLb = Number(shopDetails.price) || 0;

        return (
            (bagCounts.small * bagWeight.small * pricePerLb) +
            (bagCounts.medium * bagWeight.medium * pricePerLb) +
            (bagCounts.big * bagWeight.big * pricePerLb)
        );
    };


    const handleOrder = async () => {
        const totalBags = bagCounts.small + bagCounts.medium + bagCounts.big;
        if (totalBags === 0) {
            Alert.alert("Selection Required", "Please add at least one bag to your order.");
            return;
        }

        setLoading(true);

        try {
            /* ----------------------------------
               1. Load order-details from storage
            -----------------------------------*/
            const rawOrder = await AsyncStorage.getItem("order-details");
            if (!rawOrder) {
                Alert.alert("Missing Data", "Pickup address not found.");
                return;
            }

            const orderDetails = JSON.parse(rawOrder);


            const normalize = (val: any) =>
                typeof val === "string" ? JSON.parse(val) : val;
            const normalizeToString = (addr: any) => {
                if (!addr) return null;
                // if already string → keep it
                if (typeof addr === "string") return addr;
                // if object → stringify
                return JSON.stringify(addr);
            };


            // const pickupAddress = normalize(orderDetails.pickup_address);
            const pickupAddressStr = normalizeToString(orderDetails.pickup_address);
            const dropoffAddressStr = normalizeToString(orderDetails.dropoff_address);

            /* ----------------------------------
               2. Parse LaundryMart (dropoff)
            -----------------------------------*/
            const mart = params as any;

            const dropoffAddress =
                typeof mart.location === "string"
                    ? JSON.parse(mart.location)
                    : mart.location;

            /* ----------------------------------
               3. Build Get-Quote Payload
            -----------------------------------*/
            const payload = {
                service_type: selectedService,

                pickup_address: pickupAddressStr,
                dropoff_address: dropoffAddressStr,

                pickup_latitude: Number(orderDetails.latitude),
                pickup_longitude: Number(orderDetails.longitude),

                dropoff_latitude: Number(mart.lat),
                dropoff_longitude: Number(mart.lng),

                insurance_amount: selectedInsurance === "protection" ? 299 : 0,

                customer_note: instructions || "",
                pickup_phone_number: "+8801853958635",
                dropoff_phone_number: "+8801853958636",

                manifest_total_value: 1000,
                external_store_id: mart.store_id,
            };

            /* ----------------------------------
               4. Call Get-Quote API
            -----------------------------------*/
            const res = await api.post("/customers/api/get-quote", payload);
            console.log("QUOTE RESPONSE →", res.data);

            /* ----------------------------------
               5. Save order + quote
            -----------------------------------*/
            await AsyncStorage.setItem(
                "pending-order",
                JSON.stringify({
                    // bags: bagCounts,
                    service: selectedService,
                    insurance: selectedInsurance,
                    instructions,
                    payload,
                    quote: res.data,
                    shopDetails,
                    bagTotalPrice: getGrandTotalBagPrice(),
                    bags
                })
            );

            router.push("/order/reviewOrder");
        } catch (error: any) {
            console.error("ORDER ERROR:", error?.response?.data);
            Alert.alert("Error", "Unable to get quote. Please try again.");
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

    console.log("shopdetails", shopDetails)

    if (!shopDetails) return <ActivityIndicator />

    return (
        <View className="flex-1 bg-white">
            {!shopDetails ? (
                <View className="flex-1 items-center justify-center">
                    <ActivityIndicator size="large" />
                </View>
            ) : (
                    <ScrollView
                        contentContainerStyle={{ paddingBottom: 140 }}
                        showsVerticalScrollIndicator={false}
                        className="px-5 pt-4"
                    >
                        {/* Laundry Card */}
                        <View className="bg-[#F0F7FF] border border-[#E2E8F0] rounded-2xl p-4 flex-row items-center mb-5">
                            <Image source={{ uri: shopDetails.image }} className="w-16 h-16 rounded-xl mr-3" />
                            <View className="flex-1">
                                <Text className="text-lg font-bold text-[#1E293B]">{shopDetails.shopName}</Text>
                                <View className="flex-row items-center mt-1">
                                    <Ionicons name="star" size={14} color="#FACC15" />
                                    <Text className="text-sm font-semibold text-[#1E293B] ml-1">{shopDetails.ratings}</Text>
                                    {/* <Text className="text-sm text-[#64748B] ml-1">(234)</Text> */}
                                    <View className="flex-row items-center ml-3">
                                        <Ionicons name="location-outline" size={14} color="#64748B" />
                                        <Text className="text-sm text-[#64748B] ml-1">{shopDetails.distance} miles away</Text>
                                    </View>
                                    {/* <Text className="text-sm text-[#64748B] ml-1">{shopDetails.price} Price per pound</Text> */}
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
                            { label: "Big", range: "0–15 lbs", key: "big" },
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
                        <Text className="text-base font-bold text-[#1E293B] mt-4">
                            Total Bag Price: $ {getGrandTotalBagPrice()}
                        </Text>

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
            )}

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