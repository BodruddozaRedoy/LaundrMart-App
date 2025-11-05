import PrimaryButton from "@/components/shared/PrimaryButton";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    Modal,
    TextInput,
    Alert,
} from "react-native";

const PickupNowScreen = () => {
    const { latitude, longitude, currentAddress } = useLocalSearchParams<{
        latitude: string;
        longitude: string;
        currentAddress: string;
    }>();

    const [addresses, setAddresses] = useState<any[]>([]);
    const [selectedAddress, setSelectedAddress] = useState<any>(null);

    // ⭐ new states for update flow
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editAddressValue, setEditAddressValue] = useState("");
    const [addressToEdit, setAddressToEdit] = useState<any>(null);

    useEffect(() => {
        const loadAddresses = async () => {
            const saved = await AsyncStorage.getItem("savedAddresses");
            if (saved) {
                const parsed = JSON.parse(saved);
                setAddresses(parsed);
            }
        };
        loadAddresses();
    }, []);

    const handleSelect = (addr: any) => {
        setSelectedAddress(addr);
    };

    // ⭐ new: open modal to edit address
    const handleEdit = (addr: any) => {
        setAddressToEdit(addr);
        setEditAddressValue(addr.currentAddress);
        setEditModalVisible(true);
    };

    // ⭐ new: save updated address string to AsyncStorage
    const handleUpdateAddress = async () => {
        if (!addressToEdit) return;

        try {
            const updatedList = addresses.map((a) =>
                a.id === addressToEdit.id
                    ? { ...a, currentAddress: editAddressValue }
                    : a
            );

            await AsyncStorage.setItem("savedAddresses", JSON.stringify(updatedList));
            setAddresses(updatedList);

            // if this address was selected, update selected reference too
            if (selectedAddress?.id === addressToEdit.id) {
                setSelectedAddress({
                    ...selectedAddress,
                    currentAddress: editAddressValue,
                });
            }

            setEditModalVisible(false);
            Alert.alert("Updated!", "Address updated successfully.");
        } catch (e) {
            console.error("Update error:", e);
            Alert.alert("Error", "Unable to update address.");
        }
    };

    const handleContinue = () => {
        if (!selectedAddress) return;
        router.push({
            pathname: "/order/chooseLaundryMart",
            params: {
                latitude: selectedAddress.latitude.toString(),
                longitude: selectedAddress.longitude.toString(),
                currentAddress: selectedAddress.currentAddress,
            },
        });
    };

    return (
        <View className="flex-1 bg-white px-5 pt-5">
            <Text className="text-2xl font-bold text-black">Your Locations</Text>
            <Text className="text-md text-gray-500 mt-1 mb-5">
                Where should we pick up your laundry?
            </Text>

          {/* Saved Addresses */}
          <FlatList
              data={addresses}
              keyExtractor={(item) => item.id}
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
                        {item.label}
                    </Text>
                    <Text className="text-md text-gray-600 mt-1">
                        {item.currentAddress}
                    </Text>
                </TouchableOpacity>

                {/* ⭐ new Update button */}
                <TouchableOpacity
                    onPress={() => handleEdit(item)}
                    className="bg-gray-100 px-3 py-2 rounded-lg"
                >
                    <Ionicons name="create-outline" size={18} color="#017FC6" />
                </TouchableOpacity>

                {selectedAddress?.id === item.id && (
                    <Ionicons
                        name="checkmark-circle"
                        size={24}
                        color="#017FC6"
                        style={{ marginLeft: 5 }}
                    />
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

          {/* Continue Button */}
          <TouchableOpacity
              onPress={handleContinue}
              disabled={!selectedAddress}
              className="w-full absolute bottom-10 right-5 left-5 opacity-100"
          >
              <PrimaryButton text="Continue" />
          </TouchableOpacity>

          {/* ⭐ Update Modal */}
          <Modal
              visible={editModalVisible}
              transparent
              animationType="slide"
              onRequestClose={() => setEditModalVisible(false)}
          >
              <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.3)] px-5">
                  <View className="bg-white w-full rounded-2xl p-5">
                      <Text className="text-lg font-semibold text-black mb-3">
                          Update Address
                      </Text>
                      <TextInput
                          placeholder="Enter new address"
                          value={editAddressValue}
                          onChangeText={setEditAddressValue}
                          multiline
                          className="border border-gray-300 rounded-lg px-3 py-2 h-24 text-gray-800"
                      />

                      <View className="flex-row justify-end mt-5">
                          <TouchableOpacity
                              onPress={() => setEditModalVisible(false)}
                              className="px-4 py-2 mr-3 bg-gray-100 rounded-lg"
                          >
                              <Text className="text-gray-700 font-medium">Cancel</Text>
                          </TouchableOpacity>

                          <TouchableOpacity
                              onPress={handleUpdateAddress}
                              className="px-5 py-2 bg-[#017FC6] rounded-lg"
                          >
                              <Text className="text-white font-semibold">Save</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
          </Modal>
      </View>
  );
};

export default PickupNowScreen;
