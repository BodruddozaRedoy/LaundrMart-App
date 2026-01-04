import HeaderBackButton from "@/components/common/HeaderBackButton";
import { api } from "@/lib/axios";
import { Ionicons } from '@expo/vector-icons';
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-controller";
// import { KeyboardAvoidingView } from "react-native-keyboard-controller";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PaymentScreen() {
    const { confirmSetupIntent } = useStripe();
    const [paymentMethods, setPaymentMethods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [adding, setAdding] = useState(false);
    const [isCardComplete, setIsCardComplete] = useState(false);

    // Track loading for specific card actions (Remove/Default)
    const [actionId, setActionId] = useState<string | null>(null);

    /* ---------------- FETCH CARDS ---------------- */
    const fetchPaymentMethods = async () => {
        try {
            setLoading(true);
            const res = await api.post("/payment/api/retrieve-cards/");
            setPaymentMethods(res.data.cards || []);
        } catch (error) {
            console.log("Fetch Error:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchPaymentMethods(); }, []);

    /* ---------------- ADD CARD (EXACT WORKING LOGIC) ---------------- */
    const handleAddCard = async () => {
        if (!isCardComplete) {
            Alert.alert("Error", "Please complete your card details.");
            return;
        }

        try {
            setAdding(true);
            const { data } = await api.post("/payment/api/add-card/");
            const clientSecret = data.setup_intent_client_secret;

            if (!clientSecret) {
                Alert.alert("Error", "No client secret returned from server.");
                return;
            }

            // Using the EXACT parameter structure from your working version
            const { error, setupIntent } = await confirmSetupIntent(clientSecret, {
                paymentMethodType: 'Card',
                paymentMethodData: {
                    billingDetails: {},
                },
            });

            if (error) {
                console.log("Stripe Error:", error);
                Alert.alert("Payment Error", error.message || "Unknown Error");
                return;
            }

            if (setupIntent) {
                Alert.alert("Success", "Card saved successfully!");
                fetchPaymentMethods();
            }

        } catch (error: any) {
            console.log("Add Card Catch:", error);
            Alert.alert("Error", "Could not connect to server.");
        } finally {
            setAdding(false);
        }
    };

    /* ---------------- REMOVE CARD ---------------- */
    const handleRemoveCard = (id: string) => {
        Alert.alert("Delete Card", "Remove this payment method?", [
            { text: "Cancel", style: "cancel" },
            {
                text: "Remove",
                style: "destructive",
                onPress: async () => {
                    try {
                        setActionId(id);
                        await api.delete(`/payment/api/delete-card/${id}/`);
                        fetchPaymentMethods();
                    } catch (error) {
                        Alert.alert("Error", "Failed to delete card");
                    } finally {
                        setActionId(null);
                    }
                }
            },
        ]);
    };

    /* ---------------- SET DEFAULT CARD ---------------- */
    const handleSetDefault = async (id: string) => {
        try {
            setActionId(id);
            // Replace endpoint with your actual endpoint
            await api.post("/payment/api/set-default-card/", { card_id: id });
            fetchPaymentMethods();
        } catch (error) {
            Alert.alert("Error", "Failed to set default card");
        } finally {
            setActionId(null);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white p-5">
            <KeyboardAwareScrollView
                style={{ flex: 1 }}
            >
                {/* Header */}
                <View className="flex flex-row items-center justify-start border-b border-gray-100 pb-5 mb-6">
                    <HeaderBackButton onPress={() => router.back()} />
                    <Text className="text-2xl font-bold text-black ml-3">Payment Methods</Text>
                </View>

                {/* Card List Section */}
                <View className="mb-8">
                    {loading && paymentMethods.length === 0 ? (
                        <ActivityIndicator color="black" />
                    ) : (
                        paymentMethods.map((item: any) => (
                            <View key={item.id} className="bg-gray-50 border border-gray-100 rounded-3xl p-5 mb-4">
                                <View className="flex-row justify-between items-start">
                                    <View>
                                        <View className="flex-row items-center mb-1">
                                            <Text className="font-bold text-lg mr-2 uppercase">{item.brand}</Text>
                                            {item.is_default && (
                                                <View className="bg-green-100 px-2 py-0.5 rounded-full">
                                                    <Text className="text-green-700 text-[10px] font-bold">DEFAULT</Text>
                                                </View>
                                            )}
                                        </View>
                                        <Text className="text-gray-500 font-medium">•••• •••• •••• {item.last4}</Text>
                                    </View>

                                    <TouchableOpacity onPress={() => handleRemoveCard(item.id)}>
                                        <Ionicons name="trash-outline" size={20} color="#ff4444" />
                                    </TouchableOpacity>
                                </View>

                                {/* Set Default Option */}
                                {!item.is_default && (
                                    <TouchableOpacity
                                        onPress={() => handleSetDefault(item.id)}
                                        className="mt-4 pt-3 border-t border-gray-200"
                                        disabled={actionId !== null}
                                    >
                                        {actionId === item.id ? (
                                            <ActivityIndicator size="small" color="#000" />
                                        ) : (
                                            <Text className="text-blue-600 font-semibold text-center">Set as Default</Text>
                                        )}
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))
                    )}
                </View>

                {/* Add Card Form */}
                <View className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                    <Text className="font-bold text-lg mb-4 text-gray-800">Add New Card</Text>

                    <View className="border border-gray-200 rounded-xl px-2 mb-4">
                        <CardField
                            postalCodeEnabled={false}
                            onCardChange={(cardDetails) => setIsCardComplete(cardDetails.complete)}
                            style={{ height: 50, width: '100%' }}
                            cardStyle={{
                                backgroundColor: '#FFFFFF',
                                textColor: '#000000',
                            }}
                        />
                    </View>

                    <TouchableOpacity
                        disabled={adding || !isCardComplete}
                        onPress={handleAddCard}
                        style={{
                            backgroundColor: isCardComplete ? '#000000' : '#F3F4F6',
                            paddingVertical: 16,
                            borderRadius: 16,
                            alignItems: 'center'
                        }}
                    >
                        {adding ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={{
                                color: isCardComplete ? 'white' : '#9CA3AF',
                                fontWeight: 'bold'
                            }}>
                                {isCardComplete ? 'Save Card' : 'Fill Card Details'}
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}