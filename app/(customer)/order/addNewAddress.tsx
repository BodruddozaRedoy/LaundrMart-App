// app/order/add-new-address.tsx (or your path)
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Dimensions,
    Modal,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE, Region } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function AddNewAddress() {
    const router = useRouter();
    const [region, setRegion] = useState<Region | null>(null);
    const [loading, setLoading] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [addressType, setAddressType] = useState<"Home" | "Work" | "Custom">("Home");
    const [customLabel, setCustomLabel] = useState("");

    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const servicesEnabled = await Location.hasServicesEnabledAsync();
                if (!servicesEnabled) {
            Alert.alert("Location Services Disabled", "Please enable location services.");
                    return router.replace("/order/pickupAddress")
                    // setRegion({
                    //     latitude: 23.8103,
                    //     longitude: 90.4125,
                    //     latitudeDelta: 0.05,
                    //     longitudeDelta: 0.05 * (width / height),
                    // });
                    // return;
        }

          const { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            Alert.alert("Permission Denied", "We need location permission.");
            setRegion({
                latitude: 23.8103,
                longitude: 90.4125,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05 * (width / height),
            });
            return;
        }

          const loc = await Location.getCurrentPositionAsync({
              accuracy: Location.Accuracy.High,
        });

          setRegion({
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01 * (width / height),
        });
        } catch (err) {
            console.error("Location error:", err);
            setRegion({
                latitude: 23.8103,
                longitude: 90.4125,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05 * (width / height),
            });
        } finally {
            setLoading(false);
        }
    };

      fetchLocation();
  }, []);

    const handleConfirm = async () => {
        if (!region) {
            Alert.alert("Error", "Location not available yet.");
            return;
        }

      try {
          const [place] = await Location.reverseGeocodeAsync({
              latitude: region.latitude,
              longitude: region.longitude,
          });
          console.log(place)

        const address =
            [place?.name, place?.street, place?.city, place?.region]
                .filter(Boolean)
                .join(", ") ||
            `${region.latitude.toFixed(6)}, ${region.longitude.toFixed(6)}`;

        setModalVisible(true);

        await AsyncStorage.setItem(
            "pendingAddress",
            JSON.stringify({
                latitude: region.latitude,
                longitude: region.longitude,
                currentAddress: address,
            })
        );
      } catch (e) {
          console.error("Reverse geocode error:", e);
          Alert.alert("Error", "Unable to retrieve address for this location.");
      }
  };

    const handleAddAddress = async () => {
        try {
            const pending = await AsyncStorage.getItem("pendingAddress");
            if (!pending) return;

        const addressData = JSON.parse(pending);
        const label =
          addressType === "Custom" && customLabel.trim()
              ? customLabel.trim()
              : addressType;

        const finalAddress = {
            ...addressData,
            label,
          id: Date.now().toString(),
      };

        const existing = await AsyncStorage.getItem("savedAddresses");
        const addresses = existing ? JSON.parse(existing) : [];
        addresses.push(finalAddress);

        await AsyncStorage.setItem("savedAddresses", JSON.stringify(addresses));
        await AsyncStorage.removeItem("pendingAddress");

        setModalVisible(false);

        router.push({
            pathname: "/order/pickupAddress",
            params: {
              latitude: String(addressData.latitude),
              longitude: String(addressData.longitude),
              currentAddress: addressData.currentAddress,
          },
      });
      } catch (e) {
          console.error("Save error:", e);
      }
  };

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#017FC6" />
                <Text className="mt-2 text-gray-700">Fetching your location...</Text>
            </View>
        );
    }

    if (!region) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-gray-700">Couldn’t get your location.</Text>
                <TouchableOpacity
                    onPress={() => router.replace("/order/pickupAddress")}
                    className="mt-4 bg-[#017FC6] px-5 py-2 rounded-lg"
                >
                    <Text className="text-white font-semibold">Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-white">
          <MapView
              style={{ flex: 1 }}
              provider={Platform.OS === "android" ? PROVIDER_GOOGLE : undefined}
              region={region}
              showsUserLocation
              onRegionChangeComplete={(r) => setRegion(r)}
          >
              {/* Optional marker if you want a pin: */}
              {/* <Marker coordinate={region} title="Your Location" pinColor="#017FC6" /> */}
          </MapView>

          {/* Bottom Buttons */}
          <View className="flex-row items-center justify-between px-5 pb-5 bg-white my-10">
              <TouchableOpacity
                  onPress={() => router.back()}
                  className="flex-1 mr-2 bg-gray-100 h-12 rounded-xl items-center justify-center"
              >
                  <Text className="text-gray-700 font-semibold text-base">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                  onPress={handleConfirm}
                  className="flex-1 ml-2 bg-[#017FC6] h-12 rounded-xl items-center justify-center"
              >
                  <Text className="text-white font-semibold text-base">Confirm</Text>
              </TouchableOpacity>
          </View>

          {/* Slide-up Modal */}
          <Modal visible={modalVisible} animationType="slide" transparent onRequestClose={() => setModalVisible(false)}>
              <View style={{ flex: 1, justifyContent: "flex-end", backgroundColor: "rgba(0,0,0,0.3)" }}>
                  <View style={{ backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20 }}>
                      <Text className="text-xl font-bold mb-4">Set Address Label</Text>

                      {(["Home", "Work", "Custom"] as const).map((item) => (
                          <TouchableOpacity
                              key={item}
                              onPress={() => setAddressType(item)}
                    className={`p-3 border mb-3 rounded-xl ${addressType === item ? "border-[#017FC6]" : "border-gray-200"
                        }`}
                >
                    <Text
                        className={`text-base ${addressType === item ? "text-[#017FC6] font-semibold" : "text-gray-700"
                            }`}
                    >
                        {item}
                    </Text>
                </TouchableOpacity>
            ))}

                      {addressType === "Custom" && (
                          <TextInput
                              placeholder="Enter label (e.g. Parents’ House)"
                              value={customLabel}
                              onChangeText={setCustomLabel}
                              className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                          />
                      )}

                      <TouchableOpacity onPress={handleAddAddress} className="bg-[#017FC6] py-3 rounded-xl items-center justify-center">
                          <Text className="text-white font-semibold text-base">Add</Text>
                      </TouchableOpacity>
                  </View>
              </View>
          </Modal>
      </View>
  );
}
