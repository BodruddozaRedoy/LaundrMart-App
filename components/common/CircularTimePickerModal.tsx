import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  PanResponder,
} from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

const { width } = Dimensions.get("window");
const CLOCK_SIZE = width * 0.7;
const CENTER = CLOCK_SIZE / 2;
const RADIUS = CLOCK_SIZE / 2 - 30;

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: (time: string) => void;
}

const CircularTimePickerModal: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
}) => {
  const [selectedHour, setSelectedHour] = useState(12);
  const [ampm, setAmPm] = useState<"AM" | "PM">("AM");

  const handleConfirm = () => {
    const formatted = `${selectedHour.toString().padStart(2, "0")}:00 ${ampm}`;
    onConfirm(formatted);
    onClose();
  };

  // Handle drag on the circle
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      updateFromTouch(locationX, locationY);
    },
    onPanResponderMove: (evt) => {
      const { locationX, locationY } = evt.nativeEvent;
      updateFromTouch(locationX, locationY);
    },
  });

  const updateFromTouch = (x: number, y: number) => {
    const dx = x - CENTER;
    const dy = y - CENTER;
    let angle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = angle < 0 ? angle + 360 : angle;
    const hour = Math.round(angle / 30);
    setSelectedHour(hour === 0 ? 12 : hour);
  };

  const handAngle = ((selectedHour % 12) / 12) * 360 - 90;
  const handX = CENTER + RADIUS * Math.cos((handAngle * Math.PI) / 180);
  const handY = CENTER + RADIUS * Math.sin((handAngle * Math.PI) / 180);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-end bg-black/40">
        <View className="bg-white p-5 rounded-t-3xl items-center">
          <Text className="text-lg font-semibold text-[#1E293B] mb-4">
            Select Time
          </Text>

          {/* Clock */}
          <View {...panResponder.panHandlers}>
            <Svg height={CLOCK_SIZE} width={CLOCK_SIZE}>
              <Circle
                cx={CENTER}
                cy={CENTER}
                r={RADIUS}
                stroke="#E2E8F0"
                strokeWidth="2"
                fill="#F8FAFC"
              />
              {/* Clock numbers */}
              {Array.from({ length: 12 }, (_, i) => {
                const angle = (i + 1) * 30 - 90;
                const x =
                  CENTER + (RADIUS - 20) * Math.cos((angle * Math.PI) / 180);
                const y =
                  CENTER + (RADIUS - 20) * Math.sin((angle * Math.PI) / 180);
                const hour = i + 1;
                const isActive = selectedHour === hour;
                return (
                  <SvgText
                    key={hour}
                    x={x}
                    y={y + 5}
                    fontSize="18"
                    fontWeight={isActive ? "700" : "400"}
                    textAnchor="middle"
                    fill={isActive ? "#2563EB" : "#475569"}
                  >
                    {hour}
                  </SvgText>
                );
              })}

              {/* Clock hand */}
              <Line
                x1={CENTER}
                y1={CENTER}
                x2={handX}
                y2={handY}
                stroke="#2563EB"
                strokeWidth="3"
              />
              <Circle cx={CENTER} cy={CENTER} r="6" fill="#2563EB" />
              <Circle cx={handX} cy={handY} r="10" fill="#2563EB" />
            </Svg>
          </View>

          {/* AM / PM toggle */}
          <View className="flex-row mt-4 mb-6">
            {["AM", "PM"].map((val) => (
              <TouchableOpacity
                key={val}
                onPress={() => setAmPm(val as "AM" | "PM")}
                className={`px-6 py-2 mx-2 rounded-full ${
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

          {/* Buttons */}
          <View className="flex-row justify-between w-full px-5">
            <TouchableOpacity onPress={onClose}>
              <Text className="text-[#2563EB] font-semibold text-base">
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleConfirm}>
              <Text className="text-[#2563EB] font-semibold text-base">
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default CircularTimePickerModal;
