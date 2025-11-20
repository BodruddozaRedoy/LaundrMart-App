import { Ionicons } from "@expo/vector-icons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Dimensions, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  // 🔥 Tablet detection (you are using this screen only for tablets)
  const { width } = Dimensions.get("window");
  const isTablet = width >= 768;

  const ICON_WRAPPER_SIZE = isTablet ? 80 : 60;
  const ICON_SIZE = isTablet ? 40 : 24;
  const LABEL_SIZE = isTablet ? 20 : 14;
  const TAB_HEIGHT = isTablet ? 110 : 90;

  const renderIcon = (
    focused: boolean,
    iconComponent: React.ReactNode,
    label: string
  ): React.ReactNode => (
    <View className="items-center justify-center mb-3 mt-5">
      <View
        className={`items-center justify-center rounded-full mb-1 ${focused ? "bg-primary" : "bg-transparent"
          }`}
        style={{
          width: ICON_WRAPPER_SIZE,
          height: ICON_WRAPPER_SIZE - 10,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {iconComponent}
      </View>

      {/* 🔥 Custom Label */}
      <Text
        numberOfLines={1}
        ellipsizeMode="clip"
        style={{
          width: 100, // prevents wrapping on tablet
          textAlign: "center",
          fontSize: LABEL_SIZE,
          fontWeight: "600",
          color: focused ? "#017FC6" : "#94A3B8",
        }}
      >
        {label}
      </Text>

    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          height: TAB_HEIGHT + insets.bottom,
          paddingBottom: insets.bottom + (isTablet ? 10 : 5),
          borderTopWidth: 0,
          backgroundColor: "#fff",
          elevation: 10,
          shadowColor: "#000",
          shadowOpacity: 0.15,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 8,
          paddingTop: isTablet ? 25 : 15,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Dashboard",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              <MaterialCommunityIcons
                name="view-dashboard-outline"
                size={ICON_SIZE}
                color={focused ? "#fff" : "#94A3B8"}
              />,
              "Dashboard"
            ),
        }}
      />

      <Tabs.Screen
        name="orders"
        options={{
          title: "Orders",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              <FontAwesome6
                name="box-open"
                size={ICON_SIZE}
                color={focused ? "#fff" : "#94A3B8"}
              />,
              "Orders"
            ),
        }}
      />

      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              <Ionicons
                name="chatbubble-ellipses-outline"
                size={ICON_SIZE + 4}
                color={focused ? "#fff" : "#94A3B8"}
              />,
              "Chat"
            ),
        }}
      />

      <Tabs.Screen
        name="more"
        options={{
          title: "More",
          tabBarIcon: ({ focused }) =>
            renderIcon(
              focused,
              <Ionicons
                name={focused ? "menu" : "menu-outline"}
                size={ICON_SIZE + 2}
                color={focused ? "#fff" : "#94A3B8"}
              />,
              "More"
            ),
        }}
      />
    </Tabs>
  );
}
