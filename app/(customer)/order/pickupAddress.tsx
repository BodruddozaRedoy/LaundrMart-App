import PrimaryButton from "@/components/shared/PrimaryButton";
import { api } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    View
} from "react-native";
import Toast from "react-native-toast-message";

const PickupNowScreen = () => {
    const queryClient = useQueryClient();

    const { latitude, longitude, currentAddress } = useLocalSearchParams<{
        latitude: string;
        longitude: string;
        currentAddress: string;
    }>();

    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editAddressValue, setEditAddressValue] = useState("");
    const [addressToEdit, setAddressToEdit] = useState<any>(null);

    const { data: addresses = [] } = useQuery({
        queryKey: ["address"],
        queryFn: async () => {
            const res = await api.get("/customers/api/locations");
            return res.data ?? [];
        },
    });

    console.log(selectedAddress)

    useEffect(() => {
        if (addresses.length > 0 && !selectedAddress) {
            setSelectedAddress(addresses[0]);
        }
    }, [addresses]);

    const handleSelect = (addr: any) => {
        setSelectedAddress(addr);
    };

    const handleEdit = (type: string, id: any) => {
        router.push({
            pathname: "/(customer)/order/addNewAddress",
            params: { type, id },
        });
    };

    // ✅ INSTANT DELETE (optimistic)
    const handleDeleteAddress = async (id: any) => {
        const prevAddresses = queryClient.getQueryData<any[]>(["address"]);

        // Optimistic UI update
        queryClient.setQueryData(["address"], (old: any[]) =>
            old.filter((a) => a.id !== id)
        );

        if (selectedAddress?.id === id) {
            setSelectedAddress(null);
        }

        try {
            await api.delete(`/customers/api/location/${id}`);

            Toast.show({
                type: "success",
                text1: "Address deleted",
                text2: "Pickup location removed successfully",
            });
      } catch (e) {
          // rollback
          queryClient.setQueryData(["address"], prevAddresses);

          Toast.show({
              type: "error",
              text1: "Delete failed",
              text2: "Something went wrong",
          });
      }
    };

    // ✅ INSTANT UPDATE
    const handleUpdateAddress = async () => {
        if (!addressToEdit) return;

        queryClient.setQueryData(["address"], (old: any[]) =>
            old.map((a) =>
                a.id === addressToEdit.id
                    ? { ...a, currentAddress: editAddressValue }
                    : a
          )
      );

        if (selectedAddress?.id === addressToEdit.id) {
            setSelectedAddress({
                ...selectedAddress,
                currentAddress: editAddressValue,
            });
        }

        setEditModalVisible(false);

        Toast.show({
            type: "success",
            text1: "Address updated",
            text2: "Pickup location updated successfully",
        });
    };

    const handleContinue = async () => {
        if (!selectedAddress) return;

        const prev = await AsyncStorage.getItem("order-details");
        const parsedPrev = prev ? JSON.parse(prev) : {};

        const addressPayload = {
          street_address: selectedAddress.street_address,
          state: selectedAddress.state || "",
          city: selectedAddress.city || "",
          zip_code: selectedAddress.zip_code || "",
          country: selectedAddress.country || "US",
      };

        await AsyncStorage.setItem(
            "order-details",
            JSON.stringify({
                ...parsedPrev,
                pickup_address: selectedAddress.location,
                latitude: selectedAddress.lat?.toString(),
                longitude: selectedAddress.lng?.toString(),
          })
      );

        router.push({
            pathname: "/order/chooseLaundryMart",
            params: {
                latitude: selectedAddress.lat.toString(),
                longitude: selectedAddress.lng.toString(),
                currentAddress: selectedAddress.location,
            },
        });
    };

    return (
        <View className="flex-1 bg-white px-5 pt-5">
            <Text className="text-2xl font-bold text-black">Your Locations</Text>
            <Text className="text-md text-gray-500 mt-1 mb-5">
                Where should we pick up your laundry?
            </Text>

            <FlatList
                data={addresses}
                keyExtractor={(item) => item.type}
                renderItem={({ item }) => (
                    <View
                        className={`flex-row justify-between items-center border rounded-2xl p-4 mb-3 ${selectedAddress?.id === item.id
                            ? "border-[#017FC6] bg-[#E5F3FF]"
                            : "border-gray-200 bg-white"
                            }`}
                    >
                        <TouchableOpacity
                            onPress={() => handleSelect(item)}
                            className="flex-1 mr-3"
                        >
                            <Text className="text-lg font-semibold text-black">
                              {item.type}
                          </Text>
                          <Text className="text-md text-gray-600 mt-1">
                              {`${JSON.parse(item.location).street_address}, ${JSON.parse(item.location).city}`}
                          </Text>
                      </TouchableOpacity>

                      <TouchableOpacity
                          onPress={() => handleEdit(item.type, item.id)}
                    className="bg-gray-100 px-3 py-2 rounded-lg"
                >
                    <Ionicons name="create-outline" size={18} color="#017FC6" />
                      </TouchableOpacity>

                      {!item.type.includes("Home") && (
                          <TouchableOpacity
                              onPress={() => handleDeleteAddress(item.id)}
                              className="bg-red-50 px-2 py-2 ml-2 rounded-full"
                          >
                              <Ionicons name="trash-outline" size={18} color="#DC2626" />
                          </TouchableOpacity>
                      )}
                    </View>
                )}
                ListEmptyComponent={
                    <Text className="text-gray-500 text-center mt-10">
                        No saved addresses yet.
                    </Text>
                }
                ListFooterComponent={() => (
                    <TouchableOpacity
                        onPress={() => router.push("/order/addNewAddress")}
                        className="flex-row items-center justify-center mt-6 h-12 bg-gray-50 rounded-xl border border-gray-200"
                    >
                        <Ionicons name="add-circle-outline" size={20} color="#017FC6" />
                        <Text className="text-[#017FC6] font-medium text-sm ml-2">
                            Add New Address
                        </Text>
                    </TouchableOpacity>
                )}
            />

            <TouchableOpacity
                onPress={handleContinue}
                disabled={!selectedAddress}
                className="w-full absolute bottom-10 right-5 left-5"
            >
                <PrimaryButton text="Continue" />
            </TouchableOpacity>
        </View>
    );
};

export default PickupNowScreen;
