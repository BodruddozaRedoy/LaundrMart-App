import PrimaryButton from "@/components/shared/PrimaryButton";
import { api } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

/* ---------- HELPERS ---------- */
const formatAddress = (json: string) => {
  const a = JSON.parse(json);
  return `${a.street_address.join(" ")}, ${a.city}, ${a.state} ${a.zip_code}, ${a.country}`;
};

const formatService = (v: string) =>
  v === "drop_off" ? "Drop-off Service" : "Pickup & Delivery";

const formatInsurance = (v: string) =>
  v === "basic" ? "Basic Protection" : "Premium Protection";

const formatDate = (d: string) =>
  new Date(d).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const formatDuration = (m: number) => `${m} minutes`;

const formatCurrency = (amount: number, currency = "USD") =>
  `${currency} ${(amount / 100).toFixed(2)}`;

/* ---------- SCREEN ---------- */
export default function ReviewOrderScreen() {
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);


  useEffect(() => {
    AsyncStorage.getItem("pending-order").then((d) => {
      if (d) setOrder(JSON.parse(d));
    });
  }, []);

  if (!order) return null;
  // console.log("order", order)

  const { bags, service, insurance, instructions, payload, quote, shopDetails } =
    order;

  const totalBagPrice = bags.reduce(
    (sum: number, b: any) => sum + b.price,
    0
  );

  const bagSummary = bags.map(
    (b: any) => `${b.quantity} × ${b.size.toUpperCase()} bag`
  );

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      const res = await api.post("/payment/api/retrieve-cards/");
      const cards = res.data.cards || [];

      setPaymentMethods(cards);

      // ✅ auto select first card
      if (cards.length > 0) {
        setSelectedCardId(cards[0].id);
      }
    } catch (error) {
      console.log("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };



  /* ---------- CONFIRM ORDER ---------- */
  const handleConfirmOrder = async () => {
    try {
      setLoading(true);

      // Build manifest_items from bags
      const manifest_items = bags.map((bag: any) => ({
        name: "bag",
        quantity: bag.quantity,
        size: bag.size,
        dimensions: bag.dimensions,
        price: bag.price,
        weight: bag.weight,
        vat_percentage: bag.vat_percentage,
      }));


      const confirmPayload = {
        service_type: payload.service_type,
        quote_id: payload.service_type === "full_service" ? quote.first_quote.id : quote.quote_id,
        manifest_items,

        pickup_address: payload.pickup_address,
        dropoff_address: payload.dropoff_address,

        pickup_latitude: payload.pickup_latitude,
        pickup_longitude: payload.pickup_longitude,
        dropoff_latitude: payload.dropoff_latitude,
        dropoff_longitude: payload.dropoff_longitude,

        pickup_phone_number: payload.pickup_phone_number,
        dropoff_phone_number: payload.dropoff_phone_number,

        manifest_total_value: String(payload.manifest_total_value),
        insurance_amount: String(payload.insurance_amount),

        external_store_id: payload.external_store_id,

        pickup_ready_dt: new Date().toISOString(),
        dropoff_eta: quote.dropoff_eta,
      };

      console.log("payload", JSON.stringify(confirmPayload, null, 2))

      // API CALL
      const res = await api.post(
        "/customers/api/confirm-order",
        confirmPayload
      );

      // SAVE CONFIRMED ORDER
      await AsyncStorage.setItem(
        "order-details",
        JSON.stringify(res.data)
      );

      // CLEANUP
      await AsyncStorage.removeItem("pending-order");

      console.log(res.data)
      await AsyncStorage.setItem("pending_id", JSON.stringify(res.data.pending_quote_id))
      await fetchPaymentMethods();
      setShowPaymentModal(true);
      // router.push("/order/orderConfirm");
    } catch (error: any) {
      console.log("Confirm order failed:", JSON.stringify(error?.response?.data, null, 2));
    } finally {
      setLoading(false);
    }
  };

  const handleChargeByCard = async () => {
    const data = await AsyncStorage.getItem("pending_id")
    if (!selectedCardId && !data) return;

    // console.log("pending id", JSON.parse(data))

    try {
      setLoading(true);

      const chargePayload = {
        amount: totalBagPrice,
        service_type: payload.service_type,
        payment_method_id: selectedCardId,
        pending_quote_id: JSON.parse(data!),
      };

      console.log("CHARGE PAYLOAD →", chargePayload);

      const res = await api.post(
        "/customers/api/charge-by-card",
        chargePayload
      );

      console.log("PAYMENT SUCCESS →", res.data);

      setShowPaymentModal(false);
      router.push("/order/orderConfirm");

    } catch (error: any) {
      console.log("PAYMENT FAILED:", error?.response?.data);
    } finally {
      setLoading(false);
    }
  };



  return (
    <View className="flex-1 bg-white">
      <ScrollView className="px-5 pt-4" contentContainerStyle={{ paddingBottom: 120 }}>

        {/* Laundry Card */}
        <View className="bg-[#F0F7FF] border border-[#E2E8F0] rounded-2xl p-4 flex-row items-center mb-5">
          <Image source={{ uri: shopDetails.image }} className="w-16 h-16 rounded-xl mr-3" />
          <View className="flex-1">
            <Text className="text-lg font-bold text-[#1E293B]">{shopDetails.shopName}</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="star" size={14} color="#FACC15" />
              <Text className="text-sm font-semibold text-[#1E293B] ml-1">
                {shopDetails.ratings}
              </Text>
              <View className="flex-row items-center ml-3">
                <Ionicons name="location-outline" size={14} color="#64748B" />
                <Text className="text-sm text-[#64748B] ml-1">
                  {shopDetails.distance} miles away
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* SERVICE */}
        <Section title="Service">
          <Row label="Service Type" value={formatService(service)} />
        </Section>

        {/* ADDRESSES */}
        <Section title="Addresses">
          <Row label="Pickup Address" value={formatAddress(payload.pickup_address)} />
          <Row label="Drop-off Address" value={formatAddress(payload.dropoff_address)} />
        </Section>

        {/* CONTACT */}
        <Section title="Contact">
          <Row label="Pickup Phone" value={payload.pickup_phone_number} />
          <Row label="Drop-off Phone" value={payload.dropoff_phone_number} />
        </Section>

        {/* BAGS */}
        <Section title="Laundry Bags">
          {bagSummary.map((b: string, i: number) => (
            <Text key={i} className="text-sm text-[#1E293B]">
              • {b}
            </Text>
          ))}

          <Text className="text-sm text-[#1E293B] mt-1">
            Total Price: ৳ {totalBagPrice}
          </Text>
        </Section>


        {/* INSURANCE */}
        <Section title="Insurance">
          <Row label="Plan" value={formatInsurance(insurance)} />
          <Row label="Coverage Amount" value={`$${payload.insurance_amount}`} />
        </Section>

        {/* NOTES */}
        <Section title="Customer Notes">
          <Text className="text-sm text-[#1E293B]">
            {instructions || payload.customer_note || "No special instructions"}
          </Text>
        </Section>

        {/* VALUE */}
        <Section title="Order Value">
          <Row label="Declared Value" value={`$${payload.manifest_total_value}`} />
        </Section>

        {/* QUOTE */}
        <Section title="Quote Details">
          <Row label="Quote ID" value={quote.quote_id} />
          <Row label="Fee" value={formatCurrency(quote.fee, quote.currency_type)} />
          <Row label="Quote Expires" value={formatDate(quote.expires)} />
        </Section>

        {/* TIMING */}
        <Section title="Timing">
          <Row label="Pickup Duration" value={formatDuration(quote.pickup_duration)} />
          <Row label="Drop-off ETA" value={formatDate(quote.dropoff_eta)} />
          <Row label="Drop-off Deadline" value={formatDate(quote.dropoff_deadline)} />
          <Row label="Total Duration" value={formatDuration(quote.duration)} />
        </Section>
      </ScrollView>

      <View className="absolute bottom-10 left-5 right-5">
        <TouchableOpacity onPress={handleConfirmOrder} disabled={loading}>
          <PrimaryButton text={loading ? "Confirming..." : "Confirm Order"} />
        </TouchableOpacity>
      </View>

      {showPaymentModal && (
        <View className="absolute inset-0 bg-black/40 justify-end">
          {/* Bottom Sheet */}
          <View className="bg-white rounded-t-3xl px-5 pt-5 pb-8">

            {/* Drag Handle */}
            <View className="w-12 h-1.5 bg-slate-300 rounded-full self-center mb-4" />

            {/* Title */}
            <Text className="text-lg font-bold text-[#1E293B] mb-1">
              Select Payment Method
            </Text>
            <Text className="text-sm text-[#64748B] mb-4">
              Choose a saved card to complete your payment
            </Text>

            {/* CARD LIST */}
            {paymentMethods.length === 0 ? (
              <View className="border border-dashed border-[#CBD5E1] rounded-xl p-4 mb-4">
                <Text className="text-sm text-[#64748B] text-center">
                  No saved cards found
                </Text>
              </View>
            ) : (
              paymentMethods.map((card: any) => {
                const selected = selectedCardId === card.id;
                return (
                  <TouchableOpacity
                    key={card.id}
                    onPress={() => setSelectedCardId(card.id)}
                    className={`border rounded-xl p-4 mb-3 flex-row items-center justify-between
                ${selected ? "border-[#2563EB] bg-[#F0F7FF]" : "border-[#E2E8F0]"}`}
                  >
                    <View className="flex-row items-center gap-3">
                      <Ionicons name="card-outline" size={22} color="#2563EB" />
                      <View>
                        <Text className="font-semibold text-[#1E293B]">
                          {card.brand?.toUpperCase()} •••• {card.last4}
                        </Text>
                        <Text className="text-xs text-[#64748B]">
                          Expires {card.exp_month}/{card.exp_year}
                        </Text>
                      </View>
                    </View>

                    {selected && (
                      <Ionicons name="checkmark-circle" size={22} color="#2563EB" />
                    )}
                  </TouchableOpacity>
                );
              })
            )}

            {/* ADD CARD BUTTON */}
            <TouchableOpacity
              onPress={() => {
                router.push("/(customer)/more/payment")
              }}
              className="border border-[#2563EB] rounded-xl py-3 mb-4"
            >
              <Text className="text-center font-semibold text-[#2563EB]">
                + Add new card
              </Text>
            </TouchableOpacity>

            {/* PAYMENT NOTE */}
            <View className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 mb-4">
              <Text className="text-sm text-[#475569] leading-5">
                {/* YOU WILL PROVIDE TEXT */}
                Payment will be charged once the laundry process is completed.
                You will receive a receipt after successful payment.
              </Text>
            </View>

            {/* PAY BUTTON */}
            <TouchableOpacity
              disabled={!selectedCardId || loading}
              onPress={handleChargeByCard}
            >
              <PrimaryButton
                text="Select card for payment"


              />
            </TouchableOpacity>

            {/* CANCEL */}
            <TouchableOpacity
              onPress={() => setShowPaymentModal(false)}
              className="mt-3"
            >
              <Text className="text-center text-sm text-[#64748B]">
                Cancel
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      )}

    </View>
  );
}

/* ---------- UI HELPERS ---------- */

const Section = ({ title, children }: any) => (
  <View className="mb-5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl p-4">
    <Text className="text-base font-semibold text-[#1E293B] mb-3">{title}</Text>
    {children}
  </View>
);

const Row = ({ label, value }: any) => (
  <View className="flex-row justify-between mb-2">
    <Text className="text-sm text-[#475569]">{label}</Text>
    <Text className="text-sm text-[#1E293B] text-right flex-1 ml-4">{value}</Text>
  </View>
);
