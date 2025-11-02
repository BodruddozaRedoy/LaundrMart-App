import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";

const { width, height } = Dimensions.get("window");

export default function AddNewAddress() {
    const [region, setRegion] = useState({
        latitude: 37.7749,
        longitude: -122.4194,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05 * (width / height),
    });

  return (
      <View className="flex-1 bg-white">
          {/* Map */}
          <View className="flex-1">
              <MapView
                  style={{ flex: 1 }}
                  initialRegion={region}
                  onRegionChangeComplete={(r) => setRegion(r)}
              >
                  <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
              </MapView>

              {/* Zoom Controls (UI only for now) */}
              <View className="absolute right-4 bottom-28 items-center space-y-3">
                  <TouchableOpacity className="bg-white w-10 h-10 rounded-full items-center justify-center shadow">
                      <Ionicons name="add" size={22} color="#017FC6" />
                  </TouchableOpacity>
                  <TouchableOpacity className="bg-white w-10 h-10 rounded-full items-center justify-center shadow">
                      <Ionicons name="remove" size={22} color="#017FC6" />
                  </TouchableOpacity>
              </View>
          </View>

          {/* Bottom Buttons */}
          <View className="flex-row items-center justify-between px-5 pb-5 bg-white my-10">
              <TouchableOpacity className="flex-1 mr-2 bg-gray-100 h-12 rounded-xl items-center justify-center">
                  <Text className="text-gray-700 font-semibold text-base">Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity className="flex-1 ml-2 bg-[#017FC6] h-12 rounded-xl items-center justify-center">
                  <Text className="text-white font-semibold text-base">Confirm</Text>
              </TouchableOpacity>
          </View>
    </View>
  );
}
