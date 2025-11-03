import React from "react";
import {
  Modal,
  TouchableWithoutFeedback,
  View,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface InfoAlertProps {
  visible: boolean;
  onClose: () => void;
  message: string;
  position?: {
    top?: number;
    right?: number;
    left?: number;
    bottom?: number;
  };
}

const InfoAlert: React.FC<InfoAlertProps> = ({
  visible,
  onClose,
  message,
  position = { top: 200, right: 20 },
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* Overlay that closes on tap */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View className="flex-1 bg-black/40 justify-center items-center" />
      </TouchableWithoutFeedback>

      {/* Tooltip Box */}
      <View
        className="absolute bg-[#F1F5F9] border border-[#CBD5E1] rounded-lg px-3 py-2 w-64 shadow-md z-50"
        style={{
          top: position.top,
          right: position.right,
          left: position.left,
          bottom: position.bottom,
        }}
      >
        <View className="flex-row items-start">
          <Ionicons
            name="information-circle-outline"
            size={16}
            color="#2563EB"
            style={{ marginTop: 2 }}
          />
          <Text className="text-xs text-[#475569] ml-2">{message}</Text>
        </View>
      </View>
    </Modal>
  );
};

export default InfoAlert;
