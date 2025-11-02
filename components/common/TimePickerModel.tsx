import React, { useState } from "react";
import { Modal, Text, TouchableOpacity, View, ScrollView } from "react-native";

interface TimePickerModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
}

const hours = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, "0"));
const minutes = Array.from({ length: 60 }, (_, i) => i.toString().padStart(2, "0"));

const TimePickerModal: React.FC<TimePickerModalProps> = ({ visible, onClose, onConfirm }) => {
  const [selectedHour, setSelectedHour] = useState("12");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [ampm, setAmPm] = useState<"AM" | "PM">("AM");

  const handleConfirm = () => {
    onConfirm(`${selectedHour}:${selectedMinute} ${ampm}`);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white p-5 rounded-t-3xl">
          <Text className="text-lg font-semibold text-[#1E293B] mb-3 text-center">
            Select Time
          </Text>

          <View className="flex-row justify-center items-center mb-5">
            {/* Hours */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: 150 }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {hours.map((hr) => (
                <TouchableOpacity key={hr} onPress={() => setSelectedHour(hr)}>
                  <Text
                    className={`text-2xl p-1 ${
                      selectedHour === hr ? "text-[#2563EB] font-bold" : "text-[#475569]"
                    }`}
                  >
                    {hr}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text className="text-2xl text-[#475569] mx-2">:</Text>

            {/* Minutes */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ height: 150 }}
              contentContainerStyle={{ alignItems: "center" }}
            >
              {minutes.map((min) => (
                <TouchableOpacity key={min} onPress={() => setSelectedMinute(min)}>
                  <Text
                    className={`text-2xl p-1 ${
                      selectedMinute === min ? "text-[#2563EB] font-bold" : "text-[#475569]"
                    }`}
                  >
                    {min}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* AM/PM Toggle */}
            <View className="ml-5 items-center justify-center">
              {["AM", "PM"].map((val) => (
                <TouchableOpacity
                  key={val}
                  onPress={() => setAmPm(val as "AM" | "PM")}
                  className={`px-3 py-1 rounded-full mb-2 ${
                    ampm === val ? "bg-[#2563EB]" : "bg-[#E2E8F0]"
                  }`}
                >
                  <Text
                    className={`font-semibold ${
                      ampm === val ? "text-white" : "text-[#475569]"
                    }`}
                  >
                    {val}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Done Button */}
          <TouchableOpacity
            onPress={handleConfirm}
            className="bg-[#2563EB] py-3 rounded-lg"
          >
            <Text className="text-white text-center font-semibold">Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TimePickerModal;
